// src/components/FarewellMessage.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const FarewellMessage: React.FC = () => {
  const [message, setMessage] = useState("Thank you for your purchase!");

  useEffect(() => {
    axios
      .get("/api/farewell-message")
      .then((res) => setMessage(res.data.farewell_message))
      .catch(() => setMessage("Thank you for your purchase!"));
  }, []);

  return (
    <div className="alert alert-info mt-3" role="alert">
      {message}
    </div>
  );
};

export default FarewellMessage;
