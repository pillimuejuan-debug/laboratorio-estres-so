import { NextRequest, NextResponse } from 'next/server';
import {
  runEratosthenes,
  runFibonacci,
  runMatrixMultiplication,
  runCryptoHashes
} from '@/lib/stressUtils';

export async function POST(req: NextRequest) {
  const { intensity = 'medium' } = await req.json();
  const startTime = Date.now();

  if (intensity === 'low') {
    runEratosthenes(50000);
    runCryptoHashes(5000);
  } else if (intensity === 'medium') {
    runMatrixMultiplication(150);
    runCryptoHashes(20000);
    runFibonacci(35);
  } else {
    runMatrixMultiplication(700);
    runEratosthenes(2000000);
    runCryptoHashes(500000);
    runFibonacci(45);
  }

  return NextResponse.json({
    status: 'success',
    type: 'CPU',
    duration: Date.now() - startTime
  });
}
