import {
  FriendList,
  IsDark,
  NomalFriendList,
  ReceivedFriendList,
  RequestFriendList,
  TokenValue,
} from "atoms/atoms";
import Friend from "components/friend";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as S from "./friendContainer.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { friendProps } from "types/types";
import { FriendSearchModal } from "components/modal/friendSearchModal";
import { Button } from "antd";

const FriendContainer = () => {
  const theme = useTheme<themeProps>();
  const token = useRecoilValue(TokenValue);
  const [showModal, setShowModal] = useState<boolean>();
  const isDark = useRecoilValue(IsDark);
  const setFriendListAtom = useSetRecoilState(FriendList);
  const nomalFriendList = useRecoilValue(NomalFriendList);
  const receivedFriendList = useRecoilValue(ReceivedFriendList);
  const requestFriendList = useRecoilValue(RequestFriendList);

  const ButtonStyles: React.CSSProperties = {
    backgroundColor: isDark ? "#4d4d4c" : "#f65b76",
    color: theme.font.light,
    border: "none",
    width: "220px",
    marginTop: "10px",
  };

  const fetchReceived = (targetId: number) => {
    console.log("fetchReceived token확인", token);
    fetch(
      `${process.env.REACT_APP_BASE_URL}/friends/accept?targetId=${targetId}`,
      {
        method: "POST",
        headers: {
          Auth: token,
        },
      }
    ).then(() => fetchData(token));
  };

  const fetchRejected = (targetId: number) => {
    console.log("fetchRejected token확인", token);
    fetch(
      `${process.env.REACT_APP_BASE_URL}/friends/reject?otherId=${targetId}`,
      {
        method: "POST",
        headers: {
          Auth: token,
        },
      }
    ).then(() => fetchData(token));
  };

  const fetchData = (token: string) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/friends/list`, {
      headers: {
        Auth: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("친구 목록", data);
        setFriendListAtom(data);
      });
  };

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  return (
    <>
      <S.MainContainer theme={theme}>
        <S.Container>
          <S.SubTitle theme={theme}>
            친구목록 <S.Tmp>{nomalFriendList.length}명</S.Tmp>
          </S.SubTitle>
          <S.FriendContainer>
            {nomalFriendList.length > 0 ? (
              nomalFriendList?.map((item: friendProps, idx: number) => (
                <Friend
                  friendShipStatus={item.friendShipStatus}
                  targetId={item.targetId}
                  targetName={item.targetName}
                  targetImageUrl={item.targetImageUrl}
                  targetGender={item.userGender}
                  targetAge={item.userAge}
                  targetContent={item.targetContent}
                  key={idx}
                />
              ))
            ) : (
              <S.NullMessageBox>
                <S.NullMessage theme={theme}> 친구가 없어요 </S.NullMessage>
              </S.NullMessageBox>
            )}
          </S.FriendContainer>

          <S.SubTitle theme={theme}>
            대기된 친구
            <S.StyledBadge theme={theme} count={requestFriendList.length} />
            <S.Des theme={theme}>친구 신청을 대기중이에요 😶</S.Des>
          </S.SubTitle>
          <S.OtherFriendContainer>
            {requestFriendList.length > 0 ? (
              requestFriendList?.map((item: friendProps, idx: number) => (
                <Friend
                  friendShipStatus={item.friendShipStatus}
                  targetId={item.targetId}
                  targetName={item.targetName}
                  targetGender={item.userGender}
                  targetAge={item.userAge}
                  targetImageUrl={item.targetImageUrl}
                  targetContent={item.targetContent}
                  key={idx}
                />
              ))
            ) : (
              <S.NullMessageBox>
                <S.SpecialNullMessage theme={theme}>
                  대기된 친구가 없어요
                </S.SpecialNullMessage>
              </S.NullMessageBox>
            )}
          </S.OtherFriendContainer>

          <S.SubTitle theme={theme}>
            요청온 친구
            <S.StyledBadge theme={theme} count={receivedFriendList.length} />
          </S.SubTitle>
          <S.Des theme={theme}>친구 요청이 들어왔어요 🤩</S.Des>
          <S.OtherFriendContainer>
            {receivedFriendList.length > 0 ? (
              receivedFriendList?.map((item: friendProps, idx: number) => (
                <Friend
                  friendShipStatus={item.friendShipStatus}
                  targetId={item.targetId}
                  targetName={item.targetName}
                  targetImageUrl={item.targetImageUrl}
                  targetGender={item.userGender}
                  targetAge={item.userAge}
                  targetContent={item.targetContent}
                  key={idx}
                  handleAccecpt={fetchReceived}
                  handleReject={fetchRejected}
                />
              ))
            ) : (
              <S.NullMessageBox>
                <S.SpecialNullMessage theme={theme}>
                  요청온 친구가 없어요
                </S.SpecialNullMessage>
              </S.NullMessageBox>
            )}
          </S.OtherFriendContainer>

          <S.SubTitle theme={theme}>친구찾기</S.SubTitle>
          <S.SpecialDes theme={theme}>
            이름으로 친구를 검색해봐요 👽
          </S.SpecialDes>

          <Button style={ButtonStyles} onClick={() => setShowModal(true)}>
            친구 검색
          </Button>
        </S.Container>
      </S.MainContainer>
      {showModal && <FriendSearchModal setShowModal={setShowModal} />}
    </>
  );
};

export default FriendContainer;
