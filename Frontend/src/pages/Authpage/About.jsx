import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.tag}>About</p>

          <h1 className={styles.title}>Evangadi Networks</h1>

          <p className={styles.text}>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
          </p>

          <p className={styles.text}>
            Wheather you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
          <span onClick={() => setShowPassword((prev) => !prev)}>
            <Link to="/HowItWorks" className={styles.btn}>
              HOW IT WORKS
            </Link>
          </span>
        </div>
        <div className={styles.rightAccent}></div>
      </div>
    </section>
  );
};

export default About;
