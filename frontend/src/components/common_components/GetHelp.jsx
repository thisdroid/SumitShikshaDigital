import { useState } from "react"
import styles from "./GetHelp.module.css"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
import Profile from '../../pages/studentPortal/Profile_icon/Profile'
export default function GetHelp() {
  const [expandedFAQ, setExpandedFAQ] = useState(null)

  const faqData = [
    {
      id: 1,
      question: "Refund Status: Common Questions",
      answer:
        "Refunds are typically processed within 5-10 business days. You can check your refund status in your account settings under 'Purchase History'. If you don't see your refund after 10 business days, please contact our support team.",
    },
    {
      id: 2,
      question: "Payment Methods on Udemy",
      answer:
        "Udemy accepts major credit cards (Visa, MasterCard, American Express), PayPal, and various local payment methods depending on your region. All payments are processed securely through our encrypted payment system.",
    },
    {
      id: 3,
      question: "Lifetime Access",
      answer:
        "When you purchase a course on Udemy, you get lifetime access to that course. This means you can access the course materials, watch videos, and download resources as long as your account is active and the course remains on our platform.",
    },
    {
      id: 4,
      question: "How to Find Your Missing Course",
      answer:
        "If you can't find a course you purchased, check your 'My Learning' page. Make sure you're logged into the correct account. You can also search for the course by name or check your email for the purchase confirmation.",
    },
    {
      id: 5,
      question: "How to Download Your Certificate of Completion (on a Browser)",
      answer:
        "To download your certificate: 1) Complete all course requirements, 2) Go to the course page, 3) Click on 'Your Progress', 4) Click 'Download Certificate'. The certificate will be downloaded as a PDF file.",
    },
    {
      id: 6,
      question: "How to Refund a Course",
      answer:
        "You can request a refund within 30 days of purchase. Go to 'My Learning', find the course, click the three dots menu, and select 'Request Refund'. Fill out the refund form explaining your reason for the refund request.",
    },
    {
      id: 7,
      question: "Downloading Course Resources",
      answer:
        "Course resources can be downloaded from the course player. Look for the 'Resources' tab in the course player, or check individual lectures for downloadable materials. Some instructors may restrict downloads.",
    },
    {
      id: 8,
      question: "Learning With Udemy: Frequently Asked Questions",
      answer:
        "Udemy offers self-paced learning with video lectures, quizzes, assignments, and downloadable resources. You can learn on any device, track your progress, and interact with instructors and other students through Q&A.",
    },
    {
      id: 9,
      question: "Troubleshooting Payment Failures",
      answer:
        "If your payment fails, check that your card details are correct, you have sufficient funds, and your bank allows international transactions. Try a different payment method or contact your bank if the issue persists.",
    },
  ]

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId)
  }

  return (
    <>
      <div className={styles.helpWrapper}>
        {/* Main Header Section */}
        <div className={`${styles.headerBackground} ${styles.theme}`}>
          <div className={styles.header}>
            <h1 className={styles.title}>How May we Help You?</h1>
            <p className={styles.subtitle}>Search for solutions and get the help you need</p>
          </div>
        </div>

        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* FAQ Section */}
          <section className={styles.faqSection}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqGrid}>
              {faqData.map((faq) => (
                <div key={faq.id} className={styles.faqCard} onClick={() => toggleFAQ(faq.id)}>
                  <div className={styles.faqHeader}>
                    <span className={styles.faqQuestion}>{faq.question}</span>
                    <span className={`${styles.faqIcon} ${expandedFAQ === faq.id ? styles.expanded : ""}`}>▼</span>
                  </div>
                  {expandedFAQ === faq.id && <div className={styles.faqAnswer}>{faq.answer}</div>}
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        
        <Footer />
      </div>
    </>
  )
}