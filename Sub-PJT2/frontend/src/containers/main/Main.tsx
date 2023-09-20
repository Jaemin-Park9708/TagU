import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import { IsDark, TokenValue } from "../../atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { darkTheme, lightTheme } from "../../styles/ColorSystem";
import GlobalStyle from "../../styles/GlobalStyle";
import LeftContainer from "../leftContainer";
import RightContainer from "../rightContainer";
import Router from "../../Router";

import { BrowserRouter } from "react-router-dom";
import FriendContainer from "containers/friendContainer";
import { Cookies } from "react-cookie";
import { useEffect, useRef, useState } from "react";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

function Main() {
  const isDark = useRecoilValue(IsDark);
  const showSideBar = () => {
    const position = document.location.pathname;
    if (
      position === "/chatList" ||
      position.search("/chatRoom") === 1 ||
      position === "/mypage" ||
      position === "/home"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const cookies = new Cookies();
  const [token, setToken] = useRecoilState(TokenValue);
  const [location, setLocation] = useState<string>("");
  const [userStatus, setUserStatus] = useState<string>("");

  useEffect(() => {
    const T = cookies.get("Auth");
    setToken(T);
  }, [cookies.get("Auth")]);
  useEffect(() => {
    if (!token) return;
    setLocation(window.location.pathname);
  }, [token]);
  useEffect(() => {
    // console.log(location);
    // console.log(location.search("meeting"));
    if (location.search("meeting") == 1) {
      setUserStatus("ingame");
    } else {
      setUserStatus("online");
    }
  }, [location]);
  useEffect(() => {
    if (
      userStatus === "" ||
      location.search("meeting") === 1 ||
      location === "/chatTest" ||
      location === "/" ||
      location === null ||
      !token
    )
      return;
    // console.log(">>>>유저 접속 정보: " + userStatus);
    // console.log("접속 여부 알려주는 connectHandler 발동");
    token && connectHandler();
  }, [userStatus]);

  const client = useRef<CompatClient>();
  const connectHandler = () => {
    client.current = Stomp.over(() => {
      const socket = new SockJS(`${process.env.REACT_APP_BASE_URL}/ws/chat`);
      // 여기서 url 조정하면 됨
      return socket;
    });
    const headers = {
      Auth: token,
      Info: userStatus,
    };
    client.current.connect(headers, () => {
      console.log("WebSocket Connected");
    });
    client.current.debug = () => {
      // console.log("아무것도 안한다.");
    };
  };
  // pathname이 바뀔 경우 pathname이 meeting이 아니면 userStatus를 null로 바꿔야 함
  // useEffect(() => {
  //   console.log(token);
  //   console.log("위치: " + location);
  //   if (location !== "" && location !== "/" && location !== "/input") {
  //     if (location.search("meeting") === 1) {
  //       fetch(`${process.env.REACT_APP_BASE_URL}/users/setUserStatus`, {
  //         method: "POST",
  //         body: "INGAME",
  //         headers: {
  //           Auth: token,
  //         },
  //       });
  //     } else {
  //       fetch(`${process.env.REACT_APP_BASE_URL}/users/setUserStatus`, {
  //         method: "POST",
  //         body: "ONLINE",
  //         headers: {
  //           Auth: token,
  //         },
  //       });
  //     }
  //   }
  // }, [location]);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Global styles={GlobalStyle} />
      <BrowserRouter>
        <Container theme={isDark}>
          {/* {Router.caller.name} */}
          {showSideBar() ? <LeftContainer /> : null}
          <RightContainer>
            <Router />
          </RightContainer>
          {showSideBar() ? <FriendContainer /> : null}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const Container = styled.div<{ theme: boolean }>`
  display: flex;
  background-color: ${(props) =>
    props.theme ? darkTheme.bg.light : lightTheme.bg.light};
  /* border: dotted red 5px; */
  width: 100% !important;
  height: 100% !important;
  min-height: fit-content;
  min-width: 40rem;
`;

export default Main;
