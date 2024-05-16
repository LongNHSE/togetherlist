import SectionOne from '@/layouts/Dashboard/Workspace/SectionOne';
import SectionTwo from '@/layouts/Dashboard/Workspace/SectionTwo';

export default function WorkspacePage() {
  return (
    <section className="flex flex-col gap-5">
      {/* Section One */}
      <SectionOne />
      {/* Section Two:Projects */}
      <SectionTwo />
    </section>
  );
}
