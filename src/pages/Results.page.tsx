import { FC, useEffect, useState } from "react";
import { IFormData } from "../components/Register.component";
import Footer from "../components/Footer.component";

interface IResult extends IFormData {
  wpm: number;
  accuracy: number;
  correctWords: number;
  time: number;
}
const Results: FC = () => {
  const [results, setResults] = useState<IResult[]>([]);
  useEffect(() => {
    let results = JSON.parse(localStorage.getItem("results") as string);
    if (results) {
      results = results.sort((a: IResult, b: IResult) => {
        if (b.wpm !== a.wpm) return b.wpm - a.wpm;

        if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;

        return a.time - b.time;
      });
      setResults(results);
    }
  }, []);
  return (
    <div className="container container-body d-flex flex-column gap-4 align-items-center justify-content-center">
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th className="col">Sl.No</th>
            <th className="col">Name</th>
            <th className="col">Semester</th>
            <th className="col">Branch</th>
            <th className="col">WPM</th>
            <th className="col">Accuracy</th>
            <th className="col">CorrectWords</th>
            <th className="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0
            ? results.map((item, idx) => (
                <tr key={item.name + item.sem + idx}>
                  <td className="col">{idx + 1}</td>
                  <td className="col">{item.name}</td>
                  <td className="col">{item.sem}</td>
                  <td className="col">{item.branch}</td>
                  <td className="col">{item.wpm} words</td>
                  <td className="col">{item.accuracy} %</td>
                  <td className="col">{item.correctWords} words</td>
                  <td className="col">{item.time} seconds</td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default Results;
