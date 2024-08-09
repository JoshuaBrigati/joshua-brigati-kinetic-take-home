import Link from "next/link";
import CartPopover from "@/components/cart-popover";

const TopNav = () => {
  return (
    <header className="fixed w-full z-20 flex min-h-14 items-center gap-4 border-b border-white/10 bg-grey-800/60 px-4 lg:min-h-[60px] lg:px-6">
      <div className="w-full flex gap-10 items-center">
        <Link href="/">
          <h1 className="text-lg font-semibold">NFTS</h1>
        </Link>
        <Link href="/collections">
          <h3 className="text-sm">Collections</h3>
        </Link>
      </div>
      <CartPopover />
    </header>
  );
}

export default TopNav
