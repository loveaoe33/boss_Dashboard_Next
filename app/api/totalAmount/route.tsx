import { NextResponse } from 'next/server';


// GET Method

export async function GET(request: Request) {   //get chartSQL

    try {

    // 呼叫 Java API
    const { searchParams } = new URL(request.url);
    const url:string | null = searchParams.get('url');
    const safeUrl:string=encodeURI(url || '');
    console.log("safeUrl", safeUrl);
    const javaRes:any = await fetch(`${safeUrl}`, {
      method: "GET",
    });

    if (!javaRes.ok) {
      throw new Error(`Java API error: ${javaRes.status}`);
    }
    
    const responseData:any = await javaRes.text();
    console.log("responseData", responseData);
    // 回傳給前端
    return NextResponse.json({
      source: "Next.js API",
      proxyUrl: url,
      javaResponse: responseData,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }

}