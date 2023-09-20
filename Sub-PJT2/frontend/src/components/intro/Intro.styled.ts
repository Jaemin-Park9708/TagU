import { themeProps } from "@emotion/react";
import styled from "@emotion/styled";
import EditIcon from "@mui/icons-material/Edit";

export const FavoriteIconStyled = styled(EditIcon)<{ theme: themeProps }>`
  color: ${(props) => props.theme.point.deep};
  width: 25px;
  height: 25px;
`;

export const Container = styled.div`
  vertical-align: middle;
  display: flex;
  padding: 20px;
`

export const Content = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.deep};
  font-size: 17px;
  padding: 20px;
`

export const Input = styled.textarea<{ theme: themeProps }>`
  background-color: rgb(233, 233, 233);
  border-radius: 2rem;
  padding-left: 20px;
  padding-right: 20px;
  height: 3rem;
  border: none;
  &:focus {
    background-size: 100% 2px, 100% 1px;
    background-color: ${(props) => props.theme.point.light} ;
    outline: 0 none;
    transition-duration: 0.3s;
    color: ${(props) => props.theme.font.light};
  }
  width: 50rem
`

export const Button = styled.button<{ theme: themeProps }>`
  background: ${(props) => props.theme.point.deep};
  color: ${(props) => props.theme.font.light};
  font-size: 15px;
  margin-left: 10px;
  margin-top: 5px;
  font-weight: bold;
  width: 2cm;
  height: 1cm;
  border-radius: 10px;
  display: inline-block;
`