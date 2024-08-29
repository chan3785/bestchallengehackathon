'use client';
import Image from 'next/image';
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
import { projects } from '@/constants';

export const GameItem = ({ game }: any) => {


  return (
    <div className="" key={game.gameId}>
      <Card className="my-4 h-full w-96 max-w-sm cursor-pointer hover:shadow-lg">
        <CardHeader>
          <CardTitle className="mb-4 flex">
            Round 1
          </CardTitle>
          <hr className="border-t" />
        </CardHeader>
        <CardContent className="grid gap-4">
          <h1 className="text-lg font-bold">
            {game.gameTitle ?? 'Game Title'}
          </h1>
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-2">
              <div className="h-20 items-center justify-end text-xs text-zinc-400">
                {game.description}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <CardDescription>
            <div className="flex justify-between text-sm text-muted-foreground">
              <Link
                href={`/games/${game.gameId}?key=${game.gameId}`}
                key={game.gameId}
              >
                <Button className="w-26 flex h-10 items-center bg-amber-400 font-semibold text-white">
                  Enter Fund
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="ml-2 size-5"
                    style={{ transform: 'scaleX(-1)' }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};
