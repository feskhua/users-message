require('dotenv').config({ path: `${__dirname}/../../.env` });

const twilio = require('twilio');

const {
  TWILIO_PHONE_NUMBER,
  TWILIO_ACCOUNT_SID,
  TWILIO_TOKEN,
  TWILIO_NOTIFY_SID,
  TWILIO_NOTIFICATION_CALLBACK,
} = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_TOKEN);

const sendMessage = (message, address) => {
  return client.messages.create({
    to: address,
    from: TWILIO_PHONE_NUMBER,
    body: message.body,
    statusCallback: `${TWILIO_NOTIFICATION_CALLBACK}/webhooks/messages/${
      message.id
    }/status`,
  });
};

const sendNotification = (notification, addresses) => {
  return client.notify.services(TWILIO_NOTIFY_SID).notifications.create({
    body: notification.message,
    toBinding: addresses.map((address) =>
      JSON.stringify({
        address,
        binding_type: 'sms',
      }),
    ),

    sms: {
      status_callback: `${TWILIO_NOTIFICATION_CALLBACK}/webhooks/notifications/${
        notification.id
      }/status`,
    },
  });
};

module.exports = {
  sendMessage,
  sendNotification,
};
