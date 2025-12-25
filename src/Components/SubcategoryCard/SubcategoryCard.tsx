"use client";

interface SubcategoryCardProps {
  name: string;
  slug: string;
}

export default function SubcategoryCard({ name, slug }: SubcategoryCardProps) {
  return (
    <div className="group relative bg-[#252525] rounded-[--radius] transition-all duration-300 border border-white/5 hover:border-(--main)/30 overflow-hidden p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold text-lg transition-colors duration-300 group-hover:text-(--main)">
            {name}
          </h3>
          <p className="text-gray-400 text-sm mt-1">{slug}</p>
        </div>
        <svg
          className="w-6 h-6 text-gray-400 group-hover:text-(--main) transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}
