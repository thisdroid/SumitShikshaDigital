import React from 'react';
import './PartnerCollab.css';

const PartnerCollab = () => {
  return (
    <div className="partner-collab-section">
      <div className="partner-collab-header">
        <h2>
          Trusted by <span className="partner-highlight">Industry Leaders</span>
        </h2>
        <p className="partner-subtext">
          We're proud to partner with organizations that share our commitment to excellence
        </p>
      </div>
      <div className="partner-logo-grid">
        <div className="partner-logo-wrapper">
          <img
            src="/collaboration2.png"
            alt="MSME Logo"
            className="partner-logo-img"
          />
        </div>
      </div>
    </div>
  );
};

export default PartnerCollab;
