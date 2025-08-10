const axios = require('axios');
const qs = require('qs');
require('dotenv').config();
const SmsLog = require('../models/SmsLog'); // مسیر صحیح رو چک کن

async function sendTestSms({ receivers, message }) {
  const apiKey = process.env.SMS_API_KEY;
  const senderNumber = process.env.SMS_SENDER_NUMBER || 'auto';
  const url = process.env.SMS_URL;

  // اطمینان از اینکه receivers رشته است
  const receiversStr = Array.isArray(receivers) ? receivers.join(',') : receivers.toString();

  const data = {
    action: 'send',
    from: senderNumber,
    receivers: receiversStr,
    text: message,
  };

  console.log('📦 در حال ارسال:', data);

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

    // ذخیره موفقیت‌آمیز در دیتابیس
    await SmsLog.create({
      to: data.receivers,
      from: senderNumber,
      text: message,
      response: JSON.stringify(response.data),
      success: true,
      sentAt: new Date(),
    });

    return response.data;
  } catch (error) {
    const errMsg = error.response?.data || error.message || 'Unknown error';
    console.error('❌ خطا در ارسال پیامک:', errMsg);

    // ذخیره خطا در دیتابیس
    await SmsLog.create({
      to: data.receivers,
      from: senderNumber,
      text: message,
      response: typeof errMsg === 'object' ? JSON.stringify(errMsg) : errMsg,
      success: false,
      sentAt: new Date(),
    });

    throw error;
  }
}

module.exports = sendTestSms;
