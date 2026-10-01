"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ChevronDown } from "lucide-react";
import { AuthRoleModal, AuthMode } from "./AuthRoleModal";

export const NAV_ITEMS = [
  { label: "Discover KiranaWala", href: "/discover" },
  { label: "Shop", href: "/shop" },
  { label: "Stores", href: "/stores" },
  { label: "Help", href: "/help" },
] as const;

export function DesktopNav() {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<AuthMode>("login");

  const openAuth = (mode: AuthMode) => {
    setModalMode(mode);
    setModalOpen(true);
  };

  const isLinkActive = (href: string) => {
    if (href === "/discover") {
      return pathname === "/discover" || pathname === "/what-is-kiranawala";
    }
    if (href === "/shop") {
      return pathname === "/shop" || pathname.startsWith("/customer/products");
    }
    if (href === "/stores") {
      return pathname.startsWith("/stores");
    }
    if (href === "/help") {
      return pathname.startsWith("/help");
    }
    return pathname === href;
  };

  return (
    <>
      <div className="hidden items-center justify-between gap-6 lg:gap-8 lg:flex lg:flex-1 lg:ml-8">
        {/* Primary Links */}
        <nav aria-label="Main Navigation" className="flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative py-1 text-sm font-medium transition-colors duration-150 hover:text-[#0B051D] ${
                  active
                    ? "font-bold text-[#0B051D] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#0B051D] after:rounded-full"
                    : "text-[#504F5F] hover:opacity-85"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Secondary Actions */}
        <div className="flex items-center gap-2.5">
          {/* Search circle icon */}
          <Link
            href="/shop?focus=search"
            aria-label="Search products and stores"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E2E7] text-[#0B051D] transition-colors hover:bg-[#F3F3F5] cursor-pointer"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </Link>

          {/* Region Switcher */}
          <div className="flex items-center gap-1.5 rounded-full border border-[#E2E2E7] px-3.5 py-2 text-xs font-semibold text-[#0B051D] hover:bg-[#F3F3F5] transition-colors cursor-pointer">
            <span className="text-sm leading-none">🇮🇳</span>
            <span>EN</span>
          </div>

          {/* Sign In Role Button */}
          <button
            type="button"
            onClick={() => openAuth("login")}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#E2E2E7] bg-white px-4 text-sm font-bold text-[#0B051D] transition-all hover:bg-[#F3F3F5] active:scale-[0.98] cursor-pointer"
          >
            <User className="h-4 w-4 text-[#0B051D]" aria-hidden="true" />
            <span>Sign in</span>
            <ChevronDown className="h-3.5 w-3.5 text-[#504F5F]" aria-hidden="true" />
          </button>

          {/* Get Started Role Button */}
          <button
            type="button"
            onClick={() => openAuth("register")}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#FFA8CD] px-5 text-sm font-bold text-[#0B051D] transition-all hover:bg-[#FFB8D7] active:scale-[0.98] cursor-pointer"
          >
            <span>Get started</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* Role Selection Modal */}
      <AuthRoleModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
      />
    </>
  );
}
