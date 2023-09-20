import { themeProps } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const Label = styled.label<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.deep};
  vertical-align: middle;
  padding-top: 15px;
  padding-right: 10px;
  /* margin-top: 10px; */
`

export const Select = styled.select<{ theme: themeProps }>`
  width: 200px;
  border: 1px solid ${(props) => props.theme.point.deep};
  box-sizing: border-box;
  border-radius: 10px;
  padding: 12px 13px;
  margin-bottom: 10px;
  margin-top: 3px;
  /* font-family: 'Roboto'; */
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  /* display: block; */
`

export const Input = styled.input<{ theme: themeProps }>`
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
  width: 30rem
`

export const Add = styled.button<{ theme: themeProps }>`
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
  bottom: 10px;
  right: 10px;
`