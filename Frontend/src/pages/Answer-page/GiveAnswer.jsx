import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../Utility/axios";
import styles from "./QuestionPage.module.css";

function GiveAnswer({ onSuccess }) {
  const answer = useRef();
  const [error, setError] = useState("");
  const { question_id } = useParams();
  const token = localStorage.getItem("token");

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
        <h4>Answer the Top Question</h4>
        <small>Go to Question page</small>
      </div>
      <textarea
        ref={answer}
        rows="3"
        placeholder="Write your answer..."
        className={`${styles.textarea} ${error ? styles.textareaError : ""}`}
      ></textarea>

      <button type="submit" className={styles.submitBtn}>
        Post Answer
      </button>
    </form>
  );
}

export default GiveAnswer;
