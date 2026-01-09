// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        signup: {
          title: "Join the network",
          email: "Email address",
          firstName: "First name",
          lastName: "Last name",
          username: "Username",
          password: "Password",
          agreeJoin: "Agree and Join",
          haveAccount: "Already have an account?",
          signIn: "Sign in",
        },
        about: {
          title: "Evangadi Networks",
          body: "No matter what stage of life you are in, you have much to offer those who are trying to follow in your footsteps.",
        },
        header: {
          howItWorks: "HOW IT WORKS",
        },
        errors: {
          fillAll: "Please fill all fields",
          passwordLength: "Password must be at least 8 characters",
          registrationFailed: "Registration failed",
        },
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
