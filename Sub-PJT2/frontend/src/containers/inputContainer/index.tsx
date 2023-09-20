import InputModal from "components/modal/inputModal";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { TokenValue } from "../../atoms/atoms";
import { useRecoilState } from "recoil";

const InputContainer = () => {
  const cookies = new Cookies();
  const [token, setToken] = useRecoilState(TokenValue);
  const [isFirst, setIsFirst] = useState<Boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(true);

  const movePage = () => {
    window.location.href = "/home";
  };

  useEffect(() => {
    const authToken = cookies.get("Auth");
    setToken(authToken);
  }, []);

  useEffect(() => {
    const fetchFirst = async () => {
      fetch(`${process.env.REACT_APP_BASE_URL}/users/first`, {
        headers: {
          Auth: token,
        },
      }).then((data) => {
        if (data.status === 404) {
          console.log("에러뜬다 :휴대폰 번호 없음 : first임", token);
          setIsFirst(true);
        } else {
          console.log("에러가 안온다 :휴대폰번호있음: 그냥 지나쳐 ", token);
          movePage();
        }
      });
    };
    token.length > 0 && fetchFirst();
  }, [token]);

  return (
    <>
      {isFirst === true && showModal && (
        <InputModal setShowModal={setShowModal} />
      )}
    </>
  );
};

export default InputContainer;
