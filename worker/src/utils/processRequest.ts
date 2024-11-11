import { json } from "express";
import { CodeElement } from "../interface";
import { pushClient } from "..";
import { runJavascript } from "./local";

const responseQueue = "responsequeue";

export const processRequest = async (element: CodeElement) => {
  const langId = element.languageId;

  switch (langId) {
    case "1":
      const input = {
        language_id: parseInt(element.languageId),
        source_code: btoa(element.code),
      };

      const output = await runJavascript(input.source_code);
      await pushClient.lPush(responseQueue, JSON.stringify(output));

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
