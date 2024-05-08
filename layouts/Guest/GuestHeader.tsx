import Logo from '@/components/Logo';
import GuestNavbar from './GuestNavbar';
export default function GuestHeader() {
  return (
    <>
      <div className="grid grid-cols-[auto_1fr] gap-x-[5rem] px-9 py-2 text-[18px] border-b-4">
        {/* Logo */}
        <Logo />
        {/* Navbar + Auth */}
        <GuestNavbar />
      </div>
    </>
  );
}
