import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as S from "./matching.styled";
import "./index.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { RoomInfo, TokenValue, GroupResDto } from "atoms/atoms";
import { Cookies } from "react-cookie";
import { Userlist } from "components/userList";
import { userInfo } from "os";
import { async } from "q";
import { useNavigate } from "react-router";
import { recoilPersist } from "recoil-persist";
import { update } from "@react-spring/web";

const Matching = ({
  setShowMatching,
}: {
  setShowMatching: (value: boolean) => void;
}) => {
  const handleCloseMatching = () => {
    setShowMatching(false);
  };
  const theme: themeProps = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useRecoilState(TokenValue);
  const [roomInfo, setRoomInfo] = useRecoilState(RoomInfo);
  const [groupInfo, setGroupInfo] = useRecoilState(GroupResDto);
  const [first, setFirst] = useState(false);

  //   let setCookie = function(roomInfo: string, value: any, exp: number) {
  //     var date = new Date();
  //     date.setTime(date.getTime() + exp*60*1000);
  //     document.cookie = roomInfo + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
  // };

  function waitAndCheck() {
    console.log(
      "2명이 모였는가?",
      roomInfo?.userList ? roomInfo.userList.length : 0
    );
    // if (roomInfo.userList.length < 2) return
    setInterval(() => {
      // handleFirstClick()
      // console.log("interval 확인");
      // console.log(
      //   "인원 체크:",
      //   roomInfo?.userList ? roomInfo.userList.length : 0
      // );
      if ((roomInfo?.userList ? roomInfo.userList.length : 0) === 2) {
        // 2명인가?
        // console.log("waitAndCheck 함수에서 ",roomInfo.roomId)
        fetch(
          `${process.env.REACT_APP_BASE_URL}/rooms/one/${roomInfo.roomId}`,
          {
            method: "POST",
            headers: {
              Auth: token,
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((res) => {
            // console.log("if문 진입 직전,", res)
            if (res["userList"]) {
              // console.log("if문 들어옴", res)
              setRoomInfo({
                roomId: res["roomId"],
                roomType: res["roomType"],
                sessionId: res["sessionId"],
                userList: res["userList"],
              });
            }
          })
          .catch((res) => console.log(res));
      } else {
        fetch(
          `${process.env.REACT_APP_BASE_URL}/rooms/one/${roomInfo.roomId}`,
          {
            method: "GET",
            headers: {
              Auth: token,
            },
          }
        )
          .then((res) => res.json())
          .then((res) => {
            setRoomInfo({
              roomId: res["roomId"],
              roomType: res["roomType"],
              sessionId: res["sessionId"],
              userList: res["userList"],
            });
          });
      }
    }, 5000); // 5초마다 체크
  }

  function waitAndCheckGroup() {
    console.log(
      "4명이 모였는가?",
      roomInfo?.userList ? roomInfo.userList.length : 0
    );
    setInterval(() => {
      // console.log("interval 확인");
      // console.log("인원 체크:", roomInfo);
      if ((roomInfo?.userList ? roomInfo.userList.length : 0) === 4) {
        // 4명인가?
        console.log("waitAndCheckGroup 함수에서 ", roomInfo.roomId);
        fetch(
          `${process.env.REACT_APP_BASE_URL}/rooms/group/${groupInfo.groupId}`,
          {
            headers: {
              Auth: token,
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((res) => {
            if (res["userList"]) {
              setRoomInfo({
                roomId: res["roomId"],
                roomType: res["roomType"],
                sessionId: res["sessionId"],
                userList: res["userList"],
              });
            }
          })
          .catch((res) => console.log(res));
      } else {
        fetch(
          `${process.env.REACT_APP_BASE_URL}/rooms/group/${groupInfo.groupId}`,
          {
            method: "GET",
            headers: {
              Auth: token,
            },
          }
        )
          .then((res) => res.json())
          .then((res) => {
            setRoomInfo({
              roomId: res["roomId"],
              roomType: res["roomType"],
              sessionId: res["sessionId"],
              userList: res["userList"],
            });
          });
      }
    }, 5000); // 5초마다 체크
  }

  useEffect(() => {
    if (first) {
      roomInfo.roomId != 0 && waitAndCheck();
    } else {
      roomInfo.roomId != 0 && waitAndCheckGroup();
    }
  }, [roomInfo]);

  useEffect(() => {
    console.log("useEffect 들어옴", roomInfo);

    if (roomInfo.sessionId) {
      console.log("useEffect 안의 if문 진입");
      window.location.href = `/meeting/${roomInfo.roomId}`;
    }
  }, [roomInfo.sessionId]);

  const handleFirstClick = () => {
    setIsLoading(true);
    setFirst(true);
    fetch(`${process.env.REACT_APP_BASE_URL}/rooms/one`, {
      method: "POST",
      headers: {
        Auth: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setRoomInfo({
          ...roomInfo,
          roomId: res["roomId"],
          roomType: res["roomType"],
          userList: res["userList"],
        });
        console.log("handleFirstClick", roomInfo);
      });
  };

  const handleSecondClick = () => {
    setIsLoading(true);
    fetch(
      `${process.env.REACT_APP_BASE_URL}/rooms/group?groupId=${groupInfo.groupId}`,
      {
        method: "POST",
        headers: {
          Auth: token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setRoomInfo({
          ...roomInfo,
          roomId: res["roomId"],
          roomType: res["roomType"],
          userList: res["userList"],
        });
        console.log("handleSecondClick", roomInfo);
      });
  };

  return (
    <S.ModalWrapper onClick={handleCloseMatching}>
      <S.ModalContent onClick={(e) => e.stopPropagation()} theme={theme}>
        <S.CloseIconStyled onClick={handleCloseMatching} />
        <S.ButtonContainer>
          {isLoading ? (
            <>
              <div className="lds-heart">
                <div></div>
              </div>
              <S.Loading theme={theme}>로딩 중...</S.Loading>
            </>
          ) : (
            <>
              <S.Button theme={theme} onClick={handleFirstClick}>
                일대일 매칭
              </S.Button>
              <S.Button theme={theme} onClick={handleSecondClick}>
                다대다 매칭
              </S.Button>
            </>
          )}
        </S.ButtonContainer>
      </S.ModalContent>
    </S.ModalWrapper>
  );
};

export default Matching;
