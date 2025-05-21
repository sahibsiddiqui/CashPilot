import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeChart = ({ transactions }) => {
  const categories = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: 'Income by Category',
        data: Object.values(categories),
        backgroundColor: ['#4BC0C0', '#36A2EB', '#A4DE02', '#9966FF', '#FF9F40'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex-1">
      <h3 className="text-center text-md font-semibold mb-2">Income</h3>
      <Pie data={data} />
    </div>
  );
};

export default IncomeChart;
