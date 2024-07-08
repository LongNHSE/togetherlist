import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import React from 'react';
import { InputProps } from './input';

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

const Search = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 items-center rounded-md border border-input border-dark_brown pl-3 hover:cursor-pointer text-sm focus-within:ring-1 focus-within:ring-ring ',
          className,
        )}
      >
        <SearchIcon className="h-[16px] w-[16px]" />
        <input
          {...props}
          type="search"
          ref={ref}
          className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:opacity-50"
        />
      </div>
    );
  },
);

Search.displayName = 'Search';

export { Search };
