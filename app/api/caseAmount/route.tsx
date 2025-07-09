import { NextResponse } from 'next/server';

interface RequestBody {
  id: string;
  hashcode: string;
  domainUrl: string;
  header: any;
  userData: any;
}

// GET Method
export async function GET(request: Request) {    //get Amount data
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const data = {
    message: 'This is a GET response',
    id: id || 'no-id-provided',
    timestamp: new Date().toISOString()
  };

  return NextResponse.json(data, { status: 200 });
}




// // POST Method
// export async function POST(request: Request) {   //insert data

//   try {
//     const body = await request.json();   //呼叫時會丟json過來
//     const { id, hashcode, domainUrl, header, userData }: RequestBody = body;
//     console.log("url:" + domainUrl);
//     const response = await fetch(`${domainUrl}/Product_Imformation/setProduct_Information?caseSelect=marjorCase`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         type: "Head",
//         id: id,
//         hashcode: hashcode,
//         header: header,
//         userString: userData,
//       })
//     });
//     const data: string = await response.text();
//     // return NextResponse.json(data, { status: 201 });
//     if (!response.ok) throw new Error('Insert API失敗了')
//     return NextResponse.json({ method: 'POST', sucess: true, message: '新增資料成功', res: data })

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