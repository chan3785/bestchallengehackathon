'use client';

import { Label } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { ChartContainer, ChartConfig } from '@/components/ui/chart';
import { useReadContract, useWriteContract } from 'wagmi';
import WNW_ABI from '@/abi/IWNW.abi';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Image from 'next/image';
import { projects } from '@/constants';

export function GameDetailVote() {
  const WNW_PRECOMPILE_ADDRESS = '0x8b6eC36dB2Cc17D3b16D52DdA334238F24EE7Ed6';
  const searchParams = useSearchParams();
  const key = searchParams.get('key');
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [betUp, setBetUp] = useState<boolean | null>(null); // Up/Down 선택 상태
  const [amount, setAmount] = useState(''); // Input 필드에 입력된 숫자
  const [clicked, setClicked] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null); // 선택된 버튼 상태

  const { data: game }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGame',
    args: [key]
  });

  const { data: user }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getUserBet',
    args: [key]
  });

  console.log(user);

  const betAmount = BigInt(Math.floor(Number(amount) * 10 ** 18));

  useEffect(() => {
    if (game) {
      const startPrice = Number(game.startPrice);

      const initialPriceChange = (Math.random() * 3 - 1) * 0.01;
      const initialPrice = Math.max(startPrice * (1 + initialPriceChange), 0);
      setCurrentPrice(initialPrice);

      const intervalId = setInterval(() => {
        const priceChange = (Math.random() * 3 - 1) * 0.01;
        const newPrice = Math.max(startPrice * (1 + priceChange), 0);
        setCurrentPrice(newPrice);
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [game]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 상태 로드
    const storedState = localStorage.getItem(`buttonClicked_${key}`);
    if (storedState === 'true') {
      setClicked(true);
    }
  }, [game]);

  const { writeContract } = useWriteContract();

  const handleBet = async () => {
    console.log('gameId : ', game.gameId);
    console.log('betUp : ', betUp);
    console.log('betAmount : ', betAmount);

    writeContract({
      abi: WNW_ABI,
      address: WNW_PRECOMPILE_ADDRESS,
      functionName: 'bet',
      args: [game.gameId, true],
      value: betAmount
    });
    setClicked(true);
    localStorage.setItem(`buttonClicked_${key}`, 'true');
  };

  if (!game) {
    console.log('undefined');
    return <></>;
  }

  const upAmount = game.upAmount ? BigInt(game.upAmount) : BigInt(0);
  const downAmount = 10 ** 18;
  const totalPoolAmount = Number(upAmount) + downAmount;

  const chartConfig: ChartConfig = {
    up: {
      label: 'Funded',
      color: '#00A29A'
    },
    down: {
      label: 'Left progress',
      color: '#C73535'
    }
  };

  const chartData = [
    {
      current: Number(upAmount) / 10 ** 18,
      left: (Number(downAmount) - Number(upAmount)) / 10 ** 18
    }
  ];

  const endDate = Number(game.endDate) * 1000;
  const timeRemaining = endDate - Date.now();
  const oneDayInMs = 24 * 60 * 60 * 1000;

  const renderStatusButtons = () => {
    const buttons = [];

    if (game.isEnded) {
      buttons.push(
        <div
          key="end"
          className="flex h-[22px] items-center justify-center rounded-full bg-[#575757] px-4 text-[10px] font-normal text-white"
        >
          End
        </div>
      );
    } else {
      buttons.push(
        <div
          key="live"
          className="flex h-[22px] items-center justify-center rounded-full bg-[#00A29A] px-4 text-[10px] font-normal text-white"
        >
          Live
        </div>
      );

      if (timeRemaining < oneDayInMs) {
        buttons.push(
          <div
            key="end-soon"
            className="flex h-[22px] items-center justify-center rounded-full bg-[#C73535] px-4 text-[10px] font-normal text-white"
          >
            End Soon
          </div>
        );
      }
    }

    return buttons;
  };

  const handleProjectSelect = (projectName: string) => {
    setSelectedProject(projectName);
    document
      .getElementById(`project-${projectName}`)
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Card className="mx-auto grid w-full max-w-sm gap-8 border-none text-black">
      <CardHeader className="max-h-auto mx-auto w-full max-w-sm rounded-xl bg-white p-6 text-black">
        <CardTitle className="flex gap-2">
          <div className="text-lg">Pool status</div>
          <div className="flex items-center space-x-2">
            {renderStatusButtons()}
          </div>
        </CardTitle>
        <div className="flex justify-between">
          <div className="flex-colgap-2 mb-2 flex">
            <div className="flex-col">
              <div className="text-xl font-bold">
                <div>Total Fund Amount: {Number(upAmount) / 10 ** 18} BNB</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className=" text-end text-xs"></div>
          </div>
        </div>
        {totalPoolAmount === downAmount ? (
          <div className="text-center text-gray-500">Be the first party!</div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={36}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 20, bottom: 0 }}
              >
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" hide />
                <Tooltip cursor={false} />
                <Bar
                  dataKey="current"
                  stackId="a"
                  fill={chartConfig.up.color}
                  barSize={20}
                  radius={[10, 0, 0, 10]}
                />
                <Bar
                  dataKey="left"
                  stackId="a"
                  fill={chartConfig.down.color}
                  barSize={20}
                  radius={[0, 10, 10, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            {totalPoolAmount > 0 && (
              <div className="mt-2 flex justify-end text-lg">
                <div className="flex items-baseline gap-1">
                  <span className="mr-2 self-baseline text-[18px] font-bold text-black">
                    Current progress
                  </span>
                  <span className="text-[22px] font-bold">
                    {((Number(upAmount) / Number(downAmount)) * 100).toFixed(2)}
                    %
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </CardHeader>

      <CardContent className="max-h-auto mx-auto flex w-full max-w-sm flex-col gap-5 rounded-xl bg-white p-6 text-black">
        <div className="flex flex-row justify-between">
          <div>
            <div className="flex items-center text-2xl font-bold">Funds</div>
            <div className="text-sm font-bold">Funding progress will be...</div>
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          {projects.slice(0, 3).map((project) => (
            <button
              key={project.name}
              className={`h-[55px] w-[335px] rounded-2xl font-semibold transition-transform duration-75 focus:outline-none 
                ${
                  selectedProject === project.name
                    ? 'bg-[#00A29A] text-white'
                    : 'bg-[#E9B603] text-black'
                }`}
              onClick={() => handleProjectSelect(project.name)}
            >
              project name: {project.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2"></div>
        <div className="flex flex-row justify-between">
          <div className="flex items-center font-bold">
            Fund Amount: {Number(user.amount).toFixed(2)}~
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full border-b border-[#B6B6B6] bg-white px-2 text-right text-lg focus:outline-none"
          />
        </div>
        <button
          className={`h-[55px] w-[335px] rounded-2xl font-semibold text-white shadow-md transition-transform duration-75 focus:outline-none ${
            clicked && !game.isEnded
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-[#E9B603] hover:shadow-lg active:scale-95 active:bg-gray-200'
          }`}
          onClick={handleBet}
          disabled={clicked}
        >
          {game.isEnded
            ? 'Round Ended'
            : clicked
            ? 'Round Not ended'
            : 'Confirm'}
        </button>
      </CardContent>
    </Card>
  );
}
