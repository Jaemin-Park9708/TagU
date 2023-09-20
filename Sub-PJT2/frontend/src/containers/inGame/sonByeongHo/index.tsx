import * as S from "./SonByeongHo.styled";
import { useRef, useState, useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useRecoilState } from "recoil";
import { InGameChatStatus, RoomInfo } from "atoms/atoms";
import "css/sonByeongHo.css";
import lifeImg from "asset/img/icons8-heart-40.png";
import UserVideoComponent from "containers/openvidu/UserVideoComponent";

interface SonByeongHoProps {
  publisher: any; // publisher의 타입을 여기에 정확히 지정해주세요
  subscribers: any[]; // subscribers의 타입을 여기에 정확히 지정해주세요
}

const SonByeongHo = ({ publisher, subscribers }: SonByeongHoProps) => {
  const theme: themeProps = useTheme();
  const [roomInfo, setRoomInfo] = useRecoilState(RoomInfo);
  const [inGameChatStatus, setInGameChatStatus] =
    useRecoilState(InGameChatStatus);

  // 양심선언 버튼 누를 경우 유의 사항
  // 1. "각 개인의" 목숨 카운트가 줄어야 함 => 각 개인의 정보를 prop으로 가져와야할듯
  //     아니면 이거도 webSocket을 이용해야하나?
  //     양심선언 버튼을 누를때마다 socket에 send하고 같은 방에 연결되어 있는 모든 사용자에게
  //     모두 같은 정보를 뿌려야 하므로 webSocket을 사용하는 것이 맞을듯
  //     아니면 webRTC? 일단은 webSocket으로 진행해봐야겠다.
  // 2. 한 차례당 한번씩만 눌리게 해야됨
  // 3. 목숨 카운트가 0이 된 사람이 한명이라도 있을 경우 게임 종료
  // 4. 목숨 카운트가 0이 된 사람이 나온 직후가 아닌 그 턴이 종료 된 후에 게임 종료

  const [player1LifeCnt, setPlayerLifeCnt1] = useState(5);
  const [player2LifeCnt, setPlayerLifeCnt2] = useState(5);
  const [player3LifeCnt, setPlayerLifeCnt3] = useState(5);
  const [player4LifeCnt, setPlayerLifeCnt4] = useState(5);
  const [player5LifeCnt, setPlayerLifeCnt5] = useState(5);
  const [player6LifeCnt, setPlayerLifeCnt6] = useState(5);

  const playerLifeCalc = (playerLifeCnt: number) => {
    const result = [];
    for (let i = 0; i < playerLifeCnt; i++) {
      result.push(<S.Life src={lifeImg} alt="Life" key={i}></S.Life>);
    }
    return result;
  };

  const handleClickConfess1 = () => {
    setPlayerLifeCnt1(player1LifeCnt - 1);
  };

  const handleClickConfess2 = () => {
    setPlayerLifeCnt2(player2LifeCnt - 1);
  };

  const handleClickConfess3 = () => {
    setPlayerLifeCnt3(player3LifeCnt - 1);
  };

  const handleClickConfess4 = () => {
    setPlayerLifeCnt4(player4LifeCnt - 1);
  };

  const handleClickConfess5 = () => {
    setPlayerLifeCnt5(player5LifeCnt - 1);
  };

  const handleClickConfess6 = () => {
    setPlayerLifeCnt6(player6LifeCnt - 1);
  };


  const [turnEnd, setTurnEnd] = useState<boolean>(false);

  // 매 턴이 종료되는 시점은
  // 1. 모든 사람이 양심 선언을 누르거나
  // 2. 10초가 지날 경우

  // 매 턴이 종료되는 시점에
  if (turnEnd) {
    // player 중 한명이라도 lifeCnt가 0이라면
    if (
      !player1LifeCnt ||
      !player2LifeCnt ||
      !player3LifeCnt ||
      !player4LifeCnt ||
      !player5LifeCnt ||
      !player6LifeCnt
    ) {
      // 게임 종료
    } else {
      // 턴 끝났다는 표시 false로 바꾸기
      setTurnEnd(false);
    }
  }

  return (
    <S.Container
      className={!inGameChatStatus ? "Container-Son" : "Container-Son-withChat"}
    >
      <S.InnerContainer>
      { roomInfo.roomType === "One" ? (
          <S.PlayerVidBundle>
            <S.PlayerVid>
              <UserVideoComponent streamManager={publisher} />
              <S.LifeContainer>{playerLifeCalc(player1LifeCnt)}</S.LifeContainer>
            </S.PlayerVid>
          </S.PlayerVidBundle>
        ) : (
          <S.PlayerVidBundle>
            <S.PlayerVid>
              <UserVideoComponent streamManager={publisher} />
              <S.LifeContainer>{playerLifeCalc(player1LifeCnt)}</S.LifeContainer>
            </S.PlayerVid>
            <S.PlayerVid>
              <UserVideoComponent streamManager={publisher} />
              <S.LifeContainer>{playerLifeCalc(player2LifeCnt)}</S.LifeContainer>
            </S.PlayerVid>
            <S.PlayerVid>
              <UserVideoComponent streamManager={publisher} />
              <S.LifeContainer>{playerLifeCalc(player3LifeCnt)}</S.LifeContainer>
            </S.PlayerVid>
          </S.PlayerVidBundle>
        )
        }
        <S.Middle>
          <S.Saying theme={theme}>
            세상에서 가장 품위있는 소리는 침착한 양심의 소리이다. - 셰익스피어
          </S.Saying>
          <S.Confess theme={theme} onClick={handleClickConfess1}>
            양심 선언
          </S.Confess>
        </S.Middle>
        {/* 사람 영상 뜰 자리 */}
        <S.PlayerVidBundle>
          {subscribers.map((sub, i) => {
            return(
              <S.PlayerVid>
                <UserVideoComponent streamManager={sub} />
                <S.LifeContainer>{playerLifeCalc(player4LifeCnt)}</S.LifeContainer>
              </S.PlayerVid>
              )})}
        </S.PlayerVidBundle>
      </S.InnerContainer>
    </S.Container>
  );
};

export default SonByeongHo;
