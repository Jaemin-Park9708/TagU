import { themeProps } from "@emotion/react";
import styled from "@emotion/styled";

export const DropdownContainer = styled.div`
  padding-left: 25px;
`;

export const DropdownSelect = styled.select<{ theme: themeProps }>`
  outline: none;
  padding: 8px 2px; 
  /* border: 1px; */
  text-align: center;
  border-radius: 10px; 
  font-size: 15px;
  transition: border-color 0.3s;
  margin-right: 10px;
  background: ${(props) => props.theme.font.light};
  &:focus {
    border-color: ${(props) => props.theme.point.deep};
  }
`; 
 
// export const DropdownOption = styled.option`
// `;