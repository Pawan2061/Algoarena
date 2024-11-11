import { pushClient } from "..";
import { CodeElement } from "../interface";
import { execute_python } from "./local";

async function execute_js(source_code: string): Promise<string> {
  return "JavaScript execution result";
}

async function execute_cpp(source_code: string): Promise<string> {
  return "C++ execution result";
}

async function handleResponse(ans: any, id : string) {
  
  const result = JSON.stringify(ans)

  console.log(typeof result)
  console.log("Publishing result to API: and id", result , id);

  console.log(pushClient.isOpen)

  await pushClient.publish(id,result)
}

export const processRequest = async (element: CodeElement) => {
  const langId = element.language_id.toString();
  console.log("Language ID:", langId, "\nRequest ID:", element.queueId);
  console.log("Processing Element:", element);

  try {
    let ans;
    switch (langId) {
      case "1":
        console.log("Starting execution of Python code");
        ans = await execute_python(element.source_code);
        break;

      case "2":
        console.log("Starting execution of JavaScript code");
        ans = await execute_js(element.source_code);
        break;

      case "3":
        console.log("Starting execution of C++ code");
        ans = await execute_cpp(element.source_code);
        break;

      default:
        console.log("Unknown language");
        ans = { error: "Unsupported language" };
    }
    await handleResponse(ans, element.queueId);
  } catch (error: any) {
    console.error(`Error executing code for language ID ${langId}:`, error);
    await handleResponse({ error: error.message || "Execution error" }, element.queueId);
  }
};
