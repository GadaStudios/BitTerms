import {
  MdOutlineBrandingWatermark,
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
import { BiVolume, BiVolumeMute } from "react-icons/bi";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Terms")
        .icon(MdOutlineBrandingWatermark)
        .child(
          S.list()
            .title("Terms")
            .items([
              // ALL TERMS
              S.listItem()
                .title("All Terms")
                .icon(MdOutlineBrandingWatermark)
                .child(S.documentTypeList("term").title("All Terms")),

              S.divider(),

              S.listItem()
                .title("Approved")
                .icon(MdOutlineRadioButtonChecked)
                .child(
                  S.documentTypeList("term")
                    .title("Approved")
                    .filter("approved == true"),
                ),
              S.listItem()
                .title("Pending")
                .icon(MdOutlineRadioButtonUnchecked)
                .child(
                  S.documentTypeList("term")
                    .title("Pending")
                    .filter("approved == false"),
                ),

              S.divider(),

              S.listItem()
                .title("With Audio")
                .icon(BiVolume)
                .child(
                  S.documentTypeList("term")
                    .title("With Audio")
                    .filter('defined(audio) && audio != ""'),
                ),
              S.listItem()
                .title("Without Audio")
                .icon(BiVolumeMute)
                .child(
                  S.documentTypeList("term")
                    .title("Without Audio")
                    .filter('!defined(audio) || audio == ""'),
                ),
            ]),
        ),
      // S.listItem()
      //   .title("Search Term")
      //   .icon(MdOutlineBrandingWatermark)
      //   .child(S.documentTypeList("searchTerm").title("Search Term")),
    ]);
