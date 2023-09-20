import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Container = styled.div<{ theme: themeProps }>`
  /* border: solid green 4px; */
  background-color: ${(props) => props.theme.bg.light};
  transition: 500ms;
  width: calc(100% - 500px);
  height: 95%;
`;

export const ProfileImg = styled.div`
  background-color: red;
  border-radius: 5px;
  object-fit: cover;
  width: 360px;
  padding: 10px;
`;
