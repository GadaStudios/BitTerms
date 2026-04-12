"use client";

import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { RiFileUploadLine } from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdCheckboxOutline } from "react-icons/io";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper";
import { Textarea } from "@/components/ui/textarea";
import { getSuggestFormSchema, SuggestFormValues } from "@/lib/validators";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";

export const FormComp = () => {
  const t = useTranslations("suggest.form");
  const locale = useLocale();
  const [files, setFiles] = React.useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 2,
    multiple: false,
    accept: { "image/*": [".png", ".jpeg", ".svg"] },
  };

  const validationDictionary = {
    name_min: t("validation.name_min"),
    name_max: t("validation.name_max"),
    author_max: t("validation.author_max"),
    definition_max: t("validation.definition_max"),
    technical_min: t("validation.technical_min"),
    technical_max: t("validation.technical_max"),
  };

  const form = useForm<SuggestFormValues>({
    resolver: zodResolver(getSuggestFormSchema(validationDictionary)),
    defaultValues: {
      author: "",
      name: "",
      definition: "",
      technicalDefinition: "",
      illustration: undefined,
    },
  });

  async function onSubmit(values: SuggestFormValues) {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("definition", values.definition || "");
      formData.append("technicalDefinition", values.technicalDefinition);
      formData.append("author", values.author || "");
      formData.append("language", locale);

      if (files?.length) {
        formData.append("illustration", files[0]);
      }

      const response = await fetch("/api/suggest", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.custom(() => (
          <div className="bg-primary text-background w-full max-w-sm rounded-2xl p-4 shadow-md">
            <h3 className="text-lg font-medium md:text-xl">
              {t("success_title")}
            </h3>
            <p className="text-sm">{t("success_description")}</p>
          </div>
        ));
        form.reset();
        setFiles([]);
      } else {
        toast.custom(() => (
          <div className="bg-destructive text-background w-full max-w-sm rounded-2xl p-4 shadow-md">
            <h3 className="text-lg font-medium md:text-xl">
              {t("error_title")}
            </h3>
            <p className="text-sm">{result.error ?? t("error_description")}</p>
          </div>
        ));
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.custom(() => (
        <div className="bg-destructive text-background w-full max-w-sm rounded-2xl p-4 shadow-md">
          <h3 className="text-lg font-medium md:text-xl">
            {t("submission_failed")}
          </h3>
          <p className="text-sm">
            {error instanceof Error ? error.message : t("submission_error")}
          </p>
        </div>
      ));
    }
  }

  return (
    <Wrapper>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mt-16 flex w-full max-w-[600px] flex-col gap-6 md:mt-20"
        >
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>{t("author")}</span>
                    <span className="text-primary italic">{t("optional")}</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      {...field}
                      placeholder={t("author")}
                      className="text-base! placeholder:font-normal placeholder:text-[#B4B4B4]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>{t("name")}</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      {...field}
                      placeholder={t("name")}
                      className="text-base! placeholder:font-normal placeholder:text-[#B4B4B4]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="definition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>{t("definition")}</span>
                    <span className="text-primary italic">{t("optional")}</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={form.formState.isSubmitting}
                      {...field}
                      placeholder={t("definition")}
                      className="h-32 resize-none text-base! placeholder:font-normal placeholder:text-[#B4B4B4]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="technicalDefinition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>{t("technical")}</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={form.formState.isSubmitting}
                      {...field}
                      placeholder={t("technical")}
                      className="h-32 text-base! placeholder:font-normal placeholder:text-[#B4B4B4]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3">
              <FormLabel>
                <span>{t("upload_illustration")}</span>
                <span className="text-primary italic">{t("optional")}</span>
              </FormLabel>
              <FileUploader
                value={files}
                onValueChange={setFiles}
                dropzoneOptions={dropZoneConfig}
                className={cn(
                  "relative rounded-sm bg-[#fcfcfc] outline-[#e1e1e1] outline-dashed md:rounded-lg",
                  {
                    "bg-[#F9FDE5] outline-double": files && files.length > 0,
                    "pointer-events-none opacity-50":
                      form.formState.isSubmitting,
                  },
                )}
              >
                <FileUploaderContent>
                  {files && files.length > 0 ? (
                    files.map((file, i) => (
                      <FileUploaderItem
                        key={i}
                        index={i}
                        className="flex h-max! gap-4! border-0 p-4! outline-none sm:p-6!"
                      >
                        <div className="bg-primary/10 mr-4 flex size-12 items-center justify-center rounded-full">
                          <IoMdCheckboxOutline className="text-primary size-6" />
                        </div>
                        <div className="flex-flex-col gap-1.5">
                          <p className="text-base font-normal">{file.name}</p>
                          <span className="text-muted-foreground text-sm font-normal">
                            {file.size > 1024 * 1024
                              ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                              : `${(file.size / 1024).toFixed(2)} KB`}
                          </span>
                        </div>
                      </FileUploaderItem>
                    ))
                  ) : (
                    <FileInput className="flex gap-4 p-4 sm:p-6">
                      <div className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
                        <RiFileUploadLine className="text-primary size-6" />
                      </div>

                      <div className="flex flex-1 flex-col gap-1">
                        <p className="text-sm font-normal sm:text-base">
                          {t("drag_drop")}
                        </p>
                        <span className="text-muted-foreground text-xs font-normal sm:text-sm">
                          {t("supported_files")} ({t("max_file_size")}{" "}
                          {`${(dropZoneConfig.maxSize / (1024 * 1024)).toFixed(0)} MB`}
                          )
                        </span>
                      </div>
                    </FileInput>
                  )}
                </FileUploaderContent>
              </FileUploader>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="ml-auto min-w-[186px]"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? t("submitting") : t("submit")}
          </Button>
        </form>
      </Form>
    </Wrapper>
  );
};
