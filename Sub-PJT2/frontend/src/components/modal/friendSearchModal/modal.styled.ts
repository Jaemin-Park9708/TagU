import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "antd";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10001;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 800px;
  height: 300px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ListContainer = styled.div`
  width: 400px;
  height: 300px;
  position: absolute;
  top: -0px;
  padding: 40px 0px 40px 0px;
  border-left: 1px solid rgb(239, 239, 239);
  left: 400px;
`;

export const MSG = styled.div`
  width: 400px;
  height: 300px;
  position: absolute;
  left: 50px;
  top: 65px;
  font-size: 12px;
`;

export const ListContainerInner = styled.div`
  width: 330px;
  height: 220px;
  position: absolute;
  margin-top: 35px;
  margin-left: 50px;
`;

export const StyledInput = styled(Input)`
  width: 280px;
  position: absolute;
  top: 150px;
  left: 60px;
`;

export const CloseIconStyled = styled(CloseIcon)`
  margin-left: auto;
  z-index: 9999;
`;

const Ani = keyframes`
  from {
    top: 50px;
  }
  to {
    top: 15px;
  }
`;

export const LogoImg = styled.img`
  width: 200px;
  margin: 60px auto 0 auto;
  position: absolute;
  top: 15px;
  left: 100px;
  animation: ${Ani} 1s ease;
`;

export const RequestBtn = styled.button`
  width: 280px;
  height: 40px;
  background-color: #f43f5e;
  position: absolute;
  border-radius: 10px;
  top: 200px;
  left: 60px;
  color: white;
  cursor: pointer;
  & {
    :hover {
      background-color: #f75873;
    }
  }
`;
