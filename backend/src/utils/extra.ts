import { languages } from "./languages";
import prisma from "./prisma";
import { exec } from "child_process";
import fs from "fs";

export const findProblemAndLanguage = async (
  id: string,
  languageId: string
) => {
  const problem = await prisma.problem.findUnique({
    where: {
      id: id,
    },
  });
  const language = languages.find((l) => l.id === languageId);
  return { language, problem };
};

export const runCode = async (code: string) => {
  const command = `python3 -c "${code.replace(/"/g, '\\"')}"`;
  const fileName = "pawan.py";
  fs.writeFileSync(fileName, code);

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(new Error(`Execution error: ${error.message}`));
      }
      if (stderr) {
        return reject(new Error(`stderr: ${stderr}`));
      }

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
export const runCodeJava = async (code: string) => {
  const fileName = "TempProgram.java";

  fs.writeFileSync(fileName, code);

  return new Promise((resolve, reject) => {
    exec(`javac ${fileName}`, (compileError, compileStdout, compileStderr) => {
      if (compileError) {
        return reject(new Error(`Compilation error: ${compileError.message}`));
      }
      if (compileStderr) {
        return reject(new Error(`Compilation stderr: ${compileStderr}`));
      }

      exec(
        `java ${fileName.replace(".java", "")}`,
        (runError, runStdout, runStderr) => {
          fs.unlinkSync(fileName);

          if (runError) {
            return reject(new Error(`Execution error: ${runError.message}`));
          }
          if (runStderr) {
            return reject(new Error(`Execution stderr: ${runStderr}`));
          }
          resolve(JSON.parse(runStdout));
        }
      );
    });
  });
};
