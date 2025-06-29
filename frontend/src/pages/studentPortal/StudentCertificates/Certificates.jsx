import React, { useState, useRef, useEffect } from 'react';
import styles from './Certificates.module.css';
import CertificateTemplate from './CertificateTemplate';
import html2pdf from 'html2pdf.js';

const earnedCertificates = [
  {
    examName: 'React Basics',
    certificateName: 'React Basics Completion',
    dateIssued: '2025-04-15',
    issuer: 'Open Learning Academy',
    description: 'Certificate awarded for completion of the React Basics course.',
  },
  {
    examName: 'Python Fundamentals',
    certificateName: 'Python Fundamentals Certificate',
    dateIssued: '2025-03-10',
    issuer: 'Open Learning Academy',
    description: 'Certificate awarded for proficiency in Python Fundamentals.',
  },
  {
    examName: 'Data Science Essentials',
    certificateName: 'Data Science Essentials Certificate',
    dateIssued: '2025-05-05',
    issuer: 'Data Institute',
    description: 'Successfully demonstrated skills in Data Science essentials.',
  },
];

const Certificates = () => {
  const [search, setSearch] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);
  // To keep track of the certificate user wants to download from list
  const [downloadCert, setDownloadCert] = useState(null);

  const templateRef = useRef();

  const filteredCertificates = earnedCertificates.filter(cert =>
    cert.certificateName.toLowerCase().includes(search.toLowerCase()) ||
    cert.examName.toLowerCase().includes(search.toLowerCase())
  );

  // Modal open/close handlers
  const handleViewCertificate = (cert) => {
    setSelectedCert(cert);
  };

  const closeModal = () => {
    setSelectedCert(null);
  };

  // Generates PDF from the offscreen certificate template
  const generatePdf = (cert, filename) => {
    if (!templateRef.current) return;

    const options = {
      margin: 0.5,
      filename: filename || `${cert.certificateName.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' },
    };

    html2pdf().set(options).from(templateRef.current).save();
  };

  // Downloads triggered from modal button (certificate displayed)
  const handleDownloadFromModal = () => {
    if (!selectedCert) return;
    generatePdf(selectedCert);
  };

  // Downloads triggered from list button -- set downloadCert to the item
  const handleDownloadFromList = (cert) => {
    setDownloadCert(cert);
  };

  // When downloadCert changes (button clicked outside modal), trigger PDF generation
  useEffect(() => {
    if (downloadCert) {
      // Trigger PDF generation - certificate template offscreen will update via render
      generatePdf(downloadCert);
      setDownloadCert(null); // reset this state so user can download again
    }
  }, [downloadCert]);

  return (
    <>
      <div className={styles.certificatesWrapper}>
        <div className={`${styles.headerBackground} ${styles.theme}`}>
          <div className={styles.header}>
            <h1 className={styles.title}>Certificates</h1>
          </div>
        </div>

        <div className={styles.searchBarWrapper}>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search certificates by exam or certificate name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.divider} />

        <h2 className={styles.sectionHeading}>Your Earned Certificates</h2>
        <div className={styles.certificatesList}>
          {filteredCertificates.length > 0 ? (
            filteredCertificates.map((cert, idx) => (
              <div key={idx} className={styles.certificateCard}>
                <div className={styles.certificateInfo}>
                  <h3 className={styles.certificateName}>{cert.certificateName}</h3>
                  <p className={styles.examName}>Exam: {cert.examName}</p>
                  <p className={styles.dateIssued}>Date Issued: {cert.dateIssued}</p>
                  <p className={styles.description}>{cert.description}</p>
                  <p className={styles.issuer}>Issued by: {cert.issuer}</p>
                </div>
                <div className={styles.certificateActions}>
                  <button
                    className={styles.viewBtn}
                    onClick={() => handleViewCertificate(cert)}
                  >
                    View Certificate
                  </button>
                  <button
                    className={styles.downloadBtnList}
                    onClick={() => handleDownloadFromList(cert)}
                  >
                    Download Certificate
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noCertificates}>No certificates found.</div>
          )}
        </div>
      </div>

      {/* Offscreen hidden certificate template used for PDF generation from list button */}
      {/* Render but hide it so html2pdf can capture its content */}
      <div style={{ position: 'fixed', top: '-9999px', left: '-9999px', pointerEvents: 'none' }}>
        {downloadCert && (
          <div className="pdfMode">
            <CertificateTemplate ref={templateRef} cert={downloadCert} />
          </div>
        )}
        {!downloadCert && selectedCert && (
          <div className="pdfMode">
            <CertificateTemplate ref={templateRef} cert={selectedCert} />
          </div>
        )}
      </div>

      {/* Modal for viewing certificate and downloading */}
      {selectedCert && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal} aria-label="Close modal">&times;</button>
            <CertificateTemplate ref={templateRef} cert={selectedCert} />
            <div className={styles.modalActions}>
              <button className={styles.downloadBtn} onClick={handleDownloadFromModal}>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Certificates;
