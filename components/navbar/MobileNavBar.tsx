// MobileNavbar.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavItem from "./NavItem";
import BottomNavItem from "./BottomNavItem";
import { menuItems } from "./menuItems";

const MobileNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
    closed: {
      x: "-100%",
      transition: { delay: 0.15, type: "spring", stiffness: 260, damping: 30 },
    },
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-20 p-4 lg:hidden">
        <button
          onClick={toggleSidebar}
          className="p-2 text-foreground bg-primary rounded-md material-icons"
        >
          menu
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="mobile-sidebar"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed h-full left-0 top-0 z-30 bg-card shadow-lg p-4 lg:hidden"
          >
            <div className="flex flex-col justify-between h-full gap-4">
              <div className="flex justify-between items-center">
                <button
                  onClick={toggleSidebar}
                  className="p-2 text-foreground bg-primary rounded-md material-icons"
                >
                  close
                </button>
              </div>
              {menuItems.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  selected={selected === item.id}
                  setSelected={setSelected}
                  isOpen={isOpen}
                />
              ))}
              <div className="mt-auto flex flex-col w-min gap-4">
                <BottomNavItem
                  item={{
                    name: "Settings",
                    href: "#settings",
                    icon: "settings",
                    id: 5,
                  }}
                  selected={selected === 5}
                  setSelected={setSelected}
                  isOpen={isOpen}
                />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;
