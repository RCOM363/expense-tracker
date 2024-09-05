import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);
import StackedBarChart from '../../components/StackedBarChart/StackedBarChart';
import HorizontalBarChart from '../../components/HorizontalBarChart/HorizontalBarChart';

import "./Dashboard.css"

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/v1/users/dashboard-data')
      .then((res) => {
        console.log(res.data.data)
        setDashboardData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className='loadercont'><div className='loader'></div></div>;
  if (error) return <div>Error: {error}</div>;

  const {fullName,email, monthlyTotalExpenses, monthlyTotalIncomes, monthlyExpensesData, monthlyIncomesData,monthlyExpensesByCategory, monthlyIncomesByCategory,yearlyTotalExpenses,yearlyTotalIncomes,expensesByMonth, incomesByMonth, expensesByCategory, incomesByCategory } = dashboardData;


  return (
    <div className='dashboard'>
      <div className='cont1'>
        <div>
          <h1>Welcome, {fullName}</h1>
          <p>{email}</p>
        </div>
        {
          (monthlyExpensesData.length>0 || monthlyIncomesData.length>0) && (
            <div className='stats'>
          <div className='stat'>
            <h3>Total Expenses this month</h3>
            <h2 style={{color:'#C8102E'}}>&#8377;{monthlyTotalExpenses}</h2>
          </div>
           <div className='stat'>
              <h3>Total Incomes this month</h3>
              <h2 style={{color:"#118C4F"}}>&#8377;{monthlyTotalIncomes}</h2>
            </div>
            <div className='stat'>
            <h3>Net Balance this month</h3>
            <h2 style={{color:(monthlyTotalIncomes-monthlyTotalExpenses)>=0?'#118C4F':'#C8102E'}}>{monthlyTotalIncomes-monthlyTotalExpenses>=0?"+":"-"}&#8377;{Math.abs(monthlyTotalIncomes-monthlyTotalExpenses)}</h2>
            </div>
        </div>
          )
        }
        </div>
          <div className='cont2'>
            {
              (monthlyExpensesData.length>0 || monthlyIncomesData.length>0) && (
                <div className='graphscont'>
                  <div className="cont1">
                    <StackedBarChart expenseData={monthlyExpensesData} incomesData={monthlyIncomesData} 
                    type={"Daily"}/>
                  </div>
                  <div className='cont2'>
                    <HorizontalBarChart data={monthlyExpensesByCategory} title={`${new Date().toLocaleString('default', { month: 'long' })} Expenses`}/>
                    <HorizontalBarChart data={monthlyIncomesByCategory} title={`${new Date().toLocaleString('default', { month: 'long' })} Incomes`}/>
                  </div>
                </div>
              )
            }
        </div>
        <div className="cont1">
          <div className='stats'>
            <div className='stat'>
              <h3>Total Expenses this year</h3>
              <h2 style={{color:"#C8102E"}}>&#8377;{yearlyTotalExpenses}</h2>
            </div>
            <div className='stat'>
              <h3>Total Incomes this year</h3>
              <h2 style={{color:"#118C4F"}}>&#8377;{yearlyTotalIncomes}</h2>
            </div>
            <div className='stat'>
              <h3>Net Balance this year</h3>
              <h2 style={{color:(yearlyTotalIncomes-yearlyTotalExpenses)>=0?'#118C4F':'#C8102E'}}>{yearlyTotalIncomes-yearlyTotalExpenses>=0?"+":"-"}&#8377;{Math.abs(yearlyTotalIncomes-yearlyTotalExpenses)}</h2>
            </div>
          </div>
        </div>
        <div className="cont2">
          <div className="graphscont">
            <div className="cont1">
              <StackedBarChart expenseData={expensesByMonth} incomesData={incomesByMonth} type="Monthly"/>
            </div>
            <div className='cont2'>
              <HorizontalBarChart data={expensesByCategory} title={`${new Date().getFullYear()} Expenses`}/>
              <HorizontalBarChart data={incomesByCategory} title={`${new Date().getFullYear()} Incomes`}/>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Dashboard;
