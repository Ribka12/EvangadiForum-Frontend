import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../Utility/axios";
import PersonIcon from "@mui/icons-material/Person";
import styles from "./QuestionPage.module.css";

function GetAnswer({ refreshKey }) {
  const [answers, setAnswers] = useState([]);
  const { question_id } = useParams();
  const token = localStorage.getItem("token");

  async function getAnswer() {
    try {
      const { data } = await axios.get(`/answer/${question_id}`, {
        headers: { Authorization: "Bearer " + token },
      });

      // ✅ backend returns ARRAY directly
      setAnswers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err.response);
      setAnswers([]);
    }
  }

  useEffect(() => {
    getAnswer();
  }, [question_id, refreshKey]);

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={styles.answersBox} id="answers-container">
      {answers?.length === 0 && (
        <p className={styles.noAnswer}>No answers yet</p>
      )}

      {answers.map((a, index) => (
        <div key={index} className={styles.answerCard}>
          <div className={styles.avatarBlock}>
            <div className={styles.avatar}>
              <PersonIcon />
            </div>
            <small>{a.username}</small>
          </div>

          <div className={styles.answerContent}>
            <p>{a.answer}</p>
            <span className={styles.questionTime}>
              • {formatDate(a.created_at)}
            </span>
          </div>

          {index !== answers.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
}

export default GetAnswer;
