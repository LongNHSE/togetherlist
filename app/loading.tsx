import { Loader } from 'lucide-react';

export default function loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-35">
      <Loader
        className="animate-spin text-[#3A1B05]"
        size={89}
        strokeWidth={2}
      />
    </div>
  );
}
