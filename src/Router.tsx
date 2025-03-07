import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SaldosPage from "./pages/SaldosPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/saldos" element={<SaldosPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
