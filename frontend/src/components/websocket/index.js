import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_CART_BY_ID } from "../../constants/actionTypes";

const WebSocketComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WS_URL);

    ws.onopen = () => {};

    ws.onmessage = (event) => {
      const result = JSON.parse(event.data);
      if (result.type === "cart") {
        dispatch({
          type: GET_CART_BY_ID,
          payload: { cart: result.data },
        });
      }
    };

    ws.onclose = () => {};

    return () => {
      ws.close();
    };
  }, []);

  return null;
};

export default React.memo(WebSocketComponent);
