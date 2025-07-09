"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCertificates, selectCertificate } from '../../../slices/certificatesSlice';
import styles from "./Certificates.module.css"
import Header from "../header/Header"
import CertificateTemplate from "./CertificateTemplate"
import CertificateCard from "./CertificateCard"
import html2pdf from "html2pdf.js"
import CertificatesSkeleton from "./CertificateSkeleton"

const earnedCertificates = [
  {
    examName: "React Basics",
    certificateName: "React Basics Completion",
    dateIssued: "2025-04-15",
    issuer: "Open Learning Academy",
    description: "Certificate awarded for completion of the React Basics course.",
    color: "#61dafb",
    icon: "code",
  },
  {
    examName: "Python Fundamentals",
    certificateName: "Python Fundamentals Certificate",
    dateIssued: "2025-03-10",
    issuer: "Open Learning Academy",
    description: "Certificate awarded for proficiency in Python Fundamentals.",
    color: "#3776ab",
    icon: "code",
  },
  {
    examName: "Data Science Essentials",
    certificateName: "Data Science Essentials Certificate",
    dateIssued: "2025-05-05",
    issuer: "Data Institute",
    description: "Successfully demonstrated skills in Data Science essentials.",
    color: "#4ecdc4",
    icon: "analytics",
  },
]

const Certificates = () => {
  const certificates = useSelector((state) => state.certificates.certificates);
  const selectedCertificate = useSelector((state) => state.certificates.selectedCertificate);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [downloadCert, setDownloadCert] = useState(null)
  const templateRef = useRef()

  const filteredCertificates = earnedCertificates.filter(
    (cert) =>
      cert.certificateName.toLowerCase().includes(search.toLowerCase()) ||
      cert.examName.toLowerCase().includes(search.toLowerCase()),
  )

  const handleViewCertificate = (cert) => {
    dispatch(selectCertificate(cert))
  }

  const closeModal = () => {
    dispatch(selectCertificate(null))
  }

  const generatePdf = (cert, filename) => {
    if (!templateRef.current) return

    const options = {
      margin: 0.5,
      filename: filename || `${cert.certificateName.replace(/\s+/g, "_")}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    }

    html2pdf().set(options).from(templateRef.current).save()
  }

  const handleDownloadFromModal = () => {
    if (!selectedCertificate) return
    generatePdf(selectedCertificate)
  }

  const handleDownloadFromList = (cert) => {
    setDownloadCert(cert)
  }

  useEffect(() => {
    if (downloadCert) {
      generatePdf(downloadCert)
      setDownloadCert(null)
    }
  }, [downloadCert])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <CertificatesSkeleton />

  return (
    <>
      <div className={styles.certificatesContainer}>
        <div className={styles.mainContent}>
          {/* Header Component */}
          <Header />
          <div className={styles.contentWrapper}>
            {/* Certificates Banner */}
            <div className={styles.certificatesBanner}>
              <div className={styles.bannerContent}>
                <h1 className={styles.bannerTitle}>Your Achievement Certificates</h1>
                <p className={styles.bannerText}>
                  View, download, and share your earned certificates. Showcase your accomplishments and skills to the
                  world.
                </p>
              </div>
              <div className={styles.bannerImage}>
                <img
                  src="/images/student-dashboard-banner.png?height=200&width=300"
                  alt="Certificates illustration"
                  className={styles.bannerImg}
                  draggable={false}
                />
              </div>
            </div>

            {/* Search Section */}
            <div className={styles.searchSection}>
              <div className={styles.searchContainer}>
                <span className="material-icons">search</span>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search certificates by exam or certificate name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Certificates Stats */}
            <div className={styles.statsContainer}>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ color: "#10b981" }}>
                  <span className="material-icons">workspace_premium</span>
                </div>
                <div className={styles.statValue}>{earnedCertificates.length}</div>
                <div className={styles.statLabel}>Certificates Earned</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ color: "#3b82f6" }}>
                  <span className="material-icons">school</span>
                </div>
                <div className={styles.statValue}>{new Set(earnedCertificates.map((cert) => cert.examName)).size}</div>
                <div className={styles.statLabel}>Courses Completed</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ color: "#f59e0b" }}>
                  <span className="material-icons">calendar_today</span>
                </div>
                <div className={styles.statValue}>2025</div>
                <div className={styles.statLabel}>Latest Year</div>
              </div>
            </div>

            {/* Certificates List */}
            <div className={styles.certificatesSection}>
              <h2 className={styles.sectionTitle}>Your Earned Certificates</h2>
              <div className={styles.certificatesList}>
                {filteredCertificates.length > 0 ? (
                  filteredCertificates.map((cert, idx) => (
                    <CertificateCard
                      key={idx}
                      cert={cert}
                      onView={handleViewCertificate}
                      onDownload={handleDownloadFromList}
                    />
                  ))
                ) : (
                  <div className={styles.noCertificates}>
                    <span className="material-icons">info</span>
                    <span>No certificates found matching your search.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offscreen certificate template for PDF generation */}
      <div style={{ position: "fixed", top: "-9999px", left: "-9999px", pointerEvents: "none" }}>
        {downloadCert && (
          <div className="pdfMode">
            <CertificateTemplate ref={templateRef} cert={downloadCert} />
          </div>
        )}
        {!downloadCert && selectedCertificate && (
          <div className="pdfMode">
            <CertificateTemplate ref={templateRef} cert={selectedCertificate} />
          </div>
        )}
      </div>

      {/* Modal for viewing certificate */}
      {selectedCertificate && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal} aria-label="Close modal">
              <span className="material-icons">close</span>
            </button>
            <CertificateTemplate ref={templateRef} cert={selectedCertificate} />
            <div className={styles.modalActions}>
              <button className={styles.modalDownloadBtn} onClick={handleDownloadFromModal}>
                <span className="material-icons">download</span>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Certificates
