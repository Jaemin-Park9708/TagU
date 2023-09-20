import React, { useRef } from "react";

export const WebSocketContext = React.createContext<any>(null);
// export { WebSocketContext };

export default ({ children }: { children: React.ReactNode }) => {
  const webSocketUrl = `ws://localhost:3000/ws`;
  let ws = useRef<WebSocket | null>(null);
  // if (!ws.current) {
    ws.current = new WebSocket(webSocketUrl);
    ws.current.onopen = () => {
      console.log("connected to " + webSocketUrl);
      console.log("제발 돼라");
      console.log("여기까진 오냐?");
      setInterval(() => {
        if (!ws.current) return;
        // 3초마다 클라이언트로 메시지 전송
        ws.current.send("서버에서 클라이언트로 메시지를 보냅니다.");
      }, 3000);
    };
    ws.current.onclose = (error) => {
      console.log("disconnected from " + webSocketUrl);
      console.log(error);
    };
    ws.current.onerror = (error) => {
      console.log("connection error " + webSocketUrl);
      console.log(error);
    };
  // }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};
