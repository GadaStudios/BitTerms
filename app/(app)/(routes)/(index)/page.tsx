import { HeroComp } from "./_components/hero.comp";
import { TermsComp } from "./_components/terms.comp";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-x-clip">
      <HeroComp />
      <TermsComp />
    </div>
  );
}
