import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Conatiner = styled.div`
  /* border: solid black; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const LogoContainer = styled.div`
  /* border: solid red; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Logo = styled.img`
  /* border: solid green; */
  width: 15rem;
  height: 5rem;
  margin-top: 3rem;
`;
export const SadFace = styled.img`
  /* border: solid green; */
  width: 7rem;
  height: 7rem;
  margin: 5rem 0 0 2rem;
  margin-top: 3rem;
`;

export const NoticeContainer = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 50rem;
  padding: 3rem;
`;

export const NoticeArticle = styled.div<{ theme: themeProps }>`
  /* border: solid red; */
  color: ${(props) => props.theme.font.text};
`;

export const NoticeTitle = styled.div`
  /* border: solid green; */
  padding: 1rem;
  font-weight: 900;
  font-size: 3rem;
`;

export const NoticeContent = styled.div`
  /* border: solid yellow; */
  padding: 1rem;
  font-weight: 600;
  font-size: 2rem;
`;

export const ButtonContainer = styled.div`
  /* border: solid white; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 4rem;
  gap: 2rem;
  font-weight: bolder;
  font-size: 2rem;
  color: black;
`;

export const GoBackBtn = styled.button<{ theme: themeProps }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.point.mid};
  width: 15rem;
  height: 5rem;
  border-radius: 0.3rem;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: ${(props) => props.theme.point.light};
  }
`;

export const GoHomeBtn = styled.button<{ theme: themeProps }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.point.deep};
  width: 15rem;
  height: 5rem;
  border-radius: 0.3rem;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: ${(props) => props.theme.point.light};
  }
`;
