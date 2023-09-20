import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Header = styled.header<{ theme: themeProps }>`
  /* border: solid black; */
  border-bottom: solid ${(props) => props.theme.point.mid};
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bg.mid};
  transition: all 1s;
  height: 4rem;
  width: 100%;
  padding: 1rem;
`;

export const Logo = styled.img`
  position: relative;
  right: 46%;
  /* border: solid red; */
`;

export const Exit = styled.img`
  width: 2rem;
  height: 2rem;
`;
