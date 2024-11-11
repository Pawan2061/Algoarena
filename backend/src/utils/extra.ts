import { languages } from "./languages";
import prisma from "./prisma";
import { exec } from "child_process";
import fs from "fs";

export const findProblemAndLanguage = async (
  languageId: string,
  problemId: string
) => {
  console.log("inside finding problem");

  const problem = await prisma.problem.findUnique({
    where: {
      id: problemId,
    },
  });

  console.log("found the problem", problem);

  const language = languages.find((l) => l.id === languageId);
  return { language, problem };
};
