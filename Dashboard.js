import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Dashboard() {
    const [metrics, setMetrics] = useState({ total: 0, active: 0, overdue: 0, revenue: 0 });

    useEffect(() => {
        async function fetchMetrics() {
            const res = await api.get('/dashboard');
            setMetrics(res.data);
        }
        fetchMetrics();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-blue-100 rounded">Total Members: {metrics.total}</div>
                <div className="p-4 bg-green-100 rounded">Active Members: {metrics.active}</div>
                <div className="p-4 bg-red-100 rounded">Overdue Payments: {metrics.overdue}</div>
                <div className="p-4 bg-yellow-100 rounded">Monthly Revenue: ₹{metrics.revenue}</div>
            </div>
        </div>
    );
}
