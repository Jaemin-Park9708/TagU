import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Container = styled.div`
  /* border: solid red 3px; */
  display: flex;
  width: 100%;
  height: 100%;
  min-width: fit-content;
`;

export const ChatList = styled.div<{ theme: themeProps }>`
  /* border: solid red 4px; */
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  min-width: fit-content;
  width: 100%;
  height: 100%;
`;

export const ChatListBody = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  height: calc(100vh - 3.5rem);
  width: 95%;
  overflow: scroll;
  overflow-x: hidden;
`;

export const Chat = styled.div<{ theme: themeProps }>`
  /* border: solid red; */
  background-color: ${(props) => props.theme.point.light};
  border-radius: 0.3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0.5rem 1rem 0.5rem 1rem;
  padding: 1rem;
  width: 95%;
  /* min-width: 50rem; */
`;

export const ChatProfileImage = styled.div`
  border: solid green;
  border-radius: 50%;
  width: 7rem;
  height: 7rem;
`;

export const chatContent = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.deep};
  /* border: solid pink; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80%;
`;

export const ChatContentUserData = styled.div`
  /* border: solid black; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: bold;
`;

export const ChatContentMessage = styled.div`
  /* border: solid black; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ChatContentMessageTime = styled.div`
  width: 5rem;
  text-align: center;
`;

