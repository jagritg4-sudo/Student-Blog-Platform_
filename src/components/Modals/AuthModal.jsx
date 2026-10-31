import React, { useState, useEffect } from 'react';
import { AUTH_PERSONAS } from '../../data/initialData';

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenForgotPassword
}) {
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'register'

  // Sign In Form state
  const [loginIdentifier, setLoginIdentifier] = useState('23CS108 · 3rd Sem CSE');
  const [loginPassword, setLoginPassword] = useState('campus2026');
  const [showPassword, setShowPassword] = useState(false);

  // Register Form state
  const [regName, setRegName] = useState('');
  const [regRoll, setRegRoll] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regBranch, setRegBranch] = useState('CSE');
  const [regSem, setRegSem] = useState('3rd Sem');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regRole, setRegRole] = useState('Student');
  const [showRegPassword, setShowRegPassword] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePersonaClick = (personaKey) => {
    const persona = AUTH_PERSONAS[personaKey];
    if (persona) {
      onLoginSuccess(persona);
      onClose();
    }
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const val = loginIdentifier.trim() || 'Student';
    const name = val.includes('@') ? val.split('@')[0].replace('.', ' ') : val;
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'ST';

    const user = {
      id: val || 'user-' + Date.now(),
      name: name,
      roll: val,
      branch: '3rd Sem CSE',
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@campusconnect.edu`,
      initials: initials
    };

    onLoginSuccess(user);
    onClose();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (regPassword !== regConfirm) {
      alert("Passwords do not match!");
      return;
    }

    const initials = regName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'ST';

    const user = {
      id: regRoll.trim() || 'user-' + Date.now(),
      name: regName.trim(),
      roll: regRoll.trim(),
      branch: `${regSem} ${regBranch}`,
      email: regEmail.trim(),
      initials: initials,
      role: regRole
    };

    onLoginSuccess(user);
    onClose();
  };

  return (
    <div
      id="login-modal"
      className="modal-overlay active"
      role="dialog"
      aria-labelledby="login-modal-title"
      onClick={(e) => {
        if (e.target.id === 'login-modal') onClose();
      }}
    >
      <div className="modal-card auth-modal-card">
        <span className="modal-pin">📌</span>

        {/* Academic Crest / Top Strip */}
        <div className="auth-modal-top-strip">
          <div className="auth-crest-wrap">
            <span className="auth-crest-icon">🎓</span>
            <div>
              <div className="auth-crest-title">CampusConnect Academic Portal</div>
              <div className="auth-crest-sub">
                Single Sign-On (SSO) • Student Verified Access
              </div>
            </div>
          </div>
          <button
            id="login-modal-close"
            className="modal-close-btn"
            aria-label="Close modal"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Auth Tabs */}
        <div className="auth-tabs-row" role="tablist">
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
            onClick={() => setActiveTab('signin')}
            role="tab"
            aria-selected={activeTab === 'signin'}
          >
            <span>🎓</span> <span>Student Sign In</span>
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
            role="tab"
            aria-selected={activeTab === 'register'}
          >
            <span>📝</span> <span>New Registration</span>
          </button>
        </div>

        <div className="modal-body auth-modal-body">
          {activeTab === 'signin' ? (
            <div id="auth-panel-signin" className="auth-panel">
              {/* 1-Click Evaluation Personas */}
              <div className="auth-demo-personas">
                <div className="auth-demo-label">
                  ⚡ 1-Click Demo Profiles for Fast Evaluation:
                </div>
                <div className="demo-personas-grid">
                  <button
                    type="button"
                    className="demo-persona-card"
                    onClick={() => handlePersonaClick('aarav')}
                  >
                    <span className="dp-avatar">AS</span>
                    <div className="dp-info">
                      <strong className="dp-name">Aarav Sharma</strong>
                      <span className="dp-roll">3rd Sem CSE · Roll 23CS108</span>
                    </div>
                    <span className="dp-arrow">→</span>
                  </button>

                  <button
                    type="button"
                    className="demo-persona-card"
                    onClick={() => handlePersonaClick('priya')}
                  >
                    <span
                      className="dp-avatar"
                      style={{ background: 'var(--marigold-dark)' }}
                    >
                      PS
                    </span>
                    <div className="dp-info">
                      <strong className="dp-name">Priya Sharma</strong>
                      <span className="dp-roll">5th Sem IT · Top Writer</span>
                    </div>
                    <span className="dp-arrow">→</span>
                  </button>

                  <button
                    type="button"
                    className="demo-persona-card"
                    onClick={() => handlePersonaClick('rahul')}
                  >
                    <span className="dp-avatar" style={{ background: '#8A6FB0' }}>
                      RV
                    </span>
                    <div className="dp-info">
                      <strong className="dp-name">Rahul Verma</strong>
                      <span className="dp-roll">7th Sem ECE · Tech Lead</span>
                    </div>
                    <span className="dp-arrow">→</span>
                  </button>
                </div>
              </div>

              <div className="auth-divider">
                <span>or sign in with campus credentials</span>
              </div>

              <form onSubmit={handleSignInSubmit} className="auth-form-wrap">
                <div className="form-group">
                  <label className="form-label" htmlFor="login-email-input">
                    <span>Campus Email or Roll Number</span>
                    <small>e.g. 23CS108 or student@campusconnect.edu</small>
                  </label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">👤</span>
                    <input
                      type="text"
                      id="login-email-input"
                      className="form-input auth-input"
                      placeholder="23CS108 · 3rd Sem"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      required
                      autoComplete="username"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="login-password-input">
                    <span>Password</span>
                    <button
                      type="button"
                      className="auth-text-link"
                      onClick={() => {
                        onClose();
                        onOpenForgotPassword();
                      }}
                    >
                      Forgot password?
                    </button>
                  </label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">🔒</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="login-password-input"
                      className="form-input auth-input"
                      placeholder="Enter password (e.g. campus2026)"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="toggle-password-btn"
                      aria-label="Show password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div className="auth-options-row">
                  <label className="auth-checkbox-label">
                    <input type="checkbox" defaultChecked />
                    <span>Remember this device on campus</span>
                  </label>
                </div>

                <button
                  type="submit"
                  id="login-submit-btn"
                  className="btn btn-primary auth-submit-btn"
                >
                  <span>Sign In to CampusConnect</span> <span>🎓</span>
                </button>
              </form>
            </div>
          ) : (
            <div id="auth-panel-register" className="auth-panel">
              <form onSubmit={handleRegisterSubmit} className="auth-form-wrap">
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px'
                  }}
                >
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-name-input">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="reg-name-input"
                      className="form-input"
                      placeholder="e.g. Kabir Sethi"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                      maxLength={50}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-roll-input">
                      Roll Number / PRN *
                    </label>
                    <input
                      type="text"
                      id="reg-roll-input"
                      className="form-input"
                      placeholder="e.g. 23CS142"
                      value={regRoll}
                      onChange={(e) => setRegRoll(e.target.value)}
                      required
                      maxLength={20}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-email-input">
                    College Email *
                  </label>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">✉️</span>
                    <input
                      type="email"
                      id="reg-email-input"
                      className="form-input auth-input"
                      placeholder="kabir.sethi@campusconnect.edu"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 0.8fr',
                    gap: '12px'
                  }}
                >
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-branch-select">
                      Branch / Department
                    </label>
                    <select
                      id="reg-branch-select"
                      className="form-select"
                      value={regBranch}
                      onChange={(e) => setRegBranch(e.target.value)}
                    >
                      <option value="CSE">Computer Science (CSE)</option>
                      <option value="IT">Information Tech (IT)</option>
                      <option value="ECE">Electronics (ECE)</option>
                      <option value="AI/DS">AI & Data Science (AI/DS)</option>
                      <option value="Mech">Mechanical Engg (ME)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-sem-select">
                      Semester
                    </label>
                    <select
                      id="reg-sem-select"
                      className="form-select"
                      value={regSem}
                      onChange={(e) => setRegSem(e.target.value)}
                    >
                      <option value="3rd Sem">3rd Sem</option>
                      <option value="1st Sem">1st Sem</option>
                      <option value="2nd Sem">2nd Sem</option>
                      <option value="4th Sem">4th Sem</option>
                      <option value="5th Sem">5th Sem</option>
                      <option value="6th Sem">6th Sem</option>
                      <option value="7th Sem">7th Sem</option>
                      <option value="8th Sem">8th Sem</option>
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px'
                  }}
                >
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-password-input">
                      Password *
                    </label>
                    <div className="auth-input-wrapper">
                      <span className="auth-input-icon">🔒</span>
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        id="reg-password-input"
                        className="form-input auth-input"
                        placeholder="At least 6 chars"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        className="toggle-password-btn"
                        aria-label="Show password"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                      >
                        {showRegPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-confirm-password-input">
                      Confirm *
                    </label>
                    <div className="auth-input-wrapper">
                      <span className="auth-input-icon">🔑</span>
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        id="reg-confirm-password-input"
                        className="form-input auth-input"
                        placeholder="Repeat password"
                        value={regConfirm}
                        onChange={(e) => setRegConfirm(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-role-select">
                    Student Role
                  </label>
                  <select
                    id="reg-role-select"
                    className="form-select"
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                  >
                    <option value="Student">Student Learner 🎓</option>
                    <option value="Class Representative">
                      Class Representative (CR) 📋
                    </option>
                    <option value="Club Lead">Club / Society Organizer 🚀</option>
                  </select>
                </div>

                <button
                  type="submit"
                  id="reg-submit-btn"
                  className="btn btn-primary auth-submit-btn"
                >
                  <span>Create Campus Account & Sign In</span> <span>✨</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
