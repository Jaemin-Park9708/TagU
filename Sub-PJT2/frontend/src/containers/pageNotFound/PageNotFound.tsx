import { themeProps } from "@emotion/react";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material";
import * as S from "./PageNotFound.styled";
import { useRef, useState, useEffect } from "react";
import { Header } from "components/header/Header.styled";
import Logo from "asset/img/logo/2.png";
import SadFace from "asset/img/icons8-sorry-96.png";
import { Link, useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const theme: themeProps = useTheme();
  const navigate = useNavigate();

  const clickGoBack = () => {
    navigate(-1);
  };
  
  return (
    <Container>
      <S.Conatiner>
        <S.LogoContainer>
          <S.Logo src={Logo} alt="logo"></S.Logo>
          <S.SadFace src={SadFace} alt="sadFace"></S.SadFace>
        </S.LogoContainer>
        <S.NoticeContainer>
          <S.NoticeArticle theme={theme}>
            <S.NoticeTitle>죄송합니다.</S.NoticeTitle>
            <S.NoticeContent>
              요청하신 페이지를 찾을 수 없습니다.
            </S.NoticeContent>
          </S.NoticeArticle>
          <S.ButtonContainer>
            <S.GoBackBtn theme={theme} onClick={clickGoBack}>
              돌아가기
            </S.GoBackBtn>
            <Link to="/home">
              <S.GoHomeBtn theme={theme}>홈으로</S.GoHomeBtn>
            </Link>
          </S.ButtonContainer>
        </S.NoticeContainer>
      </S.Conatiner>
    </Container>
  );
};

const Container = styled.div`
  /* border: solid red; */
  display: flex;
  width: 100%;
  height: 100%;
`;

export default PageNotFound;
