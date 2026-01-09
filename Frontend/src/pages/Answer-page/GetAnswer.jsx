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
          </div>

          {index !== answers.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
}

export default GetAnswer;


// import { useParams } from "react-router-dom";
// import axios from "../../Utility/axios";
// import PersonIcon from "@mui/icons-material/Person";
// import styles from "./QuestionPage.module.css";

// function GetAnswer({ refreshKey }) {
//   const [answers, setAnswers] = useState([]);
//   const { question_id } = useParams();
//   const token = localStorage.getItem("token");

//   async function getAnswer() {
//     try {
//       const { data } = await axios.get(`/answer/${question_id}`, {
//         headers: { Authorization: "Bearer " + token },
//       });
//       setAnswers(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.log(err.response);
//       setAnswers([]);
//     }
//   }

//   useEffect(() => {
//     getAnswer();
//   }, [question_id, refreshKey]);

//   useEffect(() => {
//     // scroll to bottom when new answer added
//     const container = document.getElementById("answers-container");
//     if (container) {
//       container.scrollTop = container.scrollHeight;
//     }
//   }, [answers]);

//   return (
//     <div className={styles.answersBox} id="answers-container">
//       {answers?.length === 0 && (
//         <p className={styles.noAnswer}>No answers yet</p>
//       )}

//       {answers.map((a, index) => (
//         <div
//           key={a.answer_id}
//           className={styles.answerCard}
//           style={{ animationDelay: `${index * 0.05}s` }}
//         >
//           <div className={styles.avatarBlock}>
//             <div className={styles.avatar}>
//               <PersonIcon />
//             </div>
//             <small className={styles.username}>{a.username}</small>
//           </div>

//           <div className={styles.answerContent}>
//             <p>{a.answer}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default GetAnswer;
