import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: { hello: "Hello world" },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en",
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

// Function to load translations dynamically
const loadLanguage = async (lang: string) => {
  try {
    // http://localhost:8000/public/lang/uz.json
    // Standart for downloading
    const response = await fetch(`/lang/${lang}.json`);
    const translation = await response.json();
    // Adding language to resources
    i18n.addResourceBundle(lang, "translation", translation, true, true);
    // Changing language to downloaded
    i18n.changeLanguage(lang);
  } catch (error) {
    console.error(`Could not load ${lang} translations`, error);
  }
};

export { i18n, loadLanguage };
