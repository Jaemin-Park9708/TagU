import * as S from "./Landing.styled";
import Landing from "components/landing";
import tmpLogo from "../../asset/img/logo/2.png";

const LandingContainer = () => {
  return (
    <S.LandingOuter>
      <S.Nav>
        <S.Img src={tmpLogo} height={28}></S.Img>
      </S.Nav>
      <S.Container>
        <S.LogoBox>.</S.LogoBox>
        <S.TextBox>
          <Landing />
          <S.Btn content={"시작하기"}></S.Btn>
        </S.TextBox>
      </S.Container>
    </S.LandingOuter>
  );
};

export default LandingContainer;
