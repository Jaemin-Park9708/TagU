import { useRecoilValue } from "recoil";
import * as S from "./index.styled";
import { GroupResDto, InvitedList, NomalFriendList } from "atoms/atoms";
import { friendProps, groupResDtoType } from "types/types";
import { useEffect, useState } from "react";
import RoomBtn from "components/roomBtn";
import RoomFriend from "components/roomFriend";
import InvitedRoom from "components/inviteRoom";

type stateType = "default" | "make" | "view";

export const GroupModal = ({
  setShowModal,
}: {
  setShowModal: (value: boolean) => void;
}) => {
  const nomalFriendList = useRecoilValue(NomalFriendList);
  const [showState, setShowState] = useState<stateType>("default");
  const groupInfo = useRecoilValue(GroupResDto);
  const invitedGroupList = useRecoilValue(InvitedList);

  useEffect(() => {
    console.log("invitedGroupList", invitedGroupList);
  }, [invitedGroupList]);

  return (
    <S.ModalWrapper onClick={() => setShowModal(false)}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseIconStyled onClick={() => setShowModal(false)} />
        <S.BtnContainer>
          <S.BtnContainer>
            <RoomBtn
              content="그룹 생성"
              source="make"
              setShowState={setShowState}
            />
            <RoomBtn
              source="view"
              content="받은 초대"
              setShowState={setShowState}
            />
          </S.BtnContainer>

          <S.Container>
            {showState === "make" && (
              <>
                <S.FriendContainer>
                  <S.Title>내 그룹 정보</S.Title>
                  <S.Icon>
                    {groupInfo.groupGender === "FEMALE" ? "👧" : "👦"}
                  </S.Icon>
                  <S.ID>
                    <strong>{groupInfo.groupId}</strong>번 그룹
                  </S.ID>
                </S.FriendContainer>
                <S.FriendContainer>
                  <S.Title>초대할 수 있는 친구들</S.Title>
                  {nomalFriendList.length > 0 &&
                    nomalFriendList.map((item: friendProps, idx: number) =>
                      item.userGender === groupInfo.groupGender ? (
                        <RoomFriend
                          key={item.targetId}
                          friendShipStatus={item.friendShipStatus}
                          targetId={item.targetId}
                          targetName={item.targetName}
                          targetImageUrl={item.targetImageUrl}
                        />
                      ) : null
                    )}
                </S.FriendContainer>
              </>
            )}

            {showState === "view" && (
              <S.FriendContainer>
                <S.Title> 요청 받은 그룹 </S.Title>
                {invitedGroupList?.map((item: groupResDtoType, idx: number) => (
                  <InvitedRoom
                    groupUser={item.groupUser}
                    groupGender={item.groupGender}
                    groupId={item.groupId}
                    roomId={item.roomId}
                  ></InvitedRoom>
                ))}
              </S.FriendContainer>
            )}
          </S.Container>
        </S.BtnContainer>
        <div style={{ display: "flex", margin: "auto" }}>
          <button content="미팅시작" />
        </div>
      </S.ModalContent>
    </S.ModalWrapper>
  );
};
