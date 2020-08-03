/* eslint-disable camelcase */
const { Router } = require('express');
const { NOT_FOUND } = require('http-status-codes');
const { findContact } = require('../services/ContactService');

const router = Router();

router.get(
  ['/contacts/:contactId/inbound', '/contacts/:contactId/sms'],
  async (req, res) => {
    const { contactId } = req.params;
    const contact = await findContact({ where: { id: contactId } });
    if (!contact) {
      return res.status(NOT_FOUND).send('Contact not found');
    }

    const sms = await contact.getSms();
    return res.send(sms);
  },
);

module.exports = router;
