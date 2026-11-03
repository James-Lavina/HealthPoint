import React from 'react';
import { HeartPulseIcon } from 'lucide-react';

interface LogoProps {
  size?: 'md' | 'sm';
}

export function Logo({ size = 'md' }: LogoProps) {
  const box = size === 'md' ? 'h-12 w-12 rounded-xl' : 'h-10 w-10 rounded-lg';
  const icon = size === 'md' ? 'h-7 w-7' : 'h-6 w-6';
  const text = size === 'md' ? 'text-[26px]' : 'text-[22px]';
  return (
    <div className="flex items-center gap-3">
      <span className={`flex items-center justify-center bg-brand text-white ${box}`}>
        <HeartPulseIcon className={icon} aria-hidden="true" />
      </span>
      <span className={`font-bold tracking-tight text-ink ${text}`}>
        Health<span className="text-brand">Point</span>
      </span>
    </div>);

}