import { ArrowUpRight, Github, Linkedin, Mail, Menu, Pause, Play, Waves, X } from 'lucide-react';
import { useState } from 'react';
import { mahi, sectionList } from '../data/content';

export default function Chrome({active,progress,go,paused,onPause}:{active:string;progress:number;go:(id:string)=>void;paused:boolean;onPause:()=>void}){
 const [open,setOpen]=useState(false);
 const navigate=(id:string)=>{go(id);setOpen(false)};
 const idx=sectionList.findIndex(([id])=>id===active);
 return <>
  <a className="skip-to" href="#main">Skip to portfolio</a>
  <header className="site-header"><a href="#home" onClick={e=>{e.preventDefault();navigate('home')}} className="brand" aria-label="Mahi - Home"><span className="brand-avatar"><img src={mahi.portrait} alt=""/></span><span className="brand-word"><strong>MAHI<span className="brand-star">✳</span></strong><small>AI / LLM ENGINEER</small></span></a>
   <nav className="top-nav" aria-label="Main navigation">{[['about','About'],['projects','Projects'],['stack','Stack'],['education','Education']].map(([id,label])=><a key={id} href={`#${id}`} onClick={e=>{e.preventDefault();navigate(id)}} className={active===id?'current':''}>{label}</a>)}</nav>
   <div className="top-actions"><span className="availability"><i/>OPEN TO OPPORTUNITIES</span><a href={`mailto:${mahi.email}`} className="nav-cta">LET'S TALK <ArrowUpRight size={15}/></a><button className="menu-btn" onClick={()=>setOpen(s=>!s)} aria-label="Toggle navigation" aria-expanded={open}>{open?<X size={20}/>:<Menu size={20}/>}</button></div>
  </header>
  {open&&<div className="mobile-menu">{sectionList.map(([id,label])=><a key={id} href={`#${id}`} onClick={e=>{e.preventDefault();navigate(id)}}>{label}<ArrowUpRight size={15}/></a>)}</div>}
  <nav className="rail-nav" aria-label="Section navigation">{sectionList.map(([id,label],i)=><button key={id} className={active===id?'selected':''} aria-label={`Go to ${label}`} aria-current={active===id?'location':undefined} title={label} onClick={()=>navigate(id)}><span>{String(i+1).padStart(2,'0')} {label}</span><i/></button>)}</nav>
  <footer className="system-bar"><span className="system-status"><i/>SYSTEM ONLINE <span className="bar-divider">/</span> CELESTIAL TIDES</span><div className="progress-module"><span>{String(idx+1).padStart(2,'0')} / {String(sectionList.length).padStart(2,'0')}</span><div className="progress-track"><div style={{transform:`scaleX(${progress})`}}/></div><span>{Math.round(progress*100)}%</span></div><div className="system-buttons"><span className="phase-label"><Waves size={15}/> {progress<.21?'DAWN':progress<.45?'DAYLIGHT':progress<.7?'GOLDEN HOUR':progress<.88?'SUNSET':'STARLIGHT'}</span><button aria-label={paused?'Resume animations':'Pause animations'} aria-pressed={paused} onClick={onPause}>{paused?<Play size={17}/>:<Pause size={17}/>}</button></div></footer>
 </>;
}
