export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cookieStore = cookies();
  // const sessionToken = cookieStore.get('sessionToken');
  // console.log(sessionToken);
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
