"use client";
export default function MetricsPanel({ metrics }: { metrics: any }) {
  if (!metrics) return <div className="bg-slate-800 p-6 rounded-xl text-center">Cargando Telemetría...</div>;
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-6">
      <h2 className="text-xl font-bold text-slate-200">Telemetría de la App</h2>
      <div>CPU: <span className="font-mono text-indigo-400">{metrics.cpuUsage}%</span></div>
      <div>RAM (RSS): <span className="font-mono text-emerald-400">{(metrics.memoryUsage.rss / (1024*1024)).toFixed(1)} MB</span></div>
      <div>Conexiones DB Activas: <span className="font-mono text-amber-400">{metrics.dbConnections}</span></div>
    </div>
  );
}
