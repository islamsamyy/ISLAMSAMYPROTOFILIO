import React from 'react';
import { initialProjects } from '@/data/seedProjects';
import { ProjectDetailClient } from './ProjectDetailClient';
import { supabase } from '@/lib/supabase/client';
import { mapProjectRowToItem } from '@/lib/data-store';

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
