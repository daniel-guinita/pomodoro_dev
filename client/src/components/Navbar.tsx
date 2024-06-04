import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import { ModeToggleButton } from "./ModeToggleButton";

export default function Navbar() {
  return (
    <nav className="container mx-auto flex justify-between">
      <div className="lg:w-full lg:flex lg:items-center lg:gap-3">
        <Link href="/" className="lg:text-[20px] lg:font-semibold">
          PomodoroEd
        </Link>
      </div>
      <div className="lg:flex lg:items-center lg:gap-3">
        <ModeToggleButton/>
        <ProfileMenu />
      </div>
    </nav>
  );
}
