import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ transactions }) => {
  const categories = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {});

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categories),
        backgroundColor: ['#FF6384', '#FFCE56', '#FF5733', '#C71585', '#20B2AA'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex-1">
      <h3 className="text-center text-md font-semibold mb-2">Expenses</h3>
      <Pie data={data} />
    </div>
  );
};

export default ExpenseChart;
