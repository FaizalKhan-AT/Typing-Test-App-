import { FC, FormEvent, useState } from "react";

export interface IFormData {
  name: string;
  sem: string;
  branch: string;
}

interface Props {
  register: (data: IFormData) => void;
}

const Register: FC<Props> = ({ register }) => {
  const [data, setData] = useState<IFormData>({
    name: "",
    sem: "",
    branch: "",
  });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!data.name && !data.branch) return;
    register(data);
  };
  const onChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setData({ ...data, [target.name]: target.value });
  };
  return (
    <div className="container container-body d-flex flex-column gap-4 align-items-center justify-content-center">
      <form onSubmit={onSubmit} className="card d-flex flex-column p-3 gap-3">
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          value={data.name}
          onChange={onChange}
        />
        <select name="sem" onChange={onChange}>
          <option value="--Select your sem--" selected disabled>
            --Select your sem--
          </option>
          <option value="S1">S1</option>
          <option value="S2">S2</option>
          <option value="S3">S3</option>
          <option value="S4">S4</option>
          <option value="S5">S5</option>
          <option value="S6">S6</option>
        </select>
        <input
          value={data.branch}
          name="branch"
          type="text"
          placeholder="Enter your branch"
          onChange={onChange}
        />
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
