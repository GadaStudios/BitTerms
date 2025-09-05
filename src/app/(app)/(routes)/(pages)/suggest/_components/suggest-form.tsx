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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { suggestFormSchema, SuggestFormValues } from "@/lib/validators";
import Wrapper from "@/components/wrapper";
import { generateAudio } from "@/lib/utils";

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
      author: "Holiday",
      name: "Multisig",
      definition: "Just a simplified definition",
      technicalDefinition: "Multisig testing definition",
      illustration: undefined,
      audio: "",
    },
  });

  // background generation onBlur
  const handleBlurName = async (value: string) => {
    if (!value) return;
    const audioUrl = await generateAudio(value);
    console.log(audioUrl);
    if (audioUrl) {
      form.setValue("audio", audioUrl);
    }
  };

  async function onSubmit(values: SuggestFormValues) {
    let finalAudioUrl = values.audio;

    // Retry audio generation if missing
    if (!finalAudioUrl && values.name) {
      finalAudioUrl = await generateAudio(values.name);
      form.setValue("audio", finalAudioUrl);
    }

    if (!finalAudioUrl) {
      console.warn("Audio still missing, proceeding without it:", values);
    }

    // Now you can send `values` (with audio) to Sanity or API
    toast.success("Submitted successfully!");
    console.log("Final submit payload:", { ...values, audio: finalAudioUrl });
  }

  return (
    <Wrapper>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto mt-24 flex w-full max-w-[600px] flex-col gap-6"
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
                      className="!text-base placeholder:font-normal placeholder:text-[#B4B4B4]"
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
                      onBlur={(e) => handleBlurName(e.target.value)} // background generation
                      className="!text-base placeholder:font-normal placeholder:text-[#B4B4B4]"
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
                      className="!text-base placeholder:font-normal placeholder:text-[#B4B4B4]"
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
                      className="resize-none !text-base placeholder:font-normal placeholder:text-[#B4B4B4]"
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
                      className="relative rounded-lg bg-[#fcfcfc] outline-[#e1e1e1] outline-dashed"
                    >
                      <FileUploaderContent>
                        {files && files.length > 0 ? (
                          files.map((file, i) => (
                            <FileUploaderItem
                              key={i}
                              index={i}
                              className="flex !h-max items-center !gap-0 border-0 !p-6 outline-none"
                            >
                              <RiFileUploadLine className="mr-4 size-7 text-[#8E8E8E]" />
                              <div className="flex-flex-col gap-1">
                                <p className="text-base leading-none font-normal">
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
                          <FileInput className="flex items-center p-6">
                            <RiFileUploadLine className="mr-4 size-7 text-[#8E8E8E]" />
                            <div className="flex-flex-col gap-1">
                              <p className="text-base leading-none font-normal">
                                Drag and drop document here or browse
                              </p>
                              <span className="text-sm font-normal text-[#B4B4B4]">
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

          <Button
            className="ml-auto"
            type="submit"
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
