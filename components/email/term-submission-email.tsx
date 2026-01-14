import { buttonVariants } from "../ui/button";

export type TermSubmissionEmailProps = {
  name?: string;
  author?: string;
  definition?: string;
  technicalDefinition?: string;
  studioUrl?: string;
  logoUrl?: string;
  inline?: boolean;
};

export default function TermSubmissionEmail({
  name = "",
  author = "",
  definition = "",
  technicalDefinition = "",
  studioUrl = "#",
  logoUrl = "",
  inline = false,
}: TermSubmissionEmailProps) {
  const useInline = !!inline;

  const containerStyle: React.CSSProperties = useInline
    ? { maxWidth: 720, margin: "0 auto", padding: 24, background: "#f9fafb", borderRadius: 8, fontFamily: "Inter, Helvetica, Arial, sans-serif" }
    : {};

  const headerStyle: React.CSSProperties = useInline
    ? { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 24 }
    : {};

  const titleStyle: React.CSSProperties = useInline ? { fontSize: 18, fontWeight: 600, color: "#111" } : {};
  const subtitleStyle: React.CSSProperties = useInline ? { fontSize: 14, color: "#4b5563" } : {};
  const logoStyle: React.CSSProperties = useInline ? { height: 56, width: "auto" } : {};

  const contentBoxStyle: React.CSSProperties = useInline
    ? { background: "#fff", border: "1px solid #f3f4f6", borderRadius: 4, padding: 24 }
    : {};

  const nameStyle: React.CSSProperties = useInline ? { fontSize: 16, fontWeight: 500, marginBottom: 8 } : {};
  const defStyle: React.CSSProperties = useInline ? { fontSize: 14, color: "#374151" } : {};
  const smallStyle: React.CSSProperties = useInline ? { fontSize: 13, color: "#6b7280" } : {};
  const btnStyle: React.CSSProperties = useInline ? { display: "inline-block", background: "#111", color: "#fff", padding: "10px 14px", borderRadius: 6, textDecoration: "none" } : {};

  return (
    <div className={useInline ? undefined : "max-w-xl mx-auto p-6 bg-gray-50 rounded-lg"} style={containerStyle}>
      <div className={useInline ? undefined : "flex items-center justify-between gap-4 mb-6"} style={headerStyle}>
        <div>
          <h1 className={useInline ? undefined : "text-lg font-semibold text-gray-900"} style={titleStyle}>New Term Submission</h1>
          <p className={useInline ? undefined : "text-sm text-gray-600"} style={subtitleStyle}>{author ? <><strong>{author}</strong> submitted a new term.</> : "A new term has been submitted and awaits your review."}</p>
        </div>
        <a href={studioUrl} target="_blank" rel="noreferrer noopener">
          {logoUrl ? (
            <img src={logoUrl} alt="logo" className={useInline ? undefined : "h-14 w-auto"} style={logoStyle} />
          ) : (
            <div className={useInline ? undefined : "h-12 w-12 bg-gray-200 rounded"} style={useInline ? { height: 48, width: 48, background: "#e5e7eb", borderRadius: 8 } : {}} />
          )}
        </a>
      </div>

      <div className={useInline ? undefined : "bg-white border border-gray-100 rounded-sm p-6"} style={contentBoxStyle}>
        <p className={useInline ? undefined : "text-sm text-gray-600 mb-3"} style={smallStyle}>
          <strong>Name: </strong>
          <span className={useInline ? undefined : "prose max-w-none text-sm text-gray-800"} style={nameStyle}>{name}</span>
        </p>

        <p className={useInline ? undefined : "text-sm text-gray-600 mb-3"} style={smallStyle}>
          <strong>Definition: </strong>
          <span className={useInline ? undefined : "prose max-w-none text-sm text-gray-800"} style={defStyle}>{definition || "(No definition provided)"}</span>
        </p>

        <p className={useInline ? undefined : "text-sm text-gray-600 flex flex-col gap-1 mb-6"} style={smallStyle}>
          <strong>Technical Definition: </strong>
          <span className={useInline ? undefined : "prose max-w-none text-sm text-gray-800"} style={defStyle}>{technicalDefinition || "(No technical definition provided)"}</span>
        </p>

        <div className={useInline ? undefined : "flex justify-end"}>
          {useInline ? (
            <a href={studioUrl} target="_blank" rel="noopener noreferrer" style={btnStyle}>
              Open in Studio to Review
            </a>
          ) : (
            <a href={studioUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({className: "h-10! text-sm! px-5!"})}>
              Open in Studio to Review
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
