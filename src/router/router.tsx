import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HistoryDashboard } from "../components";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HistoryDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
