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
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const studioUrl = `${siteUrl}/studio/structure/terminology;awaitingApproval`;
        const logoUrl = `${siteUrl}/svg/hero.svg`;

        // Use inline styles for email compatibility
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: "thelastofinusa@gmail.com",
          subject: "New Term Submitted to BitTerms",
          html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
              <title>New Term Submission</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #f9fafb; color: #374151;">
              <div style="max-width: 576px; margin: 0 auto; width: 100%; padding: 24px;">
                <div style="background-color: #f9fafb; border-radius: 8px; padding: 0;">
                  <!-- Header -->
                  <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 24px;">
                    <div>
                      <h1 style="font-family: 'IBM Plex Mono', monospace; font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 4px 0;">
                        New Term Submission
                      </h1>
                      <p style="font-size: 14px; color: #6b7280; margin: 0;">
                        A new term has been submitted and awaits your review.
                      </p>
                    </div>
                    <a href="${siteUrl}" target="_blank" style="display: inline-block;">
                      <img src="${logoUrl}" alt="BitTerms" style="height: 48px; max-width: 100%;" />
                    </a>
                  </div>
                  
                  <!-- Content Card -->
                  <div style="background-color: #ffffff; border: 1px solid #f3f4f6; border-radius: 4px; padding: 24px;">
                    <!-- Term Name -->
                    <div style="margin-bottom: 16px;">
                      <p style="font-size: 14px; color: #6b7280; margin: 0 0 4px 0;">
                        <strong style="color: #374151;">Name:</strong>
                      </p>
                      <p style="font-size: 14px; color: #111827; margin: 0; line-height: 1.5;">
                        ${name}
                      </p>
                    </div>
                    
                    <!-- Author -->
                    <div style="margin-bottom: 16px;">
                      <p style="font-size: 14px; color: #6b7280; margin: 0 0 4px 0;">
                        <strong style="color: #374151;">Author:</strong>
                      </p>
                      <p style="font-size: 14px; color: #111827; margin: 0; line-height: 1.5;">
                        ${author}
                      </p>
                    </div>
                    
                    <!-- Definition -->
                    <div style="margin-bottom: 16px;">
                      <p style="font-size: 14px; color: #6b7280; margin: 0 0 4px 0;">
                        <strong style="color: #374151;">Definition:</strong>
                      </p>
                      <p style="font-size: 14px; color: #111827; margin: 0; line-height: 1.5;">
                        ${definition || "(No definition provided)"}
                      </p>
                    </div>
                    
                    <!-- Technical Definition -->
                    <div style="margin-bottom: 24px;">
                      <p style="font-size: 14px; color: #6b7280; margin: 0 0 4px 0;">
                        <strong style="color: #374151;">Technical Definition:</strong>
                      </p>
                      <p style="font-size: 14px; color: #111827; margin: 0; line-height: 1.5;">
                        ${technicalDefinition || "(No technical definition provided)"}
                      </p>
                    </div>
                    
                    <!-- Action Button -->
                    <div style="text-align: right;">
                      <a href="${studioUrl}" target="_blank" style="
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        height: 40px;
                        padding: 0 20px;
                        font-family: 'Inter', sans-serif;
                        font-size: 14px;
                        font-weight: 500;
                        color: #ffffff;
                        background-color: #f59e0b;
                        border-radius: 9999px;
                        text-decoration: none;
                        transition: background-color 0.2s;
                      ">
                        Open in Studio to Review
                      </a>
                    </div>
                  </div>
                  
                  <!-- Footer -->
                  <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
                    <p style="font-size: 12px; color: #9ca3af; margin: 0;">
                      This is an automated message from BitTerms. Please do not reply to this email.
                    </p>
                  </div>
                </div>
              </div>
            </body>
          </html>
          `,
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