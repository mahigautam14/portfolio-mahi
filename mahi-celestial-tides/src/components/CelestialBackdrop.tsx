import { useEffect, useRef, type MutableRefObject } from 'react';
import OceanWorld from '../scene/OceanWorld';

const clamp = (n:number)=>Math.min(1,Math.max(0,n));
const smooth = (a:number,b:number,x:number)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t)};
const lerp = (a:number,b:number,t:number)=>a+(b-a)*t;
// A continuous trajectory: dawn -> daylight -> golden hour -> sunset -> moonrise.
// The celestial objects always cross the physical water horizon instead of abruptly swapping.
function Sky({progress}:{progress:number}){
 const p=clamp(progress);
 const keys=[{p:0,sky:'dawn'},{p:.24,sky:'day'},{p:.50,sky:'gold'},{p:.70,sky:'sunset'},{p:.90,sky:'night'}] as const;
 const weights=keys.map((item,i)=>{
  if(i===0)return 1-smooth(item.p,keys[1].p,p);
  if(i===keys.length-1)return smooth(keys[i-1].p,item.p,p);
  return smooth(keys[i-1].p,item.p,p)*(1-smooth(item.p,keys[i+1].p,p));
 });
 const night=smooth(.67,.92,p);
 const dusk=smooth(.50,.72,p)*(1-smooth(.77,.94,p));
 const dawn=1-smooth(.10,.26,p);
 // Horizon at roughly 56% of the viewport; lower values are higher in sky.
 const sunY=p<.24 ? lerp(63,24,smooth(0,.24,p)) : p<.49 ? lerp(24,29,smooth(.24,.49,p)) : lerp(29,70,smooth(.49,.76,p));
 const moonY=lerp(72,28,smooth(.69,.97,p));
 const sunOpacity=1-smooth(.70,.82,p);
 const moonOpacity=smooth(.66,.88,p);
 const reflectionWidth=lerp(5.5,12,smooth(.3,.72,p));
 return <div className="sky-scene" aria-hidden="true">
  {keys.map((item,i)=><div key={item.sky} className={`sky-layer sky-${item.sky}`} style={{opacity:weights[i]}}/>)}
  <div className="cloud-field cloud-a"/><div className="cloud-field cloud-b"/>
  <div className="sky-stars" style={{opacity:night}}/>
  <div className="celestial sun" style={{top:`${sunY}%`,opacity:sunOpacity,transform:`translate(-50%,-50%) scale(${lerp(.92,1.07,dusk)})`}}><span className="sun-core"/></div>
  <div className="celestial moon" style={{top:`${moonY}%`,opacity:moonOpacity}}><span className="moon-core"/></div>
  <div className="light-column solar-column" style={{opacity:(dawn*.85+dusk*.95+(1-night)*.2)*sunOpacity,left:'66%',width:`${reflectionWidth}%`}}/>
  <div className="light-column lunar-column" style={{opacity:moonOpacity*.85,left:'73%',width:'7%'}}/>
  <div className="sky-horizon"/>
  <div className="nebula-grid" style={{opacity:.045+night*.22}}/>
 </div>;
}

// Actual waves from the supplied video references: deliberately subtle, blended with
// the procedural WebGL surface so day/night and sun/moon remain scroll-controlled.
function LivingWater({progress,paused,mobile}:{progress:number;paused:boolean;mobile:boolean}){
 const warm=useRef<HTMLVideoElement>(null);
 const blue=useRef<HTMLVideoElement>(null);
 const p=clamp(progress);
 const golden=(1-smooth(.17,.33,p))*.75 + smooth(.47,.64,p)*(1-smooth(.74,.88,p))*.82;
 const daylight=smooth(.16,.32,p)*(1-smooth(.50,.69,p))*.68;
 const opacityFactor=(1-smooth(.72,.87,p))*(mobile?.66:1);
 useEffect(()=>{
  const videos=[warm.current,blue.current].filter((video):video is HTMLVideoElement=>Boolean(video));
  const sync=()=>{
   const stop=paused||document.hidden;
   videos.forEach(video=>{if(stop)video.pause();else video.play().catch(()=>{});});
  };
  sync(); document.addEventListener('visibilitychange',sync);
  return ()=>{document.removeEventListener('visibilitychange',sync);videos.forEach(v=>v.pause());};
 },[paused]);
 return <div className="living-water" aria-hidden="true" style={{opacity:opacityFactor}}>
  <video ref={warm} className="water-footage water-footage-golden" style={{opacity:golden}} autoPlay={!paused} muted playsInline loop preload="metadata" src="/ocean-golden.mp4"/>
  <video ref={blue} className="water-footage water-footage-blue" style={{opacity:daylight}} autoPlay={!paused} muted playsInline loop preload="metadata" src="/ocean-blue.mp4"/>
 </div>;
}

export default function CelestialBackdrop({progress,scrollRef,paused,mobile}:{progress:number;scrollRef:MutableRefObject<number>;paused:boolean;mobile:boolean}){
 const p=clamp(progress);
 const names=['DAWN / FIRST LIGHT','DAYLIGHT / OPEN WATER','GOLDEN HOUR / DISCOVERY','SUNSET / REFLECTION','NIGHT / STARLIGHT'];
 const current=p<.17?0:p<.43?1:p<.61?2:p<.81?3:4;
 return <div className="world-backdrop">
  <Sky progress={p}/>
  <OceanWorld progress={scrollRef} paused={paused} mobile={mobile}/>
  <LivingWater progress={p} paused={paused} mobile={mobile}/>
  <div className="world-vignette"/>
  <div className="scene-telemetry" aria-hidden="true"><span className="scene-signal"/><span>CELESTIAL TIDES</span><i/><span>{names[current]}</span><span className="scene-clock">{String(Math.round(p*100)).padStart(2,'0')}%</span></div>
 </div>;
}
