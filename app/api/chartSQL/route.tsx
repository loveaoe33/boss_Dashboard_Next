import { NextResponse } from 'next/server';

type RequestBody={
  jsonSting: string;
}

// GET Method
export async function GET(request: Request) {   //get chartSQL
  try {
    // 呼叫 Java API
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const selectJson=searchParams.get('sqlSelect') || '';
    const javaRes = await fetch(`${url}?sqldata=${selectJson}`, {
      method: "GET",
    });

    if (!javaRes.ok) {
      throw new Error(`Java API error: ${javaRes.status}`);
    }

    const responseData = await javaRes.json();

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

// // POST Method
// export async function POST(request: Request) {   //login post
//   try {
//     const body = await request.json();   //呼叫時會丟json過來
//     const { account,password,domainUrl}: RequestBody = body;
//     console.log("url:" + domainUrl);
//     const response:any= await fetch(`${domainUrl}/Product_Admin/adminLogin`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         account: account,
//         password: password,
//         token:"",
//         level:"",
//         depart:"",
//         create_date:""
//       })
//     });
//     const data: ReasponseLogin = await response.text();
//         console.log("response:", data);

//     // return NextResponse.json(data, { status: 201 });
//     if (!response.ok) throw new Error('Login API失敗了')
//     return NextResponse.json({ method: 'POST', sucess: true, message: '登入資料成功', res: data })
//   } catch (error) {
//     return NextResponse.json(
//       { error: (error as Error).message },
//       { status: 400 }
//     );
//   }
// }


// export async function PUT(request: Request){
//   const body = await request.json()
//   return NextResponse.json({ method: 'PUT', data: body, message: '更新資料成功' })
// }


// export async function DELETE(request: Request){
//     const body=await request.json()
//     return NextResponse.json({method:'delete',data: body,message:'刪除成功'})
// }