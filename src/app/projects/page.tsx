'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SiteHeader } from '@/components/navigation/SiteHeader';
import { SiteFooter } from '@/components/navigation/SiteFooter';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ArchitectureModal } from '@/components/projects/ArchitectureModal';
import { TiltCard } from '@/components/ui/TiltCard';
import { useProjects } from '@/lib/hooks';
import { ProjectItem } from '@/data/seedProjects';

const CATEGORIES = ['All Projects', 'Distributed Systems', 'Lakehouse & BI', 'AI & Machine Learning', 'Cloud Native'];

export default function ProjectsPage() {
  const { projects, loaded } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBlueprint, setActiveBlueprint] = useState<ProjectItem | null>(null);

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All Projects' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-transparent font-body-md text-on-surface antialiased min-h-screen flex flex-col relative overflow-hidden">
      <SiteHeader />

      <main className="w-full pt-28 pb-24 flex-1 relative z-10">
        <div className="max-w-[1280px] mx-auto px-gutter flex flex-col gap-10">
          
          {/* Header Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-space-xs px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/[0.06] border border-secondary/40 shadow-[0_0_24px_rgba(123,208,255,0.3)] mb-4 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#7bd0ff]"></span>
              <span className="font-label-sm text-xs uppercase tracking-wider text-secondary font-bold">
                Production Case Studies &bull; Verified Client Delivery
              </span>
            </div>

            <h1 className="font-nexa text-3xl sm:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
              Enterprise Engineering &amp; Data Projects
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant mt-4 leading-relaxed">
              Showcase of production-tested systems featuring verified company logos, architecture blueprints, and real-time telemetry metrics built over 6 years of technical leadership.
            </p>
          </motion.div>

          {/* Search & Category Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-surface-container-low/40 backdrop-blur-2xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
          >
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-label-md text-xs transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary-container text-on-primary font-semibold shadow-[0_0_12px_rgba(160,120,255,0.4)]'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                search
              </span>
              <input
                type="text"
                placeholder="Search client, title, stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
              />
            </div>
          </motion.div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <TiltCard key={project.id} maxTilt={6} depth={12} glare={true} className="h-full">
                  <ProjectCard
                    project={project}
                    onSelectBlueprint={(p) => setActiveBlueprint(p)}
                  />
                </TiltCard>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-16 rounded-2xl bg-surface-container-low/50 border border-outline-variant/20 text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">
                folder_off
              </span>
              <p className="font-headline-sm text-base text-on-surface font-semibold">
                No matching projects found
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                Try clearing your search query or choosing another category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All Projects');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-surface-container-high text-xs font-semibold text-primary hover:bg-surface-container-highest"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Architecture Blueprint Modal */}
      <ArchitectureModal
        project={activeBlueprint}
        isOpen={!!activeBlueprint}
        onClose={() => setActiveBlueprint(null)}
      />

      <SiteFooter />
    </div>
  );
}

