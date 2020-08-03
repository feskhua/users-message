/* eslint-disable camelcase */
const { Router } = require('express');
const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
  NO_CONTENT,
} = require('http-status-codes');
const logger = require('../base/logger');
const { getPagination, parseCsv } = require('../utils');
const {
  createContacts,
  destroyContacts,
  findActiveContacts,
  countActiveContacts,
  findContact,
  getContactsOrder,
} = require('../services/ContactService');

const router = Router();

router.get('/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const contact = await findContact({ where: { id: contactId } });
  if (!contact) {
    return res.status(NOT_FOUND).send('Contact not found');
  }

  return res.send(contact);
});

router.get('/contacts', async (req, res) => {
  const { limit, offset } = getPagination(req.query);
  const { order, param } = getContactsOrder(req.query);
  const contacts = await findActiveContacts({
    limit,
    offset,
    order,
  });

  const total = await countActiveContacts();
  res.send({
    data: contacts,
    order: param,
    pagination: {
      limit,
      offset,
      total,
    },
  });
});

router.post('/csv', async (req, res) => {
  if (!req.files || !req.files.csv) {
    return res.status(BAD_REQUEST).send('Csv file');
  }

  try {
    const rows = await parseCsv(req.files.csv.tempFilePath);
    const contacts = rows.map(
      ({
        visit_date,
        phone_number,
        email_address,
        prospect_name,
        product_name,
      }) => ({
        visitDate: visit_date,
        phoneNumber: phone_number,
        emailAddress: email_address,
        prospectName: prospect_name,
        productName: product_name,
      }),
    );

    const models = await createContacts(contacts);
    return res.send(models);
  } catch (e) {
    logger.error(e);
    return res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }
});

router.delete('/contacts', async (req, res) => {
  const { ids } = req.body;
  await destroyContacts({ where: { id: ids } });
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
