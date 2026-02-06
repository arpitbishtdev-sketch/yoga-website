import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function MembersGraph({ members }) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  const last7 = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    return d;
  });

  const data = last7.map((date, index) => {
    const count = members.filter((m) => {
      const join = new Date(m.planStart);
      return (
        join.getDate() === date.getDate() &&
        join.getMonth() === date.getMonth() &&
        join.getFullYear() === date.getFullYear()
      );
    }).length;

    return {
      name: days[date.getDay()],
      members: count,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="members"
          stroke="#1b8a3b"
          strokeWidth={4}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
