"use client";
import { useState, useEffect } from 'react';
import MetricsPanel from './MetricsPanel';
import LoadGenerator from './LoadGenerator';

export default function StressDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try { 
        const res = await fetch('/api/metrics'); 
        if (res.ok) setMetrics(await res.json()); 
      } catch {}
    };
    fetchMetrics(); 
    const interval = setInterval(fetchMetrics, 1000); 
    return () => clearInterval(interval);
  }, []);

  const addToHistory = (item: any) => { 
    setHistory(prev => [{ ...item, id: Math.random().toString(), timestamp: new Date().toLocaleTimeString() }, ...prev.slice(0, 10)]); 
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <LoadGenerator onExecutionComplete={addToHistory} />
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-bold mb-4">Historial de Carga</h2>
          <div className="text-sm text-slate-300">
            {history.map(h => (
              <div key={h.id} className="p-2 border-b border-slate-700">
                {h.timestamp} - <b>{h.type}</b> ({h.intensity}) -> {h.duration}ms [{h.status}]
              </div>
            ))}
          </div>
        </div>
      </div>
      <div><MetricsPanel metrics={metrics} /></div>
    </div>
  );
}
