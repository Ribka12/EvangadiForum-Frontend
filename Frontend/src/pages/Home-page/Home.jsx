

import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Home.module.css";
import instance from "../../Utility/axios";
import { Appstate } from "../../App";
import Pagination from "../../components/Pagination/Pagination";

function Home() {
  const { user } = useContext(Appstate);
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [questions, setQuestions] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  
  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // 3 questions per page

  useEffect(() => {
    if (!user) return;

    async function fetchQuestions() {
      const token = localStorage.getItem("token");
      try {
        setLoading(true);
        const { data } = await instance.get("/question", {
          headers: { Authorization: "Bearer " + token },
        });
        const list = data.questions || data || [];
        setQuestions(list);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([]);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [navigate, user]);

  // FILTER QUESTIONS
  const filteredQuestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return questions;
    
    return questions.filter((item) => {
      const title = (item.title || "").toLowerCase();
      const description = (item.description || item.content || "").toLowerCase();
      const userName = (item.username || item.user_name || "").toLowerCase();
      return (
        title.includes(q) || description.includes(q) || userName.includes(q)
      );
    });
  }, [questions, query]);

  // GET CURRENT PAGE QUESTIONS
  const currentQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredQuestions.slice(startIndex, endIndex);
  }, [filteredQuestions, currentPage, itemsPerPage]);

  // CALCULATE TOTAL PAGES
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

  // RESET TO PAGE 1 WHEN SEARCH CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // FORMAT DATE
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

  const handleAskQuestion = () => {
    navigate("/ask");
  };

  const handleQuestionClick = (questionId) => {
    navigate(`/answer/${questionId}`);
  };

  // GET USERNAME
  const getUsername = () => {
    if (user?.username) {
      return user.username;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        return userData.username;
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.username || payload.email || "User";
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    return "User";
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Ask Question and Welcome section */}
        <div className={styles.topSection}>
          <button onClick={handleAskQuestion} className={styles.askBtn}>
            {t('home.askQuestion')}
          </button>
          <div className={styles.welcome}>
            {t('home.welcome')} <span className={styles.name}>{getUsername()}</span>
          </div>
        </div>

        {/* Search Input */}
        <input
          className={styles.search}
          placeholder={t('home.searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* PAGINATION INFO */}
        {questions.length > 0 && (
          <div className={styles.paginationInfo}>
            {t('common.showing')} <strong>{currentQuestions.length}</strong> {t('common.of')} <strong>{filteredQuestions.length}</strong> {t('home.questions').toLowerCase()}
            {query && (
              <span style={{ color: '#007bff', marginLeft: '10px' }}>
                (Search: "{query}")
              </span>
            )}
          </div>
        )}

        {/* Questions List */}
        <div className={styles.questionsList}>
          {currentQuestions.length > 0 ? (
            currentQuestions.map((item) => {
              const questionId = item.question_id || item.id;
              return (
                <div
                  key={questionId}
                  className={styles.questionCard}
                  onClick={() => handleQuestionClick(questionId)}
                >
                  <div className={styles.avatar}>
                    {(item.username || item.user_name || "?")
                      .toString()
                      .slice(0, 1)
                      .toUpperCase()}
                  </div>
                  <div className={styles.questionContent}>
                    <h3 className={styles.questionTitle}>
                      {item.title || item.content}
                    </h3>
                    <div className={styles.questionMeta}>
                      <span className={styles.questionUser}>
                        {item.username || item.user_name}
                      </span>
                      <span className={styles.questionTime}>
                        • {formatDate(item.created_at)}
                      </span>
                    </div>
                    <div className={styles.questionDescription}>
                      {item.description || ""}
                    </div>
                  </div>
                  <div
                    className={styles.arrow}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuestionClick(questionId);
                    }}
                  >
                    ›
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.noQuestions}>
              <p>{t('home.empty')}</p>
            </div>
          )}
        </div>

        {/* CENTERED PAGINATION AT BOTTOM */}
        {totalPages > 1 && (
          <div className={styles.paginationCenter}>
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onChange={setCurrentPage}
              labels={{
                prev: t('pagination.prev'),
                next: t('pagination.next')
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;