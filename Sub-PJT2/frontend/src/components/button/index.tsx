import * as S from "./Button.styled";
import { useState } from "react";

import { Modal } from "components/modal";

type btnProps = {
  content: string;
};

const Button = ({ content }: btnProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <div>
      <S.Button onClick={handleOpenModal}>{content}</S.Button>
      {showModal && (
        <Modal
          handleOnClick={handleLogin}
          setShowModal={setShowModal}
          formType="login"
        />
      )}
    </div>
  );
};

export default Button;
