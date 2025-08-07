// services/excelReader.js
const xlsx = require('xlsx');
const jalaali = require('jalaali-js');
const fs = require('fs');

function convertJalaliToGregorian(jalaliDate) {
  if (!jalaliDate || typeof jalaliDate !== 'string') return null;
  const parts = jalaliDate.split('/');
  if (parts.length !== 3) return null;

  const jy = parseInt(parts[0], 10);
  const jm = parseInt(parts[1], 10);
  const jd = parseInt(parts[2], 10);

  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
  return `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`;
}

module.exports = function readExcel(filePath) {
  console.log('📁 فایل اکسل دریافت شد:', filePath);

  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });

  const checks = data.map((row) => {
    console.log('🔍 ردیف اکسل:', row);

    return {
      checkNumber: row['شماره \r\nچک'],
      contractType: row['نوع \r\nقرارداد'],
      floor: row['طبقه'],
      unit: row['واحد'],
      subject: row['موضوع'],
      nature: row['ماهیت'],
      dueYear: row['سال\r\nسررسید'],
dueDate: convertJalaliToGregorian(row['تاریخ سر رسید\r\n']),

      party: row['طرف مقابل'],
      amount: parseInt(row[' مبلغ '], 10),
      bankName: row['نام بانک'],
      phoneNumber: row['شماره تماس'], // اضافه شده
    };
  });

  fs.unlinkSync(filePath); // حذف فایل بعد از پردازش

  return checks;
};
