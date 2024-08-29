import { GameList } from '@/components/game-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function page() {
  return (
    <div className="mt-10 h-full max-h-[calc(100vh-100px)] space-y-6 overflow-y-scroll p-4 md:p-8">
      <h2 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-3xl">
        Help for rights! not for abnormals
      </h2>
      <h1 className="mb-20 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Quadratic voting power platform
      </h1>
      <div>
        <GameList />
      </div>
    </div>
  );
}
