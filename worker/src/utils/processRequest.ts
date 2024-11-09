import { json } from "express";
import { CodeElement } from "../interface";
import axios from "axios";
import { createSubmission, getResults, getSubmission } from "./creds";

export const processRequest = async (element: CodeElement) => {
  const langId = element.languageId;

  switch (langId) {
    case "70":
      const input = {
        language_id: parseInt(element.languageId),
        source_code: btoa(element.code),
      };

      const resp = await createSubmission(input);

      const showResult = async () => {
        const result: any = await getSubmission(resp.token);
        if (result.status_id === 1 || result.status_id === 2) {
          console.log("waiting ..");
          setTimeout(showResult, 2000);
        } else {
          console.log("completed");
          const decodedOutput = result?.stdout ? atob(result.stdout) : "";
          return decodedOutput;
        }
      };

      const output = await showResult();
      console.log("first thing", output, "final thing is here");

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
