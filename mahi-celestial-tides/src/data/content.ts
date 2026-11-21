// Portfolio content for Mahi Gautam. Grounded in the provided resume and certificate.
export const mahi = {
 shortName:'MAHI',
 name:'Mahi Gautam',
 role:'AI / ML · LLM · FULL-STACK ENGINEER',
 location:'Noida, India',
 email:'mahigautam7991@gmail.com',
 phone:'+91 7991264930',
 phoneHref:'tel:+917991264930',
 portrait:'/mahi-portrait.webp',
 resume:'/mahi-resume.pdf',
 github:'',
 linkedin:'',
 headline:'Designing intelligent systems that feel thoughtful, useful, and production-ready.',
 intro:'AI/ML-focused software engineer and MCA student at NIT Raipur building LLM products, computer vision systems, and full-stack Python applications with an eye for product clarity, smooth user experience, and maintainable engineering.',
 about:'I enjoy working at the intersection of intelligence and product execution. My work spans Python backends, FastAPI services, React and Next.js frontends, data processing pipelines, computer vision workflows, and end-to-end AI experiences. Whether the problem is a streaming chatbot, a GitHub analytics dashboard, face-based authentication, or device-free sensing, I like building systems that are practical, readable, and ready to evolve.',
 education:[
  {year:'Aug 2024 — Present',degree:'Master of Computer Applications (MCA)',school:'National Institute of Technology Raipur',detail:'Raipur, India'},
  {year:'Jul 2021 — Jul 2024',degree:'Bachelor of Science (B.Sc.)',school:'Bundelkhand University',detail:'Jhansi, India'},
 ],
 projects:[
  {id:'asklio',number:'01',title:'AskLio AI Chatbot',type:'LLM APPLICATION · LIVE',summary:'A production-ready AI chatbot with real-time token streaming, authentication, persistent conversations and a polished user workflow.',description:'Built an AI chatbot using FastAPI and React/Vite, with Groq LLaMA integration and Server-Sent Events for streaming tokens. Added JWT authentication, protected routes, conversation create/rename/delete/search, PostgreSQL-backed persistence, markdown rendering, syntax-highlighted code blocks, and dark/light mode for a complete user-facing LLM product.',stack:['Python','FastAPI','React','Vite','PostgreSQL','JWT','SSE','Groq / LLaMA'],live:'https://asklio-chat.vercel.app/',repo:'',impact:'REAL-TIME LLM STREAMING'},
  {id:'gitorbit',number:'02',title:'GitOrbit · GitHub Tracker',type:'FULL-STACK ANALYTICS · LIVE',summary:'A full-stack analytics dashboard for GitHub profile activity, follower changes, repository signals and historical audience movement.',description:'Built a Next.js and FastAPI dashboard using the GitHub REST API, token-authenticated snapshot collection, and MongoDB persistence. Implemented snapshot comparison and append-only event logs to detect follow and unfollow changes over time, alongside search, filters, and manual synchronization for better analytical usability.',stack:['Next.js','FastAPI','MongoDB','GitHub REST API','Vercel','Render'],live:'https://git-orbit.vercel.app/',repo:'',impact:'HISTORY-DRIVEN ANALYTICS'},
  {id:'wifi',number:'03',title:'Wi-Fi CSI Human Activity & Fall Recognition',type:'AI / SIGNAL INTELLIGENCE',summary:'A privacy-preserving indoor monitoring pipeline that recognizes human activity and fall events without cameras or wearable devices.',description:'Built a contactless sensing workflow using ESP32 Wi-Fi CSI data, Python-based dataset collection, and preprocessing with NumPy and Pandas. Applied Hampel and Savitzky-Golay filtering, sliding-window segmentation, and deep-learning experiments with LSTM, BiLSTM, and Transformer models in PyTorch to classify daily activities and fall events.',stack:['Python','PyTorch','ESP32','NumPy','Pandas','Matplotlib','LSTM','Transformers'],live:'',repo:'',impact:'CAMERA-FREE ACTIVITY RECOGNITION'},
  {id:'faceunlock',number:'04',title:'Face Unlock System Using Machine Learning',type:'COMPUTER VISION · SECURITY',summary:'A face-based authentication system for secure, contactless identity verification using a webcam and classical computer vision.',description:'Developed a face unlock system using Python and OpenCV. Implemented face detection with Haar Cascade classifiers, organized multi-user image datasets, and built a real-time recognition pipeline using the LBPH algorithm to match captured faces against stored data for access-control style use cases.',stack:['Python','OpenCV','Haar Cascade','LBPH','NumPy'],live:'',repo:'',impact:'REAL-TIME FACE AUTHENTICATION'},
 ],
 capabilities:[
  {id:'01',title:'AI & LLM Products',summary:'Designing user-facing AI experiences with strong product flow, reliable backend logic, and thoughtful response delivery.',tags:['LLM APIs','Prompt flows','SSE','FastAPI']},
  {id:'02',title:'Computer Vision Systems',summary:'Building applied vision workflows for secure recognition, image-based detection, and practical automation.',tags:['OpenCV','Haar Cascade','LBPH','Python']},
  {id:'03',title:'Full-Stack Engineering',summary:'Connecting interfaces, APIs, authentication, and data layers into end-to-end applications that feel complete.',tags:['React','Next.js','JWT','MongoDB']},
  {id:'04',title:'Data, Signals & ML',summary:'Turning raw data streams and sensor signals into clean datasets, useful models, and interpretable results.',tags:['PyTorch','NumPy','Pandas','ESP32']},
 ],
 skills:{
  'Languages':['Python','C++','C','Java','JavaScript','SQL'],
  'AI / ML & Deep Learning':['PyTorch','TensorFlow / Keras','Scikit-learn','LSTM','BiLSTM','Transformers','OpenCV','LLM Integration'],
  'Data & Signal Processing':['NumPy','Pandas','Matplotlib','Data Preprocessing','Hampel Filter','Savitzky-Golay Filter','Sliding Window Segmentation'],
  'Frontend':['React','Next.js','Vite','Tailwind CSS','HTML / CSS'],
  'Backend & Databases':['FastAPI','Node.js','REST APIs','JWT','SSE','MongoDB','PostgreSQL','MySQL','SQLite'],
  'Core CS & Tools':['Data Structures','Algorithms','OOP','DBMS','Linux','Git','GitHub','Jupyter','Vercel','Render','VS Code'],
 },
 milestones:[
  {year:'2021',title:'Programming foundations',summary:'Started the B.Sc. journey with programming, problem solving, and core computer science concepts.'},
  {year:'2024',title:'MCA at NIT Raipur',summary:'Moved into postgraduate study with a stronger focus on software engineering, AI, and scalable systems.'},
  {year:'2025',title:'Shipped full-stack AI products',summary:'Built and deployed AskLio and GitOrbit, combining backend systems, modern frontend interfaces, and live deployments.'},
  {year:'2026',title:'Mercor AI recognition',summary:'Completed Mercor’s “Introduction to Agents” course, demonstrating rigor, calibration, and clarity in AI agent evaluation.'},
 ],
 achievements:[
  {metric:'100+',title:'LeetCode problems',caption:'Data structures and algorithms practice'},
  {metric:'50+',title:'GeeksforGeeks problems',caption:'Structured problem solving'},
  {metric:'04',title:'Featured projects',caption:'AI, full-stack, sensing, vision'},
  {metric:'2026',title:'Mercor certified',caption:'AI agent evaluation recognition'},
 ],
 certificates:[
  'Mercor · Introduction to Agents',
  'HackerRank · Problem Solving',
  'iNeuron · Full Stack Web Development',
  'MySirG · C++ DSA Bootcamp',
  'CCC · B Grade',
  'Udemy · Programming Certification'
 ],
 featuredCertificate:{
  title:'Mercor AI Certified',
  subtitle:'Introduction to Agents',
  issuer:'Mercor',
  issued:'October 25, 2026',
  credential:'MRC-2026-B82G48PB',
  verifyLabel:'Verify authenticity',
  verifyUrl:'https://work.mercor.com/learn/verify/MRC-2026-B82G48PB',
  image:'/mercor-certificate.png'
 }
};
export const sectionList=[['home','Home'],['about','About'],['expertise','What I Do'],['projects','Projects'],['stack','Tech Stack'],['education','Education'],['journey','Journey'],['achievements','Achievements'],['contact','Contact']] as const;
