import { writeClient } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = (formData.get("name") as string) || "";
    const definition = (formData.get("definition") as string) || "";
    const technicalDefinition = (formData.get("technicalDefinition") as string) || "";
    const author = (formData.get("author") as string) || "";

    // Handle illustration upload
    let illustrationRef = undefined;
    const illustration = formData.get("illustration") as File | null;

    if (illustration) {
      try {
        const buffer = Buffer.from(await illustration.arrayBuffer());
        const asset = await writeClient.assets.upload("image", buffer, {
          filename: illustration.name,
        });

        illustrationRef = {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        };
      } catch (error) {
        console.error("ERROR UPLOADING ILLUSTRATION:", error);
      }
    }

    // Create term in Sanity
    const result = await writeClient.create({
      _type: "term",
      name,
      author,
      audio: undefined,
      approved: false,
      definition,
      technicalDefinition,
      illustration: illustrationRef,
    });


    // Send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
        const studioUrl = `${siteUrl}/studio/structure/terminology;awaitingApproval`;
        const logoUrl = `${siteUrl}/svg/hero.svg`;

        // Render the Tailwind-styled component to static HTML and include a small inline style block
        const React = await import("react");
        const { renderToStaticMarkup } = await import("react-dom/server");
        const TermSubmissionEmail = (await import("@/components/email/term-submission-email")).default;

        const rendered = renderToStaticMarkup(
          React.createElement(TermSubmissionEmail, {
            name,
            author,
            definition,
            technicalDefinition,
            studioUrl,
            logoUrl,
          }),
        );

        // Render component with inline styles for email clients
        const renderedInline = renderToStaticMarkup(
          React.createElement(TermSubmissionEmail, {
            name,
            author,
            definition: definition || technicalDefinition,
            studioUrl,
            logoUrl,
            inline: true,
          }),
        );

        const emailHtml = `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head><body>${renderedInline}</body></html>`;

        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: "thelastofinusa@gmail.com",
          subject: "New Term Submitted to BitTerms",
          html: emailHtml,
        });
      } catch (error) {
        console.error("Error sending email:", error);
      }
    } else {
      console.warn("RESEND_API_KEY is not set. Skipping email notification.");
    }

    return NextResponse.json({
      success: true,
      id: result._id,
      message: "Term submitted successfully!",
    });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit term" },
      { status: 500 },
    );
  }
}
