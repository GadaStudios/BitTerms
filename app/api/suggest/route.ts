import { writeClient } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = (formData.get("name") as string) || "";
    const definition = (formData.get("definition") as string) || "";
    const technicalDefinition =
      (formData.get("technicalDefinition") as string) || "";
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
        const siteUrl =
          process.env.NEXT_PUBLIC_SITE_URL ?? "https://bitterms.com";
        const studioUrl = `${siteUrl}/studio/structure/terminology;awaitingApproval;${result._id}`;
        const datetime = `${new Date().toLocaleString("en-US")} (UTC${
          -new Date().getTimezoneOffset() / 60
        })`;

        // Use inline styles for email compatibility
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: "thelastofinusa@gmail.com",
          subject: "New Term Submitted to BitTerms",
          html: `
          <!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>New Term Submission - BitTerms</title>
    <!-- Import Inter Font -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        /* Mobile responsive styles */
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                padding: 10px !important;
            }
            .content-box {
                padding: 15px !important;
            }
        }
        /* Fallback for email clients that don't support web fonts */
        body, table, td, p, h1, h2, h3, a {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f6f9fc; font-family: 'Inter', Helvetica, Arial, sans-serif; color: #333;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table class="container" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #f7931b; text-align: center;">
                          <img src="https://www.bitterms.com/og-image.png" alt="Visual representation of the term" style="width: 100%; height: auto; display: block;">
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td class="content-box" style="padding: 40px; padding-top: 20px; text-align: left;">
                            <p style="font-size: 16px; line-height: 20px; margin-bottom: 25px; text-align: left; font-weight: 400;">
                              New Term Submission <br />
                                A new entry has been submitted, and it is awaiting your approval.
                            </p>

                            <!-- Term Section -->
                            <div style="background-color: #fff9f2; border-left: 4px solid #f7931b; padding: 20px; margin-bottom: 30px; text-align: left;">
                                <span style="text-transform: uppercase; font-size: 12px; font-weight: 700; color: #f7931b; letter-spacing: 0.05em;">Term Name</span>
                                <h2 style="margin: 5px 0 0 0; color: #111827; font-size: 22px; font-weight: 600;">${name}</h2>
                            </div>

                            <!-- Definitions -->
                            <div style="margin-bottom: 25px; text-align: left;">
                                <h3 style="font-size: 14px; color: #f7931b; margin-bottom: 8px; font-weight: 600;">Simple Definition</h3>
                                <p style="font-size: 15px; font-style: italic; color: #4b5563; margin: 0; padding-left: 10px; border-left: 2px solid #e5e7eb; text-align: left;">
${definition}
                                </p>
                            </div>

                            <div style="margin-bottom: 30px; text-align: left;">
                                <h3 style="font-size: 14px; color: #f7931b; margin-bottom: 8px; font-weight: 600;">Technical Definition</h3>
                                <p style="font-size: 15px; color: #4b5563; margin: 0; padding-left: 10px; border-left: 2px solid #e5e7eb; text-align: left;">
${technicalDefinition}
                                </p>
                            </div>

                            <!-- Metadata -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid #edf2f7; padding-top: 20px; margin-bottom: 30px;">
                                <tr>
                                    <td align="left">
                                    <p style="font-size: 13px; color: #718096; margin: 5px 0;"><strong>Datetime:</strong> ${datetime}</p>
                                    <p style="font-size: 13px; color: #718096; margin: 5px 0;"><strong>Submitted By:</strong> ${author ? author : "Anonymous"}</p>
                                    <p style="font-size: 13px; color: #718096; margin: 5px 0;"><strong>Illustration:</strong> ${illustration ? "Available ✅" : "Not Available ❌"}</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA Button (Left Aligned & Rounded) -->
                            <div style="text-align: left;">
                                <a href="${studioUrl}"
                                    target="_blank" 
                                    style="display:inline-block;padding:13px 20px;background-color:#f7931b;color:#ffffff;text-decoration:none;font-size:14px;border-radius:300px">
                                    Review on BitTerms Studio
                                </a>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px; text-align: left;">
                            <p style="font-size: 12px; color: #9ca3af; margin: 0; font-weight: 400;">
                                This is an automated notification from the <strong>BitTerms</strong>.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
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
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to submit term",
      },
      { status: 500 },
    );
  }
}
