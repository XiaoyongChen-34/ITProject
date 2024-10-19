const FINISHED_CODE_URL = "http://localhost:8080/finishCode";
const CODE_URL = "http://localhost:8080/generate_code";

// Creates a post request and sends the topic selected to the back end server
export default function connectBackend() {}

export function checkCode(finishedCode, setOutput, setEntry) {
  console.log(finishedCode);
  const param = new URLSearchParams();
  param.append("code", finishedCode.join("$"));
  fetch(`${FINISHED_CODE_URL}?${param.toString()}`, {
    mode: "cors",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (data?.accuracy) {
        setOutput(data);
        setEntry((entry) => ({
          ...entry,
          correctness: String(data.accuracy),
        }));
      }
    })
    .catch((err) => console.log("Error fetching data", err));
}

export function getProblem(option, setMsg, setEntry) {
  const param = new URLSearchParams(option);
  fetch(`${CODE_URL}?${param.toString()}`, {
    mode: "cors",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      setMsg(data);
      console.log(data.code)
      setEntry((entry) => ({ ...entry, question: data.code.join('$') }));
    })
    .catch((err) => console.log(err));
}
