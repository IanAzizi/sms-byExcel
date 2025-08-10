// app.js
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const excelReader = require('./services/excelReader');
const { processOverdueChecks } = require('./services/reminder');

const app = express();
const upload = multer({ dest: 'uploads/' });
const cors = require('cors');
app.use(cors());



app.use(express.json());

// 📌 اتصال به MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 📌 مدل یوزر
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', UserSchema);

// 📌 ثبت‌نام
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'نام کاربری و رمز عبور الزامی است' });

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'کاربر قبلاً ثبت شده است' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'ثبت‌نام موفقیت‌آمیز بود', token });
  } catch (err) {
    res.status(500).json({ message: 'خطا در ثبت‌نام', error: err.message });
  }
});

// 📌 ورود
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'کاربر یافت نشد' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'رمز عبور اشتباه است' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'ورود موفقیت‌آمیز بود', token });
  } catch (err) {
    res.status(500).json({ message: 'خطا در ورود', error: err.message });
  }
});

// 📌 آپلود اکسل
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'فایل ارسال نشده است.' });

    const filePath = path.join(__dirname, req.file.path);
    console.log('📁 فایل اکسل دریافت شد:', filePath);

    const checks = await excelReader(filePath);
    await processOverdueChecks(checks);

    res.json({ success: true, checks });
  } catch (error) {
    console.error('خطا در endpoint آپلود:', error);
    res.status(500).json({ success: false, message: 'خطا در پردازش فایل' });
  }
});
app.get('/', (req, res) => {
  res.send('API سرور روشن است');
});
app.get('/sms-logs', async (req, res) => {
  try {
    // می‌تونی pagination هم اضافه کنی
    const logs = await SmsLog.find().sort({ sentAt: -1 }).limit(100);
    res.json({ success: true, logs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'خطا در دریافت گزارش پیامک‌ها' });
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
