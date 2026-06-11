export default function TopBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-x-3 gap-y-0.5 bg-tc-blue-darker/90 px-4 py-2 text-center text-[12.5px] backdrop-blur-sm">
      <span className="font-bold text-white">Trillium Coin is an OTC Desk —</span>
      <span className="text-white">NOT a CEX like Binance or Coinbase, and NOT a DEX like Uniswap.</span>
      <a
        href="#faq"
        className="font-semibold text-tc-orange underline-offset-2 hover:underline"
      >
        What&rsquo;s the difference?
      </a>
    </div>
  );
}
