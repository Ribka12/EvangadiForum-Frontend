// import React, { useEffect, useState } from "react";
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

//       // ✅ backend returns ARRAY directly
//       setAnswers(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.log(err.response);
//       setAnswers([]);
//     }
//   }

//   useEffect(() => {
//     getAnswer();
//   }, [question_id, refreshKey]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "Recently";
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffMs = now - date;
//     const diffMins = Math.floor(diffMs / (1000 * 60));
//     const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//     if (diffMins < 60) return `${diffMins}m ago`;
//     if (diffHours < 24) return `${diffHours}h ago`;
//     if (diffDays < 7) return `${diffDays}d ago`;
//     return date.toLocaleDateString();
//   };

//   return (
//     <div className={styles.answersBox} id="answers-container">
//       {answers?.length === 0 && (
//         <p className={styles.noAnswer}>No answers yet</p>
//       )}

//       {answers.map((a, index) => (
//         <div key={index} className={styles.answerCard}>
//           <div className={styles.avatarBlock}>
//             <div className={styles.avatar}>
//               <PersonIcon />
//             </div>
//             <small>{a.username}</small>
//           </div>

//           <div className={styles.answerContent}>
//             <p>{a.answer}</p>
//             <span className={styles.questionTime}>
//               • {formatDate(a.created_at)}
//             </span>
//           </div>

//           {index !== answers.length - 1 && <hr />}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default GetAnswer;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ADDED: Import translation hook for multi-language support
import axios from "../../Utility/axios";
import PersonIcon from "@mui/icons-material/Person";
import Pagination from "../../components/Pagination/Pagination"; // ADDED: Import Pagination component for page navigation
import styles from "./QuestionPage.module.css";

function GetAnswer({ refreshKey }) {
  const [answers, setAnswers] = useState([]);
  const { question_id } = useParams();
  const token = localStorage.getItem("token");
  const { t } = useTranslation(); // ADDED: Initialize translation function for text localization
  
  // ADDED: Pagination state management
  const [currentPage, setCurrentPage] = useState(1); // Tracks current page number
  const [itemsPerPage] = useState(3); // Fixed: Shows 3 answers per page for better UX
  const [loading, setLoading] = useState(true); // ADDED: Loading state to show spinner while fetching

  async function getAnswer() {
    try {
      setLoading(true); // ADDED: Show loading indicator before API call
      const { data } = await axios.get(`/answer/${question_id}`, {
        headers: { Authorization: "Bearer " + token },
      });

      // ✅ backend returns ARRAY directly
      setAnswers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err.response);
      setAnswers([]);
    } finally {
      setLoading(false); // ADDED: Hide loading indicator after API response (success or error)
    }
  }

  useEffect(() => {
    getAnswer();
  }, [question_id, refreshKey]);

  // ADDED: Calculate which answers to display for current page
const currentAnswers = React.useMemo(() => {
  // Example: If we're on page 2 and show 3 items per page:
  // currentPage = 2, itemsPerPage = 3
  // startIndex = (2 - 1) * 3 = 1 * 3 = 3
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  // endIndex = 3 + 3 = 6
  const endIndex = startIndex + itemsPerPage;
  
  // Take answers array and get items from position 3 to 6 (items 4,5,6)
  return answers.slice(startIndex, endIndex);
}, [answers, currentPage, itemsPerPage]);

  // ADDED: Calculate total number of pages needed
  const totalPages = Math.ceil(answers.length / itemsPerPage);

  // ADDED: Reset to first page when answers data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [answers.length]);

  const formatDate = (dateString) => {
    if (!dateString) return t('common.recently', { defaultValue: 'Recently' }); // ADDED: Use translation for "Recently"
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

  // ADDED: Loading state UI - shows spinner when fetching data
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>{t('common.loading')}</p> {/* ADDED: Translated loading text */}
      </div>
    );
  }

  return (
    // ADDED: Main wrapper container with flexbox layout for bottom pagination
    <div className={styles.answersContainer}>
      {/* ADDED: Info bar showing pagination statistics */}
      {answers.length > 0 && (
        <div className={styles.answersInfo}>
          {t('common.showing')} <strong>{currentAnswers.length}</strong>{" "}
          {t('common.of')} <strong>{answers.length}</strong>{" "}
          {answers.length === 1 ? 'answer' : 'answers'} {/* Shows answer count */}
        </div>
      )} 
{/* Answers Box */}
      <div className={styles.answersBox} id="answers-container">
        {currentAnswers.length === 0 ? (
          <p className={styles.noAnswer}>
            {t('question.noAnswers', { defaultValue: 'No answers yet' })} {/* ADDED: Translated "No answers yet" */}
          </p>
        ) : (
          currentAnswers.map((a, index) => (
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

              {index !== currentAnswers.length - 1 && <hr />}
            </div>
          ))
        )}
      </div>

      {/* ADDED: Pagination component - appears at bottom, centered */}
      {totalPages > 1 && (
        <div className={styles.answersPagination}>
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage} // ADDED: Page change handler
            labels={{
              prev: t('pagination.prev'), // ADDED: Translated "Previous" button
              next: t('pagination.next') // ADDED: Translated "Next" button
            }}
          />
        </div>
      )}
    </div>
  );
}

export default GetAnswer;