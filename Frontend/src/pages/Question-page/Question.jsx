import React, { useContext, useState } from "react";
import { Context } from "../../App";
import instance from "../../Utility/axios";
import styles from "./Question.module.css";

export default function Question() {
  const { user } = useContext(Context);
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const showMessage = (text, type = "success") => {
    setMsg(text);
    setMsgType(type);

    setTimeout(() => {
      setMsg("");
      setMsgType("");
    }, 2000);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      showMessage("Please fill in all required fields.", "error");
      return;
    }

    try {
      await instance.post(
        "/question/",
        { title, description },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setTitle("");
      setDescription("");
      showMessage("Question posted successfully!", "success");
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Failed to post question. Try again.",
        "error"
      );
    }
  };

  return (
    <div className={styles.wrap}>
      <h2 className={styles.stepsTitle}>Steps To Write A Good Question.</h2>

      <ul className={styles.list}>
        <li>Summarize your problem in a one-line title.</li>
        <li>Describe your problem in more detail.</li>
        <li>Describe what you tried and what you expected.</li>
        <li>Review your question and post it here.</li>
      </ul>

      <h2 className={styles.postTitle}>Post Your Question</h2>

      <form className={styles.form} onSubmit={submit}>
        <input
          type="text"
          className={styles.input}
          placeholder="Question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className={styles.textarea}
          placeholder="Question detail ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {msg && (
          <div
            className={`${styles.status} ${
              msgType === "success" ? styles.success : styles.error
            }`}
          >
            {msg}
          </div>
        )}

        <button type="submit" className={styles.primary}>
          Post Question
        </button>
      </form>
    </div>
  );
}
