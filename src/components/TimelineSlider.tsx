// src/components/TimelineSlider.tsx
"use client";
import React from "react";
import { Range, getTrackBackground } from "react-range";
import { useDashboardStore } from "../store";
import { Typography } from "antd";

const { Text } = Typography;

const TimelineSlider: React.FC = () => {
  const { selectedTimeRange, setSelectedTimeRange } = useDashboardStore();

  const min = selectedTimeRange[0];
  const max = selectedTimeRange[1];

  if (min === 0 && max === 0) {
    return null;
  }

  // Create a consistent date formatter for both ends
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div
      style={{
        flexGrow: 1,
        padding: "0 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Range
        values={selectedTimeRange}
        step={3600000}
        min={min}
        max={max}
        onChange={(values) => setSelectedTimeRange(values as [number, number])}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: selectedTimeRange,
                  colors: ["#ccc", "#548BF4", "#ccc"],
                  min,
                  max,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => {
          const { key, ...thumbProps } = props;
          return (
            <div
              key={key}
              {...thumbProps}
              style={{
                ...thumbProps.style,
                height: "20px",
                width: "20px",
                borderRadius: "50%",
                backgroundColor: "#FFF",
                boxShadow: "0px 2px 6px #AAA",
              }}
            />
          );
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: "8px",
        }}
      >
        <Text style={{ whiteSpace: "nowrap" }}>
          {dateFormatter.format(selectedTimeRange[0])}
        </Text>
        <Text style={{ whiteSpace: "nowrap" }}>
          {dateFormatter.format(selectedTimeRange[1])}
        </Text>
      </div>
    </div>
  );
};

export default TimelineSlider;
