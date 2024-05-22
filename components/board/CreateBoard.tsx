import { FolderKanbanIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const CreateBoard = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="flex items-center gap-3 bg-[#3A1B05] rounded-xl hover:bg-[#a5683c]"
          size="sm"
        >
          <FolderKanbanIcon absoluteStrokeWidth />
          <span>Create project</span>
        </Button>
      </SheetTrigger>

      <SheetContent>
        <h1>This is for the add board</h1>
      </SheetContent>
    </Sheet>
  );
};

export default CreateBoard;
