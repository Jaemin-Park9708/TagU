import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
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
  z-index: 99;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 500px;
  height: 650px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Ani = keyframes`
  from {
    top: 30px;
  }
  to {
    top: 5px;
  }
`;

const Ani2 = keyframes`
  from {
    top: 560px;
  }
  to {
    top: 550px;
  }
`;

export const LogoImg = styled.img`
  width: 200px;
  margin: 60px auto 0 auto;
  position: absolute;
  top: 5px;
  left: 150px;
  animation: ${Ani} 1s ease;
`;

export const UserBox = styled.form`
  position: absolute;
  top: 140px;
  left: 108px;
  margin: 40px 0 0 0;
`;

export const ProfileBox = styled(UserBox)`
  top: 300px;
`;

export const StyledInput = styled(Input)`
  width: 250px;
`;

export const SubTitle = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #a3a3a3;
  display: inline-block;
  width: 30px;
  margin-right: 15px;
`;

export const Section = styled.div`
  padding: 2px 0 2px 0;
`;

type Title = {
  source?: string;
};

export const Title = styled.div<Title>`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
  color: ${(props) => (props.source === "profile" ? "#a3a3a3" : "#f43f5e")};
  position: absolute;
  top: ${(props) => (props.source === "profile" ? "310px" : "150px")};
  left: 85px;
`;

export const Button = styled.button`
  position: absolute;
  top: 550px;
  left: 90px;
  padding: 16px 120px 16px 120px;
  background-color: #f43f5e;
  border-radius: 40px;
  font-size: 20px;
  font-weight: bolder;
  color: white;
  animation: ${Ani2} 1s ease;
  cursor: pointer;
  }
`;
