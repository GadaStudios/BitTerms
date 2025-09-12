"use client";

import React from "react";
import Image from "next/image";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";

import { motion, AnimatePresence } from "framer-motion";

import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";

interface Props {
  term: {
    _id: string;
    name: string | null;
    definition: string | null;
    technicalDefinition: string | null;
    illustration: {
      _key: null;
      asset: {
        _id: string;
        url: string | null;
      } | null;
    } | null;
    author: string | null;
    audio: string | null;
  };
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

  const illustrationUrl = term.illustration
    ? urlFor(term.illustration)?.url()
    : null;

  const handlePlaySound = async () => {
    if (typeof window === "undefined") return;
    if (!term.audio) return;

    try {
      setSpeakingId(term._id); // mark as speaking
      const audio = new Audio(term.audio);
      audio.onended = () => setSpeakingId(null);
      await audio.play();
    } catch (error) {
      console.error(error);
      setSpeakingId(null);
    }
  };

  return (
    <li
      key={term.name}
      className="flex justify-between gap-6 border-b py-8 first-of-type:border-t last-of-type:border-b-0"
    >
      <div className="flex max-w-[500px] flex-1 flex-col gap-6">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex items-center gap-4">
            <p className="text-lg font-medium md:text-xl lg:text-2xl">
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

          <div className="text-base font-normal tracking-[-2%] md:text-lg lg:text-xl">
            {term.definition ?? term.technicalDefinition}
          </div>

          {!isOpen && (
            <p
              role="button"
              onClick={() => setActiveToggle(isOpen ? null : term.name)}
              className="text-primary w-max cursor-pointer text-base font-medium italic"
            >
              See technical definition
            </p>
          )}
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
                <p className="text-base font-medium tracking-[-2%] italic md:text-lg lg:text-xl">
                  Technical Definition
                </p>

                <div className="text-base font-normal tracking-[-2%] md:text-lg lg:text-xl">
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
        className="size-[92px] origin-top-right md:size-[160px]"
      >
        <Image
          src={illustrationUrl ?? "/placeholder.svg"}
          alt={term.name ?? "Term Illustration"}
          width={190}
          height={190}
          priority
          quality={100}
          className="size-full object-contain"
        />
      </motion.div>
    </li>
  );
};
