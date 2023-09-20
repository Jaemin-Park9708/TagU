import { themeProps } from "@emotion/react";
import styled from "@emotion/styled";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";

export const Container = styled.div<{ theme: themeProps }>`
  width: 250px;
  background-color: ${(props) => props.theme.bg.deep};
`;

export const BtnBox = styled.div`
  width: fit-content;
  margin: 20px 10px 30px 10px;
`;

export const List = styled.li<{ theme: themeProps }>`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  color: ${(props) => props.theme.font.light};
  line-height: 20px;
  cursor: pointer;
  border-bottom: solid 1px;
  padding: 18px 10px 18px 10px;
  border-bottom-color: ${(props) => props.theme.bg.mid};
  vertical-align: middle;
`;

export const Tmp = styled.strong`
  margin-right: 10px;
`;

export const ListBox = styled.ul`
  margin-top: 50px;
  align-items: center;
  text-align: center;
`;

export const ListText = styled.div`
  margin-left: 35px;
  font-weight: 400;
`;

export const LogoutIconStyled = styled(LogoutIcon)<{
  theme: themeProps;
}>`
  margin-top: 10px;
  font-size: 14px;
  bold: bold;
  color: ${(props) => props.theme.font.light};
`;

export const LightModeIconStyled = styled(LightModeIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.font.light};
`;

export const DarkModeIconStyled = styled(DarkModeIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.font.light};
`;

export const ArrowForwardIosIconStyled = styled(ArrowForwardIosIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.font.light};
`;

export const ArrowBtn = styled.button`
  margin-left: 150px;
`;

export const ArrowBackIosIconStyled = styled(ArrowBackIosIcon)<{
  theme: themeProps;
}>`
  color: ${(props) => props.theme.font.light};
`;

export const FootBox = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.light};
  position: relative;
  left: 160px;
  top: 200px;
`;
