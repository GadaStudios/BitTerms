"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RiFileUploadLine } from "react-icons/ri";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";

const suggestFormSchema = z.object({
  fName: z
    .string()
    .max(50, "First Name must be at most 50 characters")
    .optional(),
  term: z
    .string()
    .min(3, "Term must be at least 3 characters")
    .max(100, "Term must be at most 100 characters"),
  definition: z
    .string()
    .min(2, "Definition must be at least 2 characters")
    .max(1000, "Definition must be at most 1000 characters"),
  simpleDefinition: z
    .string()
    .max(300, "Simplify Definition must be at most 300 characters")
    .optional(),
  illustration: z.string().optional(),
});

type SuggestFormValues = z.infer<typeof suggestFormSchema>;

export const SuggestForm = () => {
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
      fName: "",
      term: "",
      definition: "",
      simpleDefinition: "",
      illustration: undefined,
    },
  });

  function onSubmit(values: SuggestFormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[600px] mx-auto w-full flex flex-col gap-6 mt-24"
      >
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="fName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Full Name</span>
                  <span className="text-primary italic">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Full Name"
                    className="!text-base placeholder:text-[#B4B4B4] placeholder:font-normal"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Name of Term</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Name of Term"
                    className="!text-base placeholder:text-[#B4B4B4] placeholder:font-normal"
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
                  <span>Technical Definition</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Technical Definition"
                    className="!text-base placeholder:text-[#B4B4B4] placeholder:font-normal"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="simpleDefinition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span>Simplified Definition</span>
                  <span className="text-primary italic">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Simplified Definition"
                    className="!text-base placeholder:text-[#B4B4B4] placeholder:font-normal resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="illustration"
            render={() => (
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
                    className="relative bg-[#fcfcfc] rounded-lg outline-dashed outline-[#e1e1e1]"
                  >
                    <FileUploaderContent>
                      {files && files.length > 0 ? (
                        files.map((file, i) => (
                          <FileUploaderItem
                            key={i}
                            index={i}
                            className="flex items-center !p-6 !gap-0 !h-max border-0 outline-none"
                          >
                            <RiFileUploadLine className="size-7 mr-4 text-[#8E8E8E]" />
                            <div className="flex-flex-col gap-1">
                              <p className="text-base font-normal leading-none">
                                {file.name}
                              </p>
                              <span className="text-sm text-[#B4B4B4] font-normal">
                                {file.size > 1024 * 1024
                                  ? `${(file.size / (1024 * 1024)).toFixed(
                                      2
                                    )} MB`
                                  : `${(file.size / 1024).toFixed(2)} KB`}
                              </span>
                            </div>
                          </FileUploaderItem>
                        ))
                      ) : (
                        <FileInput className="flex items-center p-6">
                          <RiFileUploadLine className="size-7 mr-4 text-[#8E8E8E]" />
                          <div className="flex-flex-col gap-1">
                            <p className="text-base font-normal leading-none">
                              Drag and drop document here or browse
                            </p>
                            <span className="text-sm text-[#B4B4B4] font-normal">
                              Supported file types: JPEG, PNG, SVG. Max file
                              size: 2mb
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

        <Button className="ml-auto" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
