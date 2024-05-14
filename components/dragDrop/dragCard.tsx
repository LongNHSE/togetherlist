import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const DragCard = ({
  title,
  index,
  id,
  parent,
}: {
  title: string;
  id: string;
  parent: string;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: {
      title,
      index,
      parent,
      id,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {title}
    </div>
  );
};
