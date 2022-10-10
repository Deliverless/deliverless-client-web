import React, { useContext } from 'react'
import { ResponsiveContainer } from 'recharts'
import { UserContext } from '../../../lib/context/userContext';
import DataCard from './components/DataCard';
import OnlineStatusToggle from './components/OnlineStatusToggle';
import OrderTable from './components/OrderTable';
import RevenueChart from './components/RevenueChart'

export default function DriverDashboard() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="main-content container">
      <h1 className="row m-0">Hi {user.firstName}</h1>
      <div className="row">
        <div className="col d-block" style={{overflowX: 'scroll', overflowY: 'auto', whiteSpace: 'nowrap', height: '183px'}}>
            <DataCard title="TOTAL REVENUE" mainValue="$17k" CTA="See All Transactions" />
            <DataCard title="ORDERS" mainValue="352" CTA="See All Orders" />
            <DataCard title="AVG RATING" mainValue="4.43 &#9733;" CTA="See All Reviews" />
        </div>
        <div className="col-lg-3 col-xl-4">
          <OnlineStatusToggle />
        </div>
      </div>
      <div className="row">
        <div className="col">
            <div style={{maxWidth:'500px'}}>
              <h4>Revenue (all time)</h4>
              <RevenueChart/>
            </div>
        </div>
        <div className="col">
          <OrderTable />
        </div>
      </div>
    </div>
  )
}
