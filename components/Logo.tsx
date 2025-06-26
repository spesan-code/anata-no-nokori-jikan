import React from 'react';

const Logo: React.FC<{ className?: string; textClassName?: string }> = ({ className = 'w-8 h-8', textClassName = 'ml-2 text-xl font-bold tracking-tight text-black dark:text-white' }) => (
  <div className="flex items-center select-none">
    {/* 時計アイコン（丸時計、3時を指す） */}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className={className} aria-label="ロゴ:時計">
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" fill="white" />
      <line x1="16" y1="16" x2="16" y2="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="16" x2="24" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
    <span className={textClassName}>あなたの残り時間</span>
  </div>
);

export default Logo; 