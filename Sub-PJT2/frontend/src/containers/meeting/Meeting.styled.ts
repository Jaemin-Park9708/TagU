import styled from "@emotion/styled";

export const Container = styled.div`
  /* border: solid white 5px; */
  display: flex;
  flex-direction: row;
  transition: all 1s;
  /* width: 100%; */
  height: 97%;
  margin-top: 2rem;
`;

export const InnerContainer = styled.div`
  /* border: solid blue 3px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-width: fit-content !important;
  min-height: 40rem;
`;

export const PlayerVidBundle = styled.div`
  /* border: solid black; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 45%;
  min-width: fit-content;
  min-height: fit-content;
  gap: 2rem;
  padding: 2rem 0 2rem 0;
  margin: 1rem;
`;

export const PlayerVid = styled.div`
  border: solid red;
  display: flex;
  width: 20%;
  height: 80%;
  min-width: 20rem;
  min-height: 15rem;
  position: relative;
`;

export const Middle = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  flex: 1; // 추가
`;
