import { useState, ChangeEvent } from "react";
import * as S from "./MyPage.styled";
import Dropdown_Adr from "./Dropdown_Address/Dropdown_Adr";
import Dropdown_MBTI from "./Dropdown_MBTI/Dropdown_MBTI";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
const MyPage = () => {
  const theme: themeProps = useTheme();
  const [nickname, setNickname] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [pw, setPw] = useState({
    type: "password",
    visible: false,
  });
  const [newpw, setNewpw] = useState<string>("");
  const [pwcheck, setPwcheck] = useState<string>("");

  const HandlePw = () => {
    setPw(() => {
      if (pw.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  const name_input = document.getElementById("nickname") as HTMLInputElement;

  const changeInput_name = (e: ChangeEvent<typeof name_input>) => {
    setNickname(e.target.value);
  };

  const changeInput_job = (e: ChangeEvent<typeof name_input>) => {
    setJob(e.target.value);
  };

  const changeInput_pw = (e: ChangeEvent<typeof name_input>) => {
    // setPw(e.target.value);
  };

  const changeInput_newpw = (e: ChangeEvent<typeof name_input>) => {
    setNewpw(e.target.value);
  };

  const changeInput_pwcheck = (e: ChangeEvent<typeof name_input>) => {
    setPwcheck(e.target.value);
  };

  return (
    <>
      <S.Container>
        <S.Title theme={theme}>내 정보 수정</S.Title>

        <S.InputArea>
          <S.miniTitle theme={theme}>닉네임</S.miniTitle>
          <S.Input
            id="nickname"
            type="text"
            value={nickname}
            theme={theme}
            onChange={changeInput_name}
            placeholder="닉네임"
          />
          <S.Button theme={theme}>중복체크</S.Button>
        </S.InputArea>
        <S.InputArea>
          <S.miniTitle theme={theme}>주소지</S.miniTitle>
          <Dropdown_Adr></Dropdown_Adr>
        </S.InputArea>
        <S.InputArea>
          <S.miniTitle theme={theme}>MBTI</S.miniTitle>
          <Dropdown_MBTI></Dropdown_MBTI>
        </S.InputArea>
        <S.InputArea>
          <S.miniTitle theme={theme}>직업</S.miniTitle>
          <S.Input
            id="job"
            type="text"
            value={job}
            theme={theme}
            onChange={changeInput_job}
            placeholder="직업"
          />
        </S.InputArea>
        <S.SaveButton theme={theme}>변경사항 저장</S.SaveButton>
      </S.Container>
      <S.Container>
        <S.Title theme={theme}>비밀번호 변경</S.Title>
        <S.InputArea>
          <S.miniTitle theme={theme}>현재 비밀번호</S.miniTitle>
          <S.Input
            id="pw"
            type="password"
            onClick={HandlePw}
            theme={theme}
            onChange={changeInput_pw}
            placeholder="현재 비밀번호"
          />
        </S.InputArea>
        <S.InputArea>
          <S.miniTitle theme={theme}>새 비밀번호</S.miniTitle>
          <S.Input
            id="newpw"
            type="password"
            value={newpw}
            theme={theme}
            onChange={changeInput_newpw}
            placeholder="새 비밀번호"
          />
          <S.Notice theme={theme}>
            비밀번호는 8~20자 이내, 숫자/특수문자/영문대소문자를 사용해주세요.
          </S.Notice>
        </S.InputArea>
        <S.InputArea>
          <S.miniTitle theme={theme}>비밀번호 확인</S.miniTitle>
          <S.Input
            id="pwcheck"
            type="password"
            value={pwcheck}
            theme={theme}
            onChange={changeInput_pwcheck}
            placeholder="새 비밀번호 확인"
          />
          <S.Button theme={theme}>변경사항 저장</S.Button>
        </S.InputArea>
      </S.Container>
    </>
  );
};

export default MyPage;
