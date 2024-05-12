export async function POST(request: Request) {
  const res = await request.json();
  console.log(res);
  const sessionToken = res.token;
  if (!sessionToken) {
    return new Response('Unauthorized', { status: 401 });
  }
  return Response.json(
    { res },
    {
      status: 200,
      headers: {
        'Set-Cookie': `sessionToken=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Path=/`,
        'Content-Type': 'application/json',
      },
    },
  );
}
