const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

async function sendTestSms({ receivers, message }) {
  const apiKey = process.env.SMS_API_KEY;
  const senderNumber = process.env.SMS_SENDER_NUMBER || 'auto';
  const url = process.env.SMS_URL;

  const data = {
    action: 'send',
    from: senderNumber,
    receivers: typeof receivers === 'string' ? receivers : receivers.toString(),
    text: message,
  };

  console.log('📦 در حال ارسال:', data); // برای دیباگ

  try {
    const response = await axios.post(url, qs.stringify(data), {
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('📨 پیامک ارسال شد:', {
      to: data.receivers,
      from: senderNumber,
      text: message,
      response: response.data,
    });

    return response.data;
  } catch (error) {
    console.error('❌ خطا در ارسال پیامک:', error.response?.data || error.message || error);
    throw error;
  }
}

module.exports = sendTestSms;
