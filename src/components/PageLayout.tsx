import React, { type ReactNode } from 'react';

interface PageLayoutProps {
  title: string;
  subtitle?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  footerLeft?: ReactNode;
  footerRight?: ReactNode;
}

export function PageLayout({ title, subtitle, aside, children, footerLeft, footerRight }: PageLayoutProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1760px] px-8 py-10 lg:px-16 lg:py-12">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-title font-bold text-ink lg:text-display">{title}</h1>
              {subtitle && <p className="mt-3 max-w-3xl text-body-lg text-ink-muted">{subtitle}</p>}
            </div>
            {aside}
          </div>
          {children}
        </div>
      </div>
      {(footerLeft || footerRight) &&
      <footer className="shrink-0 border-t border-line bg-white">
          <div className="mx-auto flex w-full max-w-[1760px] items-center justify-between gap-6 px-8 py-5 lg:px-16">
            <div className="flex items-center gap-4">{footerLeft}</div>
            <div className="flex items-center gap-4">{footerRight}</div>
          </div>
        </footer>
      }
    </div>);

}