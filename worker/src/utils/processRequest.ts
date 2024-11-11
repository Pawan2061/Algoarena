import { CodeElement } from "../interface";
import { execute_python } from "./local";

export const processRequest = async (element: CodeElement) => {
  const langId = element.languageId;
  console.log("processsion Element :",element)

  switch (langId) {
    case "1":
      const ans = execute_python(element.code)
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
