const { Router } = require('express');
const contactsRouter = require('./contacts');
const conversationsRouter = require('./conversations');
const notificationsRouter = require('./notifications');
const messagesRouter = require('./messages');
const smsRouter = require('./sms');

const router = Router();

router.use(contactsRouter);
router.use(conversationsRouter);
router.use(notificationsRouter);
router.use(messagesRouter);
router.use(smsRouter);

module.exports = router;
