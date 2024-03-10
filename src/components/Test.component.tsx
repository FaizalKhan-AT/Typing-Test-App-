import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { typingTestParagraphs } from "../data";
import { IFormData } from "./Register.component";

interface Props {
  getRegData: () => IFormData | undefined;
}
const TestComponent: FC<Props> = ({ getRegData }) => {
  const [areaValue, setAreaValue] = useState<string>("");
  const [testPara, setTestPara] = useState<string>("");
  const [timer, setTimer] = useState<number>(60);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [wpm, setWpm] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<number>(0);
  const [totalWords, setTotalWords] = useState<number>();

  const [startTimer, setStartTimer] = useState<boolean>(false);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  function getTestPara(): string {
    return typingTestParagraphs[
      Math.floor(Math.random() * typingTestParagraphs.length)
    ];
  }

  const calculateAccuracyAndWpm = () => {
    const correctWords = testPara.split(/\s+/);
    const typedWords = areaValue.trim().split(/\s+/);
    let wordsTyped;
    let wordsPerMinute;
    let correctWordCount = 0;
    if (testPara === areaValue) {
      setStartTimer(false);
      disableArea();
      submitResult();
      return;
    }
    for (let i = 0; i < Math.min(correctWords.length, typedWords.length); i++) {
      if (correctWords[i] === typedWords[i]) {
        wordsTyped = typedWords.length;
        wordsPerMinute = Math.round((wordsTyped / (60 - timer)) * 60);
        correctWordCount++;
        setWpm(wordsPerMinute);
        setCorrectWords(correctWordCount);
      }
    }

    const newAccuracy = Math.round(
      (correctWordCount / correctWords.length) * 100
    );
    setAccuracy(newAccuracy);
  };

  const onChange = (e: FormEvent) => {
    const target = e.target as HTMLTextAreaElement;
    if (target.value && areaValue === "") setStartTimer(true);
    setAreaValue(target.value);
  };

  const disableArea = () => {
    if (areaRef.current) areaRef.current.disabled = true;
  };

  useEffect(() => {
    if (startTimer) {
      let interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);

      if (timer === 0) {
        setStartTimer(false);
        disableArea();
        submitResult();
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  }, [startTimer, timer]);

  useEffect(() => {
    if (startTimer) calculateAccuracyAndWpm();
  }, [areaValue, timer]);

  useEffect(() => {
    const para = getTestPara();
    setTestPara(para);
    setTotalWords(para.split(/\s+/).length);
  }, []);

  const submitResult = () => {
    let result = { ...getRegData(), time: timer, accuracy, wpm, correctWords };
    const results = JSON.parse(localStorage.getItem("results") as string);
    if (results) {
      let newRes = [...results, result];
      localStorage.setItem("results", JSON.stringify(newRes));
    } else localStorage.setItem("results", JSON.stringify([result]));
  };

  return (
    <>
      <div
        onClick={() => areaRef.current?.focus()}
        className="container container-body d-flex flex-column gap-4 align-items-center justify-content-center"
      >
        <nav className="w-100 d-flex align-items-center p-2">
          <div className="w-100 d-flex align-items-center gap-3">
            <label>
              WPM: <span className="metrics">{wpm}</span> words
            </label>
            |
            <label>
              Accuracy: <span className="metrics">{accuracy}%</span>
            </label>
            |
            <label>
              Correct words:{" "}
              <span className="metrics">
                {correctWords} / {totalWords}
              </span>
            </label>
          </div>
          <div
            className={`timer d-flex align-items-center fw-bold justify-content-center ${
              timer < 21 ? "text-danger" : ""
            }`}
          >
            {timer}
          </div>
        </nav>
        <div className="content-card fs-5">
          {testPara ? testPara : "Loading test..."}
        </div>
        <textarea
          value={areaValue}
          onChange={onChange}
          autoFocus
          ref={areaRef}
          spellCheck="false"
          autoCapitalize="false"
          autoComplete="false"
          placeholder="Start Typing"
          className="textarea-card mt-1"
        ></textarea>
      </div>
    </>
  );
};

export default TestComponent;
