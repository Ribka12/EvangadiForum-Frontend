import React from "react";
import styles from "./Howitworks.module.css";

export default function HowItWorks() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>How Evangadi Forum Works</h1>

      <p className={styles.subtitle}>
        Evangadi Forum is a community-based question and answer platform where
        users learn from each other by asking and answering questions.
      </p>

      <div className={styles.steps}>
        <div className={styles.step}>
          <h3>1. Create an Account</h3>
          <p>
            Sign up using your email and username. This allows you to
            participate, ask questions, and provide answers to others.
          </p>
        </div>

        <div className={styles.step}>
          <h3>2. Ask a Question</h3>
          <p>
            Post your questions to the community. Be clear and specific so
            others can understand and help you better.
          </p>
        </div>

        <div className={styles.step}>
          <h3>3. Get Answers</h3>
          <p>
            Community members will respond with helpful answers, explanations,
            and examples based on their experience.
          </p>
        </div>

        <div className={styles.step}>
          <h3>4. Help Others</h3>
          <p>
            Share your knowledge by answering questions asked by other users and
            contribute to the learning community.
          </p>
        </div>

        <div className={styles.step}>
          <h3>5. Grow Together</h3>
          <p>
            By asking, answering, and interacting, everyone grows their
            knowledge and improves their skills together.
          </p>
        </div>
      </div>
    </div>
  );
}
