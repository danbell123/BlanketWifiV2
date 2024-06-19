import { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';

export default function AppearanceSettings() {
    const [theme, setTheme] = useState(document.body.className);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
    };

    return (
        <RadioGroup className="flex flex-row p-8 w-full gap-4">
            <div
                className={`flex flex-col w-full justify-between bg-white rounded shadow-lg cursor-pointer`}
                onClick={() => handleThemeChange('light')}
            >
                <div className="flex flex-row gap-2 p-4">
                    <RadioGroupItem value="dark" checked={theme === 'light'}/>
                    <h2 className="text-lg font-semibold text-left w-full text-black/80">
                        Light
                </h2>
                </div>
                <div className="flex flex-col items-end">
                    <Image src="/icons/LightModeIcon.png" alt="Light Mode Icon" width={160} height={160} />
                </div>
            </div>
            <div
                className={`flex flex-col w-full justify-between bg-black rounded shadow-lg cursor-pointer`}
                onClick={() => handleThemeChange('dark')}
            >
                <div className="flex flex-row gap-2 p-4">
                    <RadioGroupItem value="dark" checked={theme === 'dark'}/>
                    <h2 className="text-lg font-semibold text-left w-full text-white">
                        Dark
                </h2>
                </div>
                <div className="flex flex-col items-end">
                    <Image src="/icons/DarkModeIcon.png" alt="Dark Mode Icon" width={160} height={160} />
                </div>
            </div>
        </RadioGroup>
    );
}
