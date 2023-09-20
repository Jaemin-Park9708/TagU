import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Container = styled.div``;

export const ChatRoom = styled.div<{ theme: themeProps }>`
  /* border: solid black; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: calc(100vh - 3.5rem);
  min-width: fit-content;
  min-height: fit-content;
  margin-top: 1rem;
`;

export const ChatRoomBody = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80%;
  height: 100%;
  min-width: 50rem;
  min-height: 40rem;
`;

export const ChatRoomCouterpart = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.text};
  /* border: solid red; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 20%;
  padding-top: 2rem;
`;

export const ChatRoomUser = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 20%;
  padding-bottom: 2rem;
`;

export const ProfileImg = styled.div`
  border: solid green;
  border-radius: 50%;
  width: 7rem;
  height: 7rem;
`;

export const ChatRoomMain = styled.div`
  /* border: dotted black; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  /* padding: 2rem; */
`;

export const ChatRoomMainBox = styled.div<{ theme: themeProps }>`
  /* border: solid pink; */
  background-color: ${(props) => props.theme.point.light};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 90%;
  padding-top: 1rem;
  padding-bottom: 1.5rem;
`;

export const ChatRoomMainChats = styled.div`
  // border: solid purple;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 90%;
  padding-top: 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const ChatRoomMainChatsContent = styled.div`
  // border: dotted black;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem 0 1rem;
`;

export const ChatBegins = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 100%;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  font-size: large;
  font-weight: bold;
  color: grey;
`;

export const Line = styled.div`
  background-color: grey;
  width: 30%;
  height: 0.1rem;
`;

export const MessageReceived = styled.div`
  /* border: solid red; */
  justify-content: flex-start;
  display: flex;
  flex-direction: row;
  width: 95%;
  margin: 0.5rem 0 0.5rem 0.5rem;
`;

export const MessageSent = styled.div`
  /* border: solid green; */
  justify-content: flex-end;
  display: flex;
  flex-direction: row;
  width: 95%;
  margin: 0.5rem 0 0.5rem 0.5rem;
`;

export const MessageBox = styled.div<{theme: themeProps}>`
  /* border: solid green; */
  color: ${(props) => props.theme.font.text};
  display: flex;
  flex-direction: row;
  width: 80%;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
`;

export const MessageContent = styled.div<{theme: themeProps}>`
  /* border: solid green; */
  background-color: ${(props) => props.theme.bg.light};
  box-shadow: 0px 5px 10px 0px ${(props) =>  props.theme.point.mid};
  border-radius: 0.5rem;
  padding: 1rem;
`;

export const MessageTime = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
  margin: 0 0.5rem 0 0.5rem;
  font-size: small;
`;

export const ChatRoomMainInput = styled.div<{ theme: themeProps }>`
  /* border: solid green; */
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 85%;
  height: 5rem;
  padding: 1rem 1.5rem 1rem 1.5rem;
  background-color: ${(props) => props.theme.point.mid};
  margin-top: 1rem;
`;

export const Button = styled.button<{ theme: themeProps }>`
  background-color: ${(props) => props.theme.point.deep};
  border: none;
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
`;
