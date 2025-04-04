import { useState } from "react";
import { BrowserRouter } from "react-router";
import CRMRouter from "./routes/CRMRouter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <CRMRouter />

        {/* TEMPORARILY COMMENTED OUT */}
        {/* <CRMProtectedRouter /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
