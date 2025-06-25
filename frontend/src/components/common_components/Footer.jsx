import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react'
import styles from './footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className={`${styles.footer} ${styles.theme}`}>
            {/* Consultation Banner */}
            <div className={styles.consultationBanner}>
                <div className={styles.consultationContainer}>
                    <div className={styles.consultationContent}>
                        <MessageCircle className={styles.consultationIcon} />
                        <span className={styles.consultationText}>Request a free online examination schedule consultation</span>
                    </div>
                    <div className={styles.consultationActions}>
                        <div className={styles.phoneNumber}>
                            <Phone className={styles.phoneIcon} />
                            <span className={styles.phoneText}>+91 9067000315</span>
                        </div>
                        <button className={styles.consultationButton}>Get Free Consultation</button>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className={styles.mainFooter}>
                <div className={styles.footerContainer}>
                    {/* Logo and Description */}
                    <div className={styles.footerBrand}>
                        <div className={styles.footerLogo}>
                            <img src="/images/logo_latest.png" alt="Shiksha Digital Logo" className={styles.footerLogoImg} />
                        </div>

                        <p className={styles.footerDescription}>
                            Empowering students with quality education and innovative digital learning solutions.
                        </p>
                        <div className={styles.socialIcons}>
                            <a href="#" className={styles.socialLink}>
                                <Facebook className={styles.socialIcon} />
                            </a>
                            <a href="#" className={styles.socialLink}>
                                <Linkedin className={styles.socialIcon} />
                            </a>
                            <a href="#" className={styles.socialLink}>
                                <Twitter className={styles.socialIcon} />
                            </a>
                            <a href="#" className={styles.socialLink}>
                                <Instagram className={styles.socialIcon} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.footerSection}>
                        <h3 className={styles.footerHeading}>Quick Links</h3>
                        <ul className={styles.footerLinks}>
                            <li><Link to="/AboutUs" className={styles.footerLink}>About Us</Link></li>
                            <li><a href="/#trending-courses" className={styles.footerLink}>Courses</a></li>
                            <li><Link to="/ContactUs" className={styles.footerLink}>Contact Us</Link></li>
                            <li><Link to="/Blog" className={styles.footerLink}>Blog</Link></li>
                            <li><a href="/#preview-testimonials" className={styles.footerLink}>Testimonials</a></li>
                        </ul>
                    </div>

                    {/* Our Services */}
                    <div className={styles.footerSection}>
                        <h3 className={styles.footerHeading}>Our Services</h3>
                        <ul className={styles.footerLinks}>
                            <li><a href="#" className={styles.footerLink}>Online Courses</a></li>
                            <li><a href="#" className={styles.footerLink}>Mock Tests</a></li>
                            <li><a href="#" className={styles.footerLink}>Career Guidance</a></li>
                            <li><a href="#" className={styles.footerLink}>Skill Assessment</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.footerSection}>
                        <h3 className={styles.footerHeading}>Contact Info</h3>
                        <div className={styles.contactInfo}>
                            <div className={styles.contactItem}>
                                <Phone className={`${styles.contactIcon} ${styles.phoneColor}`} />
                                <span className={styles.contactText}>+91 9067000315</span>
                            </div>
                            <div className={styles.contactItem}>
                                <Mail className={`${styles.contactIcon} ${styles.emailColor}`} />
                                <span className={styles.contactText}>info@aartimultiservices.com</span>
                            </div>
                            <div className={styles.contactItem}>
                                <MapPin className={`${styles.contactIcon} ${styles.locationColor}`} />
                                <span className={styles.contactText}>Flat No. 101, Prathamesh Plaza, Unthkhana Road, Nagpur 440009</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className={styles.footerCopyright}>
                <div className={styles.copyrightContainer}>
                    <p className={styles.copyrightText}>© 2023 Aarti Multi Services. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;