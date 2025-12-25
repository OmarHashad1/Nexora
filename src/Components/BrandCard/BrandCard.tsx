"use client";

import Image from "next/image";
import BrandCardProps from "@/interfaces/Brands/brandCardProps.interface";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { getBrand } from "@/APIs/Brands/getBrans";
import { BrandsInterface } from "@/interfaces/Brands/brands.interface";
import { Loader2 } from "lucide-react";

export default function BrandCard({ id, name, image }: BrandCardProps) {
  const [open, setOpen] = useState(false);
  const [brandData, setBrandData] = useState<BrandsInterface | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = async () => {
    setOpen(true);
    setLoading(true);
    try {
      const response = await getBrand({ brandId: id });
      setBrandData(response.data);
    } catch (error) {
      console.error("Error fetching brand:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="group relative bg-[#252525] rounded-[--radius] transition-all duration-300 border border-white/5 hover:border-(--main)/30 overflow-hidden cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="relative aspect-square overflow-hidden bg-white/5 flex items-center justify-center p-8">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="p-4 text-center bg-[#1a1a1a]">
          <h3 className="text-white font-semibold text-lg transition-colors duration-300 group-hover:text-(--main)">
            {name}
          </h3>
        </div>
        <div className="absolute inset-0 bg-(--main)/0 group-hover:bg-(--main)/5 transition-all duration-300 pointer-events-none"></div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px] bg-[#1a1a1a] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">
              Brand Details
            </DialogTitle>
          </DialogHeader>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-(--main)" />
            </div>
          ) : brandData ? (
            <div className="space-y-6">
              <div className="relative aspect-square w-full max-w-[300px] mx-auto bg-white/5 rounded-lg overflow-hidden p-8">
                <Image
                  src={brandData.image}
                  alt={brandData.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-3">
                <div className="border-b border-white/10 pb-2">
                  <p className="text-gray-400 text-sm">Name</p>
                  <p className="text-white font-semibold text-lg">
                    {brandData.name}
                  </p>
                </div>
                <div className="border-b border-white/10 pb-2">
                  <p className="text-gray-400 text-sm">Slug</p>
                  <p className="text-white">{brandData.slug}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              Failed to load brand information
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
