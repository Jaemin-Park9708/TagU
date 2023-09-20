import * as S from "./Room.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { GroupResDto, TokenValue } from "atoms/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupResDtoType } from "types/types";

const InvitedRoom = ({
  groupGender,
  groupId,
  groupUser,
  roomId,
}: groupResDtoType) => {
  const theme: themeProps = useTheme();
  const token = useRecoilValue(TokenValue);
  const setGroupInfo = useSetRecoilState(GroupResDto);

  const acceptGroup = () => {
    console.log("acceptGroup, groupId", groupId);
    fetch(
      `${process.env.REACT_APP_BASE_URL}/groups/accept?groupId=${groupId}`,
      {
        method: "POST",
        headers: {
          Auth: token,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setGroupInfo(res));
  };

  const rejectGroup = () => {
    console.log("reject, groupId", groupId);
    fetch(`${process.env.REACT_APP_BASE_URL}/groups/quit?groupId=${groupId}`, {
      method: "POST",
      headers: {
        Auth: token,
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <S.Profile>
        <S.ProfileImgBox>
          <S.ProfileImg
            src={groupUser[0].imageUrl}
            width={30}
            height={30}
            alt="profile"
          />
        </S.ProfileImgBox>
        <S.ProfileText>
          <S.Name>{groupUser[0].userName}</S.Name>
          <S.Intro>
            {groupId}번 {groupGender === "FEMALE" ? "👧" : "👦"}
          </S.Intro>
        </S.ProfileText>
        <S.BtnContainer>
          <S.StyledBtn
            type="primary"
            size="small"
            source="accept"
            theme={theme}
            onClick={() => {
              acceptGroup();
            }}
          >
            수락
          </S.StyledBtn>
          <S.StyledBtn
            type="primary"
            size="small"
            source="reject"
            theme={theme}
            onClick={() => {
              rejectGroup();
            }}
          >
            거절
          </S.StyledBtn>
        </S.BtnContainer>
      </S.Profile>
    </>
  );
};

export default InvitedRoom;
