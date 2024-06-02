// Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavItem from './NavItem';
import BottomNavItem from './BottomNavItem';
import { menuItems } from './menuItems';
import MobileNavbar from './MobileNavBar';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [selected, setSelected] = useState<number | null>(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

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
                    animate={isOpen ? "open" : "closed"}
                    variants={sidebarVariants}
                    className="hidden lg:flex lg:flex-col lg:fixed lg:h-full lg:left-0 lg:z-10 lg:bg-card lg:shadow-lg lg:p-4"
                >
                    <div className="flex flex-col justify-between h-full gap-4">
                        {menuItems.map((item) => (
                            <NavItem key={item.id} item={item} selected={selected === item.id} setSelected={setSelected} isOpen={isOpen} />
                        ))}
                        <div className="mt-auto flex flex-col w-min gap-4">
                            <BottomNavItem item={{ name: 'Settings', href: '#settings', icon: 'settings', id: 5 }} selected={selected === 5} setSelected={setSelected} isOpen={isOpen} />
                            <button onClick={toggleSidebar} className="p-2 text-foreground hover:bg-background transition-all rounded-md material-icons relative">
                                <motion.span
                                    className="material-icons"
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    key={isOpen ? 'arrow_left' : 'arrow_right'}
                                >
                                    {isOpen ? 'arrow_left' : 'arrow_right'}
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
