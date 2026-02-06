import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function RevenueChart({ data }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height={320}>
  <LineChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    
    <XAxis dataKey="month" />
    <YAxis />

    <Tooltip formatter={(value) => `₹${value}`} />
    <Legend />

    <Line
      type="monotone"
      dataKey="revenue"
      stroke="#ff3f6c"
      strokeWidth={3}
      dot={{ r: 5, strokeWidth: 2 }}
      activeDot={{ r: 8 }}
      label={{ position: "top", fill: "#333", fontSize: 12 }}
      isAnimationActive={true}
      animationDuration={1200}
    />
  </LineChart>
</ResponsiveContainer>

    </div>
  );
}

