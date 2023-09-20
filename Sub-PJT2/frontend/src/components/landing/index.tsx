import React, { ReactNode, useState } from "react";
import { useTrail, a } from "@react-spring/web";
import * as S from "./landing.styled";
import styles from "./styles.module.css";

interface TrailProps {
  open: boolean;
  children: ReactNode;
}

const Trail: React.FC<TrailProps> = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 800, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className={styles.trailsText} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

export default function Landing() {
  const [open, set] = useState(true);
  return (
    <div className={styles.container} onClick={() => set((state) => !state)}>
      <Trail open={open}>
        <span>사람을 </span>
        <span>
          알아가다 <S.Dot>.</S.Dot>
        </span>
        <span>
          집에서 <S.Dot>.</S.Dot>
        </span>
      </Trail>
    </div>
  );
}
