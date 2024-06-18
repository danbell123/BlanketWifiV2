"use client";

import { motion } from "framer-motion";
import { ReactElement, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Updated to usePathname

interface SettingsNavItemProps {
  item: {
    name: string;
    id: number;
  };
  selected: boolean;
  setSelected: (id: number) => void;
}

const NavItem: React.FC<SettingsNavItemProps> = ({
  item,
  selected,
  setSelected,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
      <motion.button
        className={`pl-1 rounded-md transition-all flex w-full items-center justify-start relative overflow-hidden ${selected ? "bg-primary/15 text-primary/90" : "bg-transparent text-card-foreground"}`}
        style={{
          backgroundColor:
            isHovered && !selected ? "hsl(var(--secondary))" : "",
        }}
        onClick={() => setSelected(item.id)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="flex-1 text-base m-1 text-left whitespace-nowrap z-10"
        >
          {item.name}
        </motion.span>
      </motion.button>
  );
};

export default NavItem;
