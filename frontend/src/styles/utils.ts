import styled from "styled-components";
import { colors } from "./colors";

interface ContainerProps {
  aligment?: "center" | "baseline" | "flex-end" | "flex-start" | "stretch";
  justify?:
    | "flex-end"
    | "flex-start"
    | "space-arround"
    | "space-between"
    | "center";
  padding?: string;
  margin?: string;
  width?: string;
  heigth?: string;
  gap?: string;
}

interface ButtonProps {
  styling?: "primary" | "secondary" | "default" | "danger" | "success";
  round?: "full" | "rounded";
}

export const FlexRow = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.aligment};
  justify-content: ${(props) => props.justify};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  height: ${(props) => props.heigth};
  gap: ${(props) => props.gap};
`;

export const FlexColumn = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.aligment};
  justify-content: ${(props) => props.justify};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  height: ${(props) => props.heigth};
  gap: ${(props) => props.gap};
`;

export const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 12px 18px;
  font-weight: bold;
  color: #fff;
  border-radius: ${(props) => {
    if (props.round === "full") {
      return "30px";
    } else {
      return "6px";
    }
  }};
  background: ${(props) => {
    const { styling } = props;
    const color = colors[styling];
    return color ? color : "#b0bec5";
  }};
  transition: all 0.3s ease-in-out;
  &:hover {
    filter: brightness(1.05);
    transition: all 0.3s ease-in-out;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  }
  &:disabled {
    cursor: not-allowed;
    filter: grayscale();
    opacity: 0.7;
  }
`;

export const GhostBtn = styled.button`
  border: none;
  background: transparent;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  transition: all 0.3s ease-in-out;
  .text {
    display: none;
    opacity: 0;
    margin-left: 5px;
  }
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
    transition: all 0.3s ease-in-out;
    border: 1px solid #555;
    .text {
      display: block;
      opacity: 1;
    }
  }
`;
