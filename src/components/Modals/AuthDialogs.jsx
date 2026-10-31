import React, { useEffect, useState } from 'react';

export function SignOutConfirmModal({
  isOpen,
  onClose,
  currentUser,
  userStickyNotesCount,
  onSignOutKeepNotes,
  onSignOutDeleteNotes
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !currentUser) return null;

  return (
    <div
      id="signout-confirm-modal"
      className="modal-overlay active"
      role="dialog"
      aria-labelledby="signout-modal-title"
      onClick={(e) => {
        if (e.target.id === 'signout-confirm-modal') onClose();
      }}
    >
      <div className="modal-card" style={{ maxWidth: '440px' }}>
        <span className="modal-pin">📌</span>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-eyebrow">Session Management</span>
            <h2 className="modal-title" id="signout-modal-title">
              Sign Out Profile
            </h2>
          </div>
          <button
            id="signout-modal-close"
            className="modal-close-btn"
            aria-label="Close modal"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <div
            className="signout-summary-box"
            style={{
              padding: '12px 14px',
              background: 'var(--paper)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '14px'
            }}
          >
            <strong style={{ display: 'block', color: 'var(--ink)' }}>
              {currentUser.name} ({currentUser.branch || currentUser.roll})
            </strong>
            <span style={{ fontSize: '12.5px', color: 'var(--ink-soft)' }}>
              You currently have {userStickyNotesCount} note{userStickyNotesCount === 1 ? '' : 's'} on the corkboard.
            </span>
          </div>

          <p
            style={{
              fontSize: '13px',
              color: 'var(--ink-soft)',
              lineHeight: 1.5,
              margin: '0 0 16px'
            }}
          >
            Select how you want to handle notes and blogs published during this student session:
          </p>

          <div
            className="signout-actions-list"
            style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                onSignOutKeepNotes();
                onClose();
              }}
            >
              <span>🚪 Sign Out & Keep My Notes on Board</span>
            </button>

            <button
              type="button"
              className="btn btn-outline"
              style={{
                width: '100%',
                justifyContent: 'center',
                color: 'var(--rust)',
                borderColor: 'rgba(196,87,59,0.35)'
              }}
              onClick={() => {
                onSignOutDeleteNotes();
                onClose();
              }}
            >
              <span>🗑️ Sign Out & Delete My Profile Notes</span>
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function ForgotPasswordModal({ isOpen, onClose, onGeneratedToken }) {
  const [studentId, setStudentId] = useState('23CS108');

  if (!isOpen) return null;

  const handleGenerate = () => {
    if (!studentId.trim()) return;
    const token = 'CAMPUS-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    onGeneratedToken(studentId, token);
    onClose();
  };

  return (
    <div
      id="forgot-password-modal"
      className="modal-overlay active"
      role="dialog"
      onClick={(e) => {
        if (e.target.id === 'forgot-password-modal') onClose();
      }}
    >
      <div className="modal-card" style={{ maxWidth: '400px' }}>
        <span className="modal-pin">📌</span>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-eyebrow">Campus Security</span>
            <h2 className="modal-title" style={{ fontSize: '18px' }}>
              Password Recovery
            </h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <p
            style={{
              fontSize: '13px',
              color: 'var(--ink-soft)',
              lineHeight: 1.5,
              margin: '0 0 12px'
            }}
          >
            Enter your university student ID or roll number to generate a secure campus recovery token:
          </p>
          <div className="form-group" style={{ marginTop: '8px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. 23CS108 or student@campusconnect.edu"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '12px' }}
            onClick={handleGenerate}
          >
            Generate Reset Token 🔑
          </button>
        </div>
      </div>
    </div>
  );
}
