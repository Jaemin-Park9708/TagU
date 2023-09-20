import { themeProps } from "@emotion/react";
import styled from "@emotion/styled";

export const ChatBox = styled.div<{ owner: "user" | "otherUser" }>`
  display: inline-block;
  background-color: ${(props) => (props.owner === "user" ? "red" : "blue")};
  margin-left: ${(props) => (props.owner === "user" ? "80%" : "0")};
  margin-right: ${(props) => (props.owner === "user" ? "0" : "60%")};
  border-radius: 10px;
  padding: 16px;
  font-size: 16px;
  font-weight: 400;
`;

export const Time = styled.div<{ owner: "user" | "otherUser" }>`
  margin-left: ${(props) => (props.owner === "user" ? "80%" : "0")};
  margin-right: ${(props) => (props.owner === "user" ? "0" : "60%")};
  font-size: 8px;
  font-weight: 400;
`;
