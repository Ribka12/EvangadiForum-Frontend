

import React from "react";
import { useTranslation } from "react-i18next"; // ADD THIS
import styles from "./Howitworks.module.css";

export default function HowItWorks() {
  const { t } = useTranslation(); // ADD THIS

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('howItWorks.title')}</h1> {/* UPDATED */}

      <p className={styles.subtitle}>
        {t('howItWorks.subtitle')} {/* UPDATED */}
      </p>

      <div className={styles.steps}>
        <div className={styles.step}>
          <h3>{t('howItWorks.step1Title')}</h3> {/* UPDATED */}
          <p>
            {t('howItWorks.step1Description')} {/* UPDATED */}
          </p>
        </div>

        <div className={styles.step}>
          <h3>{t('howItWorks.step2Title')}</h3> {/* UPDATED */}
          <p>
            {t('howItWorks.step2Description')} {/* UPDATED */}
          </p>
        </div>

        <div className={styles.step}>
          <h3>{t('howItWorks.step3Title')}</h3> {/* UPDATED */}
          <p>
            {t('howItWorks.step3Description')} {/* UPDATED */}
          </p>
        </div>

        <div className={styles.step}>
          <h3>{t('howItWorks.step4Title')}</h3> {/* UPDATED */}
          <p>
            {t('howItWorks.step4Description')} {/* UPDATED */}
          </p>
        </div>

        <div className={styles.step}>
          <h3>{t('howItWorks.step5Title')}</h3> {/* UPDATED */}
          <p>
            {t('howItWorks.step5Description')} {/* UPDATED */}
          </p>
        </div>
      </div>
    </div>
  );
}