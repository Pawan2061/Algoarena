import axios from "axios";

export const createSubmissionCode = async (code: {
  language_id: number;
  source_code: string;
}): Promise<any> => {
  try {
    const key = process.env.JUDGE0_KEY;
    const host = process.env.JUDGE_HOST;
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "5c47cd0144msh7d38df2c558f990p1132a5jsnb0b367924022",
      },
      data: {
        language_id: code.language_id,
        source_code: code.source_code,
      },
    };

    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export const getSubmission = async (token: string) => {
  console.log(token, "is here token");

  try {
    const options = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "5c47cd0144msh7d38df2c558f990p1132a5jsnb0b367924022",
      },
    };

    const response = await axios.request(options);
    console.log(response.data);

    return response.data;
  } catch (error) {
    return error;
  }
};
export const getResults = async (
  token: string
): Promise<string | undefined> => {
  let response;
  try {
    while (true) {
      response = await getSubmission(token);

      // Check if processing is done
      if (response.status && response.status.id >= 3) {
        break; // Break the loop if status is no longer "processing"
      }

      console.log("Processing... Retrying in 2 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // Check for output after processing completes
    if (response.stdout) {
      const decodedOutput = atob(response.stdout);
      return decodedOutput;
    } else if (response.stderr) {
      const errorOutput = atob(response.stderr);
      return `Error: ${errorOutput}`;
    } else {
      console.log("No output available.");
      return undefined;
    }
  } catch (error) {
    console.error("Error retrieving results:", error);
    return undefined;
  }
};
