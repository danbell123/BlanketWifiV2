// Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavItem from './NavItem';
import BottomNavItem from './BottomNavItem';
import { menuItems } from './menuItems';
import MobileNavbar from './MobileNavBar';

interface NavbarProps {
    isExpanded: boolean;  // Add this prop for expanded state control
    onToggle: () => void; // Add this prop to handle toggle from parent component
}

const Navbar: React.FC<NavbarProps> = ({ isExpanded, onToggle }) => {
    const [selected, setSelected] = useState<number | null>(null);

    const sidebarVariants = {
        open: { 
            width: "250px",
            transition: { type: 'spring', stiffness: 260, damping: 20 }
        },
        closed: {
            width: "72px",  
            transition: { delay: 0.15, type: 'spring', stiffness: 260, damping: 30 }
        }
    };

    return (
        <>
            <MobileNavbar />
            <AnimatePresence>
                <motion.aside
                    key="sidebar"
                    animate={isExpanded ? "open" : "closed"}  // Use isExpanded prop here
                    variants={sidebarVariants}
                    className="hidden lg:flex lg:flex-col lg:fixed lg:h-full lg:left-0 lg:z-10 lg:bg-card lg:shadow-lg lg:p-4"
                >
                    <div className="flex flex-col justify-between h-full gap-4">
                        {menuItems.map((item) => (
                            <NavItem key={item.id} item={item} selected={selected === item.id} setSelected={setSelected} isOpen={isExpanded} />
                        ))}
                        <div className="mt-auto flex flex-col w-min gap-4">
                            <BottomNavItem item={{ name: 'Settings', href: '#settings', icon: 'settings', id: 5 }} selected={selected === 5} setSelected={setSelected} isOpen={isExpanded} />
                            <button onClick={onToggle} className="p-2 text-foreground hover:bg-background transition-all rounded-md material-icons relative">  {/* Use onToggle prop here */}
                                <motion.span
                                    className="material-icons"
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    key={isExpanded ? 'arrow_left' : 'arrow_right'}
                                >
                                    {isExpanded ? 'arrow_left' : 'arrow_right'}
                                </motion.span>
                            </button>
                        </div>
                    </div>
                </motion.aside>
            </AnimatePresence>
        </>
    );
};

export default Navbar;
