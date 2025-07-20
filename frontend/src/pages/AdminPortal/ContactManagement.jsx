import React from "react";
import styles from "./ContactManagement.module.css";

const ContactManagement = ({ messages }) => {
  return (
    <div className={styles.inboxContainer}>
      <h2 className={styles.inboxHeader}>Inbox</h2>
      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <span>Name</span>
          <span>Email</span>
          <span>Message</span>
          <span>Received At</span>
          <span>Actions</span>
        </div>
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div className={styles.tableRow} key={index}>
              <span>{msg.name}</span>
              <span>{msg.email}</span>
              <span className={styles.messageCell}>{msg.message}</span>
              <span>{msg.receivedAt}</span>
              <span className={styles.actionButtons}>
                <button className={styles.viewButton}>View</button>
                <button className={styles.deleteButton}>Delete</button>
              </span>
            </div>
          ))
        ) : (
          <div className={styles.noData}>No messages available.</div>
        )}
      </div>
    </div>
  );
};

export default ContactManagement;
