"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";

import { cn } from "@/lib/utils";
import { TermDataProps } from "./provider";
import { Button } from "@/components/ui/button";

interface Props {
  term: TermDataProps;
  activeToggle: string | null;
  setActiveToggle: React.Dispatch<React.SetStateAction<string | null>>;
  speakingId: string | null;
  setSpeakingId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const TermItemComp: React.FC<Props> = ({
  term,
  activeToggle,
  setActiveToggle,
  speakingId,
  setSpeakingId,
}) => {
  const isOpen = activeToggle === term.name;

  const handlePlaySound = async () => {
    if (typeof window === "undefined") return;

    const audioSrc = term.audio;
    if (!audioSrc) return;

    try {
      const audio = new Audio(audioSrc);
      setSpeakingId(term._id);

      audio.onended = () => setSpeakingId(null);
      audio.onerror = () => setSpeakingId(null);

      await audio.play();
    } catch (error) {
      console.error("Audio playback failed:", error);
      setSpeakingId(null);
    }
  };

  return (
    <li
      key={term.name}
      className="flex justify-between gap-6 border-b py-8 first-of-type:border-t last-of-type:border-b-0"
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-row items-start gap-6 md:gap-8 lg:gap-16">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-center gap-4">
              <p
                className={cn("text-lg font-medium md:text-xl lg:text-2xl", {
                  "animate-pulse": speakingId === term._id,
                })}
              >
                {term.name}
              </p>
              <Button
                size="icon"
                onClick={handlePlaySound}
                disabled={!!speakingId || !term.audio}
                variant={speakingId === term._id ? "outline" : "outline2"}
              >
                {term.audio ? (
                  <HiOutlineSpeakerWave className="size-5" />
                ) : (
                  <HiOutlineSpeakerXMark className="size-5" />
                )}
              </Button>
            </div>

            <p className="text-base font-normal md:text-lg lg:text-xl">
              {term.definition ?? term.technicalDefinition}
            </p>

            {!isOpen && (
              <p
                role="button"
                onClick={() =>
                  term.name && setActiveToggle(isOpen ? null : term.name)
                }
                className="text-primary w-max cursor-pointer text-base font-medium italic"
              >
                See technical definition
              </p>
            )}
          </div>

          {/* IMAGE with bounce effect */}
          <motion.div
            animate={{
              scale: isOpen ? 1.2 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
            className="ml-auto size-[92px] origin-top-right md:size-40"
          >
            <Image
              src={term.illustration ?? "/svg/logo.svg"}
              alt={term.name ?? "Term Illustration"}
              width={190}
              height={190}
              priority
              quality={100}
              className="size-full object-contain"
            />
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {term.definition && isOpen && (
            <motion.div
              key="definition"
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                },
              }}
              transition={{
                ease: "easeOut",
              }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col gap-4 overflow-hidden md:gap-6"
            >
              <div className="flex flex-col gap-2 md:gap-4">
                <p className="text-base font-medium italic md:text-lg lg:text-xl">
                  Technical Definition
                </p>

                <div className="text-base font-normal md:text-lg lg:text-xl">
                  {term.technicalDefinition}
                </div>
              </div>

              <p
                role="button"
                onClick={() => setActiveToggle(null)}
                className="text-primary w-max cursor-pointer text-base font-medium italic"
              >
                See less
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
};
