"use client";
import { motion, useReducedMotion } from "framer-motion";

const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
};

export default function Template({ children }: { children: React.ReactNode }) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            //className="site-wrapper"
            variants={variants}
            initial="hidden"
            animate="enter"
            transition={{
                ease: "linear",
                duration: reduceMotion ? 0 : 0.2,
            }}
        >
            {children}
        </motion.div>
    );
}
