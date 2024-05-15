'use client';
import { Loader } from 'lucide-react';
export default function LoadingSkeleton() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#f5ede8]">
      <Loader
        className="animate-spin text-[#3A1B05]"
        size={89}
        strokeWidth={2}
      />
    </div>
  );
}
