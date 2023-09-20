import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./ChatRoom.styled";
import "css/chat/chatRoom.css";
import React, { useEffect, useRef, useState } from "react";
import sendButton from "asset/img/button_send.png";

// webSocket 관련
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import imgDown from "asset/img/icons8-down-100.png";
import { Cookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { TokenValue } from "atoms/atoms";
import { FriendMessage } from "types/types";

const RightContainer = () => {
  const theme: themeProps = useTheme();
  const cookies = new Cookies();
  const client = useRef<CompatClient>();

  const [token, setToken] = useRecoilState(TokenValue);
  const [items, setItems] = useState<FriendMessage[]>([]);
  const [message, setMessage] = useState(""); // 타이핑 중인 메시지 비동기로 계속 저장
  const [lastMessage, setLastMessage] = useState<FriendMessage>();
  const [targetId, setTargetId] = useState<number>(); // 친구 user_id
  const [pullDown, setPullDown] = useState<boolean>(true);
  const [newMEssageNoticeStatus, setNewMEssageNoticeStatus] = useState({
    display: "none",
  });

  // const allMessages = () => {
  //   fetch(`${process.env.REACT_APP_BASE_URL}/friends/messages/${targetId}`, {
  //     headers: {
  //       Auth: token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // };

  // 새로고침이나 렌더 후에 채팅방의 기존 채팅을 불러오는 부분
  const requestChatHistory = async () => {
    console.log("chatHistory 조회하기 전 토큰 확인: " + token);
    fetch(
      `${process.env.REACT_APP_BASE_URL}/chat/friends/${targetId}/messages`,
      {
        headers: {
          Auth: token,
        },
      }
    )
      .then((response) => response.json())
      .then((data: FriendMessage[]) => {
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
    if (!token) return;
    console.log("채팅 히스토리 불러오기 전 토큰 확인>> : " + token);
    const location = window.location.pathname;
    console.log(location.substring(9, location.length));
    setTargetId(parseInt(location.substring(9, location.length)));
  }, [token]);

  useEffect(() => {
    if (!token || !targetId) return;
    token && targetId && requestChatHistory();
  }, [token, targetId]);

  const now = new Date();

  const messageSending: FriendMessage = {
    sender: "findWithToken",
    receiver: targetId + "",
    content: message,
    createdDate: now.toLocaleString(),
  };

  const handleClickSubmit = () => {
    if (message.length > 0) {
      fetch(
        `${process.env.REACT_APP_BASE_URL}/chat/friends/${targetId}/messages`,
        {
          method: "POST",
          headers: {
            Auth: token,
          },
        }
      )
        .then((res) => res.json())
        .then((data: FriendMessage) => addItem(data));
      setMessage("");
    } else {
      alert("메시지를 입력해주세요");
    }
  };

  const addItem = (item: FriendMessage) => {
    let newItems: FriendMessage[] = [];
    newItems = items;
    newItems.push(item);
    // 스크롤 아래로 쭉 땡길지 말지 결정하는 부분
    // if (!chatScreenRef.current) return;
    // if (chatScreenRef.current.scrollTop >= 0) {
    //   setPullDown(true);
    // } else {
    //   setPullDown(false);
    // }
    setItems(newItems);
    setLastMessage(item);
  };

  // const chats = () => {
  //   const result = [];
  //   const chats = chatData.messages;
  //   const user = chatData.user;
  //   result.push(
  //     <S.ChatBegins theme={theme}>
  //       <S.Line theme={theme} />
  //       <div>대화의 시작</div>
  //       <S.Line />
  //     </S.ChatBegins>
  //   );

  //   for (let i = 0; i < chats.length; i++) {
  //     if (chats[i].from !== user.name) {
  //       result.push(
  //         <S.MessageReceived theme={theme}>
  //           <S.MessageBox theme={theme}>
  //             <S.MessageContent theme={theme}>
  //               {chats[i].content}
  //             </S.MessageContent>
  //             <S.MessageTime>{chats[i].time}</S.MessageTime>
  //           </S.MessageBox>
  //         </S.MessageReceived>
  //       );
  //     } else {
  //       result.push(
  //         <S.MessageSent theme={theme}>
  //           <S.MessageBox theme={theme}>
  //             <S.MessageTime>{chats[i].time}</S.MessageTime>
  //             <S.MessageContent theme={theme}>
  //               {chats[i].content}
  //             </S.MessageContent>
  //           </S.MessageBox>
  //         </S.MessageSent>
  //       );
  //     }
  //   }
  //   return result;
  // };

  // 대화 창의 스크롤 맨 아래로 내리는기능
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleContentLoaded = () => {
    console.log("content Loaded");
    bottomRef.current?.scrollIntoView();
  };
  useEffect(() => {
    console.log("using Effect");
    handleContentLoaded();
  });
  // 대화 창 스크롤 아래로 내리는 기능  끝

  return (
    <S.Container theme={theme}>
      <S.ChatRoom theme={theme}>
        <S.ChatRoomBody theme={theme}>
          <S.ChatRoomCouterpart theme={theme}>
            <div className="couterpart-info">
              {/* <img src="" alt="" /> */}
              {/* 여기 img 들어가면 바로 아래 div 빼고 couterpart-exceptImg div 수정해야됨 */}
              <S.ProfileImg></S.ProfileImg>
              <div className="couterpart-exceptImg"></div>
            </div>
          </S.ChatRoomCouterpart>
          <S.ChatRoomMain theme={theme}>
            <S.ChatRoomMainBox theme={theme}>
              <S.ChatRoomMainChats
                className="chatRoom-main-chats"
                theme={theme}
              >
                <S.ChatRoomMainChatsContent theme={theme}>
                  {/* {chats()} */}
                  <div ref={bottomRef}></div>
                </S.ChatRoomMainChatsContent>
              </S.ChatRoomMainChats>
              <S.ChatRoomMainInput
                className="chatRoom-main-input"
                theme={theme}
              >
                <textarea />
                <div className="button-outer">
                  <S.Button theme={theme} className="button-send">
                    <img src={sendButton} alt="send" />
                  </S.Button>
                </div>
              </S.ChatRoomMainInput>
            </S.ChatRoomMainBox>
          </S.ChatRoomMain>
          <S.ChatRoomUser theme={theme}>
            <div className="user-info">
              <S.ProfileImg></S.ProfileImg>
            </div>
          </S.ChatRoomUser>
        </S.ChatRoomBody>
      </S.ChatRoom>
    </S.Container>
  );
};

export default RightContainer;
