import { useSelector, useDispatch } from 'react-redux';
import { setLoginFormData, setLoginShowPassword } from '../../slices/studentLoginSlice';
import { Eye, EyeOff, CircleArrowRight, ArrowRight } from "lucide-react";
import styles from "./StudentLogin.module.css";
import Navbar from '../../components/common_components/Navbar';
import Animated from "../../components/common_components/Animated";
import { Link } from 'react-router-dom';

const StudentLogin = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.studentLogin.formData);
  const showPassword = useSelector((state) => state.studentLogin.showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setLoginFormData({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
  };

  return (
    <>
      <Navbar />
      {/* <Animated /> */}
      <div className={`${styles.theme} ${styles.loginContainer}`}>
        <div className={styles.backgroundWrapper}>
          <Animated />
        </div>
        <div className={styles.loginCard}>
          <div className={styles.loginContent}>
            {/* Left Panel */}
            <div className={styles.leftPanel}>
              <div className={styles.bgCircle1}></div>
              <div className={styles.bgCircle2}></div>
              <div className={styles.bgCircle3}></div>

              <div className={styles.arrowIconContainer}>
                <div className={styles.arrowIconBox}>
                  <CircleArrowRight className="w-18 h-18 text-white" />
                </div>
              </div>

              <h1 className={styles.welcomeTitle}>Welcome Back!</h1>
              <p className={styles.welcomeSubtitle}>Login to access your courses, exams, and learning resources.</p>

              <div className={styles.signupSection}>
                <p className={styles.signupText}>
                  {"Don't have an account? "}
                  <Link to="/StudentSignup" className={styles.signupLink}>Sign up here</Link>
                </p>
              </div>
            </div>

            {/* Right Panel */}
            <div className={styles.rightPanel}>
              <div className={styles.formContainer}>
                <div className={styles.headerSection}>
                  <h2 className={styles.loginTitle}>Student Login</h2>
                  <p className={styles.loginSubtitle}>Enter your credentials to continue</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.loginForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="contactNumber" className={styles.formLabel}>
                      Username
                    </label>
                    <input
                      type="text"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your username/contact number"
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.formLabel}>
                      Password
                    </label>
                    <div className={styles.passwordContainer}>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className={`${styles.formInput} ${styles.passwordInput}`}
                      />
                      <button
                        type="button"
                        onClick={() => dispatch(setLoginShowPassword(!showPassword))}
                        className={styles.passwordToggle}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <Link to="/StudentDashboard" className={styles.forgotPasswordLink}>
                  <button type="submit" className={styles.loginButton}>
                    <ArrowRight className="w-5 h-5" />
                    Login
                  </button>
                  </Link>
                </form>

                <div className={styles.loginFooterLinks}>
                  <Link to="/StudentForgotPassword" className={styles.loginFooterLink}>Forgot Username?</Link>
                  {/* <a href="#" className={styles.loginFooterLink}>Forgot Password?</a> */}
                  <Link to="/StudentSignup" className={styles.loginFooterLink}>Create New Account</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;
