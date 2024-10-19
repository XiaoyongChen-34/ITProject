import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DotGraph = () => {
  const data = {
    labels: ['6 days ago', '5 days ago', '4 days ago', '3 days ago', '2 days ago', '1 day ago', 'Today'],
    datasets: [
      {
        label: 'Attempts',
        data: [10, 32, 41, 69, 73, 89, 100],
        borderColor: '#FFF5D9',
        backgroundColor: 'white',
        fill: false,
        pointRadius: 8, // 控制点的大小
        pointHoverRadius: 10, // 鼠标悬停时的大小
        tension: 0,  // 设置曲线的平滑度
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Past 7 Days',
          color: 'black', // x轴标题颜色
        },
        ticks: {
          color: 'black', // x轴标签颜色
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of attempt questions',
          color: 'black', // y轴标题颜色
        },
        ticks: {
          color: 'black', // y轴标签颜色
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      backgroundColor: 'rgba(220, 220, 220, 0.5)', // 设置背景色为浅灰色
    },
  };

  return (
    <div style={{ backgroundColor: '#7B949C', padding: '20px' }}> 
      {/* 外层容器背景颜色 */}
      <Line data={data} options={options} />
    </div>
  );
};

export default DotGraph;
