import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const waveVertex = /* glsl */ `
  uniform float uTime; uniform float uCalm;
  varying vec3 vWorld; varying vec3 vNormal; varying float vHeight;
  void main(){
    vec3 p=position;
    float t=uTime * (0.33 + 0.19 * uCalm);
    float a=sin(p.x * .23 + t*1.7 + p.y*.065);
    float b=sin(p.y*.39 - t*1.12 + p.x*.13);
    float c=sin(p.x*.61 + p.y*.43 + t*1.3);
    float d=sin(p.y*.13 - p.x*.075 + t*.45);
    float h=(a*.49+b*.26+c*.13+d*.32) * (.42 + uCalm*.13);
    p.z += h;
    vec3 dx=vec3(1.,0.,((cos(p.x*.23 + t*1.7 + p.y*.065)*.23*.49 + cos(p.y*.39 - t*1.12+p.x*.13)*.13*.26 + cos(p.x*.61+p.y*.43+t*1.3)*.61*.13 -cos(p.y*.13-p.x*.075+t*.45)*.075*.32)*(.42+uCalm*.13)));
    vec3 dy=vec3(0.,1.,((cos(p.x*.23+t*1.7+p.y*.065)*.065*.49+cos(p.y*.39-t*1.12+p.x*.13)*.39*.26+cos(p.x*.61+p.y*.43+t*1.3)*.43*.13+cos(p.y*.13-p.x*.075+t*.45)*.13*.32)*(.42+uCalm*.13)));
    vec3 n=normalize(cross(dx,dy));
    vec4 world=modelMatrix*vec4(p,1.);
    vWorld=world.xyz; vNormal=normalize(mat3(modelMatrix)*n); vHeight=h;
    gl_Position=projectionMatrix*viewMatrix*world;
  }
`;
const waveFragment = /* glsl */ `
  uniform float uTime; uniform float uDay; uniform float uNight; uniform float uWarm;
  uniform vec3 uSun; varying vec3 vWorld; varying vec3 vNormal; varying float vHeight;
  float noise2(vec2 x){return fract(sin(dot(x,vec2(127.1,311.7)))*43758.5453);}
  void main(){
    vec3 deep=mix(vec3(.008,.052,.091),vec3(.015,.15,.25),uDay);
    deep=mix(deep,vec3(.042,.064,.13),uNight*.75);
    vec3 surface=mix(vec3(.025,.23,.32),vec3(.035,.51,.67),uDay);
    surface=mix(surface,vec3(.12,.17,.31),uNight*.75);
    vec3 norm=normalize(vNormal);
    vec3 view=normalize(cameraPosition-vWorld);
    float fres=pow(1.-max(dot(norm,view),0.),2.4);
    float wave=clamp(vHeight*.72+.48,0.,1.);
    vec3 col=mix(deep,surface,wave*.62+fres*.24);
    float glint=pow(max(dot(reflect(-normalize(uSun-vWorld),norm),view),0.),28.);
    float thin=pow(max(dot(reflect(-normalize(uSun-vWorld),norm),view),0.),140.);
    float nearCenter=exp(-abs(vWorld.x-(uSun.x*.55))*(.045+ .001*abs(vWorld.z)));
    float bands=.48+.52*sin(vWorld.z*.68+vWorld.x*.23+uTime*.8);
    float sparkle=pow(max(0.,sin(vWorld.x*1.7 +vWorld.z*2.3+uTime*.44)),24.);
    vec3 glow=mix(vec3(.67,.89,.95),vec3(1.,.48,.24),uWarm);
    glow=mix(glow,vec3(.77,.89,1.),uNight);
    col += glow * ((glint*.43+thin*.38) + nearCenter*(.12+.18*bands + .08*sparkle));
    float foam=smoothstep(.47,.7,vHeight)*(.15+.07*noise2(floor(vWorld.xz*3.)));
    col += foam*vec3(.64,.81,.84);
    float dist=length(vWorld-cameraPosition);
    float fog=1.-exp(-dist*.009);
    vec3 horizon=mix(vec3(.15,.27,.4),vec3(.27,.45,.57),uDay);
    horizon=mix(horizon,vec3(.08,.1,.17),uNight);
    col=mix(col,horizon,clamp(fog*.6,0.,.62));
    gl_FragColor=vec4(col,1.);
  }
`;
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const smooth=(a:number,b:number,x:number)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
function OceanSurface({progress,paused,mobile}:{progress:MutableRefObject<number>;paused:boolean;mobile:boolean}){
 const mesh=useRef<THREE.Mesh>(null); const material=useRef<THREE.ShaderMaterial>(null); const sun=new THREE.Vector3(0,25,-55);
 const uniforms=useMemo(()=>({uTime:{value:0},uCalm:{value:0.5},uDay:{value:0},uNight:{value:0},uWarm:{value:1},uSun:{value:sun}}),[]);
 useFrame(({clock},delta)=>{
  if(!material.current)return;
  const p=progress.current; const d=Math.min(delta,.06); const next=paused?0:clock.elapsedTime;
  uniforms.uTime.value=next;
  const targetDay=smooth(.08,.34,p)*(1.-smooth(.54,.77,p));
  const targetNight=smooth(.74,.95,p);
  const targetWarm=1.-smooth(.1,.34,p)+smooth(.49,.72,p)*(1.-smooth(.77,.98,p));
  uniforms.uDay.value=mix(uniforms.uDay.value,targetDay,Math.min(1,d*2.8));
  uniforms.uNight.value=mix(uniforms.uNight.value,targetNight,Math.min(1,d*2.8));
  uniforms.uWarm.value=mix(uniforms.uWarm.value,Math.min(1,targetWarm),Math.min(1,d*2.8));
  uniforms.uSun.value.x=mix(uniforms.uSun.value.x,Math.sin(p*4)*15,Math.min(1,d*1.8));
 });
 return <mesh ref={mesh} rotation={[-Math.PI/2,0,0]} position={[0,-2.9,-65]} frustumCulled={false}>
   <planeGeometry args={[420,360,mobile?85:150,mobile?85:150]}/>
   <shaderMaterial ref={material} vertexShader={waveVertex} fragmentShader={waveFragment} uniforms={uniforms} side={THREE.DoubleSide}/>
 </mesh>;
}
function CameraFloat({progress,paused}:{progress:MutableRefObject<number>;paused:boolean}){
 const {camera,pointer}=useThree(); const time=useRef(0);
 useFrame((_,delta)=>{
  const d=Math.min(delta,.05);if(!paused)time.current+=d;
  const p=progress.current;
  const targetX=(paused?0:pointer.x)*.32 + Math.sin(time.current*.18)*.22;
  const targetY=3.15 + (paused?0:Math.sin(time.current*.2)*.045) + p*.28;
  camera.position.x=mix(camera.position.x,targetX,Math.min(1,d*1.4));
  camera.position.y=mix(camera.position.y,targetY,Math.min(1,d*1.4));
  camera.lookAt(0,-.5,-46);
 });
 return null;
}
function Scene({progress,paused,mobile}:{progress:MutableRefObject<number>;paused:boolean;mobile:boolean}){
 return <><CameraFloat progress={progress} paused={paused}/><OceanSurface progress={progress} paused={paused} mobile={mobile}/></>;
}
export default function OceanWorld({progress,paused,mobile}:{progress:MutableRefObject<number>;paused:boolean;mobile:boolean}){
 const [failed,setFailed]=useState(false);
 useEffect(()=>{if(!window.WebGLRenderingContext)setFailed(true)},[]);
 if(failed)return <div className="ocean-fallback" aria-label="Ocean gradient fallback"/>;
 return <div className="ocean-canvas" aria-hidden="true"><Suspense fallback={null}><Canvas dpr={mobile?1:[1,1.55]} gl={{alpha:true,antialias:false,powerPreference:'high-performance'}} camera={{position:[0,3.15,12],fov:57,near:.1,far:510}} onCreated={({gl})=>{gl.domElement.addEventListener('webglcontextlost',()=>setFailed(true),{once:true});}}><Scene progress={progress} paused={paused} mobile={mobile}/></Canvas></Suspense></div>;
}
