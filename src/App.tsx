import { FC } from "react";
import "./app.css";
import Test from "./pages/Test.page";
import { Route, Routes } from "react-router-dom";
import Results from "./pages/Results.page";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/result" element={<Results />} />
      </Routes>
    </>
  );
};

export default App;
