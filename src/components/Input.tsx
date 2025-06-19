import { useState } from "react";
import "./Input.css";
import React from "react";

type InputProps = {
  placeholder?: string;
  value: string;
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  validade?: (value: string) => string | undefined;
};

const Input = ({
  placeholder,
  value,
  onChangeValue,
  label,
  validade,
}: InputProps) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validade) {
      const error = validade(event.target.value);
      setErrorMessage(error);
    }
    onChangeValue(event);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <span className="label">{label}</span>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="inputContainer"
      />
      <span style={{ color: "red" }}>{errorMessage}</span>
    </div>
  );
};

export default Input;