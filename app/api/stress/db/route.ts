import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(req: NextRequest) {
const { intensity = 'medium' } = await req.json();
const startTime = Date.now();

try {
if (intensity === 'low') {
await pool.query(`         SELECT *
        FROM juegos
        ORDER BY RANDOM()
        LIMIT 50
      `);
} else if (intensity === 'medium') {
await pool.query(`         SELECT
          c.nombre,
          COUNT(*) AS total_juegos,
          AVG(j.precio) AS precio_promedio
        FROM categorias c
        JOIN juegos j
          ON c.id = j.categoria_id
        GROUP BY c.nombre
        ORDER BY precio_promedio DESC
      `);
} else {
await pool.query(`         SELECT
          c.nombre,
          COUNT(d.id) AS ventas,
          SUM(d.subtotal) AS ingresos
        FROM categorias c
        JOIN juegos j
          ON c.id = j.categoria_id
        JOIN detalle_ventas d
          ON j.id = d.juego_id
        GROUP BY c.nombre
        ORDER BY ingresos DESC
      `);
}


return NextResponse.json({
  status: "success",
  type: "Database",
  duration: Date.now() - startTime
});


} catch (error: any) {


return NextResponse.json(
  {
    status: "error",
    message: error.message
  },
  {
    status: 500
  }
);


}
}
