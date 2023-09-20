import { themeProps } from "@emotion/react";
import { List, useTheme } from "@mui/material";
import * as S from "./InGameChat.styled";
import { useRef, useState, useEffect } from "react";
import { InGameChatStatus, TokenValue } from "atoms/atoms";
import "css/chat/inGameChat.css";

import sendButton from "asset/img/button_send.png";
import messageButton from "asset/img/message.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { motion, useAnimation } from "framer-motion";

// webSocket 관련
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import imgDown from "asset/img/icons8-down-100.png";
import { Cookies } from "react-cookie";

type SendingMessage = {
  content: string;
  message_type: string;
  meeting_room_id: number;
};

type ReceivingMessage = {
  content: string;
  message_type: string;
  sender: string;
  meeting_room_id: number;
};

const RightContainer = () => {
  const theme: themeProps = useTheme();

  // roomId 뒤에 임의로 해놓은 숫자 꼭 바꾸기!!!!!!!!!!!!!!!!!!!
  const [roomId, setRoomId] = useState<number>(0);
  const [items, setItems] = useState<ReceivingMessage[]>([]);
  const [lastMessage, setLastMessage] = useState<ReceivingMessage>();
  const [message, setMessage] = useState("");
  const [inGameChatStatus, setInGameChatStatus] =
    useRecoilState(InGameChatStatus);
  const [token, setToken] = useRecoilState(TokenValue);
  const [pullDown, setPullDown] = useState<boolean>(true);
  const [newMEssageNoticeStatus, setNewMEssageNoticeStatus] = useState({
    display: "none",
  });
  const [overMaxLengthStatus, setOverMaxLengthStatus] = useState({
    display: "none",
  });
  const cookies = new Cookies();

  const client = useRef<CompatClient>();

  const domainAddress = "www.tagyou.site";

  // 방번호 조회
  // const getRoomId = async () => {
  //   console.log("roomId 확인 전 발급된 토큰 확인: " + token);
  //   fetch(`${process.env.REACT_APP_BASE_URL}/rooms/one/${roomId}`, {
  //     method: "POST",
  //     headers: {
  //       Auth: token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data: Room) => {
  //       // console.log(data);
  //       // setRoomId(1);
  //     });
  // };

  // const roomSync = async () => {
  //   console.log("roomConnect 함수 실행");
  //   fetch(`${process.env.REACT_APP_BASE_URL}/chat/rooms/${roomId}`, {
  //     headers: {
  //       Auth: token,
  //     },
  //   }).then((res) => console.log(res));
  // };

  // 미팅룸에 들어올때 connectHandler에 roomId와 codeName 변수를 줘야함
  const connectHandler = () => {
    client.current = Stomp.over(() => {
      // 여기서 url 조정하면 됨
      const socket = new SockJS(`${process.env.REACT_APP_BASE_URL}/ws/chat`);
      return socket;
    });
    console.log("바로직전: " + token);
    const headers = {
      Auth: token,
    };
    client.current.connect(headers, () => {
      client.current?.subscribe(
        `/sub/chat/rooms/${roomId}`,
        (message) => {
          addItem(JSON.parse(message.body));
        },
        { Auth: token, RoomId: roomId + "" }
      );
    });
    requestChatHistory(roomId);
    console.log("token: " + token);
  };

  // 새로고침이나 렌더 후에 채팅방의 기존 채팅을 불러오는 부분
  const requestChatHistory = async (roomId: number) => {
    console.log("chatHistory 조회하기 전 토큰 확인: " + token);
    fetch(`${process.env.REACT_APP_BASE_URL}/chat/rooms/${roomId}/messages`, {
      headers: {
        Auth: token,
      },
    })
      .then((response) => response.json())
      .then((data: ReceivingMessage[]) => {
        for (let i = 0; i < data.length; i++) {
          addItem(data[i]);
        }
      });
  };

  useEffect(() => {
    const T = cookies.get("Auth");
    setToken(T);
    console.log("패쓰네임: " + window.location);
  }, [cookies.get("Auth")]);

  useEffect(() => {
    if(!token) return;
    // 연결됐던 방이 있다면 RoomId 조회
    // getRoomId();
    const location = window.location.pathname;
    console.log(location.substring(9, location.length));
    // pathname에서 방번호 가져오기 필수로 주석 없애야 함 !!!!!!!!!!!!!!!!!!!!
    if (location === "/chatTest") {
      // 채팅방 시연/테스트 할때 임의로 만든 채팅방의 id
      setRoomId(148);
    } else {
      setRoomId(parseInt(location.substring(9, location.length)));
    }
    console.log("방 번호: " + roomId);
    // 채팅 웹소켓 연결
    token && roomId && connectHandler();
  }, [token, roomId]);

  const handelScroll = () => {
    if (!chatScreenRef.current) return;
    if (chatScreenRef.current.scrollTop >= 0) {
      setNewMEssageNoticeStatus({ display: "none" });
    }
  };

  const addItem = (item: ReceivingMessage) => {
    if (item.message_type === "TALK" || "ENTER" || "EXIT") {
      let newItems: ReceivingMessage[] = [];
      newItems = items;
      newItems.push(item);
      if (!chatScreenRef.current) return;
      if (chatScreenRef.current.scrollTop >= 0) {
        setPullDown(true);
      } else {
        setPullDown(false);
      }
      setItems(newItems);
      setLastMessage(item);
    }
  };

  const handleChangeText = (e: any) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (message.length > 100) {
      setOverMaxLengthStatus({ display: "flex" });
    } else {
      setOverMaxLengthStatus({ display: "none" });
    }
  }, [message]);

  const messageSending: SendingMessage = {
    content: message,
    message_type: "TALK",
    meeting_room_id: roomId,
  };

  const handleClickSubmit = () => {
    if (!roomId || !client.current?.connected) {
      alert("채팅이 연결되지 않았습니다.");
    } else {
      if (message.length > 0) {
        client.current!.send(
          "/pub/chat/message",
          // "/chat/message",
          { Auth: token },
          JSON.stringify(messageSending)
        );
        setMessage("");
      } else {
        alert("메시지를 입력해주세요");
      }
    }
  };

  useEffect(() => {
    if (chatScreenRef.current) {
      if (pullDown) {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      } else if (!pullDown || chatScreenRef.current.scrollTop >= 0) {
        setNewMEssageNoticeStatus({ display: "flex" });
      }
    }
  }, [lastMessage]);

  const handleClickNewMessage = () => {
    if (!chatScreenRef.current) return;
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    setNewMEssageNoticeStatus({ display: "none" });
  };

  // 메시지 아이콘 누르면 채팅 창 열리고 닫히기 기능
  const handleClickMessage = () => {
    setInGameChatStatus(!inGameChatStatus);
  };

  // alt + c 누르면 채팅 나오는 기능
  window.onkeydown = (e) => {
    if (e.key === "c" && e.altKey) {
      handleClickMessage();
    }
  };

  const chatScreenRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const loadChats = () => {
    const result = [];
    for (let i = 0; i < items.length - 1; i++) {
      result.push(
        <S.Messages theme={theme} key={i}>
          <S.Sender>{items[i].sender}</S.Sender>
          <S.Content>{items[i].content}</S.Content>
        </S.Messages>
      );
    }
    if (lastMessage) {
      result.push(
        <S.Messages theme={theme} key={items.length - 1} ref={lastMessageRef}>
          <S.Sender>{lastMessage.sender}</S.Sender>
          <S.Content>{lastMessage.content}</S.Content>
        </S.Messages>
      );
    }
    return result;
  };

  const variants = {
    vibrate: () => ({
      x: 3,
      transition: {
        delay: 0.1,
        repeat: 7,
        duration: 0.1,
      },
    }),
  };

  return (
    <S.Container
      theme={theme}
      className={
        inGameChatStatus
          ? "inGameChatContainerShown"
          : "inGameChatContainerHidden"
      }
    >
      <S.ChatRoomMain theme={theme} className="chatRoomMain">
        <S.MessageButton
          theme={theme}
          onClick={handleClickMessage}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 1.1 }}
        >
          <S.MessageImg src={messageButton} alt="messageButton" />
        </S.MessageButton>
        <S.ChatRoomMainBox
          theme={theme}
          className={inGameChatStatus ? "chatBoxShown" : "chatBoxHidden"}
        >
          {/* 테스트용 User Input */}
          {/* <input type="text" value={user} onChange={handleUserChange} />
          <S.Button theme={theme} onClick={getRoomId}>
            Register
          </S.Button>
          <S.Button theme={theme} onClick={() => connectHandler(roomId)}>
            Connect
          </S.Button> */}
          <S.ChatRoomMainChats
            className="chatRoom-main-chats"
            theme={theme}
            ref={chatScreenRef}
            onScroll={handelScroll}
          >
            <S.ChatRoomMainChatsContent>
              {loadChats()}
            </S.ChatRoomMainChatsContent>
          </S.ChatRoomMainChats>
          <S.NewMessageNotice
            theme={theme}
            style={newMEssageNoticeStatus}
            onClick={handleClickNewMessage}
          >
            <S.ImgDown src={imgDown}></S.ImgDown>New Message
          </S.NewMessageNotice>
          <S.ChatRoomMainInput className="chatRoom-main-input" theme={theme}>
            <input
              value={message}
              onChange={handleChangeText}
              // onInput={numberMaxLength}
              maxLength={101}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.ctrlKey) {
                  return;
                } else if (e.key === "Enter") {
                  handleClickSubmit();
                }
              }}
            />
            <S.OverMaxLength
              style={overMaxLengthStatus}
              whileInView="vibrate"
              variants={variants}
            >
              최대 입력 가능한 글자 수를 초과하였습니다.
            </S.OverMaxLength>
            <div className="button-outer">
              <S.Button
                theme={theme}
                onClick={handleClickSubmit}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 1.1 }}
              >
                <img src={sendButton} alt="send" />
              </S.Button>
            </div>
          </S.ChatRoomMainInput>
        </S.ChatRoomMainBox>
      </S.ChatRoomMain>
    </S.Container>
  );
};

export default RightContainer;
