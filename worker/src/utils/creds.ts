export const getOptions = async (input: {
  language_id: number;
  source_code: string;
}) => {
  const key = process.env.JUDGE0_KEY;
  const host = process.env.JUDGE_HOST;

  const options = {
    method: "POST",
    url: `https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*`,
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Host": process.env.JUDGE_HOST, // Use environment variable for host
      "X-RapidAPI-Key": process.env.JUDGE0_KEY, // Use environment variable for API key
    },
    data: {
      source_code: input.source_code, // Use source_code from input
      language_id: input.language_id, // Use language_id from input
    },
  };

  console.log(options.data, "hi");

  // Return the entire options object (not just the data)
  return options;
};
