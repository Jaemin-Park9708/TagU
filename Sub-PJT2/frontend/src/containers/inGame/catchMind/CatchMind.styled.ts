import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";

export const Container = styled.div`
  /* border: solid 2px black; */
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 90%;
  justify-content: space-evenly;
  margin-top: 3rem;
  min-width: fit-content;
`;

export const CanvasBox = styled.div<{ theme: themeProps }>`
  border: solid 3px ${(props) => props.theme.point.light};
  border-radius: 0.4rem;
  background-color: ${(props) => props.theme.point.mid};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 53%;
  height: 90%;
  padding: 1rem 1rem 1rem 1rem;
  min-height: 40rem;
  min-width: fit-content;
  margin: 0 1rem 0 1rem;
`;

export const Canvas = styled.canvas<{ theme: themeProps }>`
  /* border: solid green; */
  border-radius: 0.4rem;
  background-color: white;

  &:hover {
    cursor: crosshair;
  }
`;

export const PaletteBody = styled.div<{ theme: themeProps }>`
  /* border: solid green; */
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  background-color: ${(props) => props.theme.point.light};
  height: 8rem;
  width: 95%;
  padding: 1rem;
`;

export const Palette = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  position: relative;
`;

export const UpperPalette = styled.div`
  /* border: solid black; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 60%;
`;

export const PaletteColor = styled.div<{ theme: themeProps }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: solid black 2px;
  border-radius: 0.7rem;
  padding: 0.5rem;
  margin: 0.5rem;
  font-weight: bold;
  width: 4rem;

  &:hover {
    cursor: pointer;
    border: solid 2px ${(props) => props.theme.point.deep};
    opacity: 1;
  }
`;

export const Body = styled.div`
  /* border: solid yellow; */
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const PlayerVidBundle = styled.div`
  /* border: solid green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 2rem;
  padding: 2rem 0 2rem 0;
`;

export const PlayerVid = styled.div`
  border: solid red;
  display: flex;
  width: 80%;
  /* height: ; */
  min-width: 15rem;
  min-height: 10rem;
`;

export const WordContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  text-align: center;
  width: 15rem;
  height: 5rem;
  margin-top: 1rem;
`;

export const WordText = styled.div<{ theme: themeProps }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 900;
  background-color: ${(props) => props.theme.point.deep};
  border-radius: 0.4rem;
  padding: 0.4rem;
`;

export const WordTitle = styled.div<{ theme: themeProps }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 0.4rem;
`;

export const Word = styled.div`
  border-radius: 0.3rem;
  background-color: white;
  padding: 0.3rem;
  font-size: 1.5rem;
`;

export const SeekBarContainer = styled.div<{ theme: themeProps }>`
  /* border: solid black; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
  padding-right: 2rem;
  margin-left: 2rem;
`;

export const SeekBar = styled.input<{ theme: themeProps }>`
  -webkit-appearance: none;
  cursor: grab;
  height: 100%;
  border-radius: 0.7rem;

  &:focus {
    outline: none;
  }

  //WEBKIT
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: ${(props) => props.theme.point.deep};
    height: 1.2rem;
    width: 1.2rem;
    border-radius: 50%;
    margin-top: -0.3rem;
    cursor: grab;
  }

  &::-webkit-slider-runnable-track {
    height: 0.6rem;
    border-radius: 3rem;
    transition: all 0.5s;
    cursor: pointer;
  }
`;

export const BrushInfo = styled.div`
  /* border: solid black 4px; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 6rem;
  width: 7rem;
  position: absolute;
  top: -2.5rem;
  right: 10rem;
  border-radius: 0.3rem;
  z-index: 100000;
`;

export const Burshimg = styled.img`
  width: 2rem;
  height: 2rem;
`;

export const BrushShape = styled.div`
  border: none;
  background-color: black;
  border-radius: 50%;
  /* width: 0.3rem; */
  /* height: 0.3rem; */
  min-width: 0.3rem;
  min-height: 0.3rem;
  margin-top: 2rem;
`;
