'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface SlidingTabsProps {
  categories: string[]
  categoryLabels: Record<string, string>
  allProjectsCount: number
  categoryCounts: Record<string, number>
}

export function SlidingTabs({ categories, categoryLabels, allProjectsCount, categoryCounts }: SlidingTabsProps) {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || ''
  
  const [coords, setCoords] = useState({ left: 0, width: 0, opacity: 0 })
  const tabsRef = useRef<Record<string, HTMLAnchorElement | null>>({})
  
  useEffect(() => {
    const activeTab = tabsRef.current[activeCategory]
    if (activeTab) {
      setCoords({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
        opacity: 1
      })
    } else {
      const fallbackTab = tabsRef.current['']
      if (fallbackTab && !activeCategory) {
        setCoords({
          left: fallbackTab.offsetLeft,
          width: fallbackTab.offsetWidth,
          opacity: 1
        })
      }
    }
  }, [activeCategory])

  return (
    <div className="w-full max-w-4xl mx-auto px-2">
      {/* 1. Mobile view: CLI/Bootloader style menu */}
      <div className="md:hidden space-y-3 font-mono border border-dashed border-rootly-border rounded-xl p-5 bg-rootly-background/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-12 h-12 bg-rootly-primary/5 rounded-bl-full pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-2 text-rootly-muted text-[9px] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>SELECT REGISTRY MODE //</span>
        </div>
        
        <div className="space-y-2">
          {/* All Projects Option */}
          <Link
            href="/portfolio"
            className={`flex items-center justify-between text-xs py-1.5 border-b border-dashed border-rootly-border/50 transition-colors ${
              !activeCategory ? 'text-rootly-primary font-bold' : 'text-rootly-muted hover:text-rootly-text'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-4 text-center">{!activeCategory ? '>' : ' '}</span>
              <span className={!activeCategory ? 'text-rootly-primary' : 'text-gray-400'}>{"[01]"}</span>
              <span>ALL PROJECTS</span>
            </div>
            <span>{`// ${allProjectsCount}`}</span>
          </Link>

          {/* Categories Options */}
          {categories.map((cat, idx) => {
            const count = categoryCounts[cat] || 0
            const isActive = activeCategory === cat
            return (
              <Link
                key={cat}
                href={`/portfolio?category=${cat}`}
                className={`flex items-center justify-between text-xs py-1.5 border-b border-dashed border-rootly-border/50 last:border-0 transition-colors ${
                  isActive ? 'text-rootly-primary font-bold' : 'text-rootly-muted hover:text-rootly-text'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-4 text-center">{isActive ? '>' : ' '}</span>
                  <span className={isActive ? 'text-rootly-primary' : 'text-gray-400'}>{`[0${idx + 2}]`}</span>
                  <span>{categoryLabels[cat].toUpperCase()}</span>
                </div>
                <span>{`// ${count}`}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* 2. Desktop View: Smooth Horizontal Sliding Tabs */}
      <div className="hidden md:flex justify-center w-full">
        <div className="relative inline-flex items-center p-1 bg-rootly-background rounded-xl border border-rootly-border gap-1 shadow-sm max-w-full font-mono text-xs">
          {/* Sliding Active Highlight */}
          <div 
            className="absolute top-1 bottom-1 bg-rootly-surface border border-rootly-border rounded-lg transition-all duration-300 ease-out pointer-events-none shadow-xs"
            style={{
              left: `${coords.left}px`,
              width: `${coords.width}px`,
              opacity: coords.opacity,
            }}
          />

          {/* All Tab */}
          <Link
            ref={(el) => { tabsRef.current[''] = el }}
            href="/portfolio"
            className={`relative z-10 flex items-center gap-1 px-3 py-2 rounded-lg uppercase tracking-wider transition-colors duration-300 ${
              !activeCategory ? 'text-rootly-text font-bold' : 'text-rootly-muted hover:text-rootly-text'
            }`}
          >
            <span className={!activeCategory ? 'text-rootly-primary mr-1' : 'text-transparent mr-1'}>[</span>
            <span>All</span>
            <span className={`text-[10px] ${!activeCategory ? 'text-rootly-primary' : 'text-rootly-muted/70'}`}>
              {` // ${allProjectsCount}`}
            </span>
            <span className={!activeCategory ? 'text-rootly-primary ml-1' : 'text-transparent ml-1'}>]</span>
          </Link>

          {/* Category Tabs */}
          {categories.map((cat) => {
            const count = categoryCounts[cat] || 0
            const isActive = activeCategory === cat
            return (
              <Link
                key={cat}
                ref={(el) => { tabsRef.current[cat] = el }}
                href={`/portfolio?category=${cat}`}
                className={`relative z-10 flex items-center gap-1 px-3 py-2 rounded-lg uppercase tracking-wider transition-colors duration-300 ${
                  isActive ? 'text-rootly-text font-bold' : 'text-rootly-muted hover:text-rootly-text'
                }`}
              >
                <span className={isActive ? 'text-rootly-primary mr-1' : 'text-transparent mr-1'}>[</span>
                <span>{categoryLabels[cat]}</span>
                <span className={`text-[10px] ${isActive ? 'text-rootly-primary' : 'text-rootly-muted/70'}`}>
                  {` // ${count}`}
                </span>
                <span className={isActive ? 'text-rootly-primary ml-1' : 'text-transparent ml-1'}>]</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
