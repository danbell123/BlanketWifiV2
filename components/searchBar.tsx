'use client';

//TODO: BUG: Focus state not working correctly. Need to fix this.

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";

const SearchBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCommandList = () => {
        setIsOpen(!isOpen);
    };

    // Animation variants for the command list that scale only in the y direction
    const variants = {
        hidden: { scaleY: 0, opacity: 0 },
        visible: { scaleY: 1, opacity: 1 }
    };

    return (
        <div className={`bg-background ${isOpen ? 'w-full' : 'w-2/3'} flex justify-between items-center relative transition-all`}>
            <Command>
                <CommandInput placeholder="Type a command or search..." onClick={toggleCommandList} />
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={variants}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ originY: 0, position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10 }}
                            className='bg-card border border-foreground/10 rounded-md shadow-md overflow-hidden mt-2'
                        >
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Actions">
                                    <CommandItem><span className='material-icons pr-2'>add</span>New Segment</CommandItem>
                                    <CommandItem><span className='material-icons pr-2'>send</span>Send Pulse</CommandItem>
                                    <CommandItem><span className='material-icons pr-2'>router</span>Edit Portal</CommandItem>
                                </CommandGroup>
                                <CommandSeparator />
                                <CommandSeparator />
                                <CommandGroup heading="Settings">
                                    <CommandItem>Profile</CommandItem>
                                    <CommandItem>Billing</CommandItem>
                                    <CommandItem>Settings</CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Command>
        </div>
    );
};

export default SearchBar;
