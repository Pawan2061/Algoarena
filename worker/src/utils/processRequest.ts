import { runCode } from "../controllers/codeController";
import { CodeElement } from "../interface";
import axios from "axios";
import { getOptions } from "./creds";

export const processRequest = async (element: CodeElement) => {
  const langId = element.languageId;

  switch (langId) {
    case "52":
      const resp = await getOptions(element.code);

      //   const data = await axios.request(resp);
      //   console.log(data);

      return "Python";
    case "2":
      return "JavaScript";
    case "3":
      return "C++";
    case "4":
      return "Java";
    case "5":
      return "Ruby";
    case "6":
      return "Go";
    case "7":
      return "PHP";
    case "8":
      return "C#";
    case "9":
      return "Swift";
    case "10":
      return "Kotlin";
    default:
      return "Unknown Language";
  }
};
