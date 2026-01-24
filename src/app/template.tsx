"use client";
import { motion } from "framer-motion";

const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
};

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            //className="site-wrapper"
            variants={variants}
            initial="hidden"
            animate="enter"
            transition={{
                ease: "linear",
                duration: 2,
            }}
        >
            {children}
        </motion.div>
    );
}
