"use client";

import React from "react";
import TermSubmissionEmail from "@/components/email/term-submission-email";

export const EmailPreview = () => {
  const [name, setName] = React.useState("Example Term");
  const [author, setAuthor] = React.useState("Jane Doe");
  const [definition, setDefinition] = React.useState("A short, friendly definition of the example term.");
  const [technicalDefinition, setTechnicalDefinition] = React.useState("A short, friendly definition of the example term.");

  const siteUrl = typeof window !== "undefined" ? (process.env.NEXT_PUBLIC_SITE_URL || window.location.origin) : "";
  const studioUrl = `${siteUrl.replace(/\/$/, "")}/studio/structure/terminology;awaitingApproval`;
  const logoUrl = `${siteUrl.replace(/\/$/, "")}/svg/hero.svg`;

  return (
    <div className="mt-8 w-full max-w-3xl mx-auto">
      <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <input className="col-span-1 sm:col-span-3 p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} placeholder="Term name" />
        <input className="p-2 border rounded" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
        <input className="p-2 border rounded" value={definition} onChange={(e) => setDefinition(e.target.value)} placeholder="Definition" />
        <input className="p-2 border rounded" value={technicalDefinition} onChange={(e) => setTechnicalDefinition(e.target.value)} placeholder="Technical Definition" />
      </div>

      <div className="border p-4 rounded bg-white">
        <TermSubmissionEmail name={name} author={author} definition={definition} technicalDefinition={technicalDefinition} studioUrl={studioUrl} logoUrl={logoUrl} />
      </div>
    </div>
  );
};

export default EmailPreview;
