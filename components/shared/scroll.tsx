"use client";

import React from "react";
import { TiArrowSortedUp } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";

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
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 15,
            },
          }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-3 md:bottom-4 lg:bottom-6 right-3 md:right-4 lg:right-6 z-50"
        >
          <Button
            size="icon"
            onClick={backToTop}
            className="!size-12 md:!size-14 lg:!size-16"
          >
            <TiArrowSortedUp className="size-5 md:size-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
