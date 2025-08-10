import React, { useState } from 'react';
import Sidebar from './Sidebar';
import UploadSection from './UploadSection';
import ReportsSection from './ReportsSection';
import './index.css';
export default function DashboardPage({ username, token, onLogout }) {
  const [currentSection, setCurrentSection] = useState('upload');

  return (
    <div style={styles.wrapper}>
      <div style={styles.contentArea}>
        <header style={styles.header}>
          <h2 style={styles.title}>داشبورد</h2>
          <button onClick={onLogout} style={styles.logoutBtn}>خروج</button>
        </header>

        {currentSection === 'upload' && <UploadSection token={token} />}
        {currentSection === 'reports' && <ReportsSection />}
      </div>

      <Sidebar currentSection={currentSection} setCurrentSection={setCurrentSection} />
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#edf2f7',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  contentArea: {
    flex: 1,
    padding: 30,
    marginRight: 240,
    maxWidth: 'calc(100% - 240px)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2d3748',
  },
  logoutBtn: {
    padding: '10px 25px',
    backgroundColor: '#e53e3e',
    border: 'none',
    borderRadius: 12,
    color: 'white',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
