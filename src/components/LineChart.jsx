// components/LineChart.jsx
import {
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const LineChart = ({ data }) => {
  
  return <Line
                          data={data}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                              x: { display: false },
                              y: { display: false }
                            },
                            plugins: {
                              legend: { display: false }
                            }
                          }}
                        />;
};

export default LineChart;
