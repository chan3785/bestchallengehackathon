'use client';
import { useReadContract } from 'wagmi';
import Image from 'next/image';
import WNW_ABI from '@/abi/IWNW.abi';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Link from 'next/link';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { Overview } from '@/components/overview';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserItem } from './user-item';

const WNW_PRECOMPILE_ADDRESS = '0x8b6eC36dB2Cc17D3b16D52DdA334238F24EE7Ed6';

export const UserList = () => {
  const { data: allGames }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGameList'
  });

  if (!allGames) {
    return <></>;
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardContent className="pl-2">
              <Tabs defaultValue="all" className="space-y-4">
                <TabsContent value="all" className="space-y-4"></TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
};
