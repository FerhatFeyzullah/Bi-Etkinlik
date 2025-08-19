import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

let language = "tr";

try {
  const userSetting = JSON.parse(localStorage.getItem("UserSetting"));
  if (userSetting?.language) {
    language = userSetting.language;
  }
} catch (err) {
  console.error("Language fetch error:", err);
}

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
<<<<<<< HEAD
    ns: ["button", "tooltip", "text", "input", "element"],
=======
    ns: ["button", "tooltip", "text", "input", "element", "validation"],
>>>>>>> 0f5e1de (The error messages in the yup diagram have been translated. An automatic registration and registration deletion service has been prepared according to the change in the status of the event, and some deficiencies in the project have been completed.)
    lng: language,
    fallbackLng: "tr",
  });

export default i18n;
