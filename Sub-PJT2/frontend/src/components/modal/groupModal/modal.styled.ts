import styled from "@emotion/styled";
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
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 1000px;
  height: 700px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const CloseIconStyled = styled(CloseIcon)`
  margin-left: auto;
`;
