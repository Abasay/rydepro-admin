import { cn } from '@/utils';
import { Button } from '../LucideUI/button';
import { ScrollArea } from '../LucideUI/scroll-area';
import type { JobTitle } from './types/employee';

type JobTitleSidebarProps = {
  titles: JobTitle[];
  selectedTitle: string;
  onSelectTitle: (title: string) => void;
};

const JobTitleSidebar = ({ titles, selectedTitle, onSelectTitle }: JobTitleSidebarProps) => {
  return (
    <aside className="w-64 h-screen bg-background">
      <ScrollArea className="h-[calc(100vh-64px)]">
        <div className="pt-3 flex flex-col gap-[15px]">
          {titles.map((title) => (
            <Button
              key={title.title}
              variant={selectedTitle === title.title ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start text-left flex gap-[4px] items-center hover:bg-[#F5F5F5] rounded-[8px] text-[#3C3C3C]',
                selectedTitle === title.title ? 'bg-[#F5F5F5] font-bold ' : ''
              )}
              onClick={() => onSelectTitle(title.title)}
            >
              <span>{title.title}</span>
              <span className=" ">({title.count})</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default JobTitleSidebar;
