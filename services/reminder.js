const moment = require('moment-jalaali');
const sendTestSms = require('./smsSender');

// پردازش یک چک
async function processCheck(check) {
  const checkDateJalali = check.dueDate; // تاریخ میلادی، تبدیل‌شده
  const checkNumber = check.checkNumber;
  const unit = check.unit;
  const phone = check.phoneNumber;

  const checkDate = moment(checkDateJalali, 'YYYY-MM-DD');
  const today = moment();

  const daysRemaining = checkDate.diff(today, 'days');

  console.log(`⏳ بررسی چک شماره ${checkNumber} - باقی‌مانده: ${daysRemaining} روز`);

  let message = null;

  if (daysRemaining === 10) {
    message = `مستاجر گرامی، فقط ۱۰ روز تا تاریخ سررسید چک شماره ${checkNumber} مربوط به اجاره مغازه شماره ${unit} در مجتمع بندرعباس مال باقی مانده است. لطفاً برای جلوگیری از مشکل، وجه چک را تا تاریخ ۱۴۰۴.۰۵.۲۸ پرداخت نمایید.`;
  } else if (daysRemaining === 5) {
    message = `مستاجر گرامی، فقط ۵ روز تا سررسید چک شماره ${checkNumber} باقی مانده است. لطفاً برای اجتناب از اقدامات بعدی، وجه مربوطه را در اسرع وقت پرداخت نمایید.`;
  } else if (daysRemaining === 3) {
    message = `مستاجر گرامی، تنها ۳ روز تا سررسید چک شماره ${checkNumber} باقیمانده است. لطفاً پرداخت را در اولویت قرار دهید.`;
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

// پردازش همه چک‌ها
async function processOverdueChecks(checks) {
  for (const check of checks) {
    await processCheck(check);
  }
}

module.exports = {
  processOverdueChecks,
};
