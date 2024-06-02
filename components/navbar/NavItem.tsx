'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

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

const NavItem: React.FC<NavItemProps> = ({ item, selected, setSelected, isOpen }) => {
    const [isHovered, setIsHovered] = useState(false);

    const textVariants = {
        open: { 
            x: 0,
            opacity: 1,
            display: 'inline',
            transition: { duration: 0.15 }
        },
        closed: { 
            x: -20,
            opacity: 0,
            transitionEnd: { display: 'none' },
            transition: { duration: 0.15 }
        }
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <motion.button
            className="p-2 bg-background rounded-md transition-all flex items-center justify-start relative overflow-hidden"
            style={{
                width: isOpen ? '100%' : '40px',
                height: isOpen ? 'auto' : '40px',
                backgroundColor: isHovered ? 'hsl(var(--secondary))' : 'transparent',  // Adjust the background color on hover
            }}
            onClick={() => setSelected(item.id)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.95 }}
        >
            <span className="material-icons z-10">{item.icon}</span>
            <motion.span
                className="flex-1 text-base text-foreground ml-2 text-left whitespace-nowrap z-10"
                variants={textVariants}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
            >
                {item.name}
            </motion.span>
        </motion.button>
    );
};

export default NavItem;
