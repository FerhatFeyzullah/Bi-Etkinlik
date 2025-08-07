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
    ns: ["button", "tooltip", "text", "input", "element"],
    lng: language,
    fallbackLng: "tr",
  });

export default i18n;
