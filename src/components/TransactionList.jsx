

const TransactionList = ({ transactions }) => {
  
  return (
    <div className="bg-[#f7f2e5] p-6 rounded-lg shadow-md mb-6 font-sans">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Transactions</h2>
      <ul className="space-y-4 max-h-64 overflow-y-auto">
        {transactions.length === 0 && (<p className="text-gray-500">No transactions yet.</p>)}
        {transactions.map((tx) => (
          <li key={tx.id} className="flex justify-between items-center p-4 border rounded-lg shadow-sm hover:bg-[#f0e6d6]">
            <div>
              <p className="font-medium text-gray-700">{tx.text}</p>
              <p className="text-xs text-gray-500">{tx.category}</p>
            </div>
            <div className={tx.amount >= 0 ? 'text-lg text-green-600' : 'text-lg text-red-500'}>₹{tx.amount}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;