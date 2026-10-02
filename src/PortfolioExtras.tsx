import { useState } from 'react';
import { ArrowUpRight, Check, Code2, Copy, Database, Globe, Plus, Smartphone } from 'lucide-react';
export function CopyEmail() {
 const [status,setStatus]=useState('');
 async function copy(){try{await navigator.clipboard.writeText('hatimsoni905@gmail.com');setStatus('Email copied!');}catch{setStatus('Please select and copy the email address above.');}}
 return <div className="copy-email"><button type="button" onClick={copy}>{status==='Email copied!'?<Check size={14}/>:<Copy size={14}/>}Copy email</button><span role="status">{status}</span></div>;
}
const services=[
 {icon:Code2,title:'Full-stack web apps',description:'Dashboards, office workflows, inventory systems, and custom admin panels.',stack:'React · TypeScript · PHP · Node.js'},
 {icon:Database,title:'E-commerce & integrations',description:'Storefronts, order management, databases, and payment integrations.',stack:'MySQL · MongoDB · Supabase · Razorpay'},
 {icon:Globe,title:'Business websites',description:'Responsive websites that introduce your business and make it easy to get in touch.',stack:'React · Tailwind CSS · Contact forms'},
 {icon:Smartphone,title:'Android applications',description:'Mobile experiences built with React Native and connected to a database.',stack:'React Native · MongoDB'},
];
const faqs=[
 ['What kinds of projects do you build?','My work includes full-stack web applications, e-commerce stores, company websites, custom admin panels, and an Android app. Explore the project collection for examples and technology stacks.'],
 ['Can I see examples of your work?','Yes. The selected projects section links to live websites, and the All projects page includes the full collection. Use View details to explore each project’s features and stack.'],
 ['What should I include in a project enquiry?','Share what you want to build, who will use it, the main features you need, and any timeline or budget you have in mind. Links to designs or similar products are useful too.'],
 ['How do we decide the technology stack?','The right stack depends on the features and workflows your project needs. Tell me about your requirements so we can discuss the frontend, backend, database, and any integrations.'],
];
export function PortfolioExtras(){return <>
 <section id="services" className="services section-wrap"><div className="section-heading"><div><div className="eyebrow"><span/> WHAT I CAN HELP WITH</div><h2>From an idea to <em>a working product.</em></h2></div><a className="text-link" href="#contact">Discuss your project <ArrowUpRight size={17}/></a></div><div className="services-grid">{services.map(({icon:Icon,title,description,stack})=><article className="service-card" key={title}><Icon size={24}/><h3>{title}</h3><p>{description}</p><span>{stack}</span></article>)}</div></section>
 <section className="faq section-wrap" aria-labelledby="faq-title"><div><div className="eyebrow"><span/> BEFORE WE GET STARTED</div><h2 id="faq-title">A few things you<br/>might be <em>wondering.</em></h2><p>Have another question? <a href="#contact">Let’s talk <ArrowUpRight size={14}/></a></p></div><div className="faq-list">{faqs.map(([q,a])=><details name="portfolio-faq" key={q}><summary>{q}<Plus size={17} aria-hidden="true"/></summary><p>{a}</p></details>)}</div></section>
 </>;}
