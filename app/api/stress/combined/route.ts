import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

  const { intensity = 'medium', workers = 2 } = await req.json();

  const startTime = Date.now();

  const baseUrl = 'http://localhost:3000/api/stress';

  const endpoints = ['cpu', 'memory', 'db', 'io'];

  const promises: Promise<Response>[] = [];

  for (let w = 0; w < workers; w++) {

    endpoints.forEach(ep => {

      promises.push(

        fetch(`${baseUrl}/${ep}`, {

          method: 'POST',

          headers: {

            'Content-Type': 'application/json'

          },

          body: JSON.stringify({

            intensity

          })

        })

      );

    });

  }

  await Promise.all(promises);

  return NextResponse.json({

    status: 'success',

    type: 'Combined',

    duration: Date.now() - startTime

  });

}
