import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="">
        <p>Hello</p>
        <Link href="/auth">Go to authenticate</Link>
      </div>
    </main>
  );
}
