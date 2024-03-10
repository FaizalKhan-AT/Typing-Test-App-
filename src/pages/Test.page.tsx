import { FC, useState } from "react";
import TestComponent from "../components/Test.component";
import Register, { IFormData } from "../components/Register.component";
import Footer from "../components/Footer.component";

const Test: FC = () => {
  const [isReg, setIsReg] = useState<boolean>(true);
  const [regData, setRegData] = useState<IFormData>();
  const register = (data: IFormData) => {
    setRegData(data);
    setIsReg(false);
  };
  const getRegData = () => regData;
  return (
    <>
      {isReg ? (
        <Register register={register} />
      ) : (
        <TestComponent getRegData={getRegData} />
      )}
      <Footer />
    </>
  );
};

export default Test;
