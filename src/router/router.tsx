import {
  SidebarLayout,
  HistoryDashboard,
  CategoryDashboard,
} from "../components";
import { SettingsDashboard } from "../components/settings";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

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
          <Route path="/settings" element={<SettingsDashboard />} />
          <Route path="/categories" element={<CategoryDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
