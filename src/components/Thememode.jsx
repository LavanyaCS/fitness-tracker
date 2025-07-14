import React,{useEffect,useState} from 'react'

function Thememode() {

    const [isDark,setIsDark]=useState(false);
    useEffect(()=>{
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme === 'dark'){
            document.documentElement.classList.add('dark');
            setIsDark(true);
        }
    },[]);
    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle('dark',newTheme);
        localStorage.setItem('theme',newTheme ? 'dark' : 'light');
    }
  return (
    <div>
     <button
      onClick={toggleTheme}
      className="fixed z-50 px-4 py-2 text-sm text-black bg-gray-200 rounded-lg bottom-4 left-4 dark:bg-gray-800 dark:text-white"
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button></div>
  ); 
}

export default Thememode
