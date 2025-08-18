import { NextResponse } from 'next/server';


// GET Method
// GET Method
export async function GET(request: Request) {   //get chartSQL
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('type') //call init amount data select;
  const data = {
    message: 'This is a GET response',
    id: id || 'no-id-provided',
    timestamp: new Date().toISOString()
  };

  return NextResponse.json(data, { status: 200 });
}