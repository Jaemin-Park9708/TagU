import * as S from "./Header.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { GameStart as GameStartAtom, RoomInfo, TokenValue } from "atoms/atoms";
import { useRecoilState } from "recoil";
import exitImg from "asset/img/icons8-exit-50.png";
import homeImg from "asset/img/home.png";
import tmpLogo from "asset/img/logo/2.png";
// import { roomProps } from "types/types";

interface HeaderProps {
  leaveSession: () => void;
}

const OPENVIDU_SERVER_URL = 'https://tagyou.site:8443';
const OPENVIDU_SERVER_SECRET = 'tagyou';

const Header = ({ leaveSession } : HeaderProps) => {
  const [roomInfo, setRoomInfo] = useRecoilState(RoomInfo); 
  const theme: themeProps = useTheme();
  const [GameStart, setGameStart] = useRecoilState(GameStartAtom);
  const [token, setToken] = useRecoilState(TokenValue);

  const GotoMeeting = () => {
    window.location.href = `/meeting/${roomInfo.roomId}`;
  };

  const Exit = () => {
  
    const persistedState = localStorage.getItem('recoil-persist'); // recoil-persist의 값 가져오기
    if (persistedState) {
      const parsedState = JSON.parse(persistedState);
      delete parsedState.RoomInfo; // RoomInfo 제거
  
      const updatedState = JSON.stringify(parsedState);
      localStorage.setItem('recoil-persist', updatedState); // 업데이트된 상태를 다시 로컬 스토리지에 저장
    }
    
    fetch(`${process.env.REACT_APP_BASE_URL}/rooms/one/quit/${roomInfo.roomId}`, {
      method: "POST",
      headers: {
        Auth: token,
        "Content-Type": "application/json",
      },
    })
  };

  const GotoHome = () => {
    alert("방 나가기 완료")
    Exit()
    leaveSession()
    window.location.href = "/home";
  };

  return (
    <S.Header theme={theme}>
      <S.Exit
        src={GameStart ? exitImg : homeImg}
        alt="exit"
        onClick={GameStart ? GotoMeeting : GotoHome}
      />
      <S.Logo src={tmpLogo} alt="logo" />
    </S.Header>
  );
};

export default Header;
function setRoomInfo(parsedRoomInfo: any) {
  throw new Error("Function not implemented.");
}

