import fs from "fs";
import { exec } from "child_process";

export const runCode = async (code: string) => {
  const command = `docker run `;
  const fileName = "pawan.py";
  console.log(code);

  fs.writeFileSync(fileName, code);
  console.log("reached the exec point");

  return new Promise((resolve, reject) => {
    console.log("inside promise");

    exec(command, (error, stdout, stderr) => {
      console.log("executing");

      if (error) {
        return reject(new Error(`Execution error: ${error.message}`));
      }
      if (stderr) {
        return reject(new Error(`stderr: ${stderr}`));
      }
      console.log("no error");
      console.log(stdout, "stdout is ehre");

      //   fs.unlinkSync(fileName);

      resolve(stdout);
    });
  });
};

export const runJavascript = async (code: string) => {
  const command = `node -e "${code.replace(/"/g, '\\"')}"`;

  const fileName = "pawan.js";
  fs.writeFileSync(fileName, code);

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(new Error(`Execution error : ${error.message}`));
      }
      if (stderr) {
        return reject(new Error(`stderr: ${stderr}`));
      }

      resolve(stdout);
    });
  });
};
