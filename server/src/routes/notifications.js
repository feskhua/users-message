const { Router } = require('express');
const { INTERNAL_SERVER_ERROR, NOT_FOUND } = require('http-status-codes');
const logger = require('../base/logger');
const { sendNotification } = require('../services/TwilioService');
const { findContacts, findContact } = require('../services/ContactService');
const {
  findNotifications,
  createNotification,
} = require('../services/NotificationService');

const router = Router();

router.get('/contacts/:contactId/notification-messages', async (req, res) => {
  const { contactId } = req.params;
  const contact = await findContact({
    where: { id: contactId },
    include: [
      {
        association: 'notificationMessages',
        include: [
          {
            association: 'notification',
          },
        ],
      },
    ],
  });

  if (!contact) {
    return res.status(NOT_FOUND).send('Contact not found');
  }

  return res.send(contact.notificationMessages);
});

router.get('/notifications', async (req, res) => {
  const notifications = await findNotifications();
  res.send(notifications);
});

router.post('/notifications', async (req, res) => {
  const { message, contacts: ids } = req.body;
  try {
    const contacts = await findContacts({ where: { id: ids } });
    const notification = await createNotification({
      message,
    });

    const { sid, accountSid, serviceSid, dateCreated } = await sendNotification(
      notification,
      contacts.map((contact) => contact.phoneNumber),
    );

    await notification.update({
      sid,
      accountSid,
      serviceSid,
      dateCreated,
    });

    return res.send(notification);
  } catch (e) {
    logger.error(e);
    return res.status(INTERNAL_SERVER_ERROR).send(e.message);
  }
});

module.exports = router;
