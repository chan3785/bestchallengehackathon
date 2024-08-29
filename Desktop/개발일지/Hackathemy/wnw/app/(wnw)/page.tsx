import { GameList } from '@/components/game-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function page() {
  return (
    <div className="mt-10 h-full max-h-[calc(120vh-50px)] space-y-6 p-4 md:p-8">
      <h2 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-3xl">
        Make impactful decisions with a Fair and Transparent Tool
      </h2>
      <h1 className="mb-20 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Empowering ESG Initiatives through Collective Support!
      </h1>
      <div>
        <GameList />
      </div>
    </div>
  );
}
