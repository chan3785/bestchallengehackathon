'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ScheduleItem } from './schedule-item';

export const ScheduleList = () => {

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex flex-col space-y-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Ongoing Projects!</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ScheduleItem/>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
};
