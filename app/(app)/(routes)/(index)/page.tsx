import { HeroComp } from "./_components/hero.comp";
import { TermsComp } from "./_components/terms.comp";
import EmailPreview from "./_components/email-preview.comp";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-x-clip">
      <HeroComp />
      <TermsComp />
      <EmailPreview />
    </div>
  );
}
