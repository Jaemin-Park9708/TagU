import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Container = styled.div`
  /* border: solid green 5px; */
  display: flex;
  flex-direction: row;
  /* height: 100vh; */
  transition: all 1s;
  /* width: 100%; */
  height: 100%;
  margin-top: 2rem;
`;

export const InnerContainer = styled.div`
  /* border: dotted red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: fit-content;
  min-height: 40rem;
  margin-top: 4rem;
`;

export const PlayerVidBundle = styled.div`
  /* border: solid black; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 45%;
  min-width: fit-content;
  min-height: fit-content;
  gap: 2rem;
  /* padding: 2rem 0 2rem 0; */
  margin-top: 1rem;
`;

export const PlayerVid = styled.div`
  border: solid red;
  display: flex;
  width: 30%;
  height: 90%;
  min-width: 20rem;
  min-height: 16rem;
  position: relative;
`;

export const LifeContainer = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: fit-content;
  position: absolute;
  bottom: 0px;
`;

export const Life = styled.img`
  /* border: solid red; */
  width: 2rem;
  height: 2rem;
  margin: 0.5rem;
`;

export const Middle = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  margin-top: 1rem;
`;

export const Confess = styled.button<{ theme: themeProps }>`
  /* border: solid ${(props) => props.theme.point.mid}; */
  background-color: ${(props) => props.theme.point.mid};
  border-radius: 0.4rem;
  padding: 0.7rem 1rem 0.7rem 1rem;
  margin: 1rem 0 0 0;
  font-weight: 900;

  &:hover {
    cursor: pointer;
    /* background-color: ${(props) => props.theme.point.light}; */
  }

  &:active {
    background-color: ${(props) => props.theme.point.deep};
  }
`;

export const Saying = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.text};
  font-weight: 500;
`;
