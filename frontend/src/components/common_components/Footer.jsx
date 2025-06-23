import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Facebook, Linkedin, Twitter, Instagram } from "lucide-react"
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            {/* Consultation Banner */}
            <div className="consultation-banner">
                <div className="consultation-container">
                    <div className="consultation-content">
                        <MessageCircle className="consultation-icon" />
                        <span className="consultation-text">Request a free online examination schedule consultation</span>
                    </div>
                    <div className="consultation-actions">
                        <div className="phone-number">
                            <Phone className="phone-icon" />
                            <span className="phone-text">+91 9067000315</span>
                        </div>
                        <button className="consultation-button">Get Free Consultation</button>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="main-footer">
                <div className="footer-container">
                    {/* Logo and Description */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <img src="/images/logo_latest.png" alt="Shiksha Digital Logo" className="footer-logo-img" />
                        </div>

                        <p className="footer-description">
                            Empowering students with quality education and innovative digital learning solutions.
                        </p>
                        <div className="social-icons">
                            <a href="#" className="social-link">
                                <Facebook className="social-icon" />
                            </a>
                            <a href="#" className="social-link">
                                <Linkedin className="social-icon" />
                            </a>
                            <a href="#" className="social-link">
                                <Twitter className="social-icon" />
                            </a>
                            <a href="#" className="social-link">
                                <Instagram className="social-icon" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h3 className="footer-heading">Quick Links</h3>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">About Us</a></li>
                            <li><a href="#" className="footer-link">Courses</a></li>
                            <li><a href="#" className="footer-link">Contact Us</a></li>
                            <li><a href="#" className="footer-link">Blog</a></li>
                            <li><a href="#" className="footer-link">Testimonials</a></li>
                        </ul>
                    </div>

                    {/* Our Services */}
                    <div className="footer-section">
                        <h3 className="footer-heading">Our Services</h3>
                        <ul className="footer-links">
                            <li><a href="#" className="footer-link">Online Courses</a></li>
                            <li><a href="#" className="footer-link">Mock Tests</a></li>
                            <li><a href="#" className="footer-link">Career Guidance</a></li>
                            <li><a href="#" className="footer-link">Skill Assessment</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-section">
                        <h3 className="footer-heading">Contact Info</h3>
                        <div className="contact-info">
                            <div className="contact-item">
                                <Phone className="contact-icon phone-color" />
                                <span className="contact-text">+91 9067000315</span>
                            </div>
                            <div className="contact-item">
                                <Mail className="contact-icon email-color" />
                                <span className="contact-text">info@aartimultiservices.com</span>
                            </div>
                            <div className="contact-item">
                                <MapPin className="contact-icon location-color" />
                                <span className="contact-text">Flat No. 101, Prathamesh Plaza, Unthkhana Road, Nagpur 440009</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="footer-copyright">
                <div className="copyright-container">
                    <p className="copyright-text">© 2023 Aarti Multi Services. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
