import { useState } from "react";
import Topbar from "../views/admin/scenes/global/Topbar";
import Sidebar from "../views/admin/scenes/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../views/admin/theme";
import { ProSidebarProvider } from "react-pro-sidebar";
function Admin({ children }) {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  console.log(children);

  return (
    <div className="admin__layout">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="d-flex">
            <ProSidebarProvider>
              <Sidebar isSidebar={isSidebar} />
            </ProSidebarProvider>
            <main className="content mt-0 w-100">
              <Topbar setIsSidebar={setIsSidebar} />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}
export default Admin;
