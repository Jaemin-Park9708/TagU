import { keyframes, themeProps } from "@emotion/react";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10001;
`;

export const ModalContent = styled.div<{ theme: themeProps }>`
  background-color: ${(props) => props.theme.bg.mid};
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ButtonContainer = styled.div`
  padding-top: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CloseIconStyled = styled(CloseIcon)`
  margin-left: auto;
`;

const Ani = keyframes`
  from {
    top: 50px;
  }
  to {
    top: 40px;
  }
`;

export const Button = styled.button<{ theme: themeProps }>`
  background: ${(props) => props.theme.point.deep};
  color: ${(props) => props.theme.font.light};
  font-size: 20px;
  margin: 15px;
  padding: 0.6em 1em;
  width: 70%;
  height: 30%;
  border-radius: 10px;
  border-color: ${(props) => props.theme.point.deep};
  display: inline-block;
  /* box-shadow: 0px 2px 4px ${(props) => props.theme.font.deep}; */
`;

export const LogoutBtn = styled.button`
  width: 280px;
  height: 40px;
  background-color: #f2f2f2;
  position: absolute;
  border-radius: 10px;
  top: 180px;
  left: 60px;
  & {
    :hover {
      background-color: silver;
    }
  }
`;

export const Loading = styled.div<{ theme: themeProps }>`
  padding-top: 10%;
  font-size: 20px;
  color: ${(props) => props.theme.point.mid};
  font-weight: 400;
`;
