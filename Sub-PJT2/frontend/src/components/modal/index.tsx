import * as S from "./modal.styled";
import kakaoImg from "../../asset/img/kakao_login_medium_wide.png";
import logoImg from "../../asset/img/logo/2.png";

type modalProps = {
  handleOnClick: () => void;
  setShowModal: (value: boolean) => void;
  formType: "login" | "logout";
};

export const Modal = ({
  handleOnClick,
  setShowModal,
  formType,
}: modalProps) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <S.ModalWrapper onClick={handleCloseModal}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseIconStyled onClick={handleCloseModal} />
        <S.LogoImg src={logoImg} alt="logo" />
        {formType === "login" ? (
          <S.KakaoImg src={kakaoImg} onClick={handleOnClick} />
        ) : (
          <S.LogoutBtn onClick={handleOnClick}>로그아웃</S.LogoutBtn>
        )}
      </S.ModalContent>
    </S.ModalWrapper>
  );
};
