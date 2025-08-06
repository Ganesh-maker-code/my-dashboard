// src/components/ThemeLayout.tsx
"use client";
import React from "react";
import { Layout, theme } from "antd";

const { Header, Content } = Layout;

interface ThemeLayoutProps {
  children: React.ReactNode;
  headerContent: React.ReactNode;
}

const ThemeLayout: React.FC<ThemeLayoutProps> = ({
  children,
  headerContent,
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f0f2f5",
          zIndex: 10,
        }}
      >
        {headerContent}
      </Header>
      <Content style={{ padding: "0 50px", marginTop: "20px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: "80vh",
            padding: "24px",
            borderRadius: "8px",
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default ThemeLayout;
