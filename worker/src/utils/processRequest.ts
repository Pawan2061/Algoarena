import { CodeElement } from "../interface";
import { execute_python_code } from "./local";

const responseQueue = "responsequeue";

export const processRequest = async (element: CodeElement) => {
  const langId = element.languageId;

  switch (langId) {
    case "1":
      const ans = execute_python_code(element.code)
      console.log("Python ans :",ans)
      return ""
      

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
