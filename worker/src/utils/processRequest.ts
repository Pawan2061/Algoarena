import { json } from "express";
import { CodeElement } from "../interface";
import { createSubmission, getSubmission } from "./creds";
import { pushClient } from "..";

const responseQueue = "responsequeue";

export const processRequest = async (element: CodeElement) => {
  const langId = element.languageId;

  switch (langId) {
    case "70":
      console.log("inside the case");

      const input = {
        language_id: parseInt(element.languageId),
        source_code: btoa(element.code),
      };

      const resp = await createSubmission(input);

      const showResult = async () => {
        console.log("inside the showresult");

        const result: any = await getSubmission(resp.token);
        console.log(result);

        if (result.status_id === 1 || result.status_id === 2) {
          console.log("waiting ..");
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } else {
          const decodedOutput = result?.stdout ? atob(result.stdout) : "";
          return decodedOutput;
        }
      };
      console.log("outside showresult");

      const finalOut = await showResult();

      await pushClient.lPush(responseQueue, JSON.stringify(finalOut));
      console.log("pushed the code");

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
