'use client';
import { useEffect, useState } from 'react';
import {
  DndContext,
  rectIntersection,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import KanbanLane from './KanbanLane';
import { Check, Plus, X, ChevronLeft, ChevronRight, Trash } from 'lucide-react';
import { Search } from '@/components/ui/searchButton';
import { ConfirmDelete } from '@/components/modal/ConfirmDelete';
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
import { TaskStatusType } from '@/lib/schema/board/task-status.schema';
import { useAppContext } from '@/context/Provider';

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
  const addNewLane = async () => {
    if (laneName) {
      try {
        const result = await boardApiRequest.addNewBoardStatus(boardId, {
          name: laneName,
        });
        if (result.statusCode === 200) {
          board.taskStatus?.push(result.data);
          setBoard({ ...board });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setOpen(false);
        setLaneName('');
      }
    }
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

  //_____________Section for task
  //Update task
  const updateTask = async (taskId: string, body: any) => {
    try {
      const result = await taskApiRequest.update(taskId, body);
      if (result) {
        board.sections?.forEach((section: any) => {
          section.tasks = section.tasks.map((task: any) => {
            if (task._id === result.data._id) {
              task = { ...task, ...result.data };
            }
            console.log(task);
            return task;
          });
        });
        setBoard({ ...board });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Update the status index
  const statusIndexHandler = async (
    status: TaskStatusType,
    newIndex: number,
  ) => {
    const body = { newIndex: newIndex, oldIndex: status.index };

    try {
      const result = await boardApiRequest.updateBoardStatus(
        boardId,
        status._id,
        body,
      );
      if (result) {
        toast({
          variant: 'success',
          description: result.message,
          duration: 5000,
        });
        const oldIndex = status.index;

        const newBoard = board.taskStatus?.map((ts) => {
          if (ts.index === oldIndex) {
            return { ...ts, index: newIndex };
          } else if (ts.index === newIndex) {
            return { ...ts, index: oldIndex };
          }
          return ts;
        });
        setBoard((prevBoard) => ({
          ...prevBoard,
          taskStatus: newBoard,
        }));
      } else {
        toast({
          variant: 'destructive',
          description: result.message,
          duration: 5000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const { task, parent } = active.data.current as any;
    const [targetIssue, targetLane, sectionId] = over?.id
      ?.toString()
      ?.split('-');

    // Find the issue that currently contains the task
    const sourceIssue: any = board.sections?.find((issue: any) =>
      issue.tasks.some((t: any) => t._id === task._id),
    );

    // Check if the task is being moved within the same issue and lane
    if (
      sourceIssue &&
      sourceIssue.name === targetIssue &&
      task.status === targetLane
    ) {
      // console.log(
      //   'Task moved within the same issue and lane. No action required.',
      // );
      return; // Exit the function early
    }

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
    console.log(task);
    // Add the task to the target issue with the new status
    let newTask = null;
    if (targetIssueObj) {
      newTask = { ...task, status: targetLane, sectionId: targetIssueObj._id };
      targetIssueObj.tasks.push(newTask);
    }
    newTask.section = sectionId;
    setBoard({ ...board });
    console.log(newTask);
    await taskApiRequest.update(task._id, newTask);
  };

  const sortStatuses = () => {
    board.taskStatus = board.taskStatus?.sort((a, b) => a.index - b.index);
    setBoard({ ...board });
  };

  useEffect(() => {
    sortStatuses();
  }, [board.taskStatus]);

  return (
    <div className="">
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
        </div>
      </div>

      {/* Board */}
      <div className="flex flex-row my-5 overflow-auto ">
        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection}
          onDragEnd={onDragEnd}
        >
          {/* Can change to table if needed */}
          <div className="flex flex-col">
            <table>
              <thead>
                <tr>
                  <th></th> {/* Empty header for section */}
                  {board.taskStatus?.map((lane: any, index) => {
                    return (
                      <th className="text-center text-2xl" key={index}>
                        <div className="flex flex-row justify-center mb-1">
                          {index !== 0 ? (
                            <div
                              className="mt-1 border-2 rounded-md border-black"
                              onClick={() =>
                                statusIndexHandler(lane, lane.index - 1)
                              }
                            >
                              <ChevronLeft />
                            </div>
                          ) : null}
                          <div className="mx-10">{lane.name}</div>
                          {index !== board?.taskStatus?.length - 1 ? (
                            <div
                              className="mt-1 border-2 rounded-md border-black"
                              onClick={() =>
                                statusIndexHandler(lane, lane.index + 1)
                              }
                            >
                              <ChevronRight />
                            </div>
                          ) : null}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="h-full">
                {board?.sections?.map((issue: any, index) => {
                  const issueElement = (
                    <tr key={issue.name} className="">
                      <td className="h-96">
                        <div className="w-36 flex justify-center h-full bg-amber-500 border-b-2 p-3 rounded-sm">
                          <div className="flex flex-col group">
                            <h2 className="text-2xl font-medium text-center ">
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
                      </td>
                      {board.taskStatus?.map((lane: any) => {
                        const tasks: any = issue.tasks?.filter(
                          (task: any) => task?.status === lane._id,
                        );
                        const laneElement = (
                          <td
                            key={`${issue.name}-${lane.name}`}
                            className="h-96"
                          >
                            <div className="h-full">
                              <KanbanLane
                                key={`${issue.name}-${lane._id}`}
                                title={lane.name}
                                status={lane}
                                issue={issue}
                                tasks={tasks}
                                addNewTask={addNewTask}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                              />
                            </div>
                          </td>
                        );

                        return laneElement;
                      })}
                    </tr>
                  );

                  return issueElement;
                })}
              </tbody>
            </table>
            <div className="h-fit w-fit mt-10 ml-12">
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
