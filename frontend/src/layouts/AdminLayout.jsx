import { useState } from "react";
import Topbar from "../views/admin/scenes/global/Topbar";
import Sidebar from "../views/admin/scenes/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../views/admin/theme";
import Helmet from "../components/Helmet/Helmet";
function Admin({ children }) {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <Helmet className="admin__layout" title="Admin">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="d-flex">
            <Sidebar isSidebar={isSidebar} />
            <main className="content mt-0 w-100">
              <Topbar setIsSidebar={setIsSidebar} />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Helmet>
  );
}
export default Admin;
