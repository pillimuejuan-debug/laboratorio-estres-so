"use client";
import { useState } from 'react';
export default function LoadGenerator({ onExecutionComplete }: { onExecutionComplete: any }) {
  const [intensity, setIntensity] = useState('medium');
  const [loading, setLoading] = useState(false);
  const trigger = async (ep: string, name: string) => {
    setLoading(true); const startTime = Date.now();
    try {
      const res = await fetch(`/api/stress/${ep}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ intensity }) });
      onExecutionComplete({ type: name, intensity, duration: Date.now() - startTime, status: res.ok ? 'SUCCESS' : 'ERROR' });
    } catch { onExecutionComplete({ type: name, intensity, duration: Date.now() - startTime, status: 'FAIL' }); }
    setLoading(false);
  };
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
      <h2 className="text-xl font-bold">Inyectores de Carga</h2>
      <select value={intensity} onChange={e => setIntensity(e.target.value)} className="bg-slate-900 border border-slate-700 rounded p-2 text-sm w-full">
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <button onClick={() => trigger('cpu', 'CPU')} className="bg-orange-600 p-3 rounded-lg text-xs font-bold">🔥 CPU</button>
        <button onClick={() => trigger('memory', 'RAM')} className="bg-teal-600 p-3 rounded-lg text-xs font-bold">🧠 RAM</button>
        <button onClick={() => trigger('db', 'DB')} className="bg-amber-600 p-3 rounded-lg text-xs font-bold">💾 DB</button>
        <button onClick={() => trigger('io', 'IO')} className="bg-blue-600 p-3 rounded-lg text-xs font-bold">💿 I/O</button>
        <button onClick={() => trigger('combined', 'Mix')} className="bg-purple-600 p-3 rounded-lg text-xs font-bold">⚡ Mix</button>
      </div>
    </div>
  );
}
