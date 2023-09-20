import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  IsDark,
  ProfileInfo,
  ProfileImgSrc,
  TokenValue,
  UserInfo,
  GroupResDto,
} from "../../atoms/atoms";
import * as S from "./LeftContainer.styled";
import Profile from "components/profile";
import { useEffect, useState } from "react";
import { Modal } from "components/modal";
import { Cookies, useCookies } from "react-cookie";
import Matching from "components/matching";
import { GroupModal } from "components/modal/groupModal";

const LeftContainer = () => {
  const [isDark, setIsDark] = useRecoilState(IsDark);
  const [token, setToken] = useRecoilState(TokenValue);
  const [showModal, setShowModal] = useState<boolean>(false);
  const cookies = new Cookies();
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const [profileInfo, setProfileInfo] = useRecoilState(ProfileInfo);
  const [authToken, setAuthToken] = useState<string>("");
  const [imgSrc, setImgSrc] = useRecoilState<string>(ProfileImgSrc);
  const [showMatching, setShowMatching] = useState<boolean>(false);
  const [showGruopModal, setshowGruopModal] = useState<boolean>(false);
  const groupInfo = useRecoilValue(GroupResDto);

  useEffect(() => {
    setAuthToken(cookies.get("Auth"));
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      // console.log("left_container에서 받는 localToken", authToken);
      fetch(`${process.env.REACT_APP_BASE_URL}/users/mypage`, {
        headers: {
          Auth: authToken,
        },
      })
        .then((response) => response.json())
        .then((res) => setUserInfo(res));
    };
    authToken && setToken(authToken);
    authToken && fetchProfile();
  }, [authToken]);

  useEffect(() => {
    const fetchProfile = async () => {
      fetch(`${process.env.REACT_APP_BASE_URL}/profile`, {
        headers: {
          Auth: authToken,
        },
      })
        .then((response) => response.json())
        .then((res) => setProfileInfo(res));
    };
    authToken && setToken(authToken);
    authToken && fetchProfile();
  }, [authToken]);

  useEffect(() => {
    const fetchImgSrc = async () => {
      // console.log("프로필 이미지 받기 전 토큰 확인", token);
      fetch(`${process.env.REACT_APP_BASE_URL}/users/image`, {
        headers: {
          Auth: token,
        },
      })
        .then((response) => response.json())
        .then((res) => setImgSrc(res.imageUrl));
    };
    token && fetchImgSrc();
  }, [token]);

  useEffect(() => {
    console.log("imgSrc바뀜", imgSrc);
  }, [imgSrc]);

  const theme: themeProps = useTheme();

  const [, , removeCookie] = useCookies(["Auth"]);

  const handleLogout = () => {
    removeCookie("Auth");
    setToken("");
    window.location.href = "/";
  };

  return (
    <>
      <S.Container theme={theme}>
        <S.BtnBox>
          <button onClick={() => setIsDark((cur) => !cur)}>
            {isDark ? (
              <S.LightModeIconStyled theme={theme} />
            ) : (
              <S.DarkModeIconStyled theme={theme} />
            )}
          </button>
        </S.BtnBox>

        <Profile
          imgSrc={imgSrc}
          name={userInfo.userName}
          age={userInfo.userAge}
          group={groupInfo.groupId}
        />

        <S.ListBox>
          <S.List
            theme={theme}
            onClick={() => {
              window.location.href = "/home";
            }}
          >
            <S.ListText>
              <S.Tmp>🏡</S.Tmp> H O M E
            </S.ListText>
          </S.List>
          <S.List
            theme={theme}
            onClick={() => (window.location.href = "/mypage")}
          >
            <S.ListText>
              <S.Tmp>🏝️</S.Tmp> M Y P A G E
            </S.ListText>
          </S.List>
          <S.List theme={theme}>
            <S.ListText
              onClick={() => {
                setshowGruopModal(true);
              }}
            >
              <S.Tmp> 👬 </S.Tmp> G R O U P
            </S.ListText>
          </S.List>
        </S.ListBox>

        <S.List theme={theme}>
          <S.ListText
            onClick={() => {
              setShowMatching(true);
            }}
          >
            <S.Tmp>👨‍❤️‍👨</S.Tmp> M E E T I N G
          </S.ListText>
        </S.List>

        <S.FootBox
          theme={theme}
          onClick={() => {
            setShowModal(true);
          }}
        >
          LOGOUT
        </S.FootBox>
      </S.Container>

      {showModal && (
        <Modal
          handleOnClick={() => handleLogout}
          setShowModal={setShowModal}
          formType="logout"
        />
      )}
      {showGruopModal && <GroupModal setShowModal={setshowGruopModal} />}
      {showMatching && <Matching setShowMatching={setShowMatching} />}
    </>
  );
};

export default LeftContainer;
