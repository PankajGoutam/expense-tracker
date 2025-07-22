import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses } from "../../redux/Slices/expenseSlice";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import moment from "moment";

const Insights = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.expenses);
  const [type, setType] = useState("monthly");

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  // 📊 Group by month
  const monthlyData = useMemo(() => {
    const grouped = {};

    list.forEach((item) => {
      const month = moment(item.date).format("MMM");
      grouped[month] = (grouped[month] || 0) + item.amount;
    });

    return Object.entries(grouped).map(([month, expense]) => ({
      label: month,
      expense,
    }));
  }, [list]);

  // 📊 Group by category
  const categoryData = useMemo(() => {
    const grouped = {};

    list.forEach((item) => {
      const category = item.category || "Other";
      grouped[category] = (grouped[category] || 0) + item.amount;
    });

    return Object.entries(grouped).map(([category, expense]) => ({
      label: category,
      expense,
    }));
  }, [list]);

  const chartData = type === "monthly" ? monthlyData : categoryData;

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="font-medium mr-2">Select View:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="monthly">Monthly Expenses</option>
          <option value="category">Category-wise Expenses</option>
        </select>
      </div>

      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} minTickGap={10} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="expense"
              fill="#4F46E5"
              radius={[6, 6, 0, 0]}
              barSize={80} // 👈 Fixed bar width
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Insights;
