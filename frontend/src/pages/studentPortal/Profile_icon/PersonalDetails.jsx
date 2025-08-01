"use client"

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../../slices/userSlice';
import styles from "./PersonalDetails.module.css"
import Header from '../header/Header';

const PersonalDetails = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [wordCount, setWordCount] = React.useState(0);
  const editorRef = React.useRef(null)
  const maxWords = 120

  useEffect(() => {
    if (user && user.biography) {
      setWordCount(user.biography.length);
    }
  }, [user]);

  const handleHeadlineChange = (e) => {
    dispatch(updateProfile({ headline: e.target.value }));
  };

  const countWords = (text) => {
    // Remove HTML tags and get plain text
    const plainText = text.replace(/<[^>]*>/g, "").trim()
    if (plainText === "") return 0
    return plainText.split(/\s+/).length
  }

  const handleBiographyChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML
      const currentWordCount = countWords(content)

      if (currentWordCount <= maxWords) {
        dispatch(updateProfile({ biography: content }));
        setWordCount(currentWordCount)
      } else {
        // If word limit exceeded, revert to previous content
        editorRef.current.innerHTML = user.biography // Assuming user.biography is the source of truth
        // Set cursor to end
        const range = document.createRange()
        const selection = window.getSelection()
        range.selectNodeContents(editorRef.current)
        range.collapse(false)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    }
  }

  const handleKeyDown = (e) => {
    const currentWordCount = countWords(editorRef.current.innerHTML)

    // Allow backspace, delete, and navigation keys even when at limit
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"]

    if (currentWordCount >= maxWords && !allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
      // Check if we're adding a new word (space or enter)
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        return
      }

      // Allow typing if we're in the middle of an existing word
      const selection = window.getSelection()
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        const textBeforeCursor = range.startContainer.textContent?.substring(0, range.startOffset) || ""
        const textAfterCursor = range.startContainer.textContent?.substring(range.startOffset) || ""

        // If cursor is at the end of text and last character is not a space, allow typing
        if (textAfterCursor === "" && textBeforeCursor && !textBeforeCursor.endsWith(" ")) {
          return // Allow typing to continue current word
        }
      }

      e.preventDefault()
    }
  }

  const formatText = (command) => {
    if (editorRef.current) {
      editorRef.current.focus()
      document.execCommand(command, false, null)
      handleBiographyChange()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    const currentWordCount = countWords(editorRef.current.innerHTML)
    const pasteWordCount = countWords(text)

    if (currentWordCount + pasteWordCount <= maxWords) {
      document.execCommand("insertText", false, text)
    } else {
      // Calculate how many words we can still add
      const remainingWords = maxWords - currentWordCount
      if (remainingWords > 0) {
        const words = text.trim().split(/\s+/)
        const allowedText = words.slice(0, remainingWords).join(" ")
        document.execCommand("insertText", false, allowedText)
      }
    }
  }

  return (
    <div className={styles.personalDetailsWrapper}>
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.formContainer}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.sectionTitle}>Personal Details</h2>
              <p className={styles.sectionDescription}>Update your personal information</p>
            </div>
            <div className={styles.cardContent}>
              <form>
                {/* Basics Section */}
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>First Name</label>
                    <input type="text" className={styles.input} placeholder="Enter your first name" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Last Name</label>
                    <input type="text" className={styles.input} placeholder="Enter your last name" />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Professional Headline</label>
                  <div className={styles.headlineContainer}>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="e.g., Software Engineer at Google"
                      value={user?.headline || ""}
                      onChange={handleHeadlineChange}
                      maxLength={60}
                    />
                    <span className={styles.charCounter}>{60 - (user?.headline || "").length}</span>
                  </div>
                  <p className={styles.helperText}>
                    Add a professional headline like "Instructor at Udemy" or "Software Architect"
                  </p>
                </div>

                {/* Education Section */}
                <div className={styles.inputGroup}>
                  <label className={styles.label}>College/University</label>
                  <input type="text" className={styles.input} placeholder="Enter your college or university name" />
                </div>
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Degree</label>
                    <input type="text" className={styles.input} placeholder="e.g., Bachelor of Computer Science" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Graduation Year</label>
                    <input type="text" className={styles.input} placeholder="e.g., 2024" />
                  </div>
                </div>

                {/* Biography Section */}
                <div className={styles.inputGroup}>
                  <label className={styles.label}>About You</label>
                  <div className={styles.biographyContainer}>
                    <div className={styles.biographyEditor}>
                      <div className={styles.editorToolbar}>
                        <button
                          className={styles.toolbarButton}
                          type="button"
                          onClick={() => formatText("bold")}
                          title="Bold"
                        >
                          <strong>B</strong>
                        </button>
                        <button
                          className={styles.toolbarButton}
                          type="button"
                          onClick={() => formatText("italic")}
                          title="Italic"
                        >
                          <em>I</em>
                        </button>
                      </div>
                      <div
                        ref={editorRef}
                        className={styles.biographyEditorContent}
                        contentEditable
                        suppressContentEditableWarning={true}
                        onInput={handleBiographyChange}
                        onKeyDown={handleKeyDown}
                        onPaste={handlePaste}
                        data-placeholder="Write a compelling biography that highlights your skills, experience, and what makes you unique..."
                      />
                    </div>
                    <div className={styles.wordCountContainer}>
                      <span className={`${styles.wordCounter} ${wordCount >= maxWords ? styles.wordCounterLimit : ""}`}>
                        {wordCount}/{maxWords} words
                      </span>
                    </div>
                  </div>
                  <p className={styles.warningText}>
                    <span className="material-icons" style={{ fontSize: "16px" }}>
                      warning
                    </span>
                    Links and coupon codes are not permitted in this section
                  </p>
                </div>

                {/* Links Section */}
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Website</label>
                  <input type="url" className={styles.input} placeholder="https://yourwebsite.com" />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>LinkedIn Profile</label>
                  <div className={styles.prefixInput}>
                    <span className={styles.prefix}>linkedin.com/</span>
                    <input type="text" className={styles.prefixedInput} placeholder="in/yourname" />
                  </div>
                  <p className={styles.helperText}>
                    Input your LinkedIn public profile URL (e.g., in/johnsmith, company/udemy)
                  </p>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>GitHub Profile</label>
                  <div className={styles.prefixInput}>
                    <span className={styles.prefix}>github.com/</span>
                    <input type="text" className={styles.prefixedInput} placeholder="username" />
                  </div>
                  <p className={styles.helperText}>Input your GitHub username (e.g., johnsmith)</p>
                </div>

                {/* Save Button */}
                <div className={styles.buttonContainer}>
                  <button className={styles.saveButton} type="button">
                    <span className="material-icons" style={{ marginRight: "0.5rem" }}>
                      save
                    </span>
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalDetails
