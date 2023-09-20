import * as S from "./index.styled";
import logoImg from "../../asset/img/logo/2.png";
import Datepicker from "components/datepicker";
import SelectBox from "components/selectbox";
import { ProfileInfo, TokenValue, UserInfo } from "atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

const MyPageTmp = () => {
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const [profileInfo, setProfileInfo] = useRecoilState(ProfileInfo);
  const token = useRecoilValue(TokenValue);

  const handleInputChange = (
    source: "phoneNumber" | "content" | "userHobby" | "userJob",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // console.log("source", source, "value", e.target.value);
    if (source === "content") {
      let tmp = e.target.value;
      let replaced_str = tmp.replace(/_/g, " ");
      setProfileInfo({ ...profileInfo, [source]: replaced_str });
    } else {
      source === "phoneNumber" &&
        setUserInfo({ ...userInfo, [source]: e.target.value });
      source !== "phoneNumber" &&
        setProfileInfo({ ...profileInfo, [source]: e.target.value });
    }
  };

  const putProfile = async () => {
    console.log("POSTProfile", token, profileInfo);
    fetch(`${process.env.REACT_APP_BASE_URL}/profile`, {
      method: "PUT",
      headers: {
        Auth: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userSido: profileInfo.userSido,
        userGugun: profileInfo.userGugun,
        userJob: profileInfo.userJob,
        userHobby: profileInfo.userHobby,
        userMbti: profileInfo.userMbti,
        content: profileInfo.content,
      }),
    });
  };

  const putUsers = async () => {
    console.log("putUsers", token, userInfo);
    fetch(`${process.env.REACT_APP_BASE_URL}/users/mypage`, {
      method: "PUT",
      headers: {
        Auth: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: userInfo.phoneNumber,
        userAge: userInfo.userAge,
        userGender: userInfo.userGender,
      }),
    });
  };

  const handleOnClick = async () => {
    await putProfile();
    await putUsers();
  };

  return (
    <S.ModalWrapper>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.LogoImg src={logoImg} alt="logo" />
        <S.Title>기본정보</S.Title>
        <S.UserBox>
          <S.Section>
            <S.SubTitle> 생일 </S.SubTitle>
            <Datepicker name="userAge" />
          </S.Section>

          <S.Section>
            <S.SubTitle> 성별 </S.SubTitle>
            <SelectBox name="userGender" />
          </S.Section>

          <S.Section>
            <S.SubTitle> 번호 </S.SubTitle>
            <S.StyledInput
              onChange={(e) => handleInputChange("phoneNumber", e)}
              placeholder="휴대폰 번호 ( - 없이 입력)"
            />
          </S.Section>
        </S.UserBox>

        <S.Title source="profile">선택정보</S.Title>
        <S.ProfileBox>
          <S.Section>
            <S.SubTitle> 주소 </S.SubTitle>
            <SelectBox name="userSido" />
            <SelectBox name="userGugun" />
          </S.Section>

          <S.Section>
            <S.SubTitle> 소개 </S.SubTitle>
            <S.StyledInput
              onChange={(e) => handleInputChange("content", e)}
              placeholder="한줄 소개"
            />
          </S.Section>

          <S.Section>
            <S.SubTitle> 취미 </S.SubTitle>
            <S.StyledInput
              onChange={(e) => handleInputChange("userHobby", e)}
              placeholder="취미"
            />
          </S.Section>

          <S.Section>
            <S.SubTitle> 직업 </S.SubTitle>
            <S.StyledInput
              onChange={(e) => handleInputChange("userJob", e)}
              placeholder="직업"
            />
          </S.Section>

          <S.Section>
            <S.SubTitle> MBTI </S.SubTitle>
            <SelectBox name="userMbti" />
          </S.Section>
        </S.ProfileBox>

        <S.Button onClick={handleOnClick}>수정하기</S.Button>
      </S.ModalContent>
    </S.ModalWrapper>
  );
};

export default MyPageTmp;
