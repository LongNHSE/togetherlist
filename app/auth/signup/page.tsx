import { Montserrat } from "next/font/google";
import SignUpForm from "./signup-form";

const montserrat = Montserrat({ subsets: ["latin"] });
export default function Page() {
  return (
    <div
      className={`bg-[url('../public/back_ground.svg')] bg-cover bg-center flex h-screen ${montserrat.className}`}
    >
      <div className="flex mx-auto my-auto">
        <SignUpForm></SignUpForm>
      </div>
    </div>
  );
}
