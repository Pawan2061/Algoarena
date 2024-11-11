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
