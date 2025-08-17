import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import dayjs from "dayjs";

const DonationPostGraph = ({ data }) => {
  // date-wise count
  const countByDate = data.reduce((acc, item) => {
    const date = dayjs(item.createdAt).format("MMM DD");
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(countByDate).map((date) => ({
    date,
    count: countByDate[date],
  }));

  return (
    <div className="bg-base-100 shadow-md rounded-2xl p-4 w-full">
      <h2 className="text-lg font-semibold mb-2">Donation Request Posts</h2>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="donationColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} post(s)`} />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#16a34a"
              fillOpacity={1}
              fill="url(#donationColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DonationPostGraph;
