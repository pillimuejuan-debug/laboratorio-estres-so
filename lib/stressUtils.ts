import * as crypto from 'crypto';
export function runEratosthenes(limit: number): number[] {
  const primes: boolean[] = new Array(limit + 1).fill(true);
  primes[0] = primes[1] = false;
  for (let i = 2; i * i <= limit; i++) {
    if (primes[i]) { for (let j = i * i; j <= limit; j += i) primes[j] = false; }
  }
  const result: number[] = [];
  for (let i = 2; i <= limit; i++) { if (primes[i]) result.push(i); }
  return result;
}
export function runFibonacci(n: number): number {
  if (n <= 1) return n;
  return runFibonacci(n - 1) + runFibonacci(n - 2);
}
export function runMatrixMultiplication(size: number): void {
  const matrixA = Array.from({ length: size }, () => Array.from({ length: size }, () => Math.random()));
  const matrixB = Array.from({ length: size }, () => Array.from({ length: size }, () => Math.random()));
  const result = Array.from({ length: size }, () => new Array(size).fill(0));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      for (let k = 0; k < size; k++) { result[i][j] += matrixA[i][k] * matrixB[k][j]; }
    }
  }
}
export function runCryptoHashes(iterations: number): void {
  let value = "academic-stress-test-string-payload-data";
  for (let i = 0; i < iterations; i++) {
    value = crypto.createHmac('sha256', 'secret-key').update(value).digest('hex');
  }
}
