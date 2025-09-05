import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import {
  CreateTransaction,
  HistoryDashboard,
  SidebarLayout,
} from "../components";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <SidebarLayout>
              <Outlet />
            </SidebarLayout>
          }
        >
          <Route path="/" element={<HistoryDashboard />} />
          <Route path="/new-transaction" element={<CreateTransaction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
