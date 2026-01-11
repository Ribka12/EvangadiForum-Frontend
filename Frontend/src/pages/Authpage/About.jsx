import { useTranslation } from "react-i18next"; // ADD THIS
import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  const { t } = useTranslation(); // ADD THIS
  console.log(t);

  return (
    <section className={styles.about}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.tag}>{t('about.tag')}</p> {/* UPDATED */}

          <h1 className={styles.title}>{t('about.networks')}</h1> {/* UPDATED */}

          <p className={styles.text}>
            {t('about.paragraph1')} {/* UPDATED */}
          </p>

          <p className={styles.text}>
            {t('about.paragraph2')} {/* UPDATED */}
          </p>
          <span>
            <Link to="/Howitworks" className={styles.btn}>
              {t('about.howItWorksButton')} {/* UPDATED */}
            </Link>
          </span>
        </div>
        <div className={styles.rightAccent}></div>
      </div>
    </section>
  );
};

export default About;
