import { useState } from "react"
import styles from "./PersonalDetails.module.css"

const PersonalDetails = () => {
  const [headline, setHeadline] = useState("")
  const [biography, setBiography] = useState("")

  const handleHeadlineChange = (e) => {
    if (e.target.value.length <= 60) {
      setHeadline(e.target.value)
    }
  }

  return (
    <>
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Public profile</h1>
        <p className={styles.subtitle}>Add information about yourself</p>
      </div>

      <div className={styles.formContainer}>
        {/* Basics Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Basics:</h2>

          <div className={styles.inputGroup}>
            <input
                type="text"
                className={styles.input}
                placeholder="Enter your name"
              />
          </div>

          <div className={styles.inputGroup}>
            <input
                type="text"
                className={styles.input}
                placeholder="Enter Your Surname"
              />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.headlineContainer}>
              <input
                type="text"
                className={styles.input}
                placeholder="Headline"
                value={headline}
                onChange={handleHeadlineChange}
                maxLength={60}
              />
              <span className={styles.charCounter}>{60 - headline.length}</span>
            </div>
            <p className={styles.helperText}>Add a professional headline like, "Instructor at Udemy" or "Architect."</p>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Education Details</h2>

          <div className={styles.inputGroup}>
            <input
                type="text"
                className={styles.input}
                placeholder="College"
              />
          </div>

          <div className={styles.inputGroup}>
            <input
                type="text"
                className={styles.input}
                placeholder="Degree"
              />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.headlineContainer}>
              <input
                type="text"
                className={styles.input}
                placeholder="Batch"
              />
              <span className={styles.charCounter}>{60 - headline.length}</span>
            </div>
            <p className={styles.helperText}>Add a professional headline like, "Instructor at Udemy" or "Architect."</p>
          </div>
        </div>

        {/* Biography Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Biography</h2>

          <div className={styles.biographyEditor}>
            <div className={styles.editorToolbar}>
              <button className={styles.toolbarButton}>
                <strong>B</strong>
              </button>
              <button className={styles.toolbarButton}>
                <em>I</em>
              </button>
            </div>
            <textarea
              className={styles.biographyTextarea}
              placeholder="Biography"
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
            />
          </div>

          <p className={styles.warningText}>Links and coupon codes are not permitted in this section.</p>

          <div className={styles.inputGroup}>
            <select className={styles.languageSelect}>
              <option>English (US)</option>
            </select>
          </div>
        </div>

        {/* Links Section */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Links:</h2>

          <div className={styles.inputGroup}>
            <input type="text" className={styles.input} placeholder="Website (http(s)://.)" />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.prefixInput}>
              <span className={styles.prefix}>linkedin.com/</span>
              <input type="text" className={styles.prefixedInput} placeholder="Public Profile URL" />
            </div>
            <p className={styles.helperText}>
              Input your LinkedIn public profile URL (e.g. in/johnsmith, company/udemy).
            </p>
          </div>
          
          <div className={styles.inputGroup}>
            <div className={styles.prefixInput}>
              <span className={styles.prefix}>github.com/</span>
              <input type="text" className={styles.prefixedInput} placeholder="Username" />
            </div>
            <p className={styles.helperText}>Input your github username (e.g. johnsmith).</p>
          </div>
        </div>

        {/* Save Button */}
        <button className={styles.saveButton}>Save</button>
      </div>
    </div>
    </>
  )
}

export default PersonalDetails