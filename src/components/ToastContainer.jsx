import React from 'react';

export default function ToastContainer({ toasts }) {
  return (
    <div id="toast-container" className="toast-container" aria-live="polite">
      {toasts.map(toast => (
        <div key={toast.id} className="toast show">
          <span className="toast-icon">{toast.icon || '📌'}</span>
          <span className="toast-text">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
