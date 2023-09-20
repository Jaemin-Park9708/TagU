import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import { motion } from "framer-motion";

export const Container = styled.div`
  /* border: solid white;
  background-color: yellow; */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  right: 0;
  padding-left: 0.5rem;
  margin-top: 3.5rem;
`;

export const ChatRoomMain = styled.div`
  /* border: dotted black; */
  display: flex;
  flex-direction: row;
  /* align-items: flex-end; */
  height: calc(100vh - 3.5rem);
  min-height: 30rem;
  /* margin: 1rem 0rem 0 0; */
`;

export const MessageButton = styled(motion.button)<{ theme: themeProps }>`
  /* border: solid ${(props) => props.theme.point.deep} 3px; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 2.5rem !important;
  height: 2.5rem !important;
  background-color: ${(props) => props.theme.point.deep};
  position: relative;
  /* top: 2rem !important; */
  /*left: 1.5rem; */
  margin-top: 1rem;
  z-index: 100;
  -webkit-animation: bounce 0.8s infinite;
  @-webkit-keyframes bounce {
    0% {
      top: 0;
    }
    40% {
      top: -3px;
    }
    70% {
      top: -5px;
    }
    100% {
      top: 0;
    }
  }

  &:hover {
    cursor: pointer;
    background-color: #ff0040;
  }
`;

export const MessageImg = styled.img`
  width: 1.5rem !important;
  height: 1.5rem !important;
`;

export const ChatRoomMainBox = styled.div<{ theme: themeProps }>`
  /* border: solid pink; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  right: 1.5rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.point.light};
  width: 20rem;
  height: 90%;
  margin: 2rem 0 2rem 0;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  opacity: 0.6;
`;

export const ChatRoomMainChats = styled.div`
  /* border: solid purple; */
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 90%;
  padding: 1rem 1rem 0 1rem;
  overflow-y: auto;
`;

export const ChatRoomMainChatsContent = styled.div`
  /* border: dotted black; */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 0.3rem 0 0rem;
`;

export const Messages = styled.div<{ theme: themeProps }>`
  border: solid ${(props) => props.theme.point.mid};
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin: 0.3rem 0rem 0.2rem 0.5rem;
  padding: 0.3rem;
  word-break: break-all;
`;

export const Sender = styled.div`
  font-weight: 900;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const Content = styled.div`
  /* border: solid green 2px; */
  word-break: break-all;
  word-wrap: break-word;
`;

export const ChatRoomMainInput = styled.div<{ theme: themeProps }>`
  /* border: solid green; */
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding: 1rem 1.5rem 1rem 1.5rem;
`;

export const OverMaxLength = styled(motion.div)`
  /* border: solid red 1px; */
  display: flex;
  flex-direction: row;
  position: absolute;
  font-size: 0.7rem;
  font-weight: bold;
  bottom: 0.5rem;
`;

export const Button = styled(motion.button)<{ theme: themeProps }>`
  background-color: ${(props) => props.theme.point.deep};
  border: none;
  border-radius: 0.5rem;
  width: 3rem;
  height: 2.5rem;

  &:hover {
    cursor: pointer;
    border: solid 0.1px pink;
  }

  &:active {
    background-color: #ff5563;
  }
`;

export const RefDiv = styled.div`
  border: solid green;
  height: 0.1rem;
`;

export const PullDownDiv = styled.div`
  position: relative;
  border: solid red;
  height: 0.2rem;
  bottom: 0rem;
`;

export const NewMessageNotice = styled.div<{ theme: themeProps }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 5.5rem;
  background-color: ${(props) => props.theme.point.mid};
  border-radius: 0.4rem;
  padding: 0.5rem;
  width: 85%;
  opacity: 0.7;
  font-weight: 900;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

export const ImgDown = styled.img`
  width: 1rem;
  height: 1rem;
  margin: 0 0.7rem 0 0.5rem;
`;
