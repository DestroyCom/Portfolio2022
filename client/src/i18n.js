import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      navigation: {
        works: "Works",
        about: "About Me",
        contact: "Contact",
      },
      landing: {
        text: "Web developer",
      },
      about: {
        title: "Learn to know me",
        description:
          "EN ! Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.",
      },
      contact: {
        blocOne: {
          title: "Something to say ?",
          fieldOne: "Your email :",
          fieldTwo: "Your name :",
          fieldThree: "Your message :",
          sendButton: "Send",
        },
        blocTwo: {
          title: "Let's keep in touch",
          msg: "Go to",
          msgTwo: "Send a",
        },
      },
      footer: {
        textTwo: {
          langOne: "Version française",
          langTwo: "English version",
        },
        textThree: {
          partOne: "Fait main avec",
          partTwo: "ça  ",
        },
      },
      project: {
        textOne: "Project Description:",
        textTwo: "Links:",
        textThree: "Tech used",
        textFour: "The team",
        textFive: "Git repository",
        textSix: "Go to the project",
      },
    },
  },
  fr: {
    translation: {
      navigation: {
        works: "Réalisations",
        about: "À propos",
        contact: "Contact",
      },
      landing: {
        text: "Développeur Web",
      },
      about: {
        title: "Faisons connaissance",
        description:
          "FR ! Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.",
      },
      contact: {
        blocOne: {
          title: "Un mot à dire ?",
          fieldOne: "Votre email :",
          fieldTwo: "Votre nom :",
          fieldThree: "Votre message :",
          sendButton: "Envoyer",
        },
        blocTwo: {
          title: "Gardons le contact",
          msg: "Aller sur",
          msgTwo: "Envoyer un",
        },
      },
      footer: {
        textTwo: {
          langOne: "Version française",
          langTwo: "English version",
        },
        textThree: {
          partOne: "Made by me with",
          partTwo: "this",
        },
      },
      project: {
        textOne: "Description du projet",
        textTwo: "Liens:",
        textThree: "Technologies utilisées",
        textFour: "L'équipe",
        textFive: "Dépot Git",
        textSix: "Aller au projet",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "fr", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
