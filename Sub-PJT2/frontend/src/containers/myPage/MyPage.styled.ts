import { themeProps } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  margin-top: 10vh;
  margin-left: 10%;
  justify-items: center;
`;

export const Title = styled.text<{ theme: themeProps }>`
  color: ${(props) => props.theme.point.deep};
  font-size: 30px;
  font-weight: bold;
  display: inline-block;
`;

export const miniTitle = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.mid};
  /* opacity: 0.74; */
  width: 15vh;
  font-size: 17px;
  font-weight: bold;
  vertical-align: middle;
  text-align: center;
`;
// export const Select
export const InputArea = styled.div`
  margin-left: 5%;
  margin-top: 1vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

export const Input = styled.input<{ theme: themeProps }>`
  background-image: linear-gradient(
      ${(props) => props.theme.point.deep},
      ${(props) => props.theme.point.deep}
    ),
    linear-gradient(
      ${(props) => props.theme.font.mid},
      ${(props) => props.theme.font.mid}
    );
  border: 0 none;
  /* border-radius: 0; */
  float: none;
  background-color: transparent;
  /* border-radius: 10%; */
  background-repeat: no-repeat;
  background-size: 0 2px, 100% 1px;
  padding: 15px 15px;
  transition: background 0s ease-out 0s;
  color: ${(props) => props.theme.font.mid};
  min-height: 20px;
  display: inline-block;
  width: 20%;
  outline: none;
  font-size: 15px;
  margin-left: 20px;
  &:focus {
    background-size: 100% 2px, 100% 1px;
    outline: 0 none;
    transition-duration: 0.3s;
    color: ${(props) => props.theme.font.deep};
  }
`;

export const Button = styled.button<{ theme: themeProps }>`
  background: ${(props) => props.theme.point.deep};
  color: ${(props) => props.theme.font.light};
  font-size: 17px;
  margin: 10px;
  font-weight: bold;
  padding: 0.6em 1em;
  border-radius: 10px;
  border-color: ${(props) => props.theme.point.deep};
  display: inline-block;
  box-shadow: 0px 2px 4px ${(props) => props.theme.font.deep};
`;

export const SaveButton = styled.button<{ theme: themeProps }>`
  background: ${(props) => props.theme.point.deep};
  color: ${(props) => props.theme.font.light};
  font-size: 17px;
  margin: 10px;
  padding: 0.6em 1em;
  border-radius: 10px;
  font-weight: bold;
  border-color: ${(props) => props.theme.point.deep};
  display: inline-block;
  float: right;
  margin-right: 20vw;
  box-shadow: 0px 2px 4px ${(props) => props.theme.font.deep};
`;

export const Notice = styled.p<{ theme: themeProps }>`
  margin-left: 20px;
  vertical-align: middle;
  font-size: 13px;
  color: ${(props) => props.theme.font.mid};
`;

export const getOptionListStyle = ({ active = true, zIndex = 1 }) => {
  return `
  max-height: ${active ? "300px" : "0"};
  z-index: ${zIndex};
  `;
};

export const Styled = {
  selectbox: styled.div`
    position: relative;
    width: 8rem;
    border-radius: 10px;
    cursor: pointer;
    &&& {
      font-family: inherit !important;
    }
  `,
};
