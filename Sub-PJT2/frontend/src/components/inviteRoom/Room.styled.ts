import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import { Button } from "antd";

export const Profile = styled.div`
  display: flex;
  vertical-align: middle;
`;

export const ProfileImgBox = styled.div`
  display: block;
  overflow: hidden;
  height: 60px;
  width: 60px;
`;

export const ProfileText = styled.div`
  margin: auto 0 auto 0;
  padding-left: 5px;
`;

export const ProfileImg = styled.img`
  border-radius: 20px;
  object-fit: cover;
  display: block;
  min-width: 100%;
  min-height: 100%;
  padding: 10px;
`;

export const Name = styled.div`
  color: #404040;
  font-size: 14px;
  font-weight: 600;
`;

export const StyledBtn = styled(Button)<{
  source: "accept" | "reject";
  theme: themeProps;
}>`
  background-color: ${(props) =>
    props.source === "accept" ? "##5d85be" : "#da3350"} !important;
  font-size: 4px !important;
  font-weight: 600;
  width: 35px;
  margin-right: 5px;
`;

export const Intro = styled(Name)`
  font-size: 8px;
  font-weight: normal;
  margin-top: 5px;
`;

export const BtnContainer = styled.div`
  margin-left: 100px;
  margin-top: 20px;
`;
