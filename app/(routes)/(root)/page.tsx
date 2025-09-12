import { GuidelineComp } from "./_components/guideline.comp";
import { HeroComp } from "./_components/hero.comp";
import { IntroComp } from "./_components/intro.comp";
import { ProcessComp } from "./_components/process.comp";
import { UnderstandComp } from "./_components/understand.comp";

export default async function Home() {
  return (
    <div className="flex flex-1 flex-col overflow-x-clip">
      <HeroComp />
      <IntroComp />
      <UnderstandComp />
      <ProcessComp />
      <GuidelineComp />
    </div>
  );
}
