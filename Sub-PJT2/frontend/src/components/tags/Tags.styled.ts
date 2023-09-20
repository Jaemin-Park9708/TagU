import { themeProps } from "@emotion/react";
import styled from "@emotion/styled";


export const HashWrap = styled.div<{ theme: themeProps }>`
  margin-top: 24px;
  font-size: 1.125rem;
  display: flex;
  flex-wrap: wrap;
  letter-spacing: -0.6px;
  color: #444241;
  border-bottom: 1.6px dashed ${(props) => props.theme.bg.deep};
  padding: 2px 2px 8px 2px;

  .HashWrapOuter {
    display: flex;
    flex-wrap: wrap;
  }

  .HashWrapInner {
    margin-top: 5px;
    background: ${(props) => props.theme.bg.mid};
    border-radius: 56px;
    padding: 8px 12px;
    color: ${(props) => props.theme.point.mid};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.3rem;
    line-height: 20px;
    margin-right: 10px;
    cursor: pointer;
  }

`

export const HashInput = styled.input<{ theme: themeProps }>`
  width: auto;
  margin: 10px;
  display: inline-flex;
  outline: none;
  cursor: text;
  line-height: 2rem;
  margin-bottom: 0.75rem;
  min-width: 8rem;
  border: none;
  background-color: ${(props) => props.theme.bg.light};
`