import * as S from "./Friend.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { TokenValue } from "atoms/atoms";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

type friendCompoentProps = {
  friendShipStatus: "REQUESTED" | "BLOCKED" | "FRIEND" | "NONE" | "RECEIVED";
  targetId: number;
  targetName: string;
  targetImageUrl: string;
  targetGender: "MALE" | "FEMALE";
  targetAge: number;
  targetContent: string;
  handleAccecpt?: (targetId: number) => void;
  handleReject?: (targetId: number) => void;
};

export type friendStateType = "ONLINE" | "OFFLINE" | "INGAME";

const Friend = ({
  friendShipStatus,
  targetId,
  targetName,
  targetImageUrl,
  targetAge,
  targetGender,
  targetContent,
  handleAccecpt,
  handleReject,
}: friendCompoentProps) => {
  const theme: themeProps = useTheme();

  const token = useRecoilValue(TokenValue);

  const [userStatus, setUserStatus] = useState<friendStateType>("OFFLINE");
  const [trigger, setTrigger] = useState<boolean>(true);

  const loadUserStatus = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/users/state/${targetId}`, {
      headers: {
        Auth: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserStatus(data.userStatus);
      });
  };

  useEffect(() => {
    if (!token) return;
    loadUserStatus();
    triggerHandler();
  }, [token, trigger]);

  const triggerHandler = () => {
    setTimeout(() => {
      // console.log("triggerHandler 작동");
      setTrigger(!trigger);
    }, 60000); // 1초 = 1000 => 여긴 60초
  };

  return (
    <>
      <S.Profile>
        <S.ProfileImgBox>
          <S.ProfileImg
            src={targetImageUrl}
            width={30}
            height={30}
            alt="profile"
          />
        </S.ProfileImgBox>
        <S.UserStatus state={userStatus} />
        <S.ProfileText>
          <S.Name theme={theme}>{targetName}</S.Name>
          <S.Intro theme={theme}>{targetContent}</S.Intro>
        </S.ProfileText>
      </S.Profile>
      <S.BtnContainer>
        {friendShipStatus === "RECEIVED" && (
          <S.StyledBtn
            type="primary"
            size="small"
            source="accept"
            theme={theme}
            onClick={() => {
              handleAccecpt && handleAccecpt(targetId);
            }}
          >
            수락
          </S.StyledBtn>
        )}
        {friendShipStatus === "RECEIVED" && (
          <S.StyledBtn
            type="primary"
            size="small"
            source="reject"
            theme={theme}
            onClick={() => {
              handleReject && handleReject(targetId);
            }}
          >
            거절
          </S.StyledBtn>
        )}
      </S.BtnContainer>
    </>
  );
};

export default Friend;
