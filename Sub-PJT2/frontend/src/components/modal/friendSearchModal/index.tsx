import * as S from "./modal.styled";
import logoImg from "../../../asset/img/logo/2.png";
import { useRecoilState } from "recoil";
import { TokenValue } from "atoms/atoms";
import { useState } from "react";
import { friendProps } from "types/types";
import { Userlist } from "components/userList";

type modalProps = {
  setShowModal: (value: boolean) => void;
};

export const FriendSearchModal = ({ setShowModal }: modalProps) => {
  const [token, setToken] = useRecoilState(TokenValue);
  const [searchName, setSearchName] = useState<string>();
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [allUsersList, setAllUsersList] = useState<friendProps[]>();

  const handleCloseModal = () => {
    console.log("clicked");
    setShowModal(false);
  };

  const searchFriend = () => {
    const fetchAllUser = async () => {
      console.log("fetchAllUser", token);
      console.log("searchName", searchName);
      fetch(
        `${process.env.REACT_APP_BASE_URL}/friends/search?keyword=${searchName}`,
        {
          headers: {
            Auth: token,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => setAllUsersList(res));
    };
    token && fetchAllUser();
    setIsFirst(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    setSearchName(inputValue);
  };

  return (
    <S.ModalWrapper>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseIconStyled onClick={handleCloseModal} />
        <S.LogoImg src={logoImg} alt="logo" />
        <S.StyledInput
          onChange={handleChange}
          placeholder="이름으로 친구 검색"
        ></S.StyledInput>
        <S.RequestBtn onClick={searchFriend}>검색하기</S.RequestBtn>
        <S.ListContainer>
          <S.ListContainerInner>
            {allUsersList ? (
              <Userlist dataList={allUsersList} />
            ) : (
              <S.MSG>🍀 친구를 이름으로 검색해보세요 🍀</S.MSG>
            )}
          </S.ListContainerInner>
        </S.ListContainer>
      </S.ModalContent>
    </S.ModalWrapper>
  );
};
