import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import PropTypes from "prop-types";

const OverviewIncomeGraph = ({ data }) => {
  return (
    <div className="pr-5">
      <ResponsiveContainer width={"100%"} height={250}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <CartesianGrid strokeDasharray="2 2" className="stroke-slate-300" />
          <Tooltip
            formatter={(value) => {
              return `$${value}`;
            }}
            viewBox={{ x: 0, y: 0, width: 100, height: 100 }}
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: 5,
              border: "1px solid #eee",
            }}
            labelStyle={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 12,
            }}
            itemStyle={{
              color: "#888888",
              fontSize: 12,
            }}
          />
          {/* <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                /> */}
          <Area
            type="monotone"
            dataKey="amt"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

OverviewIncomeGraph.propTypes = {
  data: PropTypes.array.isRequired,
};

export default OverviewIncomeGraph;
