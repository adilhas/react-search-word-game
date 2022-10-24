import WSGenerator from "../utils/WsGenerator";
import Grid from "./Grid";
import "../index.css";

const WordSearch = () => {
  let wsGenerator = new WSGenerator([
    { question: "Prophet who can heal by the order of Allah.", answer: "isa" },
    { question: "Prophet who can talk to Allah", answer: "musa" },
    { question: "Prophet who can talk to jins", answer: "suleiman" },
    {
      question: "Prophet who was thrown in well by his brothers",
      answer: "yusuf",
    },
    {
      question: "Prophet whose father used to be a statue maker",
      answer: "ibrahim",
    },
    {
      question: "Prophet whose name was never given to anyone before him.",
      answer: "yahya",
    },
    { question: "Propet to whom Allah revealed Zabur", answer: "dawood" },
    { question: "Prophet who was eaten alive by big fish", answer: "yunus" },
  ]);
  wsGenerator.setGridSize();
  wsGenerator.initGrid();
  wsGenerator.populateUnusedBoxes();

  console.log("<<>>", wsGenerator);

  return (
    <div id="root-container">
      <Grid ws={wsGenerator} />
    </div>
  );
};

export default WordSearch;
