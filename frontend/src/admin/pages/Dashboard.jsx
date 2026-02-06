import React, { useEffect, useState, useMemo } from "react";
import AdminLayout from "../layout/AdminLayout";
import { API } from "../../api";

import MembersGraph from "../components/MembersGraph";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [members, setMembers] = useState([]);
  const [filter, setFilter] = useState("week");
  const [earningFilter, setEarningFilter] = useState("total");

  useEffect(() => {
    fetch(`${API}/api/members`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, []);

  const today = new Date();

  // ===== STATS =====
  const gym1 = members.filter((m) => m.gym === "Gym 1").length;
  const gym2 = members.filter((m) => m.gym === "Gym 2").length;
  const boys = members.filter((m) => m.gender === "Male").length;
  const girls = members.filter((m) => m.gender === "Female").length;
  const active = members.filter((m) => new Date(m.planExpiry) > today).length;
  const total = members.length;
  const totalEarnings = useMemo(() => {
    const now = new Date();

    return members
      .filter((m) => {
        const d = new Date(m.paymentDate);

        if (earningFilter === "today") {
          return d.toDateString() === now.toDateString();
        }

        if (earningFilter === "week") {
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 6);
          return d >= weekAgo;
        }

        if (earningFilter === "month") {
          return (
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
          );
        }

        return true; // total
      })
      .reduce((sum, m) => sum + (m.amount || 0), 0);
  }, [members, earningFilter]);

  // ===== FILTER MEMBERS BY RANGE =====
  const filterMembersByRange = (range) => {
    const now = new Date();

    return members.filter((m) => {
      const d = new Date(m.planStart);

      if (range === "today") {
        return d.toDateString() === now.toDateString();
      }

      if (range === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 6);
        return d >= weekAgo;
      }

      if (range === "month") {
        const monthAgo = new Date();
        monthAgo.setDate(now.getDate() - 29);
        return d >= monthAgo;
      }

      if (range === "6months") {
        const sixAgo = new Date();
        sixAgo.setMonth(now.getMonth() - 5);
        return d >= sixAgo;
      }

      return true;
    });
  };

  // ===== TIMELINE GENERATOR =====
  const generateTimeline = (range) => {
    const now = new Date();
    const arr = [];

    if (range === "today") {
      for (let h = 0; h < 24; h++) {
        arr.push({
          key: h,
          label: `${h}:00`,
          joined: 0,
        });
      }
    }

    if (range === "week") {
      for (let i = 6; i >= 0; i--) {
        const d = new Date();

        d.setDate(now.getDate() - i);
        arr.push({
          key: d.toDateString(),
          label: d.toLocaleDateString("en-IN", { weekday: "short" }),
          joined: 0,
        });
      }
    }

    if (range === "month") {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();

      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const d = new Date(year, month, day);

        arr.push({
          key: d.toDateString(),
          label: day.toString(),
          joined: 0,
        });
      }
    }

    if (range === "6months" || range === "all") {
      for (let i = 5; i >= 0; i--) {
        const d = new Date();

        d.setMonth(now.getMonth() - i);
        arr.push({
          key: d.getMonth() + "-" + d.getFullYear(),
          label: d.toLocaleDateString("en-IN", { month: "short" }),
          joined: 0,
        });
      }
    }

    return arr;
  };

  // ===== FILL COUNTS =====
  const buildChartData = useMemo(() => {
    const timeline = generateTimeline(filter);
    const filtered = filterMembersByRange(filter);

    filtered.forEach((m) => {
      const d = new Date(m.planStart);

      timeline.forEach((t) => {
        if (filter === "today") {
          if (d.getHours() === t.key) t.joined += 1;
        }

        if (filter === "week" || filter === "month") {
          if (d.toDateString() === t.key) t.joined += 1;
        }

        if (filter === "6months" || filter === "all") {
          if (d.getMonth() + "-" + d.getFullYear() === t.key) {
            t.joined += 1;
          }
        }
      });
    });

    return timeline;
  }, [members, filter]);

  // ===== TOOLTIP =====
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "#fff",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
          }}
        >
          <strong>{label}</strong>
          <div>Joined: {payload[0].value}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <AdminLayout>
      <h1 style={{ marginBottom: "25px" }}>Gym Overview</h1>

      <div className="top-grid">
        <StatCard title="Gym 1 Members" value={gym1} />
        <StatCard title="Gym 2 Members" value={gym2} />
        <StatCard title="Active Memberships" value={active} />

        <div className="earnings-card">
          <div className="earnings-top">
            <span>Total Earnings</span>

            <select
              value={earningFilter}
              onChange={(e) => setEarningFilter(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="total">All Time</option>
            </select>
          </div>

          <h2>₹ {totalEarnings}</h2>
        </div>

        <StatCard title="Total Members" value={total} />
        <StatCard title="Boys Members" value={boys} />
        <StatCard title="Girls Members" value={girls} />
      </div>

      {/* GRAPH */}
      <div className="chart-card">
        <div className="chart-top">
          <h3>Members Joined</h3>

          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="6months">Last 6 Months</option>
            <option value="all">All Time</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={buildChartData}>
            <XAxis
              dataKey="label"
              interval={0}
              tick={{ fontSize: 11 }}
              angle={-35}
              textAnchor="end"
              height={60}
            />

            <YAxis allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="joined"
              stroke="#1b8a3b"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}
