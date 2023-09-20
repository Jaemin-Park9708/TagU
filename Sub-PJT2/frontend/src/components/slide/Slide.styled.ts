import styled from "@emotion/styled";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Container = styled.div`
  overflow:hidden;
`;

export const StyledSlider = styled(Slider)`
  .slick-slide div{
    outline: none;
  }
`;

export const ImageContainer = styled.div`
  margin: 30px 17px;
`;

export const Image = styled.img`
  max-width:80vw;
  max-height: 30vh;
  margin-right: 15px
`;

export const BigImage = styled.img`
  max-width: vw;
  max-height: 40vh;
`