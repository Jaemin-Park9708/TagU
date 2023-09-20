import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Profile = styled.div`
  display: flex;
  justify-content: center;
  vertical-align: middle;
  margin-top: 80px;
`;

export const ProfileImgBox = styled.div`
  display: block;
  overflow: hidden;
  height: 90px;
  width: 90px;
`;

export const ProfileText = styled.div`
  margin: auto 0 auto 15px;
`;

export const ProfileImg = styled.img`
  border-radius: 100px;
  object-fit: cover;
  display: block;
  min-width: 100%;
  min-height: 100%;
`;

export const Name = styled.div<{ theme: themeProps }>`
  color: ${(props) => props.theme.font.light};
  font-size: 18px;
  font-weight: bold;
`;

export const Age = styled(Name)`
  font-size: 14px;
  font-weight: normal;
  margin-top: 10px;
`;
