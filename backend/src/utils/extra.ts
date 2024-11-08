import { languages } from "./languages";
import prisma from "./prisma";
import { exec } from "child_process";

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
// export const runPythonCode = async (pythonCode: string): Promise<string> => {
//     return new Promise((resolve, reject) => {

//         exec(command, (error, stdout, stderr) => {
//             if (error) {
//                 console.error(`Error executing Python code: ${error.message}`);
//                 reject(`Error: ${error.message}`);
//                 return;
//             }
//             if (stderr) {
//                 console.error(`Python stderr: ${stderr}`);
//                 reject(`Error: ${stderr}`);
//                 return;
//             }
//             console.log(`Python Output: ${stdout}`);
//             resolve(stdout);
//         });
//     });
// };

export const runCode = async (code: string) => {
  const command = `python3 -c "${code.replace(/"/g, '\\"')}"`;

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return error;
      }
      if (stderr) {
        return stderr;
      }
      const ans = stdout;
      resolve(ans);
    });
  });
};
