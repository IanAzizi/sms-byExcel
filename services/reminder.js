const moment = require('moment-jalaali');
const sendTestSms = require('./smsSender');

async function processCheck(check) {
  const checkDateJalali = check.dueDate;
  const checkNumber = check.checkNumber;
  const unit = check.unit;
  const phone = check.phoneNumber;

  const checkDate = moment(checkDateJalali, 'YYYY-MM-DD');
  const today = moment(moment().format('jYYYY/jMM/jDD'), 'jYYYY/jMM/jDD');

  const daysRemaining = checkDate.diff(today, 'days');

  console.log(`⏳ بررسی چک شماره ${checkNumber} - باقی‌مانده: ${daysRemaining} روز`);

  let message = null;

if (daysRemaining === 10) {
  message = `مستأجر گرامی: ضمن اعلام عدم وصول چک سریال شماره ${checkNumber} مربوط به اجاره مغازه شماره ${unit} در مجتمع بندرعباس مال، لطفاً برای جلوگیری از اقدام قضایی و فسخ قرارداد ${unit}، وجه چک را حداکثر تا ۱۰ روز آینده در حساب کارسازی و مراتب را به مدیریت مالی اعلام نمایید. بندرعباس مال`;
} else if (daysRemaining === 5) {
  message = `مستأجر گرامی: ضمن اعلام عدم وصول چک سریال شماره ${checkNumber} مربوط به اجاره مغازه شماره ${unit} در مجتمع بندرعباس مال، لطفاً برای جلوگیری از اقدام قضایی و فسخ قرارداد ${unit}، وجه چک را حداکثر تا ۵ روز آینده در حساب کارسازی و مراتب را به مدیریت مالی اعلام نمایید. بندرعباس مال`;
} else if (daysRemaining === 3) {
  message = `مستأجر گرامی: ضمن اعلام عدم وصول چک سریال شماره ${checkNumber} مربوط به اجاره مغازه شماره ${unit} در مجتمع بندرعباس مال، لطفاً برای جلوگیری از اقدام قضایی و فسخ قرارداد ${unit}، وجه چک را حداکثر تا ۳ روز آینده در حساب کارسازی و مراتب را به مدیریت مالی اعلام نمایید. بندرعباس مال`;
} else if (daysRemaining < 0) {
    message = `❗️مستاجر گرامی، ضمن اعلام عدم وصول چک سریال شماره ${checkNumber} مربوط به اجاره مغازه شماره ${unit} در مجتمع بندرعباس مال، لطفاً برای جلوگیری از اقدام قضایی، وجه چک را حداکثر تا تاریخ ۱۴۰۴.۰۵.۲۸ کارسازی و مراتب را به مدیریت مالی مجتمع اعلام نمایید.`;
  }

  if (message && phone) {
    console.log(`📤 ارسال پیامک به ${phone}`);
    await sendTestSms({
      receivers: [String(phone)],
      message,
    });
  } else if (!phone) {
    console.warn(`⚠️ شماره تماس برای چک ${checkNumber} تعریف نشده.`);
  }
}

async function processOverdueChecks(checks) {
  for (const check of checks) {
    await processCheck(check);
  }
}

module.exports = {
  processOverdueChecks,
};
