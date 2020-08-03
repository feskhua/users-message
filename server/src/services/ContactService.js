const { Contact } = require('../models');
const { parseOrderParams, stringifyOrderParams } = require('../utils');

const DEFAULT_ORDER = '-visitDate';

const createContacts = (data) => {
  const contacts = data.map((contact) => ({
    ...contact,
    status: Contact.STATUS_ENABLED,
  }));

  return Contact.bulkCreate(contacts, { returning: true });
};

const destroyContacts = (options = {}) => Contact.destroy({ ...options });
const findContacts = (options = {}) => Contact.findAll(options);
const findActiveContacts = (options = {}) =>
  Contact.findAll({
    ...options,
    where: { status: Contact.STATUS_ENABLED, ...options.where },
  });

const countActiveContacts = (options = {}) =>
  Contact.count({
    ...options,
    where: { status: Contact.STATUS_ENABLED, ...options.where },
  });

const findContact = (options = {}) => Contact.findOne(options);

const unsubscribeContactBySms = async (sms) => {
  const contact = await findContact({
    where: { phoneNumber: sms.From, status: Contact.STATUS_ENABLED },
  });

  if (!contact) {
    return false;
  }

  await contact.update({ status: Contact.STATUS_DISABLED });
  return true;
};

const getContactsOrder = (query) => {
  const fields = [
    'id',
    'phoneNumber',
    'emailAddress',
    'visitDate',
    'status',
    'createdAt',
  ];

  const order = [];
  if (query.order) {
    const [field, direction] = parseOrderParams(query.order);
    if (fields.includes(field)) {
      order.push([field, direction]);
    }
  }

  if (order.length === 0) {
    const [field, direction] = parseOrderParams(DEFAULT_ORDER);
    order.push([field, direction]);
  }

  return {
    order,
    param: stringifyOrderParams(order[0]),
  };
};

module.exports = {
  createContacts,
  destroyContacts,
  findContacts,
  findActiveContacts,
  countActiveContacts,
  findContact,
  unsubscribeContactBySms,
  getContactsOrder,
};
