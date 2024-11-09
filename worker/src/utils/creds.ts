export const getOptions = async (code: string) => {
  const key = process.env.JUDGE0_KEY;
  const host = process.env.JUDGE_HOST;
  const options = {
    method: "POST",
    url: `https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*`,
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      "X-RapidAPI-Key": "5c47cd0144msh7d38df2c558f990p1132a5jsnb0b367924022",
    },
    data: code,
  };
  console.log(options.data, "hi");

  //   return options.data;
};
