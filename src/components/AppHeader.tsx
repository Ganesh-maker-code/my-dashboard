// src/components/AppHeader.tsx
"use client";
import React, { useEffect } from "react";
import { Layout } from "antd";
import TimelineSlider from "./TimelineSlider";
import { useDashboardStore } from "../store";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const { setSelectedTimeRange } = useDashboardStore();

  useEffect(() => {
    const today = Date.now();
    const minTimestamp = today - 15 * 24 * 60 * 60 * 1000;
    const maxTimestamp = today + 15 * 24 * 60 * 60 * 1000;
    setSelectedTimeRange([minTimestamp, maxTimestamp]);
  }, [setSelectedTimeRange]);

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
        zIndex: 10,
      }}
    >
      <h1
        style={{
          color: "#000",
          margin: 0,
          paddingRight: "20px",
          whiteSpace: "nowrap",
        }}
      >
        Dashboard
      </h1>
      <TimelineSlider />
    </Header>
  );
};

export default AppHeader;
