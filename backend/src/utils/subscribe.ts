import { subClient } from "../controllers/submissionController";
export const handleSubcribe = (
  uid: string,
  timeoutMs: number
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const channel = uid;

    const timeout = setTimeout(() => {
      subClient.unsubscribe(channel);
      reject(new Error("Response timed out"));
    }, timeoutMs);

    subClient.subscribe(channel, (data) => {
      console.log("received:", data)
      clearTimeout(timeout);
      subClient.unsubscribe(channel);
      resolve(data);
    });
  });
};
