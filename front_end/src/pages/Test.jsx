import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// 定义数据
const data = [
  { name: 'DataFrame', value: 4 },
  { name: 'Correlation', value: 3 },
  { name: 'NMI (Normalised Mutual Information)', value: 7 },
  { name: 'Sentence splitting using nltk', value: 5 },
  { name: 'Linear Regression', value: 13 },
  { name: 'Decision Tree Classifier', value: 1 },
  { name: 'Reading CSV files', value: 8 },
  { name: 'Writing CSV files', value: 12 },
];

// 定义颜色
const COLORS = ['#FFF5D9', '#182241', '#444e59', '#61ccd9'];

// 自定义标签渲染函数，显示百分比
const renderLabel = ({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`;


const MyPieChart = () => (
  <div style={{backgroundColor: "#7B949C", paddingLeft: "400px", paddingTop:"100px"}}>
  <PieChart width={800} height={700} >
    <Pie
      data={data}
      cx={400}
      cy={200}
      labelLine={true}  
      label={renderLabel} 
      outerRadius={150}
      innerRadius={90}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
  </div>
);

export default MyPieChart;
