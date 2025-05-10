import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from "recharts";
import UserNavbar from "../components/UserNavBar";
import { Card, Spin, Typography, Row, Col } from "antd";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF", "#FF4444"];
const { Title } = Typography;

export default function Analytics() {
  const [statusData, setStatusData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatusSummary = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/analytics/status-summary");
        const summary = res.data;

        const formatted = Object.entries(summary).map(([status, count]) => ({
          status,
          count,
        }));

        setStatusData(formatted);
        setSummary(summary);
        setRecommendations(generateRecommendations(summary));
      } catch (err) {
        console.error("Error fetching status summary", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatusSummary();
  }, []);

  const generateRecommendations = (summary) => {
    const recs = [];
    if ((summary.Rejected || 0) > (summary.Offer || 0)) {
      recs.push("❗ High rejection rate — review resume or customize applications.");
    }
    if ((summary.Applied || 0) > 10 && (summary.Interview || 0) < 2) {
      recs.push("💡 Many applications but few interviews — try networking or follow-ups.");
    }
    if ((summary.Offer || 0) > 0) {
      recs.push("🎉 You have job offers — evaluate company culture and growth.");
    }
    if ((summary.Applied || 0) === 0) {
      recs.push("🚀 Start applying for jobs to get opportunities.");
    }
    return recs;
  };

  const timeSeriesMock = [
    { week: "Week 1", Applied: 5, Interview: 1, Offer: 0 },
    { week: "Week 2", Applied: 4, Interview: 1, Offer: 0 },
    { week: "Week 3", Applied: 6, Interview: 2, Offer: 1 },
    { week: "Week 4", Applied: 3, Interview: 0, Offer: 0 },
  ];

  if (loading) return <Spin tip="Loading analytics..." size="large" style={{ margin: "2rem" }} />;

  return (
    <>
      <UserNavbar />
      <div style={{ padding: "2rem" }}>
        <Title level={2}>📊 Job Application Analytics</Title>

        {/* Summary Cards */}
        <Row gutter={16} style={{ marginBottom: "2rem" }}>
          {Object.entries(summary).map(([key, value], idx) => (
            <Col key={key} xs={12} sm={8} md={6}>
              <Card title={key} bordered={false} style={{ textAlign: "center", backgroundColor: "#f0f2f5" }}>
                <Title level={3}>{value}</Title>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Charts Row */}
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Title level={4}>Status Distribution (Bar)</Title>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statusData}>
                <XAxis dataKey="status" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Col>

          <Col xs={24} md={12}>
            <Title level={4}>Status Share (Pie)</Title>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="count"
                  nameKey="status"
                  outerRadius={80}
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </Row>

        {/* Line Chart */}
        <div style={{ marginTop: "2rem" }}>
          <Title level={4}>📈 Weekly Application Trends (Mock)</Title>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={timeSeriesMock}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Applied" stroke="#1890ff" />
              <Line type="monotone" dataKey="Interview" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Offer" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recommendations */}
        <div style={{ marginTop: "2rem" }}>
          <Title level={4}>💡 Smart Recommendations</Title>
          <ul style={{ paddingLeft: "1.5rem" }}>
            {recommendations.length > 0 ? (
              recommendations.map((rec, idx) => <li key={idx}>{rec}</li>)
            ) : (
              <li>✅ You're on track. Keep going!</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
