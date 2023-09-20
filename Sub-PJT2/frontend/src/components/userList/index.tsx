import { Avatar, List } from "antd";
import { friendProps } from "types/types";
import * as S from "./index.styled";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { FriendList, TokenValue } from "atoms/atoms";
import { useEffect, useState } from "react";

type dataListProps = {
  dataList: friendProps[];
};

export const Userlist = ({ dataList }: dataListProps) => {
  const token = useRecoilValue(TokenValue);
  const [friendListAtom, setFriendListAtom] = useRecoilState(FriendList);
  const [requestedFriendIds, setRequestedFriendIds] = useState<number[]>([]);

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/friends/list`, {
      headers: {
        Auth: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFriendListAtom(data);
      });
  };

  const requestFriend = async (targetId: number) => {
    await fetch(
      `${process.env.REACT_APP_BASE_URL}/friends/request?targetId=${targetId}`,
      {
        method: "POST",
        headers: {
          Auth: token,
        },
      }
    );
    fetchData();
    setRequestedFriendIds((prevIds) => [...prevIds, targetId]);
  };

  return (
    <>
      <List
        dataSource={dataList}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.targetImageUrl} />}
              title={item.targetName}
              description={item.friendShipStatus}
            />
            <S.StyledBtn
              type="primary"
              size="small"
              onClick={() => requestFriend(item.targetId)}
              disabled={requestedFriendIds.includes(item.targetId)}
            >
              {requestedFriendIds.includes(item.targetId)
                ? "요청됨"
                : "친구 요청"}
            </S.StyledBtn>
          </List.Item>
        )}
      />
    </>
  );
};
