import { sanityClient } from "@/client/sanity.client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const definition = formData.get("definition") as string;
    const technicalDefinition = formData.get("technicalDefinition") as string;
    const author = formData.get("author") as string;
    const audio = formData.get("audio") as string;

    // Handle illustration upload
    let illustrationRef = undefined;
    const illustration = formData.get("illustration") as File | null;

    if (illustration) {
      try {
        const buffer = Buffer.from(await illustration.arrayBuffer());
        const asset = await sanityClient.assets.upload("image", buffer, {
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
    const result = await sanityClient.create({
      _type: "term",
      name,
      author,
      audio,
      approved: false,
      definition,
      technicalDefinition,
      illustration: illustrationRef,
    });

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

// import { sanityClient } from "@/client/sanity.client";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();

//     const name = formData.get("name") as string;
//     const definition = formData.get("definition") as string;
//     const technicalDefinition = formData.get("technicalDefinition") as string;
//     const author = formData.get("author") as string;
//     const audio = formData.get("audio") as string;

//     // Handle illustration file
//     let illustrationRef = undefined;
//     const illustration = formData.get("illustration") as File | undefined;

//     if (illustration) {
//       try {
//         const buffer = Buffer.from(await illustration.arrayBuffer());
//         const asset = await sanityClient.assets.upload("image", buffer, {
//           filename: illustration.name,
//         });

//         illustrationRef = {
//           _type: "image",
//           asset: { _type: "reference", _ref: asset._id },
//         };
//       } catch (error) {
//         console.log("ERROR CREATING ILLUSTRATION: ", error);
//       }
//     }

//     // Create the term document in Sanity
//     const result = await sanityClient.create({
//       _type: "term",
//       name,
//       author,
//       audio,
//       approved: false,
//       definition,
//       technicalDefinition,
//       illustration: illustrationRef,
//     });

//     return NextResponse.json({
//       success: true,
//       id: result._id,
//       message: "Term submitted successfully!",
//     });
//   } catch (error) {
//     console.error("Submission error:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to submit term" },
//       { status: 500 },
//     );
//   }
// }
