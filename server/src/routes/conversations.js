/* eslint-disable camelcase */
const { Router } = require('express');
const {
  findActiveContacts,
  countActiveContacts,
  getContactsOrder,
} = require('../services/ContactService');
const { getPagination, getExistsLiteral } = require('../utils');

const router = Router();
const getLastData = (...args) => {
  return args.reduce((last, arg) => {
    if (!arg.data) {
      return last;
    }

    if (!last) {
      return arg;
    }

    return arg.data.createdAt.getTime() > last.data.createdAt.getTime()
      ? arg
      : last;
  }, null);
};

router.get('/conversations', async (req, res) => {
  const { limit, offset } = getPagination(req.query);
  const { order, param } = getContactsOrder(req.query);
  const options = {
    distinct: true,
    where: {
      $or: [
        getExistsLiteral(
          '"NotificationMessage"',
          '"NotificationMessage"."To" = "Contact"."phoneNumber"',
        ),

        getExistsLiteral(
          '"Message"',
          '"Message"."to" = "Contact"."phoneNumber"',
        ),

        getExistsLiteral('"Sms"', '"Sms"."From" = "Contact"."phoneNumber"'),
      ],
    },

    include: [
      {
        association: 'notificationMessages',
        include: [
          {
            association: 'notification',
          },
        ],
      },

      {
        association: 'inboundMessages', // outbound-api
        include: [
          {
            association: 'messageStatus',
          },
        ],
      },

      {
        association: 'sms', // request-api
      },
    ],
  };

  const contacts = await findActiveContacts({
    ...options,
    limit,
    offset,
    order: [
      ...order,
      ['notificationMessages', 'createdAt', 'DESC'],
      ['inboundMessages', 'createdAt', 'DESC'],
      ['sms', 'createdAt', 'DESC'],
    ],
  });

  const total = await countActiveContacts({
    ...options,
  });

  const formatResponse = ({ contact, lastMessage }) => {
    const data = contact.toJSON();
    // delete data.notificationMessages;
    // delete data.inboundMessages;
    // delete data.sms;
    return {
      ...data,
      lastMessage,
    };
  };

  const getLastContactMessage = (contact) => {
    const [notificationMessage] = contact.notificationMessages;
    const [inboundMessage] = contact.inboundMessages;
    const [sms] = contact.sms;
    return getLastData(
      { type: 'NotificationMessage', data: notificationMessage },
      { type: 'InboundMessage', data: inboundMessage },
      { type: 'Sms', data: sms },
    );
  };

  const conversations = contacts.map((contact) => ({
    contact,
    lastMessage: getLastContactMessage(contact),
  }));

  const data = conversations.map(formatResponse);
  res.send({
    data,
    order: param,
    pagination: {
      limit,
      offset,
      total,
    },
  });
});

module.exports = router;
