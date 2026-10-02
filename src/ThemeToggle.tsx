import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
type Theme = 'light' | 'dark';
function apply(theme: Theme) {
 document.documentElement.dataset.theme = theme;
 document.documentElement.style.colorScheme = theme;
 document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f7f8f3' : '#101110');
}
export function ThemeToggle() {
 const [theme, setTheme] = useState<Theme>(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
 useEffect(() => {
  const sync = () => {
   let saved: string | null = null;
   try { saved = localStorage.getItem('hatim-theme'); } catch { return; }
   const next = saved === 'light' || saved === 'dark' ? saved : 'dark';
   apply(next); setTheme(next);
  };
  window.addEventListener('storage', sync);
  return () => { window.removeEventListener('storage', sync); };
 }, []);
 const toggle = () => {
  const next = theme === 'dark' ? 'light' : 'dark';
  apply(next); setTheme(next);
  try { localStorage.setItem('hatim-theme', next); } catch { /* Theme still works when storage is unavailable. */ }
 };
 return <button type="button" className="theme-toggle" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun size={18} aria-hidden="true"/> : <Moon size={18} aria-hidden="true"/>}</button>;
}
