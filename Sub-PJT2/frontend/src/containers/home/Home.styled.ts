import styled from "@emotion/styled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { themeProps } from "@emotion/react";

export const Container = styled.div`
  /* border: solid green 4px; */
  width: 100%;
  height: 100%;
  display: flex;
  vertical-align: center;
  min-width: fit-content;
  padding: 2rem;
`;

export const T = styled.svg`
  margin-left: auto;
  margin-right: 20px;
`;

export const TitleImg = styled.div`
  position: absolute;
  font-size: 30px;
  top: -10px;
`;

export const ProfileContainer = styled.div`
  /* border: solid white 3px; */
  width: 70%;
  display: flex;
  border-radius: 5px;
  margin: auto;
  overflow: hidden;
  position: relative;
  min-width: 40rem;
`;

export const Img = styled.img`
  width: 50%;
`;
export const Insta = styled.div`
  border-top: 1px solid rgb(239, 239, 239);
  min-height: 30px;
`;

export const SVG = styled.svg`
  margin: 10px;
`;

export const Sec = styled.div`
  display: inline-block;
  width: 85%;
`;

export const SContainer = styled.div`
  display: flex;
  /* margin-right: 150px; */
  max-width: 40vw;
  padding-bottom: 50px;
`;

export const OtherContainer = styled.div`
  padding-bottom: 50px;
`;

export const InnerContent = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 20px;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

export const Contents = styled.div`
  margin-top: 10px;
  margin-left: 20px;
`;

export const LeftContainer = styled.div`
  width: inherit;
  height: inherit;
  border: 1px solid rgb(239, 239, 239);
`;

export const FavoriteIconStyled = styled(FavoriteIcon)<{
  theme: themeProps;
}>`
  color: #ff9993;
`;

export const IMG = styled.img`
  margin: 10px;
`;
export const Title = styled.text<{ theme: themeProps }>`
  color: ${(props) => props.theme.point.deep};
  font-size: 25px;
  font-weight: bold;
  /* display: block; */
`;

export const miniTitle = styled.text<{ isDark: boolean }>`
  color: ${({ isDark }) => (isDark ? "#e2e2e2" : "#404040")} !important;
  font-size: 18px;
  padding-bottom: 15px;
`;

export const SubText = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.mid};
  font-size: 16px;
  padding-bottom: 15px;
`;

export const Strong = styled.strong<{ isDark: boolean }>`
  color: ${({ isDark }) => (isDark ? "#e2e2e2" : "#404040")} !important;
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 15px;
`;

export const Wall = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.mid};
  width: 2.5em;
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 15px;
`;

export const likeCount = styled.div`
  color: #f43f5e;
  font-size: 18px;
  font-weight: bold;
`;

export const Dat = styled.div`
  display: inline-block;
  background-color: red;
  line-height: 5px;
`;

export const TTmp = styled.div`
  position: relative;
  height: 45px;
  line-height: 45px;
`;

export const Tmp = styled.img`
  position: absolute;
  top: 15px;
  left: 20px;
  display: inline-block;
  width: 20px;
  height: 20px;
  text-indent: -1000px;
  overflow: hidden;
`;

export const InstaIn = styled.div`
  margin: 0px 10px 0px 10px;
`;

export const TTTmp = styled.svg`
  position: absolute;
  top: 10px;
  left: 20px;
  display: inline-block;
  width: 25px;
  height: 25px;
  text-indent: -1000px;
  overflow: hidden;
`;

export const Temp = styled.span`
  padding: 0 0 0 55px;
  font-size: 14px;
`;
