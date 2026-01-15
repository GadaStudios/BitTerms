"use client";

import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { RiFileUploadLine } from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper";
import { Textarea } from "@/components/ui/textarea";
import { suggestFormSchema, SuggestFormValues } from "@/lib/validators";

export const FormComp = () => {
  const [files, setFiles] = React.useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 2,
    multiple: false,
    accept: { "image/*": [".png", ".jpeg", ".svg"] },
  };

  const form = useForm<SuggestFormValues>({
    resolver: zodResolver(suggestFormSchema),
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
          <div className="bg-primary text-background w-sm rounded-2xl p-4 shadow-md">
            <h3 className="text-lg font-medium md:text-xl">{result.message}</h3>
            <p className="text-sm">
              Thank you for your contribution to BitTerms. We will review your
              submission shortly.
            </p>
          </div>
        ));
        form.reset();
        setFiles([]);
      } else {
        toast.custom(() => (
          <div className="bg-destructive text-background w-sm rounded-2xl p-4 shadow-md">
            <h3 className="text-lg font-medium md:text-xl">
              Something went wrong
            </h3>
            <p className="text-sm">
              {result.error ??
                "Something went wrong during submission. Please try again in a bit."}
            </p>
          </div>
        ));
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.custom(() => (
        <div className="bg-destructive text-background w-sm rounded-2xl p-4 shadow-md">
          <h3 className="text-lg font-medium md:text-xl">Submission Failed</h3>
          <p className="text-sm">
            {error instanceof Error
              ? error.message
              : "An error occurred while submitting"}
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
                    <span>Full Name</span>
                    <span className="text-primary italic">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      {...field}
                      placeholder="Full Name"
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
                    <span>Name of Term</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      {...field}
                      placeholder="Name of Term"
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
                    <span>Simplified Definition</span>
                    <span className="text-primary italic">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={form.formState.isSubmitting}
                      {...field}
                      placeholder="Simplified Definition"
                      className="resize-none text-base! placeholder:font-normal placeholder:text-[#B4B4B4]"
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
                    <span>Technical Definition</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={form.formState.isSubmitting}
                      {...field}
                      placeholder="Technical Definition"
                      className="text-base! placeholder:font-normal placeholder:text-[#B4B4B4]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="illustration"
              render={({}) => (
                <FormItem>
                  <FormLabel>
                    <span>Upload Illustration</span>
                    <span className="text-primary italic">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <FileUploader
                      value={files}
                      onValueChange={setFiles}
                      dropzoneOptions={dropZoneConfig}
                      className={cn(
                        "relative rounded-sm bg-[#fcfcfc] outline-[#e1e1e1] outline-dashed md:rounded-lg",
                        {
                          "bg-[#F9FDE5] outline-double":
                            files && files.length > 0,
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
                              className="flex h-max! items-center gap-0! border-0 p-4! outline-none sm:p-6!"
                            >
                              <RiFileUploadLine className="mr-4 size-7 text-[#8E8E8E]" />
                              <div className="flex-flex-col gap-1.5">
                                <p className="text-base font-normal">
                                  {file.name}
                                </p>
                                <span className="text-sm font-normal text-[#B4B4B4]">
                                  {file.size > 1024 * 1024
                                    ? `${(file.size / (1024 * 1024)).toFixed(
                                        2,
                                      )} MB`
                                    : `${(file.size / 1024).toFixed(2)} KB`}
                                </span>
                              </div>
                            </FileUploaderItem>
                          ))
                        ) : (
                          <FileInput className="flex items-center p-4 sm:p-6">
                            <RiFileUploadLine className="mr-4 size-7 text-[#8E8E8E]" />
                            <div className="flex-flex-col gap-1">
                              <p className="text-sm font-normal sm:text-base">
                                Drag and drop document here or browse
                              </p>
                              <span className="text-xs font-normal text-[#B4B4B4] sm:text-sm">
                                Supported file: JPEG, PNG, SVG.{" "}
                                <br className="sm:hidden" /> Max file size:{" "}
                                {`${(dropZoneConfig.maxSize / (1024 * 1024)).toFixed(0)} MB`}
                              </span>
                            </div>
                          </FileInput>
                        )}
                      </FileUploaderContent>
                    </FileUploader>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            size="lg"
            type="submit"
            className="ml-auto min-w-[186px]"
            isLoading={form.formState.isSubmitting}
            loadingText="Submitting..."
          >
            <span>Submit</span>
          </Button>
        </form>
      </Form>
    </Wrapper>
  );
};
