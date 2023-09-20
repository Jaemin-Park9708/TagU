import { useState, useEffect } from "react";
import * as S from "./Bubble.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";

type bubbleProps = {
  text: string;
  time: Date;
  owner: "user" | "otherUser";
};
const Bubble = ({ text, time, owner }: bubbleProps) => {
  const theme: themeProps = useTheme();
  return (
    <>
      <S.ChatBox owner={owner}>{text}</S.ChatBox>
      <S.Time owner={owner}>{time.toLocaleString()}</S.Time>
    </>
  );
};

export default Bubble;
