import { GroupResDto, InvitedList, TokenValue } from "atoms/atoms";
import * as S from "./Button.styled";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupResDtoType } from "types/types";

type stateType = "default" | "make" | "view";
type btnProps = {
  content: string;
  source: "make" | "view";
  setShowState: (value: stateType) => void;
};

const RoomBtn = ({ source, content, setShowState }: btnProps) => {
  const token = useRecoilValue(TokenValue);
  const setGroupInfo = useSetRecoilState(GroupResDto);
  const setInvitedList = useSetRecoilState(InvitedList);

  const createGroup = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/groups/create`, {
      headers: {
        Auth: token,
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((res) => setGroupInfo(res));
  };

  const getInvitedList = async () => {
    const fethchList = () => {
      fetch(`${process.env.REACT_APP_BASE_URL}/groups/invited`, {
        headers: {
          Auth: token,
        },
      })
        .then((response) => response.json())
        // .then((res) => console.log("aaaaa", res));
        .then((res) =>
          res.map((item: groupResDtoType) => {
            setInvitedList((pre) => [...pre, item]);
          })
        );
    };

    await setInvitedList([]);
    await fethchList();
  };

  const handleOnClick = (source: "default" | "make" | "view") => {
    setShowState(source);
    if (source === "make") {
      createGroup();
    } else {
      getInvitedList();
    }
  };

  return (
    <div>
      <S.Button onClick={() => handleOnClick(source)}>{content}</S.Button>
    </div>
  );
};

export default RoomBtn;
