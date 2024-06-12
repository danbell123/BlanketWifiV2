"use client";

import { motion } from "framer-motion";

interface NavItemProps {
  item: {
    name: string;
    href: string;
    icon: string;
    id: number;
  };
  selected: boolean;
  setSelected: (id: number) => void;
  isOpen: boolean;
}

const BottomNavItem: React.FC<NavItemProps> = ({
  item,
  selected,
  setSelected,
  isOpen,
}) => {
  return (
    <motion.button
      className={`p-2 text-foreground hover:bg-background transition-all rounded-md material-icons w-10 h-10`}
      onClick={() => setSelected(item.id)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <span className="material-icons">{item.icon}</span>
    </motion.button>
  );
};

export default BottomNavItem;
