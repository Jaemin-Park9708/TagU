import * as S from "./Home.styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import Slider from "components/slide";
import Tags from "components/tags";
import Intro from "components/intro";
import Postit from "components/postit";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ProfileImgSrc, UserInfo, ProfileInfo, IsDark } from "atoms/atoms";
import tageyou from "../../asset/img/tmpprofile.png";
import profile from "../../asset/img/dsd.png";

const Home = () => {
  const theme: themeProps = useTheme();
  const profileSrc = useRecoilValue(ProfileImgSrc);
  const userInfo = useRecoilValue(UserInfo);
  const profileInfo = useRecoilValue(ProfileInfo);
  const isDark = useRecoilValue(IsDark);

  useEffect(() => {
    console.log("isDark", isDark);
  }, [isDark]);

  return (
    <S.Container>
      <S.ProfileContainer>
        <S.Img src={profileSrc} width={100} alt="profileimg" />
        {/* <S.TitleImg>💗</S.TitleImg> */}
        <S.LeftContainer>
          <S.InnerContent>
            <S.miniTitle isDark={isDark}>
              {userInfo.userGender === "FEMALE" ? "👧" : "👦"}
            </S.miniTitle>
            <S.Wall theme={theme}>|</S.Wall>
            <S.miniTitle isDark={isDark}>{userInfo.userName}</S.miniTitle>
            <S.Wall theme={theme}>|</S.Wall>
            <S.miniTitle isDark={isDark}>{userInfo.userAge}세</S.miniTitle>
            <S.Wall theme={theme}>|</S.Wall>
            <S.T
              color="rgb(0, 0, 0)"
              fill="rgb(0, 0, 0)"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="6" cy="12" r="1.5"></circle>
              <circle cx="18" cy="12" r="1.5"></circle>
            </S.T>
          </S.InnerContent>
          <S.Contents>
            <S.SubText theme={theme}>
              #_현재_<S.Strong isDark={isDark}>{profileInfo.userSido}</S.Strong>
              _<S.Strong isDark={isDark}>{profileInfo.userGugun}</S.Strong>
              _거주_중
            </S.SubText>
            <S.SubText theme={theme}>
              #_<S.Strong isDark={isDark}>{profileInfo.userJob}</S.Strong>
              로_일하고_있어요
            </S.SubText>
            <S.SubText theme={theme}>
              #_주말에는_보통_
              <S.Strong isDark={isDark}>{profileInfo.userHobby}</S.Strong>
              _해요
            </S.SubText>
            <S.SubText theme={theme}>
              #_저의_성향은_
              <S.Strong isDark={isDark}>{profileInfo.userMbti}</S.Strong>
            </S.SubText>
            <S.SubText theme={theme}>
              #_<S.Strong isDark={isDark}>{profileInfo.content}</S.Strong>
            </S.SubText>
          </S.Contents>
          <S.Insta>
            <S.InstaIn>
              <S.Sec>
                <S.SVG
                  className="x1lliihq x1n2onr6"
                  color="rgb(255, 48, 64)"
                  fill="rgb(255, 48, 64)"
                  height="24"
                  role="img"
                  viewBox="0 0 48 48"
                  width="24"
                >
                  <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                </S.SVG>

                <S.SVG
                  className="x1lliihq x1n2onr6"
                  color="rgb(0, 0, 0)"
                  fill="rgb(0, 0, 0)"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path
                    d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                    fill="none"
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></path>
                </S.SVG>

                <S.SVG
                  className="x1lliihq x1n2onr6"
                  color="rgb(0, 0, 0)"
                  fill="rgb(0, 0, 0)"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="22"
                    x2="9.218"
                    y1="3"
                    y2="10.083"
                  ></line>
                  <polygon
                    fill="none"
                    points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></polygon>
                </S.SVG>
              </S.Sec>
              <S.SVG
                className="x1lliihq x1n2onr6"
                color="rgb(0, 0, 0)"
                fill="rgb(0, 0, 0)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <polygon
                  fill="none"
                  points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></polygon>
              </S.SVG>
            </S.InstaIn>
          </S.Insta>
          <S.Insta>
            <S.TTmp>
              <S.Tmp src={tageyou} alt="profile" width={20} />
              <S.Temp>
                tagyou님 외
                <S.Strong isDark={isDark}> {userInfo.userLike + 1}</S.Strong>
                명이 좋아합니다
              </S.Temp>
            </S.TTmp>
          </S.Insta>
          <S.Insta>
            <S.TTmp>
              <S.TTTmp
                className="x1lliihq x1n2onr6"
                color="rgb(0, 0, 0)"
                fill="rgb(0, 0, 0)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
              </S.TTTmp>
              <S.Temp>댓글 달기...</S.Temp>
            </S.TTmp>
          </S.Insta>
        </S.LeftContainer>
        {/* <S.RightContainer>
          <S.InnerContent>
            <S.miniTitle isDark={isDark}>
              {profileInfo.userSido} {profileInfo.userGugun}
            </S.miniTitle>
          </S.InnerContent>
          <S.InnerContent>
            <S.miniTitle isDark={isDark}>{profileInfo.userMbti}</S.miniTitle>
          </S.InnerContent>
        </S.RightContainer> */}
        {/* <S.OtherContainer>
          <S.Title theme={theme}>사진첩</S.Title>
          <Slider></Slider>
        </S.OtherContainer>
        <S.OtherContainer>
          <S.Title theme={theme}>취미</S.Title>
          <Tags></Tags>
        </S.OtherContainer>
        <S.OtherContainer>
          <S.Title theme={theme}>한 줄 소개</S.Title>
          <Intro data={profileInfo.content}></Intro>
        </S.OtherContainer> */}
      </S.ProfileContainer>
    </S.Container>
  );
};

export default Home;
