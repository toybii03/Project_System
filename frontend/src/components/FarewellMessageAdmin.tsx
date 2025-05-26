// src/components/FarewellMessageAdmin.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const FarewellMessageAdmin: React.FC = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get("/api/farewell-message")
      .then((res) => setMessage(res.data.farewell_message))
      .catch(() => setMessage(""));
  }, []);

  const saveMessage = () => {
    axios
      .post("/api/farewell-message", { farewell_message: message })
      .then(() => setStatus("Saved successfully!"))
      .catch(() => setStatus("Failed to save."));
  };

  return (
    <div className="container mt-3">
      <h3>Farewell Message Settings</h3>
      <textarea
        className="form-control"
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={saveMessage}>
        Save
      </button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
};

export default FarewellMessageAdmin;
