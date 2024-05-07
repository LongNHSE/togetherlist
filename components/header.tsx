import Link from "next/link";

export default function Header() {
  return (
    <div>
      <ul>
        <li>
          <Link href={"/auth"}>Login</Link>
        </li>
        <li>
          {" "}
          <Link href={"/auth/singUp"}>Sign Up</Link>
        </li>
      </ul>
    </div>
  );
}
