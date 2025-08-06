// src/components/DashboardSidebar.tsx
"use client";
import React from "react";
import {
  Layout,
  Card,
  Select,
  Button,
  Typography,
  Space,
  InputNumber,
  Divider,
  Input,
} from "antd";
import { useDashboardStore, ColorRule } from "../store";
import { DeleteOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const { Text } = Typography;
const { Option } = Select;

const DashboardSidebar: React.FC = () => {
  const { polygons, updatePolygon, deletePolygon } = useDashboardStore();

  const onColorRuleChange = (
    polygonId: string,
    ruleIndex: number,
    key: keyof ColorRule,
    value: string | number
  ) => {
    const polygon = polygons.find((p) => p.id === polygonId);
    if (!polygon) return;

    const newRules = [...polygon.colorRules];

    const updatedRule = { ...newRules[ruleIndex], [key]: value };
    newRules[ruleIndex] = updatedRule as ColorRule;

    updatePolygon(polygonId, { colorRules: newRules });
  };

  const addColorRule = (polygonId: string) => {
    const polygon = polygons.find((p) => p.id === polygonId);
    if (!polygon) return;

    const newRules = [
      ...polygon.colorRules,
      { operator: ">", value: 0, color: "#000000" } as ColorRule,
    ];
    updatePolygon(polygonId, { colorRules: newRules });
  };

  return (
    <Sider
      width={300}
      style={{
        padding: "20px",
        backgroundColor: "#f0f2f5",
        borderLeft: "1px solid #f0f0f0",
        overflowY: "auto",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <Text strong>Data Sources & Rules</Text>
      </div>
      {polygons.map((polygon) => (
        <Card
          key={polygon.id}
          title={`Polygon ${polygon.id.slice(-4)}`}
          extra={
            <Button
              icon={<DeleteOutlined />}
              onClick={() => deletePolygon(polygon.id)}
            />
          }
          style={{ marginBottom: "16px" }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Data Source</Text>
            <Select
              defaultValue="open-meteo"
              style={{ width: "100%" }}
              onChange={(value) =>
                updatePolygon(polygon.id, { dataSource: value as "open-meteo" })
              }
            >
              <Option value="open-meteo">Open-Meteo Temperature</Option>
            </Select>

            <Divider />
            <Text strong>Coloring Rules</Text>
            {polygon.colorRules.map((rule, index) => (
              <Space
                key={index}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Select
                  value={rule.operator}
                  onChange={(value) =>
                    onColorRuleChange(
                      polygon.id,
                      index,
                      "operator",
                      value as ">" | "<"
                    )
                  }
                  style={{ width: 60 }}
                >
                  <Option value=">">&gt;</Option>
                  <Option value="<">&lt;</Option>
                </Select>
                <InputNumber
                  value={rule.value}
                  onChange={(value) =>
                    onColorRuleChange(
                      polygon.id,
                      index,
                      "value",
                      value as number
                    )
                  }
                  style={{ width: 100 }}
                />
                <div
                  style={{
                    padding: "4px",
                    background: rule.color,
                    borderRadius: "4px",
                  }}
                >
                  <Input
                    type="color"
                    value={rule.color}
                    onChange={(e) =>
                      onColorRuleChange(
                        polygon.id,
                        index,
                        "color",
                        e.target.value
                      )
                    }
                    style={{
                      width: "24px",
                      height: "24px",
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
              </Space>
            ))}
            <Button
              onClick={() => addColorRule(polygon.id)}
              style={{ width: "100%" }}
            >
              Add Rule
            </Button>
          </Space>
        </Card>
      ))}
    </Sider>
  );
};

export default DashboardSidebar;
