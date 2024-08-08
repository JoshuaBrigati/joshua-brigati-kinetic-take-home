import Link from "next/link";
import CartPopover from "./cart-popover";

const TopNav = () => {
  return (
    <header className="flex min-h-14 items-center gap-4 border-b border-white/10 bg-card px-4 lg:min-h-[60px] lg:px-6">
      <div className="w-full flex gap-10 items-center">
        <Link href="/">
          <h1 className="text-lg font-semibold">NFTS</h1>
        </Link>
      </div>
      <CartPopover />
    </header>
  );
}

export default TopNav
