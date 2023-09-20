import RightContainer from "containers/rightContainer/rightConatiner-inGameChat/InGameChat";
import * as S from "./Meeting.styled";
import CatchMind from "containers/inGame/catchMind";
import SonByeonHo from "containers/inGame/sonByeongHo";
import Sis from "containers/inGame/sis";
import { useEffect, useState } from "react";
import Header from "components/header/Header";
import {
  GameStart as GameStartAtom,
  UserInfo,
  RoomInfo,
  InGameChatStatus,
  MainStreamManager,
} from "atoms/atoms";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";

// OpenVidu
import {
  OpenVidu,
  Publisher,
  Session,
  StreamManager,
  Subscriber,
} from "openvidu-browser";
import axios from "axios";
import UserVideoComponent from "./UserVideoComponent";
import { storiesOf } from "@storybook/react";
import { parse } from "path";
import { roomProps } from "types/types";

const OPENVIDU_SERVER_URL = "https://tagyou.site:8443";
const OPENVIDU_SERVER_SECRET = "tagyou";

const Meeting = () => {
  const [GameStart, setGameStart] = useRecoilState(GameStartAtom);
  const [selectedGame, setSelectedGame] = useState("");
  const [inGameChatStatus, setInGameChatStatus] =
    useRecoilState(InGameChatStatus);
  const userInfo = useRecoilValue(UserInfo);
  const [roomInfo, setRoomInfo] = useRecoilState(RoomInfo); // 추가
  const [myUserName, setMyUserName] = useState(userInfo.userName);
  const [session, setSession] = useState<Session | null>();
  const [mainStreamManager, setMainStreamManager] =
    useRecoilState(MainStreamManager);
  const [publisher, setPublisher] = useState<any>();
  const [publishers, setPublishers] = useState<any[]>([]); // 추가
  const [token, setToken] = useState<any>();
  const [subscribers, setSubscribers] = useState<any[]>([]);

  useEffect(() => {
    const storedRoomInfo = localStorage.getItem("recoil-persist");
    setRoomInfo(storedRoomInfo ? JSON.parse(storedRoomInfo)["RoomInfo"] : null);
    console.log(roomInfo);
    const rightContainer = document.querySelector(
      ".right_container"
    ) as HTMLElement;
    if (rightContainer instanceof Element) {
      rightContainer.style.width = "100vw";
    }
    joinSession(roomInfo);
  }, []);

  const renderSelectedGame = () => {
    if (selectedGame === "catchMind") {
      return <CatchMind publisher={publisher} subscribers={subscribers} />;
    } else if (selectedGame === "sonByeonHo") {
      return <SonByeonHo publisher={publisher} subscribers={subscribers} />;
    } else if (selectedGame === "sis") {
      return (
        <Sis
          publisher={publisher}
          subscribers={subscribers}
          handleMainVideoStream={handleMainVideoStream}
        />
      );
    }
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }
  };

  const handleMainVideoStream = (stream: any) => {
    setMainStreamManager(stream);
  };

  const deleteSubscriber = (streamManager: any) => {
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setSubscribers(subscribers);
    }
  };

  const joinSession = (roomInfo: roomProps) => {
    const OV = new OpenVidu();
    let mySession: Session = OV.initSession();

    mySession.on("streamCreated", function (event) {
      let subscriber = mySession.subscribe(event.stream, undefined);
      subscribers.push(subscriber);
      setSubscribers(subscribers);
    });

    // On every Stream destroyed...
    mySession.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    new Promise<void>((resolve, reject) => {
      const data = {
        type: "WEBRTC",
        // data: "My Server Data",
        record: true,
        role: "PUBLISHER",
        kurentoOptions: {
          videoMaxRecvBandwidth: 1000,
          videoMinRecvBandwidth: 300,
          videoMaxSendBandwidth: 1000,
          videoMinSendBandwidth: 300,
          allowedFilters: ["GStreamerFilter", "ZBarFilter"],
        },
        customIceServers: [
          {
            url: "turn:turn-domain.com:443",
            username: "usertest",
            credential: "userpass",
          },
        ],
      };

      axios
        .post(
          `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${roomInfo.sessionId}/connection`,
          data,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
              )}`,
              "Content-Type": "application/json",
              Auth: token,
            },
          }
        )
        .then((response) => {
          setToken(response.data.token);
          mySession
            .connect(response.data.token, { clientData: myUserName })
            .then(() => {
              let publisher = OV.initPublisher("publisher");
              mySession.publish(publisher);
              setPublisher(publisher);
            });
          resolve(); // Resolve the Promise once everything is done
        })
        .catch((error) => {
          console.log(error);
          reject(error); // Reject the Promise in case of an error
        });
    });
  };

  return (
    <S.Container
      className={!inGameChatStatus ? "Container-Son" : "Container-Son-withChat"}
    >
      <Header leaveSession={leaveSession} />
      {!GameStart ? (
        <S.Container
          className={
            !inGameChatStatus ? "Container-Son" : "Container-Son-withChat"
          }
        >
          <S.InnerContainer>
            {/* { roomInfo.roomType === "One" ? ( */}
            <S.PlayerVidBundle>
              <S.PlayerVid>
                <UserVideoComponent streamManager={publisher} />
              </S.PlayerVid>
              {subscribers.map((sub, i) => {
                return (
                  <S.PlayerVid>
                    <UserVideoComponent streamManager={sub} />
                  </S.PlayerVid>
                );
              })}
            </S.PlayerVidBundle>
            {/* ) : (
               <S.PlayerVidBundle>
                 <S.PlayerVid><UserVideoComponent streamManager={publisher} /></S.PlayerVid>
                 <S.PlayerVid><UserVideoComponent streamManager={publisher} /></S.PlayerVid>
                 <S.PlayerVid><UserVideoComponent streamManager={publisher} /></S.PlayerVid>
               </S.PlayerVidBundle>
              )
              } */}
            <S.Middle>
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
              >
                <option value="">게임을 선택하세요</option>
                <option value={"catchMind"}>캐치마인드</option>
                <option value={"sonByeonHo"}>손병호게임</option>
                <option value={"sis"}>고요속의 외침</option>
              </select>
              <button onClick={() => setGameStart(true)}>게임 시작</button>
            </S.Middle>
            <S.PlayerVidBundle>
              {subscribers.map((sub, i) => {
                return (
                  <S.PlayerVid>
                    <UserVideoComponent streamManager={sub} />
                  </S.PlayerVid>
                );
              })}
            </S.PlayerVidBundle>
          </S.InnerContainer>
        </S.Container>
      ) : (
        renderSelectedGame()
      )}
      <RightContainer />
    </S.Container>
  );
};

export default Meeting;
