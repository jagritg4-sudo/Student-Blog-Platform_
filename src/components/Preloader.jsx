import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("📌 Pinning ideas to the corkboard...");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const DURATION = 2200; // Fast and snappy loading for dev / evaluation
    let startTimestamp = null;

    const statusMessages = [
      { threshold: 0, text: "📌 Pinning ideas to the corkboard..." },
      { threshold: 30, text: "📝 Loading trending student blogs..." },
      { threshold: 65, text: "👥 Connecting campus authors & projects..." },
      { threshold: 90, text: "✨ Welcome to CampusConnect!" }
    ];

    let animationFrameId;

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const currentProgress = Math.min(elapsed / DURATION, 1);
      const percentage = Math.floor(currentProgress * 100);

      setProgress(percentage);

      for (let i = statusMessages.length - 1; i >= 0; i--) {
        if (percentage >= statusMessages[i].threshold) {
          setStatusText(statusMessages[i].text);
          break;
        }
      }

      if (currentProgress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => {
            setIsHidden(true);
            if (onComplete) onComplete();
          }, 500);
        }, 150);
      }
    }

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <div
      id="preloader"
      className={`preloader ${isLoaded ? 'loaded' : ''}`}
      role="progressbar"
      aria-label="Loading CampusConnect"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={progress}
    >
      <div className="preloader-card">
        <div className="preloader-pin-wrapper">
          <span className="preloader-pin" aria-hidden="true">📌</span>
        </div>
        <div className="preloader-tag">Campus Corkboard</div>
        <div className="preloader-brand">CampusConnect</div>
        <div className="preloader-eyebrow">— the campus corkboard, digitized —</div>
        <div className="preloader-divider"></div>

        <div className="preloader-bar-container">
          <div className="preloader-track">
            <div className="preloader-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="preloader-meta">
            <span className="preloader-status">{statusText}</span>
            <span className="preloader-percent">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
