import * as S from "./CatchMind.styled";
import * as M from "../../meeting/Meeting.styled";
import { useRef, useState, useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import UserVideoComponent from "../../meeting/UserVideoComponent"
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";
import brush from "asset/img/brush.png";
import { RoomInfo } from "atoms/atoms";
import { useRecoilState } from "recoil";
import { Publisher } from "openvidu-browser";
interface Coordinate {
  x: number;
  y: number;
}

interface CatchMindProps {
  publisher: any; // publisher의 타입을 여기에 정확히 지정해주세요
  subscribers: any[]; // subscribers의 타입을 여기에 정확히 지정해주세요
}

const CatchMind = ({ publisher, subscribers }: CatchMindProps) => {
  const theme: themeProps = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState<string>("black");
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );
  const [isPainting, setIsPainting] = useState(false);
  const [thickness, setThickness] = useState(1); 
  const [roomInfo, setRoomInfo] = useRecoilState(RoomInfo); // 추가


  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      context.strokeStyle = color;
      context.lineJoin = "round";
      context.lineWidth = thickness;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  const paint = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener("mousedown", startPaint);
    canvas.addEventListener("mousemove", paint);
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);

    return () => {
      canvas.removeEventListener("mousedown", startPaint);
      canvas.removeEventListener("mousemove", paint);
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
  }, [startPaint, paint, exitPaint]);

  const [fillColor, setFillColor] = useState({
    backgroundColor: "",
    color: "",
  });

  const handleColorClick = (e: any) => {
    setColor(e.target.innerText);
    if (
      e.target.innerText === "black" ||
      e.target.innerText === "blue" ||
      e.target.innerText === "navy"
    ) {
      setFillColor({ backgroundColor: e.target.innerText, color: "white" });
    } else {
      setFillColor({ backgroundColor: e.target.innerText, color: "black" });
    }
  };

  const handleClear = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");
    context?.clearRect(0, 0, 800, 600);
  };

  const handleFill = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.fillStyle = color;
    context?.fillRect(0, 0, 800, 600);
  };

  const [brushShape, setBrushShape] = useState({
    height: thickness * 0.1 + "rem",
    width: thickness * 0.1 + "rem",
    backgroundColor: "white",
  });

  const seekBarRef = useRef<HTMLInputElement>(null);

  const brushThicknessControl = async () => {
    if (!seekBarRef || !seekBarRef.current) return;
    setThickness(seekBarRef.current?.valueAsNumber);
  };

  useEffect(() => {
    setBrushShape({
      height: thickness * 0.1 + "rem",
      width: thickness * 0.1 + "rem",
      backgroundColor: fillColor.backgroundColor,
    });
  }, [thickness, fillColor]);

  return (
    <S.Container>
      <S.Body>
        {/* 사람 영상 뜰 자리 */}
        { roomInfo.roomType === "One" ? (
          <S.PlayerVidBundle>
            <S.PlayerVid><UserVideoComponent streamManager={publisher} /></S.PlayerVid>
          </S.PlayerVidBundle>
        ) : (
          <S.PlayerVidBundle>
            <S.PlayerVid><UserVideoComponent streamManager={publisher} /></S.PlayerVid>
            <S.PlayerVid><UserVideoComponent streamManager={publisher} /></S.PlayerVid>
            <S.PlayerVid><UserVideoComponent streamManager={publisher} /></S.PlayerVid>
          </S.PlayerVidBundle>
        )
        }
        {/* 그림판 */}
        <S.CanvasBox theme={theme}>
          <S.Canvas ref={canvasRef} width="550" height="350" theme={theme} />
          <S.WordContainer>
            <S.WordText theme={theme}>
              <S.WordTitle theme={theme}>제시어</S.WordTitle>
              <S.Word>꿀벌</S.Word>
            </S.WordText>
          </S.WordContainer>
          <S.PaletteBody theme={theme}>
            <S.Palette>
              <S.BrushInfo>
                <S.BrushShape style={brushShape} />
                <S.Burshimg src={brush} alt="브러쉬 정보" />
              </S.BrushInfo>
              <S.UpperPalette>
                <S.PaletteColor
                  theme={theme}
                  onClick={handleColorClick}
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  black
                </S.PaletteColor>
                <S.PaletteColor
                  theme={theme}
                  onClick={handleColorClick}
                  style={{ backgroundColor: "white" }}
                >
                  white
                </S.PaletteColor>
                <S.PaletteColor
                  theme={theme}
                  onClick={handleClear}
                  style={{ backgroundColor: "white" }}
                >
                  clear
                </S.PaletteColor>
                <S.PaletteColor
                  theme={theme}
                  onClick={handleFill}
                  style={fillColor}
                >
                  fill
                </S.PaletteColor>
              </S.UpperPalette>
              <S.SeekBarContainer theme={theme}>
                <S.SeekBar
                  ref={seekBarRef}
                  theme={theme}
                  type="range"
                  min={1}
                  max={30}
                  value={thickness}
                  onChange={brushThicknessControl}
                ></S.SeekBar>
              </S.SeekBarContainer>
            </S.Palette>
            <S.Palette>
              <S.PaletteColor
                theme={theme}
                onClick={handleColorClick}
                style={{ backgroundColor: "red" }}
              >
                red
              </S.PaletteColor>
              <S.PaletteColor
                theme={theme}
                onClick={handleColorClick}
                style={{ backgroundColor: "orange" }}
              >
                orange
              </S.PaletteColor>
              <S.PaletteColor
                theme={theme}
                onClick={handleColorClick}
                style={{ backgroundColor: "yellow" }}
              >
                yellow
              </S.PaletteColor>
              <S.PaletteColor
                theme={theme}
                onClick={handleColorClick}
                style={{ backgroundColor: "green" }}
              >
                green
              </S.PaletteColor>
              <S.PaletteColor
                theme={theme}
                onClick={handleColorClick}
                style={{ backgroundColor: "blue" }}
              >
                blue
              </S.PaletteColor>
              <S.PaletteColor
                theme={theme}
                onClick={handleColorClick}
                style={{ backgroundColor: "navy" }}
              >
                navy
              </S.PaletteColor>
              <S.PaletteColor
                theme={theme}
                onClick={handleColorClick}
                style={{ backgroundColor: "purple" }}
              >
                purple
              </S.PaletteColor>
            </S.Palette>
          </S.PaletteBody>
        </S.CanvasBox>
        {/* 사람 영상 뜰 자리 */}
        <S.PlayerVidBundle>
          {subscribers.map((sub, i) => {
            return(
              <S.PlayerVid><UserVideoComponent streamManager={sub} /></S.PlayerVid>
              )})}
        </S.PlayerVidBundle>
      </S.Body>
    </S.Container>
  );
};

export default CatchMind;
function setRoomInfo(parsedRoomInfo: any) {
  throw new Error("Function not implemented.");
}

function joinSession(parsedRoomInfo: any) {
  throw new Error("Function not implemented.");
}

