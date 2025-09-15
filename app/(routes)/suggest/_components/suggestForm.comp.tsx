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
} from "@/components/file-upload";
import {
  Choicebox,
  ChoiceboxItem,
  ChoiceboxItemContent,
  ChoiceboxItemDescription,
  ChoiceboxItemHeader,
  ChoiceboxItemIndicator,
  ChoiceboxItemTitle,
} from "@/components/ui/shadcn-io/choicebox";
import { cn, generateAudio } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/shared/wrapper";
import { Textarea } from "@/components/ui/textarea";
import { suggestFormSchema, SuggestFormValues } from "@/lib/validators";

const options = [
  {
    value: "shimmer",
    subtitle: "Bright and friendly",
    audio: "/voices/shimmer.mp3",
  },
  {
    value: "dan",
    subtitle: "Calm and confident",
    audio: "/voices/dan.mp3",
  },
];

export const SuggestFormComp = () => {
  const [files, setFiles] = React.useState<File[] | null>(null);
  const [activeVoice, setActiveVoice] = React.useState<"shimmer" | "dan">(
    "shimmer",
  );

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

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
      audio: "",
    },
  });

  React.useEffect(() => {
    const name = form.getValues("name");
    if (name) {
      (async () => {
        const audioUrl = await generateAudio(name, activeVoice);
        if (audioUrl) {
          form.setValue("audio", audioUrl);
        }
      })();
    }
  }, [activeVoice, form]);

  async function handleBlurName(value: string) {
    if (!value) return;
    const audioUrl = await generateAudio(value, activeVoice);
    if (audioUrl) {
      form.setValue("audio", audioUrl);
      console.log("onBlur ✅");
    }
  }

  async function onSubmit(values: SuggestFormValues) {
    try {
      let finalAudioUrl = values.audio;

      if (!finalAudioUrl && values.name) {
        const audioUrl = await generateAudio(values.name, activeVoice);
        if (audioUrl) {
          finalAudioUrl = audioUrl;
          form.setValue("audio", audioUrl);
          console.log("onSubmit ✅");
        }
      }

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("definition", values.definition || "");
      formData.append("technicalDefinition", values.technicalDefinition);
      formData.append("author", values.author || "");
      formData.append("audio", finalAudioUrl || "");

      if (files?.length) {
        formData.append("illustration", files[0]);
      }

      const response = await fetch("/api/suggest", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Term submitted successfully!");
        form.reset();
        setFiles([]);
      } else {
        toast.error("Submission failed: " + result.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred while submitting");
    }
  }

  const handlePlayVoice = async (value: "shimmer" | "dan") => {
    if (typeof window === "undefined") return;

    const voice = options.find((vc) => vc.value === value)?.audio;
    if (!voice) return;

    try {
      // stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }

      const audio = new Audio(voice);
      audioRef.current = audio;

      audio.onended = () => (audioRef.current = null);

      await audio.play();
    } catch (error) {
      console.error(error);
      audioRef.current = null;
    }
  };

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
            <div className="grid grid-cols-1 gap-1">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-normal sm:text-base">
                  Pick a voice for pronunciation
                </p>

                <div
                  role="button"
                  onClick={() =>
                    handlePlayVoice(activeVoice as "shimmer" | "dan")
                  }
                  className="text-primary cursor-pointer text-sm font-medium"
                >
                  <span>Play Sound</span>
                </div>
              </div>
              <Choicebox
                defaultValue="shimmer"
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                {options.map((option) => (
                  <ChoiceboxItem
                    key={option.value}
                    value={option.value}
                    onClick={() =>
                      setActiveVoice(option.value as "shimmer" | "dan")
                    }
                  >
                    <ChoiceboxItemHeader>
                      <ChoiceboxItemTitle className="capitalize">
                        {option.value}
                      </ChoiceboxItemTitle>
                      <ChoiceboxItemDescription>
                        {option.subtitle}
                      </ChoiceboxItemDescription>
                    </ChoiceboxItemHeader>
                    <ChoiceboxItemContent>
                      <ChoiceboxItemIndicator />
                    </ChoiceboxItemContent>
                  </ChoiceboxItem>
                ))}
              </Choicebox>
            </div>
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
                              className="flex !h-max items-center !gap-0 border-0 !p-4 outline-none sm:!p-6"
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
            className="ml-auto w-[186px]"
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
