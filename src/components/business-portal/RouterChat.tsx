import React, { useRef, useEffect } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { AuthContext } from "context/authContext";

const RouterChat = () => {
  const tawkMessengerRef = useRef<any>();

  const onLoad = () => {
    console.log("Subscribed!");
  };

  return (
    <div>
      <TawkMessengerReact
        propertyId={process.env.REACT_APP_TAWK_PROPERTY_ID}
        widgetId={process.env.REACT_APP_TAWK_WIDGET_ID}
        ref={tawkMessengerRef}
        onLoad={onLoad}
      />
    </div>
  );
};

export default RouterChat;
