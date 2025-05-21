import IncomeChart from './IncomeChart';
import ExpenseChart from './ExpenseChart';

const CategoryCharts = ({ transactions }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-[#fdf4e5] p-6 rounded-lg shadow-md">
          <IncomeChart transactions={transactions} />
        </div>
        <div className="bg-[#fdf4e5] p-6 rounded-lg shadow-md">
          <ExpenseChart transactions={transactions} />
        </div>
      </div>
    );
  };
  
  export default CategoryCharts;
  
