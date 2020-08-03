const { Router } = require('express');
const { NO_CONTENT } = require('http-status-codes');
const logger = require('../base/logger');
const { findMessage } = require('../services/MessageService');
const { findNotification } = require('../services/NotificationService');
const { unsubscribeContactBySms } = require('../services/ContactService');
const {
  createNotificationMessage,
  findNotificationMessage,
} = require('../services/NotificationMessageService');

const {
  createMessageStatus,
  findMessageStatus,
} = require('../services/MessageStatusService');

const { createSms, isUnsubscribeSms } = require('../services/SmsService');

const router = Router();

router.post('/notifications/:notificationId/status', async (req, res) => {
  const { notificationId } = req.params;
  const notification = await findNotification({
    where: { id: notificationId },
  });

  if (notification) {
    const {
      ErrorCode,
      SmsSid,
      SmsStatus,
      MessageStatus,
      To,
      MessagingServiceSid,
      MessageSid,
      AccountSid,
      From,
      ApiVersion,
    } = req.body;

    const notificationMessage = await findNotificationMessage({
      where: { notificationId, From, To },
    });

    if (notificationMessage) {
      notificationMessage.update({
        ErrorCode,
        SmsSid,
        SmsStatus,
        MessageStatus,
        To,
        MessagingServiceSid,
        MessageSid,
        AccountSid,
        From,
        ApiVersion,
      });
    } else {
      await createNotificationMessage(notification, {
        ErrorCode,
        SmsSid,
        SmsStatus,
        MessageStatus,
        To,
        MessagingServiceSid,
        MessageSid,
        AccountSid,
        From,
        ApiVersion,
      });
    }
  }

  res.sendStatus(NO_CONTENT);
});

router.post('/messages/:messageId/status', async (req, res) => {
  const { messageId } = req.params;
  const message = await findMessage({
    where: { id: messageId },
  });

  if (message) {
    const {
      ErrorCode,
      SmsSid,
      SmsStatus,
      MessageStatus,
      To,
      MessagingServiceSid,
      MessageSid,
      AccountSid,
      From,
      ApiVersion,
    } = req.body;

    const messageStatus = await findMessageStatus({
      where: { messageId, From, To },
    });

    if (messageStatus) {
      messageStatus.update({
        ErrorCode,
        SmsSid,
        SmsStatus,
        MessageStatus,
        To,
        MessagingServiceSid,
        MessageSid,
        AccountSid,
        From,
        ApiVersion,
      });
    } else {
      await createMessageStatus(message, {
        ErrorCode,
        SmsSid,
        SmsStatus,
        MessageStatus,
        To,
        MessagingServiceSid,
        MessageSid,
        AccountSid,
        From,
        ApiVersion,
      });
    }
  }

  res.sendStatus(NO_CONTENT);
});

router.post('/request', async (req, res) => {
  const {
    ToCountry,
    ToState,
    SmsMessageSid,
    NumMedia,
    ToCity,
    FromZip,
    SmsSid,
    FromState,
    SmsStatus,
    FromCity,
    Body,
    FromCountry,
    To,
    MessagingServiceSid,
    ToZip,
    NumSegments,
    MessageSid,
    AccountSid,
    From,
    ApiVersion,
  } = req.body;

  const sms = await createSms({
    ToCountry,
    ToState,
    SmsMessageSid,
    NumMedia,
    ToCity,
    FromZip,
    SmsSid,
    FromState,
    SmsStatus,
    FromCity,
    Body,
    FromCountry,
    To,
    MessagingServiceSid,
    ToZip,
    NumSegments,
    MessageSid,
    AccountSid,
    From,
    ApiVersion,
  });

  if (isUnsubscribeSms(sms)) {
    await unsubscribeContactBySms(sms);
  }

  res.sendStatus(NO_CONTENT);
});

router.post('/status', (req, res) => {
  logger.info('/status', req.body);
  res.sendStatus(NO_CONTENT);
});

router.post('/fallback', (req, res) => {
  logger.info('/fallback', req.body);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
