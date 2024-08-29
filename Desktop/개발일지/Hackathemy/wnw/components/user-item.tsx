'use client';
import { useReadContract } from 'wagmi';
import {
  Card,
  CardFooter,
  CardDescription
} from '@/components/ui/card';
import WNW_ABI from '@/abi/IWNW.abi';
import { useSearchParams } from 'next/navigation';

const WNW_PRECOMPILE_ADDRESS = '0x8b6eC36dB2Cc17D3b16D52DdA334238F24EE7Ed6';

export const UserItem = ({ game }: any) => {
  const searchParams = useSearchParams();
  const key = searchParams.get('key');

  type UserBet = {
    gameId: number;
    betUp: boolean;
    amount: string; // 또는 number, 데이터 타입에 따라
    status: string;
  };

  // 스마트 컨트랙트에서 특정 게임에 대한 사용자 베팅 정보 가져오기
  const { data, isLoading, error } = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getUserBet',
    args: [key ? parseInt(key) : 0],  // key를 정수로 변환하여 함수에 전달
  });

  const userBet = data as UserBet | null;

  if (isLoading) return <div>Loading...</div>;
  if (error || !userBet) return <div>No bet found for this game.</div>;

  return (
    <div key={game.gameId}>
      <Card className="my-4 w-96 w-full cursor-pointer hover:shadow-lg">
        <CardFooter>
          <CardDescription>
            <div className="my-2">
              <div className="text-sm">
                Game ID: {userBet.gameId}
              </div>
              <div className="text-sm">
                Bet Up: {userBet.betUp ? 'Yes' : 'No'}
              </div>
              <div className="text-sm">
                Amount: {userBet.amount}
              </div>
              <div className="text-sm">
                Status: {userBet.status}
              </div>
            </div>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};
