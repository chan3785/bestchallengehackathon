'use client';
import { useReadContract } from 'wagmi';
import WNW_ABI from '@/abi/IWNW.abi';
import { GameItem } from './game-item';

const WNW_PRECOMPILE_ADDRESS = '0x8b6eC36dB2Cc17D3b16D52DdA334238F24EE7Ed6';
export const GameList = () => {
  const { data: allGames }: any = useReadContract({
    address: WNW_PRECOMPILE_ADDRESS,
    abi: WNW_ABI,
    functionName: 'getGameList'
  });
  console.log(allGames);

  if (!allGames || allGames.length === 0) {
    return <></>;
  }

  const firstGame = allGames[0];

  return (
    <div className="gap-15 grid w-full grid-cols-1 md:grid-cols-3">
      <GameItem key={firstGame?.gameId} game={firstGame} />
    </div>
  );
};
