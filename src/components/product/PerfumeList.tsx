import { Perfume } from "@/lib/types";
import { PerfumeCard } from "./PerfumeCard";
import { motion } from "framer-motion";

interface PerfumeListProps {
  perfumes: Perfume[];
}

export function PerfumeList({ perfumes }: PerfumeListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div>
      {perfumes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-elysian-white-soft">
            No perfumes found matching your criteria within this collection.
          </p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {perfumes.map((perfume) => (
            <motion.div key={perfume.id} variants={item}>
              <PerfumeCard perfume={perfume} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
