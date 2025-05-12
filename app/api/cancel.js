// app/api/cancel.js

export async function GET(req) {
  return new NextResponse(
    '<h1>Payment was canceled. Please try again!</h1>',
    { status: 200 }
  );
}



