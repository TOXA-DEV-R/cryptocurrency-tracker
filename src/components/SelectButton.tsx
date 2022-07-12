/** @format */

import { FC } from "react";
import styled from "styled-components";

interface SelectButtonProps {
  children: JSX.Element | JSX.Element[] | string;
  selected: boolean;
  onClick(): void;
}

const SelectButton: FC<SelectButtonProps> = ({
  children,
  selected,
  onClick,
}) => {
  return (
    <SelectbuttonBtn selected={selected} onClick={onClick}>
      {children}
    </SelectbuttonBtn>
  );
};

export default SelectButton;

interface SelectbuttonBtnProps {
  selected: boolean;
}

export const SelectbuttonBtn = styled.span<SelectbuttonBtnProps>`
  border: 1px solid gold;
  border-radius: 5px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-family: "Montserrat";
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "gold" : "")};
  color: ${(props) => (props.selected ? "black" : "")};
  font-weight: ${(props) => (props.selected ? 700 : 500)};
  &:hover {
    background-color: gold;
    color: black;
  }
  width: "22%";
`;
