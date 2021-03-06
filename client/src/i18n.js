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
        works2: "Some projects",
        about: "About Me",
        contact: "Contact",
      },
      landing: {
        text: "Web developer",
      },
      works: {
        textOne: "See all my projects on",
        textTwo: "my GitHub",
        textThree: "and my old ones",
        textFour: "in my archives",
      },
      about: {
        title: "Learn to know me",
        description: {
          textOne: "Hi there!",
          textTwo: "I'm Antoine, French junior web developer.",
          textThree:
            "Attracted by new technologies and the world of tomorrow, I started to learn computer development as autodidact,",
          textFour:
            "When I reached my university studies, I naturally turned to computer science, then reoriented in the specificity of the WEB.",
          textFive:
            "Currently at the beginning of my career, I have at heart to discover as many things as possible and to explore new challenges.",
          textSix:
            "Being creative, my free time allows me to explore photography, video and the exploration of tomorrow (and the time to play video games too)",
        },
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
          partOne: "Made by me with",
          partTwo: "this",
        },
        textModal: {
          madeWith: "Made with",
          hosting: "Hosting",
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
        works2: "Quelques réalisations",
        about: "À propos",
        contact: "Contact",
      },
      landing: {
        text: "Développeur Web",
      },
      works: {
        textOne: "Voir tout mes projets sur",
        textTwo: "mon GitHub",
        textThree: "et mes anciens dans",
        textFour: "mes archives",
      },
      about: {
        title: "Faisons connaissance",
        description: {
          textOne: "Salut !",
          textTwo: "Moi c'est Antoine, développeur web junior français.",
          textThree:
            "Attiré par les nouvelles technologies et le monde de demain, j'ai commencé à apprendre le développement informatique en autodidacte,",
          textFour:
            "arrivé dans mes études supérieures, je me suis naturellement tourné vers l'informatique, puis réorienté dans la spécificité du WEB.",
          textFive:
            "Actuellement au début de ma carrière, j'ai à coeur de découvrir le plus de choses possible et d'explorer de nouveaux challenges.",
          textSix:
            "Étant créatif, mon temps libre me laisse explorer la photographie, la vidéo et la découverte de demain (et le temps de jouer aux jeux vidéos également)",
        },
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
          partOne: "Fait main avec",
          partTwo: "ça",
        },
        textModal: {
          madeWith: "Fait grâce à",
          hosting: "Hébergement",
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
