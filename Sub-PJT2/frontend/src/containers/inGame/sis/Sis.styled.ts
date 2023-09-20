import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Container = styled.div`
  /* border: dotted red; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* min-width: fit-content !important; */
  min-height: 40rem;
  margin-top: 4rem;
`;

export const PlayerVidBundle = styled.div`
  /* border: solid black; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
  min-width: fit-content;
  min-height: fit-content;
  gap: 2rem;
  padding: 2rem 0 2rem 0;
  margin: 1rem;
`;

export const PlayerVid = styled.div`
  border: solid red;
  display: flex;
  width: 20%;
  height: 30%;
  min-width: 15rem;
  min-height: 10rem;
  position: relative;
`;

export const Center = styled.div<{ theme: themeProps }>`
  /* border: solid ${(props)=>props.theme.point.deep}; */
  border-radius: 0.4rem;
  background-color: ${(props) => props.theme.point.light};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 40%;
  min-height: fit-content;
  min-width: fit-content;
  padding: 1rem;
`;

export const CenterVid = styled.div`
  border: solid red;
  display: flex;
  width: 100%;
  height: 60%;
  min-width: 30rem;
  min-height: 20rem;
  position: relative;
`;

export const QuizContainer = styled.div<{ theme: themeProps }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.point.mid};
  width: 25rem;
  margin-top: 3rem;
  height: 8rem;
  padding: 1.5rem;
`;

export const QuizTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
`;

export const QuizWord = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 0.3rem;
  background-color: white;
  width: 90%;
  height: 50%;
  margin: 1rem;
  padding: 1rem;
  font-size: 1.3rem;
  font-weight: 900;
`;
