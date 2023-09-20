import { ChangeEvent } from "react";
import * as S from "./Dropdown_MBTI.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";

const Dropdown_MBTI = () => {
  const theme : themeProps = useTheme();
  const onClick = (e: ChangeEvent<HTMLSelectElement>) => {};

  return (
    <S.DropdownContainer>
      <S.DropdownSelect theme={theme} onChange={onClick}>
        <option value="general00">MBTI 선택</option>
        <option value="general01">ISTJ</option>
        <option value="general02">ISTP</option>
        <option value="general03">ISFJ</option>
        <option value="general04">ISFP</option>
        <option value="general05">INTJ</option>
        <option value="general06">INTP</option>
        <option value="general07">INFJ</option>
        <option value="general08">INFP</option>
        <option value="general09">ESTJ</option>
        <option value="general10">ESTP</option>
        <option value="general11">ESFJ</option>
        <option value="general12">ESFP</option>
        <option value="general13">ENTJ</option>
        <option value="general14">ENTP</option>
        <option value="general15">ENFJ</option>
        <option value="general16">ENFP</option>
      </S.DropdownSelect>
    </S.DropdownContainer>
  );
};

export default Dropdown_MBTI;
