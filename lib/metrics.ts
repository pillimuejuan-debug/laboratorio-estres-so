import { pool } from './db';
export interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: { rss: number; heapTotal: number; heapUsed: number };
  dbConnections: number;
  timestamp: number;
}
export async function getLiveMetrics(): Promise<SystemMetrics> {
  const startTime = process.hrtime();
  const startUsage = process.cpuUsage();
  await new Promise(resolve => setTimeout(resolve, 50));
  const elapTime = process.hrtime(startTime);
  const elapUsage = process.cpuUsage(startUsage);
  const elapTimeMS = elapTime[0] * 1000 + elapTime[1] / 1000000;
  const cpuPercent = !!elapTimeMS ? Math.round((100 * (elapUsage.user / 1000 + elapUsage.system / 1000)) / elapTimeMS) : 0;
  let activeConns = 0;
  try {
    const dbRes = await pool.query("SELECT count(*)::int FROM pg_stat_activity WHERE state = 'active'");
    activeConns = dbRes.rows[0].count;
  } catch { activeConns = 0; }
  return { cpuUsage: Math.min(cpuPercent, 100), memoryUsage: process.memoryUsage(), dbConnections: activeConns, timestamp: Date.now() };
}
