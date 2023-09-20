import * as S from "./Sis.styled";
import { useRef, useState, useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import brush from "asset/img/brush.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { InGameChatStatus, RoomInfo, MainStreamManager } from "atoms/atoms";
import "css/sis.css";
import UserVideoComponent from "containers/openvidu/UserVideoComponent";

interface SisProps {
  publisher: any; // publisher의 타입을 여기에 정확히 지정해주세요
  subscribers: any[]; // subscribers의 타입을 여기에 정확히 지정해주세요
  handleMainVideoStream: (stream: any) => void; // 함수 타입으로 프롭스 정의
}

const Sis = ({ publisher, subscribers, handleMainVideoStream }: SisProps) => {
  const theme: themeProps = useTheme();
  const mainStreamManager = useRecoilValue(MainStreamManager);
  const [roomInfo, setRoomInfo] = useRecoilState(RoomInfo); 
  const [inGameChatStatus, setInGameChatStatus] =  useRecoilState(InGameChatStatus);

  
  
  return (
    <Container
      className={!inGameChatStatus ? "Container-Sis" : "Container-Sis-withChat"}
    >
      <S.Container>
        {/* 사람 영상 뜰 자리 */}
        { roomInfo.roomType === "One" ? (
          <S.PlayerVidBundle>
            <S.PlayerVid><UserVideoComponent streamManager={publisher} onClick={handleMainVideoStream(publisher)}/></S.PlayerVid>
          </S.PlayerVidBundle>
        ) : (
          <S.PlayerVidBundle>
            <S.PlayerVid><UserVideoComponent streamManager={publisher} /></S.PlayerVid>
            <S.PlayerVid><UserVideoComponent streamManager={publisher} /></S.PlayerVid>
            <S.PlayerVid><UserVideoComponent streamManager={publisher} /></S.PlayerVid>
          </S.PlayerVidBundle>
        )
        }
        <S.Center theme={theme}>
          {/* 발언자 뜰 자리 */}
          <S.CenterVid>
            { mainStreamManager !== undefined ? (
              <UserVideoComponent streamManager={mainStreamManager} />
            ) : null }
          </S.CenterVid>
          <S.QuizContainer theme={theme}>
            <S.QuizTitle>제시어</S.QuizTitle>
            <S.QuizWord>새색시</S.QuizWord>
          </S.QuizContainer>
        </S.Center>
        {/* 사람 영상 뜰 자리 */}
        <S.PlayerVidBundle>
          {subscribers.map((sub, i) => {
            return(
              <S.PlayerVid><UserVideoComponent streamManager={sub}  onClick={handleMainVideoStream(sub)}/></S.PlayerVid>
              )})}
        </S.PlayerVidBundle>
      </S.Container>
    </Container>
  );
};

const Container = styled.div`
  /* border: solid green 5px; */
  display: flex;
  flex-direction: row;
  /* height: calc(100vh - 3rem); */
  transition: all 1s;
  min-height: fit-content;
  min-width: fit-content;
`;

export default Sis;
