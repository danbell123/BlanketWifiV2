"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client"; // Ensure correct path to your Supabase client

const ProfileDropdown = () => {
  const supabase = createClient(); // Initialize Supabase client

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error.message);
    } else {
      console.log("Successfully logged out");
      // Instead of using router.push, we use window.location to force a full page reload to the login page
      window.location.href = "/login";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.1 }}
        className="absolute right-0"
      >
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleLogout}><span className="material-icons pr-2" style={{fontSize: "18px"}}>settings</span>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}><span className="material-icons pr-2" style={{fontSize: "18px"}}>person</span>Account</DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}><span className="material-icons pr-2" style={{fontSize: "18px"}}>data_usage</span>Usage</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}><span className="material-icons pr-2" style={{fontSize: "18px"}}>logout</span>Log Out</DropdownMenuItem>
        </DropdownMenuContent>
      </motion.div>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
