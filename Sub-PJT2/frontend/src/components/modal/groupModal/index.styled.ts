import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";

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

export const CloseIconStyled = styled(CloseIcon)`
  margin-left: auto;
  z-index: 10001;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 1000px;
  height: 600px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const BtnContainer = styled.span`
  display: flex;
  margin: 0 auto 0 auto;
  width: 800px;
  border-radius: 30px;
`;
export const Icon = styled.div`
  font-size: 80px;
  align-content: center;
  align-items: center;
  padding: 40px 80px 40px 80px;
`;

export const ID = styled.div`
  font-size: 20px;
  align-content: center;
  align-items: center;
  padding: 0 90px 0px 90px;
  font-weight: 600;
`;

export const Title = styled.div`
  padding: 15px 0 15px 0;
  font-size: 16px;
  font-weight: 550;
  border-bottom: solid 1px red;
`;
export const Container = styled.div`
  display: flex;
  gap: 100px;
  padding: 0 70px 0 70px;
  position: absolute;
  top: 160px;
  width: 800px;
  border: solid 1px red;
  border-radius: 30px;
`;

export const FriendContainer = styled.div`
  height: 380px;
  overflow-y: auto;
  border-bottom: solid 1px white;
  border-radius: 30px;
  width: 300px;
`;
