'use client';
import {
  Card,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { projects } from '@/constants';

export const ScheduleItem = () => {
  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
      {projects.map((project, index) => (
        <Card key={index} className="w-full cursor-pointer hover:shadow-lg">
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
