import { useSelector, useDispatch } from 'react-redux';
import styles from "./CollegeDetails.module.css";
import Header from '../CollegeHeader/CollegeHeaderFile';
import {
  setCollegeName,
  setEstablishedYear,
  setAddress,
  setCity,
  setState,
  setZipCode,
  setCountry,
  setContactNumber,
  setEmail,
  setWebsite,
  setAccreditation,
  setDescription,
} from '../../../slices/collegeProfileUiSlice';

const CollegeDetails = () => {
  const dispatch = useDispatch();
  const collegeName = useSelector((state) => state.collegeProfileUi.collegeName);
  const establishedYear = useSelector((state) => state.collegeProfileUi.establishedYear);
  const address = useSelector((state) => state.collegeProfileUi.address);
  const city = useSelector((state) => state.collegeProfileUi.city);
  const stateVal = useSelector((state) => state.collegeProfileUi.state);
  const zipCode = useSelector((state) => state.collegeProfileUi.zipCode);
  const country = useSelector((state) => state.collegeProfileUi.country);
  const contactNumber = useSelector((state) => state.collegeProfileUi.contactNumber);
  const email = useSelector((state) => state.collegeProfileUi.email);
  const website = useSelector((state) => state.collegeProfileUi.website);
  const accreditation = useSelector((state) => state.collegeProfileUi.accreditation);
  const description = useSelector((state) => state.collegeProfileUi.description);

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
                    onChange={(e) => dispatch(setCollegeName(e.target.value))}
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
                    onChange={(e) => dispatch(setEstablishedYear(e.target.value))}
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
                    onChange={(e) => dispatch(setAddress(e.target.value))}
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
                      onChange={(e) => dispatch(setCity(e.target.value))}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>State</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Enter your state"
                      value={stateVal}
                      onChange={(e) => dispatch(setState(e.target.value))}
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
                      onChange={(e) => dispatch(setZipCode(e.target.value))}
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
                      onChange={(e) => dispatch(setCountry(e.target.value))}
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
                    onChange={(e) => dispatch(setContactNumber(e.target.value))}
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
                    onChange={(e) => dispatch(setEmail(e.target.value))}
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
                    onChange={(e) => dispatch(setWebsite(e.target.value))}
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
                    onChange={(e) => dispatch(setAccreditation(e.target.value))}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Description</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Describe your college"
                    value={description}
                    onChange={(e) => dispatch(setDescription(e.target.value))}
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
