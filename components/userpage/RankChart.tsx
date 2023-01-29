import RankHistoryJson from "../../interfaces/ChartRankHistoryJSON";
import { Line } from "react-chartjs-2";
import {
  Chart,
  ChartData,
  ChartOptions,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

interface RankChartProps {
  rankHistory: RankHistoryJson;
}

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

function RankChart(props: RankChartProps) {
  const options: ChartOptions<"line"> = {
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const daysAgo = context.dataset.data.length - context.dataIndex - 1;
            if (daysAgo === 0) {
              return `Today`;
            }
            return `${daysAgo} days ago`;
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        reverse: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  const data: ChartData<"line"> = {
    // make labels size dynamic
    labels: props.rankHistory.rank.map((rank, i) => {
      return "Rank " + rank;
    }),
    datasets: [
      {
        label: "Rank",
        data: props.rankHistory.rank,
        fill: false,
        borderColor: "rgb(244, 114, 182)",
        pointBackgroundColor: "rgb(244, 114, 182)",
        tension: 0,
      },
    ],
  };
  return <Line options={options} data={data} />;
}

export default RankChart;
