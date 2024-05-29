'use client';
import { use, useEffect, useState } from 'react';
import {
  DndContext,
  rectIntersection,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import KanbanLane from './KanbanLane3';
import {
  Check,
  Plus,
  UserRoundPlus,
  X,
  SquarePlus,
  Trash,
  Delete,
} from 'lucide-react';
import { Search } from '@/components/ui/searchButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConfirmDelete } from '@/components/modal/ConfirmDelete';
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import boardApiRequest from '@/apiRequest/board/board.api';
import { BoardType } from '@/lib/schema/board/board.schema';
import { SectionType } from '@/lib/schema/board/section.schema';
import taskApiRequest from '@/apiRequest/task/task.api';
import sectionApiRequest from '@/apiRequest/section/section.api';
import { set } from 'date-fns';

const members = [
  {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe1',
    email: 'johndoe1@example.com',
    avatar: 'https://github.com/johndoe1.png',
    gender: 'male',
  },
  {
    _id: '2',
    firstName: 'Jane',
    lastName: 'Doe',
    username: 'janedoe',
    email: 'janedoe@example.com',
    avatar: 'https://github.com/janedoe.png',
    gender: 'female',
  },
  {
    _id: '3',
    firstName: 'Bob',
    lastName: 'Smith',
    username: 'bobsmith',
    email: 'bobsmith@example.com',
    avatar: 'https://github.com/bobsmith.png',
    gender: 'male',
  },
  {
    _id: '4',
    firstName: 'Alice',
    lastName: 'Johnson',
    username: 'alicejohnson',
    email: 'alicejohnson@example.com',
    avatar: 'https://github.com/alicejohnson.png',
    gender: 'female',
  },
  {
    _id: '5',
    firstName: 'Charlie',
    lastName: 'Brown',
    username: 'charliebrown',
    email: 'charliebrownasdasdasdasdasd@example.com',
    avatar: 'https://github.com/charliebrown.png',
    gender: 'male',
  },
];

export default function KanbanBoard() {
  const boardId = useParams().boardId as string;
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );
  let renderLaneCount = 0;

  const [section, setSection] = useState('');
  const [laneName, setLaneName] = useState('');
  //For lane popover
  const [open, setOpen] = useState(false);

  //For section popover
  const [sectionOpen, setSectionOpen] = useState(false);
  //For delete task modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState('' as string);
  //For delete section modal
  const [deleteSectionModal, setDeleteSectionModal] = useState(false);
  const [deleteSectionId, setDeleteSectionId] = useState('' as string);

  const [board, setBoard] = useState<BoardType>({} as BoardType);

  //Load data from API
  const loadBoard = async () => {
    try {
      const res = await boardApiRequest.getBoardDetail(boardId);
      setBoard(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Load data from API
  useEffect(() => {
    if (boardId) {
      loadBoard();
    }
  }, []);

  //Mean add new status
  const addNewLane = () => {
    // Your add new lane logic
  };

  //Add new section or issue
  const addNewSection = async () => {
    try {
      const result = await sectionApiRequest.createSection({
        board: boardId,
        name: section,
      });
      console.log(result);
      if (result) {
        board.sections?.push(result);
        setBoard({ ...board });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Add new task
  const addNewTask = async (
    taskName: string,
    issue: string,
    status: string,
  ) => {
    try {
      const result = await taskApiRequest.create({
        board: boardId,
        name: taskName,
        section: issue,
        status: status,
      });
      if (result) {
        (board.sections as SectionType[])?.forEach((section: SectionType) => {
          if (section._id === issue) {
            section?.tasks?.push(result.data);
          }
        });
        setBoard({ ...board });
      }
    } catch (error) {}
    // Your add new task logic
  };

  //To open delete modal
  const deleteTask = (taskId: string | undefined) => {
    if (taskId) {
      setDeleteModal(true);
      setDeleteTaskId(taskId);
    }
  };

  //Delete task
  const handleDeleteTask = async (taskId: string) => {
    try {
      const result = await taskApiRequest.delete(taskId);
      if (result.statusCode === 200) {
        toast({
          variant: 'success',
          description: result.message,
          duration: 5000,
        });
        board.sections?.forEach((section: any) => {
          section.tasks = section.tasks.filter(
            (task: any) => task._id !== taskId,
          );
        });
        setBoard({ ...board });
      } else {
        toast({
          variant: 'destructive',
          description: result.message,
          duration: 5000,
        });
      }
    } catch (error) {
    } finally {
      setDeleteModal(false);
      setDeleteTaskId('');
    }
  };

  //Delete section
  const handleDeleteSection = async (sectionId: string) => {
    try {
      const result = await sectionApiRequest.deleteSection(sectionId);
      if (result.statusCode === 200) {
        toast({
          variant: 'success',
          description: result.message,
          duration: 5000,
        });
        board.sections = (board.sections as SectionType[])?.filter(
          (section: SectionType | string) => {
            if (typeof section === 'string') {
              return section !== sectionId;
            } else {
              return section._id !== sectionId;
            }
          },
        );
        setBoard({ ...board });
      } else {
        toast({
          variant: 'destructive',
          description: result.message,
          duration: 5000,
        });
      }
    } catch (error) {
    } finally {
      setDeleteSectionModal(false);
      setDeleteSectionId('');
    }
  };
  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const { task, parent } = active.data.current as any;
    const [targetIssue, targetLane, sectionId] = over?.id
      ?.toString()
      ?.split('-');
    console.log(targetIssue, targetLane, sectionId);

    // Find the issue that currently contains the task
    const sourceIssue: any = board.sections?.find((issue: any) =>
      issue.tasks.some((t: any) => t._id === task._id),
    );

    // Remove the task from the source issue
    if (sourceIssue) {
      sourceIssue.tasks = sourceIssue.tasks.filter(
        (t: any) => t._id !== task._id,
      );
    }

    // Find the target issue
    const targetIssueObj: any = board.sections?.find(
      (issue: any) => issue.name === targetIssue,
    );

    // Add the task to the target issue with the new status
    let newTask = null;
    if (targetIssueObj) {
      newTask = { ...task, status: targetLane, sectionId: targetIssueObj._id };
      targetIssueObj.tasks.push(newTask);
    }
    newTask.section = sectionId;
    setBoard({ ...board });

    await taskApiRequest.update(task._id, newTask);

    // Update the board state
  };

  return (
    <div>
      {/* Use for delete Task */}
      <ConfirmDelete
        isOpen={deleteModal}
        prop="task"
        func={() => handleDeleteTask(deleteTaskId)}
        closeModal={() => setDeleteModal(false)}
      ></ConfirmDelete>
      <ConfirmDelete
        isOpen={deleteSectionModal}
        prop="task"
        func={() => handleDeleteSection(deleteSectionId)}
        closeModal={() => setDeleteSectionModal(false)}
      ></ConfirmDelete>
      {/* Setting tab */}
      <div className="flex flex-row justify-between mt-5">
        <div className="flex flex-row">
          <Search placeholder="Search" />
          <div className="flex flex-row-reverse ml-2 space-x-reverse -space-x-1.5">
            {members.map((member) => (
              <TooltipProvider delayDuration={100} key={member._id}>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="w-10 h-10 relative z-10 hover:scale-120 hover:-translate-y-1 transition duration-30">
                      <AvatarImage src={member.avatar} alt={member.username} />
                      <AvatarFallback className="w-10 h-10">
                        {member.firstName[0]}
                        {member.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {member.username}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          <div className="flex ml-2 bg-slate-300 p-2 rounded-full hover:-translate-y-1 transition duration-30">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <UserRoundPlus />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="mt-3">
                  Add member
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="flex flex-row my-5">
        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragEnd={onDragEnd}
        >
          {/* Can change to table if needed */}
          <div className="flex flex-col">
            {board.taskStatus?.map((lane, index) => {
              return (
                <div className="text-center text-2xl" key={index}>
                  {lane}
                </div>
              );
            })}
            {board?.sections?.map((issue: any, index) => {
              const issueElement = (
                <div key={issue.name} className="flex flex-row">
                  <div
                    className={`w-36 flex justify-center bg-amber-500 border-b-2 p-3 rounded-sm ${
                      index === 0 ? '' : ''
                    }`}
                  >
                    <div className="flex flex-col group">
                      <h2 className="text-2xl font-medium text-center">
                        {issue.name}
                      </h2>
                      <div
                        className="mx-auto my-10 bg-red-500 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                        onClick={() => {
                          setDeleteSectionModal(!deleteSectionModal);
                          setDeleteSectionId(issue._id);
                        }}
                      >
                        <Trash size={20} color="white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    {board.taskStatus?.map((lane) => {
                      const tasks: any = issue.tasks?.filter(
                        (task: any) => task.status === lane,
                      );
                      const laneElement = (
                        <div key={`${issue.name}-${lane}`} className="">
                          {renderLaneCount === 0 && (
                            <div className="text-center text-2xl">{lane}</div>
                          )}
                          <div className="h-full flex flex-grow-1">
                            <KanbanLane
                              key={`${issue.name}-${lane}`}
                              title={lane}
                              issue={issue}
                              tasks={tasks}
                              addNewTask={addNewTask}
                              deleteTask={deleteTask}
                            />
                          </div>
                        </div>
                      );

                      return laneElement;
                    })}
                  </div>
                </div>
              );

              /* To make sure render lane 1 time only */
              renderLaneCount++;
              return issueElement;
            })}
            <div className="h-fit w-fit mt-10">
              <Popover open={sectionOpen} onOpenChange={() => setSection('')}>
                <PopoverTrigger asChild>
                  <div
                    className="bg-dark_brown h-fit p-2 rounded-xl hover:opacity-55 cursor-pointer w-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSectionOpen(!sectionOpen);
                    }}
                  >
                    <Plus color="white" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 mt-3">
                  <div className="flex flex-col w-full max-w-sm space-x-2 space-y-2">
                    <Input
                      type="text"
                      placeholder="New Section Name"
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                    />
                    <div className="flex flex-row justify-end gap-2">
                      <div
                        className="shadow-lg border w-auto rounded-lg p-1 hover:opacity-80 hover:bg-slate-200"
                        onClick={addNewSection}
                      >
                        <Check size={25} />
                      </div>
                      <div
                        className="shadow-lg border w-auto rounded-lg p-1 hover:opacity-80 hover:bg-slate-200"
                        onClick={() => {
                          setSectionOpen(false);
                          setLaneName('');
                        }}
                      >
                        <X size={25} />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </DndContext>
        <div className="h-fit w-fit">
          <Popover
            open={open}
            onOpenChange={() => {
              setLaneName('');
            }}
          >
            <PopoverTrigger asChild>
              <div
                className="bg-dark_brown h-fit p-2 rounded-xl hover:opacity-55 cursor-pointer ml-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(!open);
                }}
              >
                <Plus color="white" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 mt-3">
              <div className="flex flex-col w-full max-w-sm space-x-2 space-y-2">
                <Input
                  type="text"
                  placeholder="New Lane Name"
                  value={laneName}
                  onChange={(e) => setLaneName(e.target.value)}
                />
                <div className="flex flex-row justify-end gap-2">
                  <div
                    className="shadow-lg border w-auto rounded-lg p-1 hover:opacity-80 hover:bg-slate-200"
                    onClick={addNewLane}
                  >
                    <Check size={25} />
                  </div>
                  <div
                    className="shadow-lg border w-auto rounded-lg p-1 hover:opacity-80 hover:bg-slate-200"
                    onClick={() => {
                      setOpen(false);
                      setLaneName('');
                    }}
                  >
                    <X size={25} />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
