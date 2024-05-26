import ProgressTasks from "@/components/workspace/ProgressTasks";


export default function TestPage() {
      const statuses = [
            { value: 40, colorClass: 'bg-red-500', label: 'Status 1' },
            { value: 30, colorClass: 'bg-blue-500', label: 'Status 2' },
            { value: 30, colorClass: 'bg-green-500', label: 'Status 3' },
          ];
        
          return (
            <ProgressTasks
              width="w-1/3"
              idLabel="example-progress"
              labelValue="Progress"
              statuses={statuses}
            />
          );
}