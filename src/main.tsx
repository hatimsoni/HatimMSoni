import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowDown, Download, Github, Linkedin, Menu, X, Code2, Layers, Database, Smartphone, Check, LoaderCircle } from 'lucide-react';
import './styles.css';
import './motion.css';
import { usePageMotion } from './usePageMotion';

import { featuredProjects, projects } from './projects';
import { ProjectCard } from './ProjectCard';
import './projects.css';
import './theme.css';
import { ThemeToggle } from './ThemeToggle';
import { PortfolioExtras, CopyEmail } from './PortfolioExtras';
const stack = [
 { name: 'Python', logo: 'python', category: 'Backend', color: '#ffd343' },
 { name: 'React.js', logo: 'react', category: 'Web interfaces', color: '#61dafb' },
 { name: 'MySQL', logo: 'mysql', category: 'Database', color: '#5badd0' },
 { name: 'PHP', logo: 'php', category: 'Backend', color: '#a6ade0' },
 { name: 'Laravel', logo: 'laravel', category: 'Web framework', color: '#ff655e' },
 { name: 'React Native', logo: 'react', category: 'Mobile apps', color: '#61dafb' },
 { name: 'Next.js', logo: 'nextjs', category: 'Full stack', color: '#eeeeee' },
 { name: 'TypeScript', logo: 'typescript', category: 'Typed JavaScript', color: '#58a6f0' },
 { name: 'Node.js', logo: 'nodejs', category: 'Runtime', color: '#82c765' },
 { name: 'MongoDB', logo: 'mongodb', category: 'Database', color: '#6ac25c' },
 { name: 'Tailwind CSS', logo: 'tailwindcss', category: 'Styling', color: '#38bdf8' },
 { name: 'Supabase', logo: 'supabase', category: 'Backend platform', color: '#3ecf8e' },
];
function Toolkit() {
 return <section className="toolkit reveal" aria-labelledby="toolkit-title"><div className="section-wrap">
  <div className="toolkit-heading"><h2 id="toolkit-title">My everyday <em>toolkit.</em></h2><p>From web experiences to mobile apps.</p></div>
  <ul className="tech-grid">{stack.map((tech,i)=><li className={`tech-card tech-${tech.logo}`} key={tech.name} style={{ '--tech-color': tech.color, '--tech-delay': `${i*65}ms`, '--float-delay': `${i*-0.43}s` } as React.CSSProperties}>
   <div className="tech-logo"><img src={`/logos/${tech.logo}.svg`} alt="" width="34" height="34" loading="lazy"/>{tech.name==='React Native'&&<Smartphone className="mobile-badge" size={13} aria-hidden="true"/>}</div>
   <div><h3>{tech.name}</h3><span>{tech.category}</span></div>
  </li>)}</ul>
 </div></section>;
}
function Orb() {
 const ref = useRef<HTMLDivElement>(null);
 return <div className="orb-scene" onPointerMove={e => { if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; const r=e.currentTarget.getBoundingClientRect(); ref.current?.style.setProperty('--tilt', `${(e.clientX-r.left-r.width/2)/25}deg`); }} onPointerLeave={()=>ref.current?.style.setProperty('--tilt','0deg')}>
  <div className="scene-grid"/><span className="scene-coordinate">CREATIVE DEVELOPMENT / 001</span>
  <div className="orb-object" ref={ref}><div className="orb-core"/>{Array.from({length:12},(_,i)=><div className="orb-ring" key={i} style={{transform:`rotateY(${i*15}deg)`}}/>)}</div>
  <div className="floating-tag tag-react"><img src="/logos/react.svg" width="23" height="23" alt=""/> React.js</div><div className="floating-tag tag-ts"><img src="/logos/typescript.svg" width="19" height="19" alt=""/> TypeScript</div><div className="floating-tag tag-node"><img src="/logos/nodejs.svg" width="19" height="19" alt=""/> Node.js</div>
  <div className="scene-caption"><span className="tiny-cross">+</span> Turning ideas into experiences <span className="tiny-cross">+</span></div>
 </div>;
}
function Contact() {
 const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle');
 const [message,setMessage]=useState('');
 const key=import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
 const configured=Boolean(key && key!=='your_web3forms_access_key');
 async function submit(e:React.FormEvent<HTMLFormElement>) {
  e.preventDefault(); if(status==='sending')return;
  if(!configured){setStatus('error');setMessage('The form is being connected. Please email hatimsoni905@gmail.com directly.');return;}
  const form=e.currentTarget; const data=new FormData(form); data.append('access_key',key); data.append('subject','New portfolio enquiry'); data.append('from_name','Hatim Soni Portfolio');
  setStatus('sending');setMessage('');
  try { const response=await fetch('https://api.web3forms.com/submit',{method:'POST',body:data,signal:AbortSignal.timeout(15000)}); const result=await response.json(); if(!response.ok||!result.success)throw new Error('Submission failed');setStatus('success');setMessage('Message sent. Thanks for reaching out — I’ll get back to you soon.');form.reset(); }
  catch {setStatus('error');setMessage('Your message could not be sent. Please try again or email me directly.');}
 }
 return <section id="contact" className="contact section-wrap"><div className="contact-copy"><div className="eyebrow"><span/> HAVE SOMETHING IN MIND?</div><h2>Let’s build<br/>something <em>great.</em><span className="lime">↗</span></h2><p>A new idea, an interesting opportunity, or just a hello.<br/>I’d love to hear from you.</p><a className="email-link" href="mailto:hatimsoni905@gmail.com">hatimsoni905@gmail.com <ArrowUpRight size={20}/></a><CopyEmail/><div className="social-links"><a href="https://github.com/hatimsoni" target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ArrowUpRight size={14}/></a><a href="https://www.linkedin.com/in/hatim-soni-58555b238/" target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={14}/></a></div></div>
 <form onSubmit={submit} className="contact-form"><div className="form-row"><label>Your name<input name="name" placeholder="Alex Johnson" required maxLength={100} autoComplete="name"/></label><label>Email address<input name="email" type="email" placeholder="alex@company.com" required maxLength={254} autoComplete="email"/></label></div><label>What are you thinking?<textarea name="message" placeholder="Tell me a little about your project…" rows={4} required minLength={10} maxLength={5000}/></label><input type="checkbox" name="botcheck" className="honeypot" tabIndex={-1} aria-hidden="true"/><button className="button primary send-button" disabled={status==='sending'} type="submit">{status==='sending'?'Sending…':status==='success'?'Send another message':'Send message'}{status==='sending'?<LoaderCircle className="spin" size={18}/>:status==='success'?<Check size={18}/>:<ArrowUpRight size={18}/>}</button><p className={`form-status ${status}`} role="status" aria-live="polite">{message || (!configured ? <>Prefer email? <a href="mailto:hatimsoni905@gmail.com">Reach me directly <ArrowUpRight size={12}/></a></> : 'Delivered securely with Web3Forms.')}</p></form></section>;
}
function App() {
 const [menu,setMenu]=useState(false);
 usePageMotion('home');
 useEffect(()=>{const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:0.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));return()=>observer.disconnect();},[]);
 return <><div className="reading-progress" aria-hidden="true"/><a className="skip-link" href="#main">Skip to content</a><header className="header section-wrap"><a className="logo" href="#" aria-label="Hatim home">hatim<span>✳</span></a><nav className={menu?'navigation open':'navigation'} aria-label="Main navigation">{['Work','All projects','About','Experience','Contact'].map(n=><a key={n} href={n==='All projects'?'/projects.html':`#${n.toLowerCase()}`} onClick={()=>setMenu(false)}>{n}</a>)}</nav><div className="header-actions"><ThemeToggle/><a className="header-cta" href="#contact">Let’s talk <ArrowUpRight size={16}/></a></div><button className="menu-toggle" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
 <main id="main"><section className="hero section-wrap"><div className="hero-copy"><div className="eyebrow"><span/> FULL STACK DEVELOPER</div><h1>Thoughtful code.<br/>Meaningful<br/><em>experiences.</em><span className="heading-dot">✳</span></h1><p>I’m <strong>Hatim Soni</strong> — a full stack developer turning complex<br className="desktop-break"/> ideas into intuitive, beautifully built digital products.</p><div className="hero-actions"><a className="button primary" href="#work">Explore my work <ArrowUpRight size={18}/></a><a className="resume-link" href="/Hatim-Mustafa-Soni-CV.pdf" download>Download CV <Download size={16}/></a></div><div className="hero-note"><span className="status-dot"/> Currently building at <strong>Ghadiali Infotech</strong></div></div><Orb/><a className="scroll-cue" href="#work"><ArrowDown size={14}/> SCROLL TO EXPLORE</a><span className="hero-index">DESIGNED WITH INTENT. BUILT WITH CARE.</span></section>
 <Toolkit/>
 <section id="work" className="work section-wrap reveal"><div className="section-heading"><div><div className="eyebrow"><span/> SELECTED WORK</div><h2>Built to make <em>an impact.</em></h2></div><a className="text-link" href="/projects.html">More projects <ArrowUpRight size={17}/></a></div><div className="work-toolbar"><p>Selected platforms, stores, and tools built for real businesses.</p><span className="selected-count">{featuredProjects.length} SELECTED / {projects.length} PROJECTS</span></div><div className="project-grid">{featuredProjects.map(project=><ProjectCard key={project.id} project={project} index={projects.indexOf(project)}/>)}</div><div className="more-projects"><p>There’s more to explore. Discover the full collection.</p><a className="button primary" href="/projects.html">More projects <span>({projects.length})</span><ArrowUpRight size={18}/></a></div></section>
 <section id="about" className="about section-wrap reveal"><div className="about-art"><div className="art-top">THE PERSON BEHIND THE PIXELS <ArrowUpRight size={17}/></div><div className="monogram">h<span>s</span><i>✳</i></div><div className="art-bottom"><span>DEVELOPER BY CRAFT.<br/>CURIOUS BY NATURE.</span><Code2 size={26}/></div></div><div className="about-copy"><div className="eyebrow"><span/> A LITTLE ABOUT ME</div><h2>More than code.<br/><em>A way of thinking.</em></h2><p>I’m Hatim Mustafa Soni, a full stack developer who cares about how things work — and how they feel.</p><p>From responsive React interfaces to the APIs and databases behind them, I enjoy connecting the pieces. My work brings together MERN, Next.js, thoughtful UI/UX, and AI-assisted development.</p><div className="skill-list"><div><Layers size={18}/><span><b>Frontend & interface</b>React.js · Next.js · TypeScript · Tailwind CSS</span></div><div><Code2 size={18}/><span><b>Backend & APIs</b>Node.js · Express.js · Python · PHP · Laravel</span></div><div><Database size={18}/><span><b>Data & infrastructure</b>MongoDB · MySQL · Supabase</span></div><div><Smartphone size={18}/><span><b>Mobile development</b>React Native</span></div></div></div></section>
 <section id="experience" className="experience section-wrap reveal"><div className="section-heading"><div><div className="eyebrow"><span/> THE JOURNEY SO FAR</div><h2>Learning. Building. <em>Growing.</em></h2></div><a className="text-link" href="/Hatim-Mustafa-Soni-CV.pdf" download>Full résumé <Download size={16}/></a></div><div className="timeline"><article><div className="timeline-date">2025 — PRESENT<span className="current-badge">CURRENT</span></div><div><h3>Full Stack Developer</h3><span>Ghadiali Infotech</span></div><p>Building and maintaining full-stack applications with MERN, Next.js, and TypeScript. Creating responsive interfaces, backend features, and AI-assisted workflows.</p></article><article><div className="timeline-date">2024 — 2025</div><div><h3>Junior Developer</h3><span>BIS</span></div><p>Contributed to React and MongoDB applications, user-facing UI/UX improvements, and the development, testing, and maintenance of features.</p></article></div><div className="education"><span>ALWAYS LEARNING <ArrowUpRight size={15}/></span><div><b>Bachelor of Computer Applications</b><p>Hindustan Institute of Technology and Science, Chennai</p></div><span>2026</span></div></section>
 <PortfolioExtras/><Contact/></main><footer className="footer section-wrap"><a className="logo" href="#">hatim<span>✳</span></a><p>© {new Date().getFullYear()} Hatim Soni. Crafted with care.</p><a href="#">Back to top <ArrowUpRight size={15}/></a></footer></>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
