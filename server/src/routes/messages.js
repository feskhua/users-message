/* eslint-disable camelcase */
const { Router } = require('express');
const { INTERNAL_SERVER_ERROR, NOT_FOUND } = require('http-status-codes');
const logger = require('../base/logger');
const { sendMessage } = require('../services/TwilioService');
const { findContact } = require('../services/ContactService');
const { createMessage } = require('../services/MessageService');

const router = Router();

router.get(
  ['/contacts/:contactId/messages', '/contacts/:contactId/outbound'],
  async (req, res) => {
    const { contactId } = req.params;
    const contact = await findContact({ where: { id: contactId } });
    if (!contact) {
      return res.status(NOT_FOUND).send('Contact not found');
    }

    const inboundMessages = await contact.getInboundMessages({
      include: [
        {
          association: 'messageStatus',
        },
      ],
    });
    return res.send(inboundMessages);
  },
);

router.post('/contacts/:contactId/messages', async (req, res) => {
  const { contactId } = req.params;
  const contact = await findContact({ where: { id: contactId } });
  if (!contact) {
    return res.status(NOT_FOUND).send('Contact not found');
  }

  try {
    const { body } = req.body;
    const message = await createMessage({
      body,
    });

    const {
      accountSid,
      apiVersion,
      from,
      to,
      dateCreated,
      dateSent,
      dateUpdated,
      direction,
      errorCode,
      errorMessage,
      messagingServiceSid,
      numMedia,
      numSegments,
      price,
      priceUnit,
      sid,
      status,
    } = await sendMessage(message, contact.phoneNumber);

    await message.update({
      accountSid,
      apiVersion,
      from,
      to,
      dateCreated,
      dateSent,
      dateUpdated,
      direction,
      errorCode,
      errorMessage,
      messagingServiceSid,
      numMedia,
      numSegments,
      price,
      priceUnit,
      sid,
      status,
    });

    return res.send(message);
  } catch (e) {
    logger.error(e);
    return res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }
});

module.exports = router;
