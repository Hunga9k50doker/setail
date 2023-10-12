import WebSocket, { WebSocketServer } from "ws";

let wss;
const startWebSocketServer = () => {
  // create a WebSocket server
  wss = new WebSocketServer({ port: 8080, path: "/ws" });
  // handle incoming connections
  wss.on("connection", (ws) => {
    // send a welcome message to the client
    ws.send(JSON.stringify("Welcome to the WebSocket server!"));
    ws.on("message", (message) => {});
    // handle disconnections
    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};

export function broadcastMessage(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

export default startWebSocketServer;
