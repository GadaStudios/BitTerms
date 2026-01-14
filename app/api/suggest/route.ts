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
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const studioUrl = `${siteUrl}/studio/structure/terminology;awaitingApproval`;

        // Use inline styles for email compatibility
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: "thelastofinusa@gmail.com",
          subject: "New Term Submitted to BitTerms",
          html: `
          <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    <meta name="x-apple-disable-message-reformatting" />
  </head>

  <body style="background-color:rgb(255,255,255);font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td
          style='background-color:rgb(255,255,255);color:rgb(33,33,33)'>
          
          <table
            align="center"
            width="100%"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="max-width:600px;padding:20px;margin:auto;background-color:#f5f5f5"
          >
            <tr>
              <td>
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#ffffff">
                  <tr>
                    <td>
                      
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="background-color:#f7931b;padding:20px 30px;"
                      >
                        <tr>
                          <td>
                            <a 
                                href="https://bitterms.com"
                                    target="_blank">
                                <img
                              src="https://bitterms.com/svg/logo.svg"
                              alt="BitTerms"
                              width="120"
                              style="display:block;margin:auto;border:none"
                            />
                            </a>
                          </td>
                        </tr>
                      </table>

                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="padding:30px"
                      >
                        <tr>
                          <td>
                            <h1
                              style="font-size:20px;font-weight:700;color:#333;margin:0 0 8px 0"
                            >
                              New term submitted
                            </h1>

                            <p
                              style="font-size:14px;line-height:24px;color:#333;margin:0 0 24px 0"
                            >
                              ${author ? `${author} submitted a new term and is awaiting your review` : "A new term has been submitted to BitTerms and is awaiting your review."}
                            </p>

                            <p
                              style="font-size:14px;line-height:24px;color:#333;margin:16px 0"
                            >
                              <strong>Term name</strong><br />
                              ${name}
                            </p>

                            <p
                              style="font-size:14px;line-height:24px;color:#333;margin:16px 0"
                            >
                              <strong>Simple definition</strong><br />
                              ${definition}
                            </p>

                            <p
                              style="font-size:14px;line-height:24px;color:#333;margin:16px 0"
                            >
                              <strong>Technical definition</strong><br />
                              ${technicalDefinition}
                            </p>

                            <table
                              align="center"
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="margin-top:30px;"
                            >
                              <tr>
                                <td>
                                  <a
                                    href="${studioUrl}"
                                    target="_blank"
                                    style="display:inline-block;padding:13px 20px;background-color:#f7931b;color:#ffffff;text-decoration:none;font-size:14px;border-radius:300px"
                                  >
                                    Open BitTerms Studio
                                  </a>
                                </td>
                              </tr>
                            </table>

                          </td>
                        </tr>
                      </table>

                      <hr style="border:none;border-top:1px solid #eaeaea" />

                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="padding:20px 30px"
                      >
                        <tr>
                          <td>
                            <p
                              style="font-size:13px;line-height:22px;color:#555;margin:0"
                            >
                              You are receiving this email because you manage BitTerms submissions.
                            </p>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                </table>

                <p
                  style="font-size:12px;line-height:22px;color:#666;margin:24px 0 0 0;padding:0 20px;text-align:center"
                >
                  © 2026 BitTerms. All rights reserved.
                </p>

              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
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
