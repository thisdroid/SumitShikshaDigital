import { useState } from 'react';
import styles from "./CollegePlan.module.css";
import Header from '../CollegeHeader/CollegeHeaderFile';

const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Sample subscription plans data
  const subscriptionPlans = [
    {
      id: 1,
      name: "Basic Plan",
      price: "Rs. 200/week",
      features: ["Access to basic features", "Email support", "Up to 10 users"],
    },
    {
      id: 2,
      name: "Standard Plan",
      price: "Rs. 500/month",
      features: ["Access to standard features", "Email and chat support", "Up to 50 users"],
    },
    {
      id: 3,
      name: "Premium Plan",
      price: "Rs. 4000/year",
      features: ["Access to all features", "24/7 Priority support", "Unlimited users"],
    },
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className={styles.subscriptionPlansWrapper}>
      <div className={styles.mainContent}>
        <Header />
        {selectedPlan && (
          <div className={styles.selectedPlan}>
            <h2>Your Selected Plan</h2>
            <div className={styles.selectedPlanCard}>
              <h3>{selectedPlan.name}</h3>
              <p className={styles.planPrice}>{selectedPlan.price}</p>
              <ul>
                {selectedPlan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className={styles.plansContainer}>
          <h2>Choose Your Plan</h2>
          <div className={styles.plansGrid}>
            {subscriptionPlans.map((plan) => (
              <div key={plan.id} className={styles.planCard} onClick={() => handleSelectPlan(plan)}>
                <h3>{plan.name}</h3>
                <p className={styles.planPrice}>{plan.price}</p>
                <ul>
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <button className={styles.selectButton}>Select Plan</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
