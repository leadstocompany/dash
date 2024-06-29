import PropTypes from "prop-types";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const OverviewSurveyGraph = ({ data }) => {
  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            //add only horizontal lines
            strokeDasharray={"3 3"}
            horizontal={true}
            vertical={false}
          />
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
          {/* <Legend /> */}
          {/* <Line type="monotone" dataKey="amt" stroke="#8884d8" /> */}
          <Line type="monotone" dataKey="amt" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

OverviewSurveyGraph.propTypes = {
  data: PropTypes.array.isRequired,
};

export default OverviewSurveyGraph;
