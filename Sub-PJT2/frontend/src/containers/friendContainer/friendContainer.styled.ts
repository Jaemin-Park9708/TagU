import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import { Badge } from "antd";

export const MainContainer = styled.div<{ theme: themeProps }>`
  /* border: solid green 4px; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 250px;
  height: 100%;
  background-color: ${(props) => props.theme.bg.deep};
  position: absolute;
  right: 1px;
`;

export const Container = styled.div`
  /* padding: 10px 16px 0px 16px; */
`;

export const Title = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.light};
  font-size: 18px;
  font-weight: 600;
`;

export const SubTitle = styled(Title)`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  vertical-align: center;
`;

export const FriendContainer = styled.div`
  height: 250px;
  overflow-y: auto;
  border-bottom: solid 1px white;
  margin-bottom: 20px;
`;

export const Tmp = styled.span`
  font-weight: light;
  font-size: 12px;
  color: #efefef;
`;

export const OtherFriendContainer = styled(FriendContainer)`
  height: 100px;
  overflow-y: auto;
  border-bottom: solid 1px white;
`;

export const NullMessageBox = styled.div`
  display: flex;
  justify-content: center;
  vertical-align: center;
`;

export const NullMessage = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.light};
  margin: auto;
  margin-top: 110px;
  font-size: 12px;
`;

export const SpecialNullMessage = styled(NullMessage)`
  margin-top: 35px;
`;

export const Des = styled(Title)`
  font-size: 12px;
  font-weight: 500;
`;

export const SpecialDes = styled(Des)`
  font-size: 12px;
  font-weight: 500;
  margin-top: 5px;
`;

export const StyledBadge = styled(Badge)<{ theme: themeProps }>`
  height: 23px;
  margin-left: 10px;
`;
