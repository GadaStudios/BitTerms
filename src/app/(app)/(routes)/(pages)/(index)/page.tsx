import { Guidelines } from "./_components/guidelines";
import { HomeHero } from "./_components/hero";
import { Intro } from "./_components/intro";
import { Process } from "./_components/process";
import { Understand } from "./_components/understand";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col overflow-x-clip">
      <HomeHero />
      <Intro />
      <Understand />
      <Process />
      <Guidelines />
    </div>
  );
}
