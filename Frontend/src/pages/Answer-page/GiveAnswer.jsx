import React, { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../Utility/axios";
import styles from "./QuestionPage.module.css";
import { useTranslation } from "react-i18next";

function GiveAnswer({ onSuccess }) {
  const answer = useRef();
  const [error, setError] = useState("");
  const [msg, setmsg] = useState("");
  const { question_id } = useParams();
  const { t } = useTranslation(); 
  const token = localStorage.getItem("token");

  setTimeout(() => {
    setmsg("");
  }, 2000);

  async function handleSubmit(e) {
    e.preventDefault();
    const value = answer.current.value.trim();

    if (!value) {
      setError("Please provide your answer");
      answer.current.focus();
      return;
    }

    try {
      await axios.post(
        "/answer",
        { question_id: question_id, answer: value },
        { headers: { Authorization: "Bearer " + token } }
      );

      answer.current.value = "";
      setError("");
      setmsg("Question posted successfully!!");
      onSuccess();
    } catch (err) {
      setError("Something went wrong!");
      console.log(err.response);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.answerForm}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.answerHeader}>
        <h4>{t("question.answerTop")}</h4>
        <Link to="/home">
          <small>Go to Home page</small>
        </Link>
      </div>
      <textarea
        ref={answer}
        rows="3"
        placeholder={t("question.answerPlaceholder")}
        className={`${styles.textarea} ${error ? styles.textareaError : ""}`}
      ></textarea>
      <div>
        {msg && (
          <div className={`${styles.status} ${styles.success}`}>
            {t("question.postSuccess")}
          </div>
        )}
      </div>
      <button type="submit" className={styles.submitBtn}>
        {t("question.postButton")}
      </button>
    </form>
  );
}

export default GiveAnswer;
