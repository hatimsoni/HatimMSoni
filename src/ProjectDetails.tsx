import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Check, X } from 'lucide-react';
import type { Project } from './projects';
export function ProjectDetails({ project, onClose }: { project: Project; onClose: () => void }) {
 const ref = useRef<HTMLDialogElement>(null);
 useEffect(() => {
  const dialog = ref.current!;
  const trigger = document.activeElement as HTMLElement | null;
  const overflow = document.body.style.overflow;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  return () => { dialog.close(); document.body.style.overflow = overflow; trigger?.focus({ preventScroll: true }); };
 }, []);
 return createPortal(<dialog className="project-dialog" ref={ref} aria-labelledby={`detail-${project.id}`} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose();}}}>
  <button className="dialog-close" type="button" aria-label="Close project details" onClick={onClose}><X size={21}/></button>
  <div className="eyebrow"><span/>{project.category.toUpperCase()}</div><h2 id={`detail-${project.id}`}>{project.name}</h2><p className="detail-description">{project.description}</p>
  <h3>What’s inside</h3><ul className="detail-features">{project.features.map(feature=><li key={feature}><Check size={16}/>{feature}</li>)}</ul>
  <h3>Technology stack</h3><div className="tags detail-tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
  <div className="detail-actions">{project.url?<a className="button primary" href={project.url} target="_blank" rel="noopener noreferrer">Open live website <ArrowUpRight size={17}/></a>:<p className="app-link-note">Android app · Public download link coming soon.</p>}<a className="text-link" href={`mailto:hatimsoni905@gmail.com?subject=${encodeURIComponent(`Enquiry about a project like ${project.name}`)}`}>Discuss a similar project <ArrowUpRight size={16}/></a></div>
 </dialog>,document.body);
}
