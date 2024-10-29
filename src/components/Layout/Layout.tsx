import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "@components/Header/Header";
import { Footer } from "@components/Footer/Footer";
import MainPage from "@pages/Main/MainPage";
import { ConnectWalletPage } from "@pages/ConnectWallet/ConnectWalletPage";
import { AirdropPage } from "@pages/Airdrop/AirdropPage";
import { useAuth } from "@context/AuthContext";
import ProtectedRoute from "../../ProtectedRoute";

export const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth } = useAuth();

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Header />
      <main>
        {children}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/connect-wallet" element={<ConnectWalletPage />} />
          <Route
            path="/airdrop"
            element={
              <ProtectedRoute isAuthenticated={auth}>
                <AirdropPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
