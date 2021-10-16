import styled from "styled-components";

export default function Input(rest) {
  return <InputContainer {...rest} />;
}

const InputContainer = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: #c9cba3;
  margin: 5px 10px;
  color: #000;
  padding: 8px 10px;
  border-radius: 4px;
  font-size: 18px;
  transition: all 250ms;

  &:hover {
    background: #472d30;
    color: #fff;
  }
`;
