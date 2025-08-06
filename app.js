require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');

const excelReader = require('./services/excelReader');
const processOverdueChecks = require('./services/reminder');

const app = express();

const upload = multer({ dest: 'uploads/' });

app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'فایل ارسال نشده است.' });
    }

    const filePath = path.join(__dirname, req.file.path);
console.log('📁 فایل اکسل دریافت شد:', filePath);

    const checks = await excelReader(filePath);

    await processOverdueChecks(checks);

    return res.json({ success: true, checks });
  } catch (error) {
    console.error('خطا در endpoint آپلود:', error);
    return res.status(500).json({ success: false, message: 'خطا در پردازش فایل' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
