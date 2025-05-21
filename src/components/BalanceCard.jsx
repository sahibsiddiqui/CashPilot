const BalanceCard = ({ income, expense }) => {
  const balance = income - expense;

  return (
    <div className="bg-[#fff2e0] p-6 rounded-lg shadow-md flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl text-gray-700">Balance</h2>
        <p className="text-3xl font-bold text-gray-800">₹{balance}</p>
      </div>
      <div className="text-right">
        <p className="text-green-600">+ ₹{income}</p>
        <p className="text-red-500">– ₹{expense}</p>
      </div>
    </div>
  );
};

export default BalanceCard;
