import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../Utility/axios";
import GiveAnswer from "./GiveAnswer";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "./QuestionPage.module.css";
import GetAnswer from "./GetAnswer";

function QuestionAnswer() {
  const [singleQuestion, setSingleQuestion] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const { question_id } = useParams();
  const token = localStorage.getItem("token");

  async function getSingleQuestion() {
    try {
      const { data } = await axios.get(`/question/${question_id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setSingleQuestion(data.question);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    if (question_id) getSingleQuestion();
  }, [question_id]);

  if (!singleQuestion) {
    return (
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner}></div>
      </div>
    );
  }
 

  return (
    <div className={styles.container}>
      <h4 className={styles.sectionTitle}>QUESTION</h4>
      <div className={styles.titleRow}>
        <ArrowForwardIosIcon className={styles.arrowIcon} />
        <h4>{singleQuestion.title}</h4>
      </div>

      <p className={styles.description}>{singleQuestion.description}</p>

      <h5 className={styles.answerTitle}>Answers from the Community</h5>

      <GetAnswer refreshKey={refreshKey} />
      

      <GiveAnswer onSuccess={() => setRefreshKey((prev) => prev + 1)} />
    </div>
  );
}

export default QuestionAnswer;
