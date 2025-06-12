import { NodeData } from "@/types";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useRef,
} from "react";
// import { NodeData } from "../types";

// interface PERMIT{
//   message: boolean
// }

interface SocketContextProps {
  sendMessage: (msg: string) => void;
  messages: NodeData[];
  withPermission: boolean | null;
  setWithPermission: React.Dispatch<React.SetStateAction<boolean | null>>;
  connectionStatus: "connected" | "disconnected" | "reconnecting";
}

const SocketContext = createContext<SocketContextProps>({
  sendMessage: () => {},
  messages: [],
  withPermission: false,
  setWithPermission: () => {},
  connectionStatus: "disconnected",
});

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
  url: string;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  url,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<NodeData[]>([]);
  const [withPermission, setWithPermission] = useState<boolean | null>(null);

  // const [wait]
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "reconnecting"
  >("disconnected");

  // Reference for number of reconnect attempts
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 30;
  const reconnectInterval = 1000; // en millisecondes

  const hasConnectedRef = useRef(false);

  useEffect(() => {
    let ws: WebSocket;
    let timeout: number;

    // To avoid multiple connections
    if (hasConnectedRef.current) return;
    hasConnectedRef.current = true;

    const connect = () => {
      ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("✅ Connected to the WebSocket");
        reconnectAttemptsRef.current = 0;
        setConnectionStatus("connected");

        // Subscribe to "table_data" topic
        const subscribeMessage = JSON.stringify({
          action: "subscribe",
          topic: "table_data",
        });
        // Subscribe to "open_explorer" topic
        // const subscribeExplorer = JSON.stringify({
        //   action: "subscribe",
        //   topic: "open_file",
        // });
        ws.send(subscribeMessage);
        // ws.send(subscribeExplorer);
      };

      ws.onmessage = (event: MessageEvent) => {
        const rawMessage = event.data.toString();
        // console.log("Raw message received:", rawMessage);
        try {
          const jsonData = JSON.parse(rawMessage);
          if (jsonData.action === "wait_for_permission") {
            setWithPermission(jsonData.message); // met à jour true/false
            console.log("Permission reçue:", jsonData.message);
          } else if (jsonData.topic === "table_data") {
            // to be modified later
            setMessages((prev: NodeData[]) => [
              ...prev,
              JSON.parse(jsonData.message),
            ]);
            // console.log("data from jsonData :", jsonData.message);
          } else {
            // to be modified later
            // setMessages((prev) => [...prev, rawMessage]);
            // console.log("Unknown topic:", jsonData.topic);
          }
        } catch (error) {
          console.error("Error parsing JSON message:", error);
        }
      };
      // else if (jsonData.topic === "open_file") {
      //             console.log("permission: ", jsonData.message);
      //           }
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("🚪 WebSocket is closed");
        setConnectionStatus("disconnected");
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current++;
          console.log(
            `Attempting to reconnect in ${
              reconnectInterval / 1000
            } seconds... (Attempt ${
              reconnectAttemptsRef.current
            }/${maxReconnectAttempts})`
          );
          setConnectionStatus("reconnecting");
          timeout = window.setTimeout(connect, reconnectInterval);
        } else {
          console.error("Maximum reconnection attempts reached.");
        }
      };

      setSocket(ws);
    };

    connect();

    return () => {
      if (timeout) clearTimeout(timeout);
      if (ws) ws.close();
    };
  }, [url]);

  const sendMessage = (msg: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(msg);
    } else {
      console.error("WebSocket is not connected");
    }
  };

  return (
    <SocketContext.Provider
      value={{
        sendMessage,
        messages,
        connectionStatus,
        withPermission,
        setWithPermission,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
