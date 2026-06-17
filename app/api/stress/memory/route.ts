import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

let leakyMemoryLeak: any[] = [];

export async function POST(req: NextRequest) {

  const { intensity = 'medium', leak = false } = await req.json();

  const startTime = Date.now();

  let allocationSize =
    intensity === 'low'
      ? 10000
      : intensity === 'medium'
      ? 100000
      : 500000;

  let tempBuffer = [];

  for (let i = 0; i < allocationSize; i++) {

    tempBuffer.push({
      id: i,
      uuid: Math.random().toString(36).substring(2),
      timestamp: new Date(),
      dataPayload: "X".repeat(500)
    });

  }

  if (intensity === 'high') {

    const dbRes = await pool.query(`
      SELECT
        j.titulo,
        j.precio,
        c.nombre AS categoria
      FROM juegos j
      JOIN categorias c
        ON j.categoria_id = c.id
      LIMIT 1000
    `);

    tempBuffer.push(...dbRes.rows);

  }

  if (leak) {
    leakyMemoryLeak.push(...tempBuffer);
  }

  return NextResponse.json({
    status: 'success',
    type: 'Memory',
    allocatedObjects: tempBuffer.length,
    duration: Date.now() - startTime
  });

}

export async function DELETE() {

  leakyMemoryLeak = [];

  return NextResponse.json({
    status: 'cleared'
  });

}
