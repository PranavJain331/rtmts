import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts';
import { ShieldAlert, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';
import { mockRiskDistribution, mockThreatsOverTime } from '../data/mockData';
import { useThreats } from '../hooks/useThreats';

const formatScore = (score: number) => score.toString().padStart(2, '0');

export const Dashboard: React.FC = () => {
  const { threats } = useThreats();

  const totalThreats = threats.length || 12;

  const statCards = [
    { label: 'Threats Detected', value: totalThreats, icon: Activity, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { label: 'High Risk', value: 3, icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'Medium Risk', value: 6, icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Low Risk', value: 3, icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">SOC Dashboard</h2>
        <p className="text-slate-400 text-sm">Real-time threat monitoring overview.</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-[#0a0e17] rounded-xl p-5 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white font-mono">{formatScore(stat.value)}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Risk Distribution Chart */}
        <div className="bg-[#0a0e17] rounded-xl p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-6">Risk Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockRiskDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: '#1e293b' }}
                  contentStyle={{ backgroundColor: '#0a0e17', borderColor: '#1e293b', color: '#f8fafc' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threats Over Time Chart */}
        <div className="bg-[#0a0e17] rounded-xl p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-6">Threats Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockThreatsOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0a0e17', borderColor: '#1e293b', color: '#f8fafc' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Area type="monotone" dataKey="count" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
