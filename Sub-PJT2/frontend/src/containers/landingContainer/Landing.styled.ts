import styled from "@emotion/styled";
import Button from "components/button";
import { keyframes, themeProps } from "@emotion/react";

export const LandingOuter = styled.div`
  /* border: solid black 5px !important; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-width: 70rem;
  height: 100%;
`;

export const Container = styled.div`
  /* border: solid yellow 5px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 80%;
  width: 100%;
  column-gap: 30px;
`;

export const LogoBox = styled.div`
  width: 400px;
  height: 400px;
  background-color: #f43f5e;
  border-radius: 40px;
`;

export const TextBox = styled.div`
  display: inline-block;
`;

export const Btn = styled(Button)`
  margin-top: 20px;
`;

export const Nav = styled.div`
  /* border: solid black 3px; */
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: relative;
  width: 100%;
`;

const upAni = keyframes`
  from {
    top: 30px;
  }
  to {
    top:20px;
  }
`;

export const Img = styled.img`
  /* border: solid green 3px; */
  /* position: absolute; */
  /* top: 30px; */
  display: flex;
  animation: ${upAni} 1s ease;
  margin-right: 20rem;
`;
