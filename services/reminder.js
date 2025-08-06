const dayjs = require('dayjs');
const sendSMS = require('./smsSender');

const CUTOFF_DATE = dayjs('2025-08-06');

async function processOverdueChecks(checks) {
  for (const check of checks) {
    console.log(`⏳ بررسی چک شماره ${check.checkNumber} با تاریخ: ${check.dueDate}`);

    const due = dayjs(check.dueDate);

    if (!due.isValid()) {
      console.log('⚠️ تاریخ نامعتبره، رد می‌شه');
      continue;
    }

    if (due.isBefore(CUTOFF_DATE)) {
      if (!check.phoneNumber) {
        console.warn(`⚠️ شماره تماس برای چک ${check.checkNumber} موجود نیست`);
        continue;
      }

const message = `❗️مستاجر گرامی: ضمن اعلام عدم وصول چک سریال شماره ${check.checkNumber} مربوط به اجاره مغازه شماره ${check.unit} در مجتمع بندرعباس مال، لطفاً برای جلوگیری از اقدام قضایی، وجه چک را حداکثر تا تاریخ ۱۴۰۴.۰۵.۲۸ کارسازی و مراتب را به مدیریت مالی مجتمع اعلام نمایید.`;

      console.log('🚨 چک عقب‌افتاده است، ارسال پیامک...');
      console.log('📤 ارسال پیامک به:', check.phoneNumber);

      await sendSMS({
        message,
        receivers: [String(check.phoneNumber)],
      });
    } else {
      console.log('✅ چک هنوز سررسید نشده، پیام ارسال نمی‌شود.');
    }
  }

  console.log('✅ بررسی همه چک‌ها به پایان رسید.');
}

module.exports = processOverdueChecks;
