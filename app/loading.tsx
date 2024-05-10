import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-15">
      <Loader
        className="animate-spin text-[#3A1B05]"
        size={89}
        strokeWidth={2}
      />
    </div>
  );
}
