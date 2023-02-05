import { SHA256 } from "crypto-js";

const createHash = (str1, str2) => {
  let arr1 = [str1, str2];
  const sortAlphaNum = (a, b) => a.localeCompare(b, "en", { numeric: true });
  const arrayOutput = arr1.sort(sortAlphaNum);
  const hash = SHA256(arrayOutput.join("")).toString();
  return hash;
};

export default createHash;