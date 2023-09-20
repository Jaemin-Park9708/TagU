import * as S from "./Friend.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { GroupResDto, TokenValue } from "atoms/atoms";
import { useRecoilValue } from "recoil";

type friendCompoentProps = {
  friendShipStatus: "REQUESTED" | "BLOCKED" | "FRIEND" | "NONE" | "RECEIVED";
  targetId: number;
  targetName: string;
  targetImageUrl: string;
  handleAccecpt?: (targetId: number) => void;
  handleReject?: (targetId: number) => void;
};

const RoomFriend = ({
  targetId,
  targetName,
  targetImageUrl,
}: friendCompoentProps) => {
  const theme: themeProps = useTheme();
  const token = useRecoilValue(TokenValue);
  const groupInfo = useRecoilValue(GroupResDto);

  const inviteGroup = () => {
    console.log("groupInfo.groupId", groupInfo.groupId, "targetId", targetId);
    fetch(`${process.env.REACT_APP_BASE_URL}/groups/request`, {
      method: "POST",
      headers: {
        Auth: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: groupInfo.groupId,
        targetUserId: targetId,
      }),
    });
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
        <S.ProfileText>
          <S.Name>{targetName}</S.Name>
        </S.ProfileText>
        <S.BtnContainer>
          <S.StyledBtn
            type="primary"
            size="small"
            source="accept"
            theme={theme}
            onClick={() => {
              inviteGroup();
            }}
          >
            초대
          </S.StyledBtn>
        </S.BtnContainer>
      </S.Profile>
    </>
  );
};

export default RoomFriend;
