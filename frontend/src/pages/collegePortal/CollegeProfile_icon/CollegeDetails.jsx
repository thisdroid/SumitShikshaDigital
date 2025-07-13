import { useState } from "react";
import styles from "./CollegeDetails.module.css";
import Header from '../CollegeHeader/CollegeHeaderFile';

const CollegeDetails = () => {
  const [collegeName, setCollegeName] = useState("");
  const [establishedYear, setEstablishedYear] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [accreditation, setAccreditation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("College admin details submitted");
  };

  return (
    <div className={styles.collegeAdminDetailsWrapper}>
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.formContainer}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.sectionTitle}>College Details</h2>
              <p className={styles.sectionDescription}>Enter your college details</p>
            </div>
            <div className={styles.cardContent}>
              <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>College Name</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter your college name"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Established Year</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter the year your college was established"
                    value={establishedYear}
                    onChange={(e) => setEstablishedYear(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Address</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter your college address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>City</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Enter your city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>State</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Enter your state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Zip Code</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Enter your zip code"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Country</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Enter your country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Contact Number</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter your contact number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    className={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Website</label>
                  <input
                    type="url"
                    className={styles.input}
                    placeholder="Enter your website URL"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Accreditation</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter accreditation details"
                    value={accreditation}
                    onChange={(e) => setAccreditation(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Description</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Describe your college"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.buttonContainer}>
                  <button type="submit" className={styles.saveButton}>
                    <span className="material-icons" style={{ marginRight: "0.5rem" }}>
                      save
                    </span>
                    Save College Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;
