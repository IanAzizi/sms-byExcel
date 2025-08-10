import React from 'react';
import './index.css';
export default function Sidebar({ currentSection, setCurrentSection }) {
  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
  <img src="https://anamissazan.com/images/anamis.png" alt="لوگو بندرعباس مال" style={{ width: '100%', height: 'auto' }} />
</div>
      <nav style={styles.nav}>
        <button
          style={currentSection === 'upload' ? {...styles.btn, ...styles.activeBtn} : styles.btn}
          onClick={() => setCurrentSection('upload')}
        >
          آپلود و ارسال اس ام اس
        </button>
        {/* <button
          style={currentSection === 'reports' ? {...styles.btn, ...styles.activeBtn} : styles.btn}
          onClick={() => setCurrentSection('reports')}
        >
          گزارش پیامک‌ها
        </button> */}
      </nav>
    </div>
  );
}

const styles = {

  sidebar: {
    width: 240,
    backgroundColor: '#1a202c', // خیلی تیره و مدرن
    color: 'white',
    height: '100vh',
    padding: 30,
    boxSizing: 'border-box',
    position: 'fixed',
    right: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
   
 // fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: 'rgba(0, 0, 0, 0.3) -5px 0px 15px -5px',
  },
  logo: {
    marginBottom: 50,
    fontWeight: '900',
    fontSize: 22,
    letterSpacing: 2,
    userSelect: 'none',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  btn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#a0aec0',
    padding: '15px 25px',
    textAlign: 'right',
    cursor: 'pointer',
    fontSize: 11.5,
    marginBottom: 16,
    borderRadius: 12,
    transition: 'all 0.3s ease',
    fontWeight: '600',
    boxShadow: 'inset 0 0 0 0 #667eea',
  },
  activeBtn: {
    color: 'white',
    backgroundColor: '#667eea',
    boxShadow: 'inset 5px 0 15px 0 #764ba2',
    fontWeight: '700',
    transform: 'scale(1.05)',
  },
};
