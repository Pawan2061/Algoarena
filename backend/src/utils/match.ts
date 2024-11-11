import { Output } from "../interface";

export const matchResults = async (expected: string, actual: string) => {
  try {
    console.log(expected, actual);

    if (expected === actual) {
      const output: Output = {
        expectedOutput: expected,
        actualOutput: actual,
        status: "done",
        statusCode: 200,
      };
      return {
        expectedOutput: output.expectedOutput,
        actualOutput: output.actualOutput,
        status: output.status,
        statusCode: output.statusCode,
      };
    }
    const output: Output = {
      expectedOutput: expected,
      actualOutput: actual,
      status: "error here",
      statusCode: 400,
    };
    return {
      expectedOutput: output.expectedOutput,
      actualOutput: output.actualOutput,
      status: output.status,
      statusCode: output.statusCode,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};
