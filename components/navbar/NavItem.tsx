"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Updated to usePathname

interface NavItemProps {
  item: {
    name: string;
    href: string;
    icon: string;
    id: number;
    bottom?: boolean;
  };
  selected: boolean;
  setSelected: (id: number) => void;
  isOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  item,
  selected,
  setSelected,
  isOpen,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname(); // Updated to usePathname

  const textVariants = {
    open: {
      x: 0,
      opacity: 1,
      display: "inline",
      transition: { duration: 0.15 },
    },
    closed: {
      x: -20,
      opacity: 0,
      transitionEnd: { display: "none" },
      transition: { duration: 0.15 },
    },
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const isActive = pathname === item.href;

  return (
    <Link href={item.href} legacyBehavior>
      <motion.button
        className={`p-2 rounded-md transition-all flex items-center justify-start relative overflow-hidden ${isActive ? "bg-primary text-secondary-foreground" : "bg-transparent text-foreground"}`}
        style={{
          width: isOpen ? "100%" : "40px",
          height: isOpen ? "auto" : "40px",
          backgroundColor:
            isHovered && !isActive ? "hsl(var(--secondary))" : "",
        }}
        onClick={() => setSelected(item.id)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.95 }}
      >
        <span className="material-icons z-10">{item.icon}</span>
        <motion.span
          className="flex-1 text-base ml-2 text-left whitespace-nowrap z-10"
          variants={textVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        >
          {item.name}
        </motion.span>
      </motion.button>
    </Link>
  );
};

export default NavItem;
