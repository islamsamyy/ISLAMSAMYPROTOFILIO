import React from 'react';
import type { Metadata } from 'next';
import { initialProjects } from '@/data/seedProjects';
import { ProjectDetailClient } from './ProjectDetailClient';
import { supabase } from '@/lib/supabase/client';
import { mapProjectRowToItem } from '@/lib/data-store';
import { cleanProjectText } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = initialProjects.find((p) => p.id === id);
  if (!project) {
    return {
      title: 'Project Case Study',
      description: 'Enterprise engineering case study by Islam Samy.',
    };
  }
  const description = cleanProjectText(project.summary).slice(0, 160);
  const cover = project.galleryImages?.find((u) => !u.endsWith('.svg')) || project.galleryImages?.[0];
  return {
    title: `${project.title} — ${project.category}`,
    description,
    keywords: [project.category, project.client, ...project.techStack, 'Islam Samy', 'Case Study'],
    openGraph: {
      title: `${project.title} | Islam Samy`,
      description,
      images: cover ? [{ url: cover, alt: project.title }] : undefined,
    },
  };
}

export async function generateStaticParams() {
  try {
    const { data } = await supabase.from('projects').select('id');
    if (data && (data as any[]).length > 0) {
      return (data as any[]).map((p) => ({ id: p.id }));
    }
  } catch (e) {
    // Fallback to initial seed projects if offline
  }
  return initialProjects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let project = null;

  try {
    const { data } = await supabase.from('projects').select('*').eq('id', id).maybeSingle();
    if (data) {
      project = mapProjectRowToItem(data);
    }
  } catch (e) {
    // Fallback
  }

  if (!project) {
    project = initialProjects.find((p) => p.id === id);
  }

  return <ProjectDetailClient projectId={id} initialProject={project} />;
}
