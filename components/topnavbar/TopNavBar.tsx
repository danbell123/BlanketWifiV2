import React, { useState } from 'react';
import SearchBar from '../SearchBar';
import ProfileDropdown from './profileDropdown';

const TopNav = () => {

    return (
        <div className="bg-background p-4 flex justify-between relative">
            <div className="w-1/3">
                <SearchBar />
            </div>
            <ProfileDropdown />
        </div>
    );
};

export default TopNav;
