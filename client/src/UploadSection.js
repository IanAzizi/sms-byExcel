import React, { useState } from 'react';
import './index.css';
export default function UploadSection({ token }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file) {
      setMessage('لطفاً یک فایل اکسل انتخاب کنید.');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setMessage('✅ فایل با موفقیت آپلود و پیامک‌ها ارسال شدند.');
      } else {
        setMessage('❌ خطا در ارسال فایل: ' + (data.message || ''));
      }
    } catch (err) {
      setMessage('❌ خطا در ارسال فایل.');
    }
    setLoading(false);
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>آپلود فایل اکسل و ارسال پیامک</h3>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={e => setFile(e.target.files[0])}
        style={styles.fileInput}
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        style={loading ? {...styles.button, ...styles.disabled} : styles.button}
      >
        {loading ? 'در حال ارسال...' : 'ارسال پیامک'}
      </button>
      <p style={message.startsWith('✅') ? styles.successMsg : styles.errorMsg}>{message}</p>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    backgroundColor: '#f7fafc',
    borderRadius: 15,
    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
    maxWidth: 500,
  },
  title: {
    marginBottom: 20,
    color: '#2d3748',
    fontWeight: '700',
    fontSize: 24,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  fileInput: {
    display: 'block',
    marginBottom: 20,
    fontSize: 16,
    cursor: 'pointer',
  },
  button: {
    backgroundColor: '#667eea',
    color: 'white',
    padding: '12px 25px',
    border: 'none',
    borderRadius: 12,
    fontWeight: '600',
    fontSize: 16,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  disabled: {
    backgroundColor: '#a0aec0',
    cursor: 'not-allowed',
  },
  successMsg: {
    marginTop: 15,
    color: '#38a169',
    fontWeight: '700',
  },
  errorMsg: {
    marginTop: 15,
    color: '#e53e3e',
    fontWeight: '700',
  },
};
