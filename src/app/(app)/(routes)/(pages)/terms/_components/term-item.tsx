"use client";

import React from "react";
import Image from "next/image";
import { PiSpeakerHighDuotone } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { PortableText } from "next-sanity";
import { urlFor } from "@/lib/image";

interface Props {
  term: TermInstance;
  activeToggle: string | null;
  setActiveToggle: React.Dispatch<React.SetStateAction<string | null>>;
}

export const TermItem: React.FC<Props> = ({
  term,
  activeToggle,
  setActiveToggle,
}) => {
  const [isSpeaking, setIsSpeaking] = React.useState<string | null>(null);
  const isOpen = activeToggle === term.name;

  const illustrationUrl = term.illustration
    ? urlFor(term.illustration)?.url()
    : null;

  const handlePlaySound = (text: string) => {
    if (typeof window === "undefined") return;
    setIsSpeaking(text);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(null);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <li
      key={term.name}
      className="border-b first-of-type:border-t py-8 flex justify-between gap-3.5"
    >
      <div className="flex flex-col max-w-[500px] flex-1 gap-6">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex items-center gap-4">
            <p className="text-lg md:text-xl lg:text-2xl font-medium">
              {term.name}
            </p>
            <Button
              size="icon"
              onClick={() => handlePlaySound(term.name)}
              disabled={isSpeaking === term.name}
              variant={isSpeaking === term.name ? "default" : "outline2"}
              className="size-9 lg:size-11"
            >
              <PiSpeakerHighDuotone className="size-5 lg:size-6" />
            </Button>
          </div>

          <div className="text-base md:text-lg lg:text-xl font-normal tracking-[-2%]">
            <PortableText value={term.definition} />
          </div>

          {!isOpen && (
            <p
              role="button"
              onClick={() => setActiveToggle(isOpen ? null : term.name)}
              className="text-primary italic text-base font-medium cursor-pointer w-max"
            >
              See technical definition
            </p>
          )}
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
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
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden flex flex-col gap-4 md:gap-6"
            >
              <div className="flex flex-col gap-2 md:gap-4">
                <p className="text-base md:text-lg lg:text-xl font-medium tracking-[-2%] italic">
                  Technical Definition
                </p>

                <div className="text-base md:text-lg lg:text-xl font-normal tracking-[-2%]">
                  <PortableText value={term.technicalDefinition} />
                </div>
              </div>

              <p
                role="button"
                onClick={() => setActiveToggle(null)}
                className="text-primary italic text-base font-medium cursor-pointer w-max"
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
        className="size-[92px] md:size-[160px] origin-top-right"
      >
        <Image
          src={illustrationUrl ?? "/404.svg"}
          alt={term.name}
          width={190}
          height={190}
          priority
          quality={100}
          className="object-contain size-full"
        />
      </motion.div>
    </li>
  );
};
