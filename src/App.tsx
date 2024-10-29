import { Layout } from "@components/Layout/Layout";
import { Outlet } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { ThirdwebProvider } from "thirdweb/react";
import { AuthProvider } from "@context/AuthContext";

const App = () => {
  return (
    <ThirdwebProvider>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Outlet />
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </ThirdwebProvider>
  );
};

export default App;
