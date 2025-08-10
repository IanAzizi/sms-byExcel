import React, { useEffect, useState } from 'react';

export default function SmsReport() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/sms-logs')
      .then(res => res.json())
      .then(data => {
        if (data.success) setLogs(data.logs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>در حال بارگذاری گزارش‌ها...</p>;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#eee' }}>
          <th style={{ padding: 8 }}>تاریخ</th>
          <th style={{ padding: 8 }}>شماره</th>
          <th style={{ padding: 8 }}>متن پیامک</th>
          <th style={{ padding: 8 }}>وضعیت</th>
        </tr>
      </thead>
      <tbody>
        {logs.map(log => (
          <tr key={log._id} style={{ backgroundColor: log.success ? '#d4edda' : '#f8d7da' }}>
            <td style={{ padding: 8 }}>{new Date(log.sentAt).toLocaleString('fa-IR')}</td>
            <td style={{ padding: 8 }}>{log.to}</td>
            <td style={{ padding: 8 }}>
              {log.text.length > 50 ? log.text.slice(0, 50) + '...' : log.text}
            </td>
            <td style={{ padding: 8 }}>{log.success ? 'ارسال موفق' : 'ارسال ناموفق'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
