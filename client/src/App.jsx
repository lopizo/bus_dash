import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("http://localhost:3000/health")
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Bus Dash</h1>
      <p>API status: {status}</p>
    </div>
  );
}

export default App;
