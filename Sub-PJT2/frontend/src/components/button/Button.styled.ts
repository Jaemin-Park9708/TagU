import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -6px, 0);
  }

  70% {
    transform: translate3d(0, -3px, 0);
  }

  90% {
    transform: translate3d(0,-1px,0);
  }
`;

export const Button = styled.button`
  padding: 20px 80px 20px 80px;
  background-color: #f43f5e;
  border-radius: 40px;
  font-size: 20px;
  font-weight: bolder;
  color: white;
  animation-delay: 2s;
  animation: ${bounce} 1.5s ease infinite;
`;
