"use client"

import React, { createContext, useState, useEffect } from 'react';

interface DarkModeContextProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextProps>({
    darkMode: false,
    toggleDarkMode: () => {}
});

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};