import { useEffect, useState } from "react";

export default function useDarkMode() {

  const [isDark, setIsDark] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if(stored === 'dark' || !stored && prefersDark) {
        document.documentElement.classList.add('dark');
        setIsDark(true);
    } else {
        document.documentElement.classList.remove('dark');
        setIsDark(false);
    }

    setIsReady(true);
  },[]);

  const toggleDark = () => {
    const html = document.documentElement;

    if(html.classList.contains('dark')){
        html.classList.remove('dark');
        localStorage.setItem('theme','light');
        setIsDark(false);
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme','dark');
        setIsDark(true);
    }
  }

  return { isDark, toggleDark, isReady};
}