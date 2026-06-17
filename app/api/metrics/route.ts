import { NextResponse } from 'next/server';
import { getLiveMetrics } from '@/lib/metrics';
export const dynamic = 'force-dynamic';
export async function GET() { return NextResponse.json(await getLiveMetrics()); }
