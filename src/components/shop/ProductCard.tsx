"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Check, Heart, Star, ShoppingBag, Store as StoreIcon } from "lucide-react";
import { Product, Store } from "./types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onOpenDetail: (product: Product) => void;
  isAdded?: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onOpenDetail,
  isAdded = false,
}: ProductCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [imageError, setImageError] = useState(false);

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const storeName =
    typeof product.store === "object" && product.store !== null
      ? (product.store as Store).name
      : "Local Kirana";

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group relative flex flex-col justify-between rounded-[22px] border border-[#E8E2D9] bg-white p-3.5 sm:p-4 transition-all duration-300 hover:border-[#0B051D] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer"
    >
      {/* ─── 1. Image Container (Klarna 1:1 Studio Surface) ─── */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[16px] bg-[#F8F7FA] flex items-center justify-center p-3">
        {/* Discount / Highlight Tag */}
        {discountPercent && discountPercent > 0 ? (
          <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-[#FAD2DE] px-2.5 py-0.5 text-[11px] font-bold tracking-tight text-[#0B051D]">
            -{discountPercent}%
          </span>
        ) : (
          <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-white/90 border border-[#E8E2D9] px-2.5 py-0.5 text-[10px] font-bold text-[#475569]">
            Fresh
          </span>
        )}

        {/* Wishlist Heart Toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
          aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
          className="absolute top-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 border border-[#E8E2D9] text-[#0B051D] transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <Heart
            className={`h-3.5 w-3.5 transition-colors ${
              isSaved ? "fill-[#D9531E] text-[#D9531E]" : "text-[#475569]"
            }`}
          />
        </button>

        {/* Product Image */}
        {product.image && !imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-[#94A3B8]">
            <ShoppingBag className="h-10 w-10 stroke-[1.2]" />
            <span className="text-[10px] font-semibold mt-1">Kirana Essential</span>
          </div>
        )}
      </div>

      {/* ─── 2. Product Meta & Typography ─── */}
      <div className="mt-3.5 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-1">
          {/* Brand & Weight Metadata */}
          <div className="flex items-center justify-between text-[11px] font-medium text-[#64748B]">
            <span className="font-semibold text-[#0B051D]">{product.brand || "Kirana Choice"}</span>
            <span>{product.weight || "Standard"}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-display text-sm sm:text-[15px] font-bold text-[#0B051D] leading-snug line-clamp-2 transition-colors group-hover:text-[#D9531E]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#475569] pt-0.5">
            <Star className="h-3 w-3 fill-[#059669] text-[#059669]" />
            <span>{product.rating || "4.8"}</span>
            <span className="text-[#94A3B8]">({product.reviewCount || "68"})</span>
          </div>
        </div>

        {/* ─── 3. Local Store Context & Price ─── */}
        <div className="pt-2 border-t border-[#F1EDE6]">
          {/* Local Store & Delivery Estimate */}
          <div className="flex items-center gap-1 text-[11px] text-[#64748B] mb-2 truncate">
            <StoreIcon className="h-3 w-3 text-[#059669] shrink-0" />
            <span className="truncate">{storeName}</span>
            <span className="text-[#94A3B8]">· 15–20m</span>
          </div>

          {/* Pricing Row & Add Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-lg sm:text-xl font-black text-[#0B051D]">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-[#94A3B8] line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            {/* Quick Add Pill Button */}
            <button
              type="button"
              onClick={(e) => onAddToCart(product, e)}
              className={`flex h-8 sm:h-9 items-center justify-center gap-1.5 px-3.5 sm:px-4 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                isAdded
                  ? "bg-[#046234] text-white"
                  : "bg-[#FAD2DE] text-[#0B051D] hover:bg-[#F8BDCE] hover:shadow-xs"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
