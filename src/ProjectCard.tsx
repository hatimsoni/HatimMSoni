import { useState, type CSSProperties } from 'react';
import { ProjectDetails } from './ProjectDetails';
import './features.css';
import { ArrowUpRight, BookOpen, BriefcaseBusiness, Globe, Layers, Monitor, Package, Printer, Scale, ShoppingBag, Smartphone } from 'lucide-react';
import type { Project } from './projects';
const icons = { 'cheque-print': Printer, bookcycle: BookOpen, 'office-management': BriefcaseBusiness, 'av-comparison': Monitor, 'db-academic': BookOpen, 'dreamz-decor': ShoppingBag, 'master-bolts': Package, 'bis-tracker': Layers, 'sarrah-construction': BriefcaseBusiness, 'alkanz-infotech': Monitor, 'ghadiali-infotech': Globe, 'ghadiali-ca': BriefcaseBusiness, 'ghadiali-legal': Scale, 'fmb-connect': Smartphone };
export function ProjectCard({ project, index }: { project: Project; index: number }) {
 const [detailsOpen,setDetailsOpen]=useState(false);
 const Icon = icons[project.id as keyof typeof icons] ?? Globe;
 return <><article className="project-card real-project" style={{ '--project-accent': project.accent } as CSSProperties}>
  <div className="project-cover" aria-hidden="true"><div className="cover-top"><span>{project.category}</span><Icon size={19}/></div><div className="cover-monogram">{project.monogram}<span>✳</span></div><div className="cover-bottom"><span>{project.features[0]}</span><span>{project.url?'WEB':'ANDROID'} / {String(index+1).padStart(2,'0')}</span></div><div className="cover-orbit"/></div>
  <div className="project-info"><div className="project-category">{project.category}<span>{String(index+1).padStart(2,'0')}</span></div><h3>{project.name}</h3><p>{project.description}</p><ul className="project-features">{project.features.map(feature=><li key={feature}>{feature}</li>)}</ul><div className="tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
   <button className="project-details-button" type="button" onClick={()=>setDetailsOpen(true)} aria-label={`View details for ${project.name}`}>View details <ArrowUpRight size={15}/></button>
   <div className="project-action">{project.url?<a className="project-visit-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name}`}>Visit website <ArrowUpRight size={17}/></a>:<span><Smartphone size={15}/> Android app <small>Link coming soon</small></span>}</div>
  </div>
 </article>{detailsOpen&&<ProjectDetails project={project} onClose={()=>setDetailsOpen(false)}/>}</>;
}
