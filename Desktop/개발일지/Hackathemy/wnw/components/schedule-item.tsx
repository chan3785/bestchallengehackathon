'use client';
import {
  Card,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { projects } from '@/constants';

export const ScheduleItem = ({ selectedProject }: { selectedProject: string | null }) => {
  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
      {projects.map((project, index) => (
        <Card
          key={index}
          id={`project-${project.name}`}
          className={`w-full cursor-pointer hover:shadow-lg transition-all duration-300 ${
            selectedProject === project.name ? 'border-4 border-yellow-500' : ''
          }`}
        >
          <CardHeader>
            <CardTitle className="text-lg font-bold">{project.name}</CardTitle>
          </CardHeader>
          <div className="p-4 text-sm text-muted-foreground">
            {project.description}
          </div>
        </Card>
      ))}
    </div>
  );
};
