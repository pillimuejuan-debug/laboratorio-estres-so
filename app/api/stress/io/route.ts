import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
export async function POST(req: NextRequest) {
  const { intensity = 'medium' } = await req.json();
  const startTime = Date.now();
  const tempFilePath = path.join('/tmp', `stress_io_${Date.now()}.txt`);
  const iterations = intensity === 'low' ? 500 : intensity === 'medium' ? 3000 : 15000;
  const chunk = "Line entry simulation of raw disk input output throughput benchmarking metrics extraction system.\n";
  for (let i = 0; i < iterations; i++) { fs.appendFileSync(tempFilePath, `${i} - ${chunk}`); }
  const fileData = fs.readFileSync(tempFilePath, 'utf-8');
  if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
  return NextResponse.json({ status: 'success', type: 'I/O', bytesProcessed: Buffer.byteLength(fileData) * 2, duration: Date.now() - startTime });
}
