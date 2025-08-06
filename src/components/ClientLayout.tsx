// src/components/ClientLayout.tsx
"use client";

import React from "react";
import { Layout } from "antd";
import AppHeader from "./AppHeader";
import DashboardSidebar from "./DashboardSidebar"; // Make sure this is imported

const { Content } = Layout;

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Layout hasSider>
        {" "}
        {/* Add hasSider prop to the Layout to enable proper sidebar behavior */}
        <Content
          style={{ padding: "0 50px", marginTop: "20px", display: "flex" }}
        >
          <div
            style={{
              background: "#fff",
              minHeight: "80vh",
              padding: "24px",
              borderRadius: "8px",
              flexGrow: 1,
            }}
          >
            {children} {/* This will render the MapWithDrawing component */}
          </div>
        </Content>
        <DashboardSidebar />
      </Layout>
    </Layout>
  );
};

export default ClientLayout;
