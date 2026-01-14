import {
  MdOutlineBrandingWatermark,
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { BiVolume, BiVolumeMute } from "react-icons/bi";
import { CiImageOn, CiImageOff } from "react-icons/ci";
import { RiFilePaper2Line } from "react-icons/ri";
import { PiChecks } from "react-icons/pi";
import { MdBlock } from "react-icons/md";
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Terms CMS")
    .items([
      S.listItem()
        .title("Terminology")
        .icon(RiFilePaper2Line)
        .child(
          S.list()
            .title("Term Management")
            .items([
              // ALL TERMS
              S.listItem()
                .title("All Entries")
                .icon(RiFilePaper2Line)
                .child(S.documentTypeList("term").title("All Terms")),
              S.listItem()
                .title("Approved Entries")
                .icon(PiChecks)
                .child(
                  S.documentTypeList("term")
                    .title("Approved Entries")
                    .filter("approved == true"),
                ),

              S.divider(),

              S.listItem()
                .title("Missing Illustration")
                .icon(CiImageOff)
                .child(
                  S.documentTypeList("term")
                    .title("Missing Illustration")
                    .filter('!defined(illustration) || illustration == ""'),
                ),
                S.listItem()
                .title("Awaiting Approval")
                .icon(MdBlock)
                .child(
                  S.documentTypeList("term")
                  .title("Awaiting Approval")
                  .filter("approved == false"),
                ),
                S.listItem()
                  .title("Missing Audio")
                  .icon(AiOutlineAudioMuted)
                  .child(
                    S.documentTypeList("term")
                      .title("Missing Audio")
                      .filter('!defined(audio) || audio == ""'),
                  ),
            ]),
        ),
    ]);
