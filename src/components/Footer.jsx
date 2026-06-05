function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-50 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-xl font-semibold">
            BakersCafe
          </h3>

          <p className="text-sm text-center">
            Freshly baked delights made with love.
          </p>

          <div className="w-full border-t border-amber-50/20 pt-4 mt-2">
            <p className="text-center text-sm">
              © 2026 BakersCafe. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;