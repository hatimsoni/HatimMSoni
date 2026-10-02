import { StrictMode, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, ArrowUpRight, Github, Search, X } from 'lucide-react';
import { projects, projectCategories } from './projects';
import { ProjectCard } from './ProjectCard';
import { usePageMotion } from './usePageMotion';
import './styles.css';
import './motion.css';
import './projects.css';
import './theme.css';
import { ThemeToggle } from './ThemeToggle';
function ProjectsPage() {
 const [category,setCategory]=useState(()=>{const value=new URLSearchParams(location.search).get('category');return projectCategories.some(item=>item===value)?value!:'All projects';});
 const [query,setQuery]=useState(()=>new URLSearchParams(location.search).get('q')??'');
 const searchRef=useRef<HTMLInputElement>(null);
 useEffect(()=>{const url=new URL(location.href);if(query)url.searchParams.set('q',query);else url.searchParams.delete('q');if(category!=='All projects')url.searchParams.set('category',category);else url.searchParams.delete('category');history.replaceState(null,'',url);},[category,query]);
 useEffect(()=>{const shortcut=(event:KeyboardEvent)=>{if(document.querySelector('dialog[open]'))return;const target=event.target as HTMLElement;const editing=target.isContentEditable||['INPUT','TEXTAREA','SELECT'].includes(target.tagName);if(((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k')||(event.key==='/'&&!editing)){event.preventDefault();searchRef.current?.focus();}if(event.key==='Escape'&&document.activeElement===searchRef.current){setQuery('');searchRef.current?.blur();}};window.addEventListener('keydown',shortcut);return()=>window.removeEventListener('keydown',shortcut);},[]);
 usePageMotion(`${category}:${query}`);
 const filtered=projects.filter(project=>(category==='All projects'||project.category===category)&&[project.name,project.description,...project.tags,...project.features].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
 return <><div className="reading-progress" aria-hidden="true"/><a className="skip-link" href="#main">Skip to projects</a><header className="header section-wrap"><a className="logo" href="/" aria-label="Hatim home">hatim<span>✳</span></a><a className="text-link" href="/#work"><ArrowLeft size={16}/> Back to portfolio</a><div className="header-actions"><ThemeToggle/><a className="header-cta" href="/#contact">Let’s talk <ArrowUpRight size={16}/></a></div></header>
 <main id="main" className="all-projects section-wrap"><div className="projects-intro"><div className="eyebrow"><span/> THE PROJECT COLLECTION</div><h1>Ideas made <em>real.</em></h1><p>From business platforms and online stores to community websites and mobile apps. A closer look at what I’ve built.</p><div className="project-stats"><span><b>{projects.filter(p=>p.url).length}</b> Web projects</span><span><b>{projects.filter(p=>!p.url).length}</b> Android app</span></div></div>
 <div className="collection-controls"><div className="filters" aria-label="Filter projects">{['All projects',...projectCategories].map(item=><button key={item} className={category===item?'active':''} aria-pressed={category===item} onClick={()=>setCategory(item)}>{item}</button>)}</div><label className="project-search"><Search size={17} aria-hidden="true"/><input ref={searchRef} type="search" aria-describedby="search-shortcut" aria-label="Search projects" placeholder="Search projects or technology…" value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button onClick={()=>setQuery('')} aria-label="Clear search"><X size={15}/></button>}</label></div>
 <p id="search-shortcut" className="search-shortcut">Press <kbd>/</kbd> or <kbd>Ctrl / ⌘ K</kbd> to search. Filters are saved in the page URL.</p><p className="result-count" role="status">Showing {filtered.length} of {projects.length} projects</p><div className="project-grid collection-grid" key={`${category}:${query}`}>{filtered.map(project=><ProjectCard key={project.id} project={project} index={projects.indexOf(project)}/>)}</div>
 {filtered.length===0&&<div className="project-empty"><Search size={28}/><h2>No projects found.</h2><p>Try another name, technology, or category.</p><button className="button primary" onClick={()=>{setCategory('All projects');setQuery('');}}>Show all projects</button></div>}
 <section className="github-projects" aria-labelledby="github-projects-title"><div><div className="eyebrow"><span/> KEEP EXPLORING</div><h2 id="github-projects-title">More projects <em>on GitHub.</em></h2><p>There’s more beyond this collection. Explore my repositories and follow me on GitHub for new projects and updates.</p></div><a className="button primary" href="https://github.com/hatimsoni" target="_blank" rel="noopener noreferrer"><Github size={19} aria-hidden="true"/> Follow on GitHub <ArrowUpRight size={18} aria-hidden="true"/></a></section>
 <div className="collection-cta"><div><h2>Have a project <em>in mind?</em></h2><p>Let’s turn your idea into something useful.</p></div><a className="button primary" href="/#contact">Let’s talk <ArrowUpRight size={18}/></a></div></main><footer className="footer section-wrap"><a className="logo" href="/">hatim<span>✳</span></a><p>© {new Date().getFullYear()} Hatim Soni. Crafted with care.</p><a href="/#work"><ArrowLeft size={15}/> Back to portfolio</a></footer></>;
}
createRoot(document.getElementById('root')!).render(<StrictMode><ProjectsPage/></StrictMode>);
