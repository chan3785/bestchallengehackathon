'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { useReadContract } from 'wagmi';
import WNW_ABI from '@/abi/IWNW.abi';
import { useSearchParams } from 'next/navigation';
import { ScheduleList } from '@/components/schedule-list';
import { UserList } from '@/components/user-list';
import { GameDetailVote } from '@/components/game-detail-vote';

export default function Page() {
  const [gameTitle, setGameTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [category, setCategory] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null); // 선택된 프로젝트 상태

  const WNW_PRECOMPILE_ADDRESS = '0x8b6eC36dB2Cc17D3b16D52DdA334238F24EE7Ed6';
  const searchParams = useSearchParams();
  const key = searchParams.get('key');

  const { data: game }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGame',
    args: [key]
  });

  useEffect(() => {
    if (game) {
      setGameTitle(game.gameTitle);
      setCategory(game.category);

      const milliseconds = Number(game.startDate);
      const date = new Date(milliseconds);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}.${month}.${day}`;
      setEventDate(formattedDate);

      const updateTimer = () => {
        const endDate = Number(game.endDate);
        const now = Date.now();
        const timeDiff = endDate - now;

        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

          const timeString =
            days > 0
              ? `${days}D ${hours.toString().padStart(2, '0')}:${minutes
                  .toString()
                  .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
              : `${hours.toString().padStart(2, '0')}:${minutes
                  .toString()
                  .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

          setTimeLeft(timeString);
        } else {
          setTimeLeft('Game Ended');
        }
      };

      const timerInterval = setInterval(updateTimer, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [game]);

  return (
    <div className="mt-10 max-h-screen space-y-6 overflow-y-auto p-4 md:p-8">
      <div className="flex w-4/6 justify-between">
        <h1 className="mb-5 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
          Round 1 is on funding!
        </h1>
      </div>

      <div className="flex space-x-6">
        <Badge className="text-F7F8F8 rounded-3xl bg-[#575757] p-1.5 px-5 text-xs">
          {!game?.isEnded ? `Ends in ${timeLeft}` : 'End'}
        </Badge>
      </div>

      <div className="flex h-full space-x-8">
        <div className="h-full w-2/3 space-y-20 overflow-y-auto pr-2">
          <ScheduleList/>
          <UserList />
        </div>

        <div className="h-full w-1/3 space-y-4 overflow-y-auto pl-2">
          <GameDetailVote />
        </div>
      </div>
    </div>
  );
}
