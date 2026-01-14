"use client";

import React from "react";
import { IoArrowUpOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";

import { Button } from "@/components/ui/button";

export const ScrollToTop = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0.5, y: 100, scale: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 15,
            },
          }}
          exit={{ opacity: 0.5, y: 100, scale: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed right-3 bottom-3 z-50 md:right-4 md:bottom-4 lg:right-6 lg:bottom-6"
        >
          <Button
            size="icon"
            onClick={backToTop}
            className="size-12! md:size-14!"
          >
            <IoArrowUpOutline className="size-5 md:size-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
