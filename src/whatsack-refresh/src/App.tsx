import { FormEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Bookmark, BookmarkCheck,
  Check, CheckCircle2, ChevronDown, ChevronRight, CircleHelp, ClipboardList,
  Compass, ExternalLink, Globe2, GraduationCap, HeartHandshake, HeartPulse,
  Info, LayoutGrid, MapPin, Menu, MessageCircle, PanelRightOpen, Search,
  Send, ShieldCheck, ShoppingBasket, SlidersHorizontal, Sparkles, UsersRound,
  X, type LucideIcon
} from 'lucide-react';
import { categories, demoPersonas, matchResources, resources, type Category, type DemoPersona, type Resource } from './data/resources';

const icons: Record<Category, LucideIcon> = {
  food: ShoppingBasket, education: GraduationCap, mental: HeartHandshake, community: UsersRound,
};
const palettes: Record<Category, string> = { food:'peach',education:'lavender',mental:'sky',community:'mint' };
type Language = 'en' | 'es';
type ModalName = 'resource' | 'demo' | 'companion' | 'assistant' | 'preferences' | 'saved' | null;

const labels = {
  en: {
    explore:'Explore resources', how:'How it works', companion:'Browser companion', tag:'A better way to find your way',
    headline1:'The right support.', headline2:'A clearer next step.',
    intro:'Finding help shouldn’t mean searching through a dozen websites. Tell us what you need, and explore resources that could help you move forward.',
    placeholder:'Try “I need help paying for college”', search:'Find support', examples:'Try searching for:',
    chip1:'Help with groceries',chip2:'Affordable college',chip3:'Job retraining',
    exploreHeading:'Support for wherever you are', exploreSub:'One place to begin, even when your needs overlap.',
    stepsEyebrow:'HOW WHATSACK WORKS',stepsHeading:'From questions to next steps.',
    step1:'Start with your situation',step1Desc:'Ask a question in your own words or explore by category.',
    step2:'Understand your options',step2Desc:'Compare demo resources with plain-language explanations and links.',
    step3:'Know what to do next',step3Desc:'Find questions to ask, people to contact, and official pages to visit.',
    browse:'Explore resources',resultsEyebrow:'RESOURCE EXPLORER',resultsTitle:'A place to start',
    resultsIntro:'Browse example records linked to organizations and public information pages. Always confirm current details directly with the provider.',
    resultsQuery:'Results for',featured:'A few places to start',all:'All categories',refine:'Refine preferences',
    empty:'No matching records found',emptyDesc:'Try a simpler search, select another category, or contact a local referral service.',
    clear:'Clear search',why:'Why this may fit',more:'View resource',next:'NextStep Insights',
    saved:'Saved',save:'Save',source:'Official website',learn:'Open official site',
    prototype:'Academic prototype',prototypeDesc:'This is an interactive class demonstration, not a live AI or continuously verified resource directory. Confirm programs, eligibility, hours, and costs directly with providers.',
    helper:'Need a little guidance?',helperDesc:'Try the guided text demo to explore how WhatSack could explain your options.',
    helperAction:'Try guided assistance',extTag:'THE BROWSER COMPANION',extTitle:'Helpful context, right beside the page.',
    extDesc:'See how a future browser companion could turn complicated information into clearer steps, while keeping the original source in view.',
    extAction:'Preview the companion',contact:'If you need urgent help',contactDesc:'For immediate danger, call 911. For mental health crisis support in the U.S., call or text 988.',
    footerTag:'Your needs are connected. Your path forward can be simpler.',
    demoLink:'Demo scenarios',review:'Sample records · Not live verified', back:'Back',
  },
  es: {
    explore:'Explorar recursos',how:'Cómo funciona',companion:'Asistente del navegador',tag:'Una forma más clara de encontrar apoyo',
    headline1:'El apoyo adecuado.',headline2:'Un siguiente paso claro.',
    intro:'Buscar ayuda no debería significar recorrer una docena de sitios web. Cuéntanos qué necesitas y explora recursos que podrían ayudarte.',
    placeholder:'Prueba «Necesito ayuda para pagar la universidad»',search:'Buscar apoyo',examples:'Prueba buscar:',
    chip1:'Ayuda con alimentos',chip2:'Universidad asequible',chip3:'Capacitación laboral',
    exploreHeading:'Apoyo para cada etapa',exploreSub:'Un punto de partida, incluso cuando tus necesidades se conectan.',
    stepsEyebrow:'CÓMO FUNCIONA',stepsHeading:'De preguntas a próximos pasos.',
    step1:'Comparte tu situación',step1Desc:'Haz una pregunta con tus propias palabras o explora por categoría.',
    step2:'Conoce tus opciones',step2Desc:'Compara recursos de demostración con explicaciones y enlaces.',
    step3:'Da el siguiente paso',step3Desc:'Encuentra preguntas, contactos y páginas oficiales.',
    browse:'Explorar recursos',resultsEyebrow:'EXPLORADOR DE RECURSOS',resultsTitle:'Un lugar para comenzar',
    resultsIntro:'Explora ejemplos de recursos con enlaces oficiales. Confirma los detalles actuales directamente con cada organización.',
    resultsQuery:'Resultados para',featured:'Recursos destacados',all:'Todas las categorías',refine:'Filtrar preferencias',
    empty:'No encontramos resultados',emptyDesc:'Intenta otra búsqueda, elige una categoría o consulta un servicio local de referencias.',
    clear:'Borrar búsqueda',why:'Por qué podría ayudar',more:'Ver recurso',next:'Próximos pasos',
    saved:'Guardado',save:'Guardar',source:'Sitio oficial',learn:'Abrir sitio oficial',
    prototype:'Prototipo académico',prototypeDesc:'Esta es una demostración interactiva, no una IA en vivo ni un directorio actualizado constantemente. Confirma los programas y requisitos con los proveedores.',
    helper:'¿Necesitas orientación?',helperDesc:'Prueba la demostración de asistencia por texto.',
    helperAction:'Probar la asistencia',extTag:'ASISTENTE DEL NAVEGADOR',extTitle:'Información útil, junto a la página.',
    extDesc:'Mira cómo un futuro asistente podría explicar información compleja sin perder de vista la fuente original.',
    extAction:'Ver la demostración',contact:'Si necesitas ayuda urgente',contactDesc:'En peligro inmediato, llama al 911. Para apoyo de crisis de salud mental en EE. UU., llama o envía un texto al 988.',
    footerTag:'Tus necesidades están conectadas. Encontrar apoyo puede ser más sencillo.',
    demoLink:'Escenarios de demostración',review:'Recursos de ejemplo · Sin verificación en vivo',back:'Volver',
  },
};

function Brand({onClick}: {onClick?: () => void}) {
  return <button className="brand" type="button" onClick={onClick} aria-label="WhatSack homepage">
    <span className="brand-mark"><span className="brand-mark-loop"/><span className="brand-mark-base">w.</span></span>
    <span className="brand-name">what<span>sack</span><span className="brand-dot">.</span></span>
  </button>;
}

function CategoryIcon({category,size=20}: {category:Category;size?:number}) {
  const Icon=icons[category]; return <Icon size={size} strokeWidth={1.9}/>;
}

function Modal({children,onClose,title,wide=false,className=''}:{children:ReactNode;onClose:()=>void;title:string;wide?:boolean;className?:string}){
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const prev=document.activeElement as HTMLElement | null;
    const handle=(ev:KeyboardEvent)=>{if(ev.key==='Escape')onClose();};
    document.addEventListener('keydown',handle);
    const first=ref.current?.querySelector<HTMLElement>('button, input, select, a[href]'); first?.focus();
    return ()=>{document.removeEventListener('keydown',handle);prev?.focus?.();};
  },[onClose]);
  return <div className="modal-scrim" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
    <div ref={ref} className={`modal-shell ${wide?'modal-wide':''} ${className}`} role="dialog" aria-modal="true" aria-label={title}>
      <button className="modal-close" aria-label="Close dialog" onClick={onClose}><X size={21}/></button>
      {children}
    </div>
  </div>;
}

function ResourceCard({resource,lang,onOpen,saved,onToggleSave}:{resource:Resource;lang:Language;onOpen:()=>void;saved:boolean;onToggleSave:()=>void}){
  const Icon=icons[resource.category];
  return <article className="resource-card">
    <div className="resource-top">
      <span className={`resource-icon ${palettes[resource.category]}`}><Icon size={21} strokeWidth={1.85}/></span>
      <button type="button" className={`icon-action ${saved?'is-saved':''}`} onClick={onToggleSave} aria-label={saved?'Remove saved resource':'Save resource'} title={saved?'Remove bookmark':'Save for this session'}>
        {saved?<BookmarkCheck size={19}/>:<Bookmark size={19}/>}
      </button>
    </div>
    <p className="card-organization">{resource.organization}</p>
    <h3>{resource.title}</h3>
    <p className="card-description">{lang==='es'&&resource.descriptionEs?resource.descriptionEs:resource.description}</p>
    <div className="card-bottom">
      <span className="card-place"><MapPin size={14}/>{resource.location}</span>
      <button type="button" className="text-link" onClick={onOpen}>{labels[lang].more}<ArrowUpRight size={16}/></button>
    </div>
  </article>;
}

type ChatMessage = {id:number; role:'user'|'assistant';body:string;matches?:Resource[]};
function assistantResponse(q:string):{body:string;matches:Resource[]} {
  const lower=q.toLowerCase();
  if(/suicid|self.harm|kill myself|hurt myself|end my life/i.test(q)) {
    return {body:'I’m sorry you’re going through this. This demo cannot provide crisis care. If you are in the U.S., call or text 988 to talk with a crisis counselor now. For immediate danger, call 911.', matches:resources.filter(r=>r.id==='988')};
  }
  const matches=matchResources(q).slice(0,2);
  if(!matches.length)return {body:'I couldn’t find a clear match in this small demo collection. Try a more specific question, browse a category, or ask 211 Bay Area about local referrals. This prototype does not check live availability.',matches:[]};
  return {body:`A place to begin might be ${matches[0].organization}. I can show you public resource pages and questions to ask, but I can’t determine eligibility or confirm current availability. Here are ${matches.length} possible starting points:`,matches};
}

export default function App() {
  const [lang,setLang]=useState<Language>('en');
  const t=labels[lang];
  useEffect(()=>{document.documentElement.lang=lang;},[lang]);
  const [query,setQuery]=useState('');
  const [submitted,setSubmitted]=useState('');
  const [activeCategory,setActiveCategory]=useState<Category|'all'>('all');
  const [hasSearched,setHasSearched]=useState(false);
  const [modal,setModal]=useState<ModalName>(()=>new URLSearchParams(window.location.search).get('demo')==='1'?'demo':null);
  const [selectedResource,setSelectedResource]=useState<Resource|null>(null);
  const [savedIds,setSavedIds]=useState<string[]>([]);
  const [selectedPersona,setSelectedPersona]=useState<DemoPersona|null>(null);
  const [mobileOpen,setMobileOpen]=useState(false);
  const [region,setRegion]=useState('any');
  const [draftRegion,setDraftRegion]=useState('any');
  const [companionTopic,setCompanionTopic]=useState<'food'|'education'>('food');
  const [chatInput,setChatInput]=useState('');
  const [chatMessages,setChatMessages]=useState<ChatMessage[]>([{id:0,role:'assistant',body:'Hi! This is a guided demonstration of how WhatSack might help navigate resources. What are you looking for today?'}]);
  const resultsRef=useRef<HTMLElement>(null);
  const inputRef=useRef<HTMLInputElement>(null);

  useEffect(()=>{
    const handler=(e:KeyboardEvent)=>{if((e.altKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==='d'){e.preventDefault();setModal('demo');}};
    window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler);
  },[]);

  const closeModal=useCallback(()=>{setModal(null);setSelectedResource(null);},[]);
  const scrollTo=(id:string)=>{setMobileOpen(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});};
  const goHome=()=>{closeModal();setSubmitted('');setHasSearched(false);setActiveCategory('all');setSelectedPersona(null);window.scrollTo({top:0,behavior:'smooth'});};
  const goExplore=()=>{setHasSearched(true);setMobileOpen(false);setTimeout(()=>scrollTo('resources'),20);};
  const submitSearch=(e?:FormEvent<HTMLFormElement>,value?:string)=>{
    e?.preventDefault(); const text=(value??query).trim();
    setQuery(text);setSubmitted(text);setActiveCategory('all');setHasSearched(true);setSelectedPersona(null);
    setTimeout(()=>scrollTo('resources'),25);
  };
  const selectCategory=(category:Category|'all')=>{
    setSubmitted('');setQuery('');setSelectedPersona(null);setActiveCategory(category);setHasSearched(true);setTimeout(()=>scrollTo('resources'),25);
  };
  const choosePersona=(p:DemoPersona)=>{
    setSelectedPersona(p);setQuery(lang==='es'&&p.questionEs?p.questionEs:p.question);
    setSubmitted(lang==='es'&&p.questionEs?p.questionEs:p.question);setActiveCategory(p.category);setHasSearched(true);closeModal();setTimeout(()=>scrollTo('resources'),30);
  };
  const openResource=(r:Resource)=>{setSelectedResource(r);setModal('resource');};
  const toggleSaved=(id:string)=>setSavedIds(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id]);
  const results=useMemo(()=>{
    let list=hasSearched?matchResources(submitted,activeCategory):resources.filter(r=>['second-harvest-food','fafsa','scc-bhs','aaci-seniors'].includes(r.id));
    if(region!=='any')list=list.filter(r=>{
      const x=r.location.toLowerCase();return x.includes(region==='santa-clara'?'santa clara':'san mateo')||x.includes('california')||x.includes('bay area')||x.includes('united states');
    });
    return list;
  },[hasSearched,submitted,activeCategory,region]);
  const activeFilterLabel=activeCategory==='all'?t.all:categories.find(c=>c.id===activeCategory)?.[lang==='es'?'es':'label'];
  const sendChat=(e?:FormEvent<HTMLFormElement>,preset?:string)=>{
    e?.preventDefault();const q=(preset??chatInput).trim();if(!q)return;
    const last=chatMessages[chatMessages.length-1]?.id??0;
    const reply=assistantResponse(q);
    setChatMessages(v=>[...v,{id:last+1,role:'user',body:q},{id:last+2,role:'assistant',...reply}]);setChatInput('');
  };

  return <div className="site-wrap">
    <div className="top-note"><span className="top-note-dot"/> Made for navigating what matters <span className="top-note-split"/> Research prototype · Silicon Valley</div>
    <header className="site-header">
      <div className="container nav-inner">
        <Brand onClick={goHome}/>
        <nav className={`main-nav ${mobileOpen?'mobile-visible':''}`} aria-label="Main navigation">
          <button onClick={goExplore}>{t.explore}</button>
          <button onClick={()=>scrollTo('how-it-works')}>{t.how}</button>
          <button onClick={()=>{setModal('companion');setMobileOpen(false);}}>{t.companion}</button>
        </nav>
        <div className="nav-actions">
          <button className="language-switch" title="Change interface language" onClick={()=>setLang(lang==='en'?'es':'en')} aria-label={lang==='en'?'Switch to Spanish':'Cambiar a inglés'}><Globe2 size={16}/><span>{lang==='en'?'ES':'EN'}</span></button>
          <button className="nav-saved" aria-label={`View saved resources (${savedIds.length})`} onClick={()=>setModal('saved')}><Bookmark size={18}/><span>{savedIds.length}</span></button>
          <button className="nav-cta" onClick={goExplore}>{t.explore}<ArrowUpRight size={16}/></button>
          <button className="mobile-menu" aria-label="Toggle navigation" aria-expanded={mobileOpen} onClick={()=>setMobileOpen(v=>!v)}>{mobileOpen?<X size={23}/>:<Menu size={23}/>}</button>
        </div>
      </div>
    </header>

    <main id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="eyebrow"><span className="eyebrow-icon"><Sparkles size={13}/></span>{t.tag}</div>
            <h1 id="hero-title">{t.headline1}<br/><span>{t.headline2}</span></h1>
            <p className="hero-lead">{t.intro}</p>
            <form className="hero-search" onSubmit={submitSearch} role="search">
              <Search size={21} className="hero-search-icon" aria-hidden="true"/>
              <input ref={inputRef} value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.placeholder} aria-label="Search community resources"/>
              <button type="submit" className="hero-search-button">{t.search}<ArrowRight size={18}/></button>
            </form>
            <div className="try-row"><span>{t.examples}</span>
              <div className="try-options">
                <button onClick={()=>submitSearch(undefined,lang==='es'?'Necesito ayuda con alimentos':'Where can I get groceries?')}>{t.chip1}</button>
                <button onClick={()=>submitSearch(undefined,lang==='es'?'Ayuda para pagar la universidad':'I need help paying for college')}>{t.chip2}</button>
                <button onClick={()=>submitSearch(undefined,lang==='es'?'Busco formación laboral':'I was laid off and need career training')}>{t.chip3}</button>
              </div>
            </div>
            <div className="hero-assurance"><ShieldCheck size={16}/><span>No account needed to explore · No personal details required</span></div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-halo art-halo-one"/><div className="art-halo art-halo-two"/>
            <div className="art-label art-label-top"><span className="sparkle-dot">✳</span> Your next step, made clearer</div>
            <div className="art-card">
              <div className="art-card-top"><span className="art-mini-logo">w.</span><span>what<span className="art-green">sack</span></span><div className="art-top-dots"><i/><i/><i/></div></div>
              <div className="art-question"><span className="art-small-label">START WITH A QUESTION</span><p>“I want to find a new career. Where do I begin?”</p></div>
              <div className="art-divider"/>
              <div className="art-answer-heading"><span className="art-check"><Check size={13}/></span><span>Here’s a place to start</span></div>
              <div className="art-answer">
                <div className="art-answer-logo"><GraduationCap size={21}/></div>
                <div><strong>Explore training options</strong><span>Career pathways & official resources</span></div>
                <ArrowUpRight size={17} className="art-answer-arrow"/>
              </div>
              <div className="art-nextsteps"><span className="mini-star">✳</span><div><b>NextStep Insights</b><p>Compare costs, flexible schedules, and funding before choosing.</p></div></div>
              <div className="art-bottom"><span><CheckCircle2 size={13}/> A clear way forward</span><span>01 / 03</span></div>
            </div>
            <div className="art-label art-label-bottom"><span className="art-sun">↗</span> One step at a time</div>
          </div>
        </div>
        <div className="hero-bottom-line"/>
      </section>

      <section className="categories-section" id="categories" aria-labelledby="categories-title">
        <div className="container">
          <div className="section-top"><div><div className="eyebrow small"><span className="tiny-line"/>EXPLORE BY NEED</div><h2 id="categories-title">{t.exploreHeading}</h2><p>{t.exploreSub}</p></div><button className="underlined-cta" onClick={goExplore}>{t.browse}<ArrowUpRight size={16}/></button></div>
          <div className="category-grid">
            {categories.map((cat,index)=><button className={`category-card ${palettes[cat.id]}`} key={cat.id} type="button" onClick={()=>selectCategory(cat.id)}>
              <span className="category-icon"><CategoryIcon category={cat.id} size={25}/></span>
              <span className="category-number">0{index+1}</span>
              <span className="category-title">{lang==='es'?cat.es:cat.label}</span>
              <span className="category-bottom"><span>{lang==='es'?cat.lineEs:cat.line}</span><ArrowUpRight size={20}/></span>
            </button>)}
          </div>
        </div>
      </section>

      <section className="results-section" id="resources" ref={resultsRef} aria-labelledby="results-title">
        <div className="container">
          <div className="results-header">
            <div><div className="eyebrow small"><span className="tiny-line"/>{t.resultsEyebrow}</div><h2 id="results-title">{submitted?t.resultsQuery+':':hasSearched? t.resultsTitle:t.featured}</h2>{submitted?<p className="query-quote">“{submitted}”</p>:<p className="results-note">{t.resultsIntro}</p>}
              {selectedPersona&&<div className="demo-active"><span className="demo-active-dot"/> Demo scenario: {selectedPersona.name}<button onClick={()=>{setSelectedPersona(null);setSubmitted('');setQuery('');setActiveCategory('all');}} aria-label="Clear demo scenario"><X size={13}/></button></div>}
            </div>
            <div className="results-header-actions"><button className="refine-button" onClick={()=>{setDraftRegion(region);setModal('preferences');}}><SlidersHorizontal size={16}/>{t.refine}{region!=='any'&&<span className="filter-active-dot"/>}</button></div>
          </div>
          <div className="filter-row" role="group" aria-label="Filter by resource category">
            <button onClick={()=>selectCategory('all')} className={activeCategory==='all'?'active':''}>{t.all}</button>
            {categories.map(cat=><button key={cat.id} onClick={()=>selectCategory(cat.id)} className={activeCategory===cat.id?'active':''}>{lang==='es'?cat.es:cat.label}</button>)}
            {(submitted||region!=='any')&&<button className="reset-search" onClick={()=>{setQuery('');setSubmitted('');setActiveCategory('all');setRegion('any');setHasSearched(true);setSelectedPersona(null);}}>{t.clear}<X size={13}/></button>}
          </div>
          <div className="results-count"><span>{results.length} {results.length===1?'resource':'resources'} <span className="count-separator">·</span> {activeFilterLabel}</span><span><span className="result-indicator"/>{t.review}</span></div>
          {results.length>0?<div className="resource-grid">
            {results.map(r=><ResourceCard key={r.id} resource={r} lang={lang} saved={savedIds.includes(r.id)} onToggleSave={()=>toggleSaved(r.id)} onOpen={()=>openResource(r)}/>)}
          </div>:<div className="empty-results"><Search size={31}/><h3>{t.empty}</h3><p>{t.emptyDesc}</p><button onClick={()=>{setSubmitted('');setQuery('');setRegion('any');setActiveCategory('all');setHasSearched(true);}} className="button button-dark">{t.clear}<ArrowRight size={16}/></button></div>}
          {!hasSearched&&<div className="see-all"><button className="button button-outline" onClick={goExplore}>{t.explore} <ArrowRight size={17}/></button></div>}
        </div>
      </section>

      <section className="how-section" id="how-it-works" aria-labelledby="how-title"><div className="container">
        <div className="how-header"><div className="eyebrow small"><span className="tiny-line"/>{t.stepsEyebrow}</div><h2 id="how-title">{t.stepsHeading}</h2></div>
        <div className="step-grid">
          <div className="step-card"><div className="step-number">01</div><div className="step-icon"><MessageCircle size={25}/></div><h3>{t.step1}</h3><p>{t.step1Desc}</p></div>
          <div className="step-card"><div className="step-number">02</div><div className="step-icon"><Compass size={25}/></div><h3>{t.step2}</h3><p>{t.step2Desc}</p></div>
          <div className="step-card"><div className="step-number">03</div><div className="step-icon"><CheckCircle2 size={25}/></div><h3>{t.step3}</h3><p>{t.step3Desc}</p></div>
        </div>
      </div></section>

      <section className="feature-section" id="companion">
        <div className="container feature-layout">
          <div className="feature-panel"><div className="feature-browser"><div className="browser-chrome"><div className="browser-circles"><i/><i/><i/></div><span>example-resource-page.org</span><span className="chrome-menu">•••</span></div>
            <div className="browser-sample"><div className="browser-sample-tag">EXAMPLE RESOURCE PAGE</div><div className="browser-line thick"/><div className="browser-line mid"/><div className="browser-line short"/><div className="browser-line mid"/></div>
            <div className="browser-side"><div className="side-mark"><span>w.</span> WhatSack</div><div className="side-mini-heading">Making this simpler</div><div className="side-line"/><div className="side-card"><Sparkles size={15}/><span>Understand the key steps, without losing the source.</span></div><div className="side-link">View next steps <ArrowRight size={13}/></div></div>
          </div></div>
          <div className="feature-copy"><div className="eyebrow small"><span className="tiny-line"/>{t.extTag}</div><h2>{t.extTitle}</h2><p>{t.extDesc}</p><button className="button button-dark" onClick={()=>setModal('companion')}>{t.extAction}<ArrowUpRight size={17}/></button><div className="feature-note"><Info size={15}/>Interactive simulation, not an installed browser extension</div></div>
        </div>
      </section>

      <section className="bottom-cta"><div className="container bottom-cta-inner">
        <div><div className="eyebrow small"><span className="tiny-line"/>GUIDED EXPERIENCE</div><h2>{t.helper}</h2><p>{t.helperDesc}</p></div>
        <button className="button button-cream" onClick={()=>setModal('assistant')}>{t.helperAction}<ArrowUpRight size={17}/></button>
      </div></section>
    </main>

    <footer className="footer"><div className="container">
      <div className="footer-primary"><div className="footer-brand"><Brand onClick={goHome}/><p>{t.footerTag}</p></div><div className="footer-links"><button onClick={goExplore}>{t.explore}</button><button onClick={()=>scrollTo('how-it-works')}>{t.how}</button><button onClick={()=>setModal('companion')}>{t.companion}</button></div></div>
      <div className="footer-notice"><ShieldCheck size={18}/><div><strong>{t.prototype}</strong><p>{t.prototypeDesc}</p><p className="crisis-line">{t.contactDesc}</p></div></div>
      <div className="footer-bottom"><span>© 2026 WhatSack · MCOM 284 Academic Prototype</span><button className="subtle-demo-link" onClick={()=>setModal('demo')} aria-label="Open class demo scenarios"><LayoutGrid size={13}/>{t.demoLink}</button></div>
    </div></footer>

    {modal==='resource'&&selectedResource&&<Modal onClose={closeModal} title={selectedResource.title} wide>
      <div className="resource-modal-pad">
        <span className={`resource-icon ${palettes[selectedResource.category]} big`}><CategoryIcon category={selectedResource.category} size={27}/></span>
        <div className="modal-eyebrow">{selectedResource.organization} <span>·</span> {selectedResource.location}</div>
        <h2 className="modal-title">{selectedResource.title}</h2><p className="modal-description">{lang==='es'&&selectedResource.descriptionEs?selectedResource.descriptionEs:selectedResource.description}</p>
        <div className="why-box"><div className="why-title"><Sparkles size={17}/>{t.why}</div><p>{lang==='es'&&selectedResource.whyEs?selectedResource.whyEs:selectedResource.why}</p></div>
        <div className="resource-details-grid">
          <div><span>Location / service area</span><strong>{selectedResource.location}</strong></div>
          <div><span>Cost</span><strong>{selectedResource.cost}</strong></div>
          <div><span>Eligibility</span><strong>{selectedResource.eligibility}</strong></div>
          <div><span>Contact</span><strong>{selectedResource.contact}</strong></div>
          <div><span>Schedule</span><strong>{selectedResource.hours}</strong></div>
          <div><span>Language & accessibility</span><strong>{selectedResource.languages}; {selectedResource.accessibility}</strong></div>
        </div>
        <div className="next-steps"><h3><ClipboardList size={19}/>{t.next}</h3>
          {(lang==='es'&&selectedResource.nextStepsEs?selectedResource.nextStepsEs:selectedResource.nextSteps).map((s,i)=><div className="next-step" key={i}><span>{i+1}</span><p>{s}</p></div>)}
        </div>
        <div className="resource-modal-footer"><div className="source-note"><ShieldCheck size={15}/>Demo reference · Confirm current details on the original site</div><div className="modal-buttons"><button className="button button-outline" onClick={()=>toggleSaved(selectedResource.id)}>{savedIds.includes(selectedResource.id)?<BookmarkCheck size={17}/>:<Bookmark size={17}/>} {savedIds.includes(selectedResource.id)?t.saved:t.save}</button><a className="button button-dark" href={selectedResource.url} target="_blank" rel="noopener noreferrer">{t.learn}<ExternalLink size={16}/></a></div></div>
      </div>
    </Modal>}

    {modal==='demo'&&<Modal title="Demo scenarios" onClose={closeModal} wide>
      <div className="demo-modal-pad"><div className="modal-eyebrow">INSTRUCTOR & CLASS DEMONSTRATION</div><h2 className="modal-title">Explore the five user journeys.</h2><p className="modal-description">These fictional personas are used to test and present the WhatSack concept. They are intentionally separate from the public-facing search experience.</p>
      <div className="demo-list">
        {demoPersonas.map(p=><button key={p.id} className="demo-row" onClick={()=>choosePersona(p)}><span className={`demo-avatar ${palettes[p.category]}`}>{p.name[0]}</span><span className="demo-person-text"><strong>{p.name}<small> · {p.age}</small></strong><span>{p.label}</span><em>“{lang==='es'&&p.questionEs?p.questionEs:p.question}”</em></span><ArrowRight size={20}/></button>)}
      </div><div className="demo-help"><Info size={15}/><span>Choosing a scenario fills the search and shows suggested resources. This is a scripted demonstration, not a live AI evaluation.</span></div></div>
    </Modal>}

    {modal==='companion'&&<Modal title="Browser companion preview" onClose={closeModal} wide className="companion-modal">
      <div className="companion-head"><div><div className="modal-eyebrow">BROWSER COMPANION · INTERACTIVE PREVIEW</div><h2 className="modal-title">Help, right beside the source.</h2><p>See how the proposed extension might make a public-information webpage easier to navigate.</p></div></div>
      <div className="companion-controls"><span>Choose an example page:</span><button className={companionTopic==='food'?'selected':''} onClick={()=>setCompanionTopic('food')}>Food assistance</button><button className={companionTopic==='education'?'selected':''} onClick={()=>setCompanionTopic('education')}>Financial aid</button></div>
      <div className="companion-preview">
        <div className="companion-web"><div className="fake-browser-bar"><span className="fake-dots">● ● ●</span><span>Sample page · For illustration only</span></div><div className="fake-page"><span className="fake-page-eyebrow">DEMONSTRATION WEBPAGE</span><h3>{companionTopic==='food'?'Exploring food assistance':'Exploring college financial aid'}</h3><p>{companionTopic==='food'?'Programs may have different application and eligibility processes. Changes in household circumstances may affect available options.':'College costs, application timelines, and aid programs depend on the institution and individual circumstances.'}</p><p className="fake-page-blurb">This is a simplified sample, not a reproduction of an official government page.</p></div></div>
        <div className="companion-assist"><div className="assist-brand"><span className="assist-logo">w.</span><span>WhatSack <small>companion</small></span></div><span className="assist-label"><Sparkles size={14}/> PLAIN-LANGUAGE SUMMARY</span><h3>{companionTopic==='food'?'What this means for you':'A simpler way to think about aid'}</h3><p>{companionTopic==='food'?'A recent job loss may change household finances. Check with the responsible agency whether your household should be reassessed. You can also explore immediate food resources.':'Start with official aid information, compare total college costs, and confirm relevant deadlines. A financial-aid advisor can help with specific questions.'}</p><div className="assist-next"><strong>Suggested next step</strong><p>{companionTopic==='food'?'Contact a CalFresh assistance provider and ask how to report a change in income.':'Open the official FAFSA page and ask a college financial-aid office about deadlines.'}</p></div><a href={companionTopic==='food'?'https://www.shfb.org/get-food/calfresh/':'https://studentaid.gov/h/apply-for-aid/fafsa'} target="_blank" rel="noopener noreferrer">Open official reference <ExternalLink size={15}/></a></div>
      </div><div className="companion-disclaimer"><ShieldCheck size={16}/> Preview only. This is a simulated, permission-conscious extension design; it does not read webpages, install an extension, or make live eligibility decisions.</div>
    </Modal>}

    {modal==='assistant'&&<Modal title="Guided assistance demonstration" onClose={closeModal} className="chat-modal">
      <div className="chat-head"><span className="chat-head-icon"><MessageCircle size={21}/></span><div><h2>Ask WhatSack</h2><p>Guided text demo · Prepared resource collection</p></div></div>
      <div className="chat-notice"><Info size={15}/>Scripted prototype responses. Not a live AI service or eligibility determination.</div>
      <div className="chat-messages" aria-live="polite">
        {chatMessages.map(m=><div className={`chat-bubble-row ${m.role}`} key={m.id}><div className={`chat-bubble ${m.role}`}><p>{m.body}</p>{m.matches?.map(r=><button key={r.id} className="chat-result" onClick={()=>openResource(r)}><strong>{r.title}</strong><span>{r.organization} <ArrowUpRight size={13}/></span></button>)}</div></div>)}
      </div>
      {chatMessages.length===1&&<div className="chat-suggestions"><button onClick={()=>sendChat(undefined,'I need help finding groceries')}>Find groceries</button><button onClick={()=>sendChat(undefined,'I need affordable career training')}>Career training</button><button onClick={()=>sendChat(undefined,'I want to find local community activities')}>Community activities</button></div>}
      <form className="chat-input-row" onSubmit={sendChat}><input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Ask about food, school, work, or support…" aria-label="Enter question for guided demo"/><button aria-label="Send question" type="submit" disabled={!chatInput.trim()}><Send size={18}/></button></form>
    </Modal>}

    {modal==='preferences'&&<Modal title="Refine preferences" onClose={closeModal}>
      <div className="pref-modal-pad"><div className="modal-eyebrow">OPTIONAL PREFERENCES</div><h2 className="modal-title">Find a closer starting point.</h2><p className="modal-description">Choose a service area to narrow the example records. No personal details are stored or sent anywhere.</p>
        <label className="field-label" htmlFor="region">Preferred service area</label><select id="region" className="form-select" value={draftRegion} onChange={e=>setDraftRegion(e.target.value)}><option value="any">Anywhere in Silicon Valley</option><option value="santa-clara">Santa Clara County</option><option value="san-mateo">San Mateo County</option></select>
        <div className="preference-tip"><ShieldCheck size={17}/>Region matching is approximate. Confirm specific service boundaries with providers.</div>
        <div className="pref-actions"><button className="button button-outline" onClick={()=>{setDraftRegion('any');setRegion('any');closeModal();}}>Reset</button><button className="button button-dark" onClick={()=>{setRegion(draftRegion);setHasSearched(true);closeModal();setTimeout(()=>scrollTo('resources'),10);}}>Apply preferences <ArrowRight size={17}/></button></div>
      </div>
    </Modal>}

    {modal==='saved'&&<Modal title="Saved resources" onClose={closeModal}>
      <div className="saved-modal-pad"><div className="modal-eyebrow">YOUR SHORTLIST</div><h2 className="modal-title">Saved for this visit.</h2><p className="modal-description">Bookmarks are kept only in this browser session and will reset if you refresh the page.</p>
        {savedIds.length===0?<div className="saved-empty"><Bookmark size={32}/><p>No saved resources yet.</p><span>Use the bookmark icon on any resource card to add it here.</span></div>:<div className="saved-list">{resources.filter(r=>savedIds.includes(r.id)).map(r=><div key={r.id} className="saved-row"><div><strong>{r.title}</strong><span>{r.organization}</span></div><button onClick={()=>openResource(r)}>View <ArrowUpRight size={15}/></button></div>)}</div>}
      </div>
    </Modal>}
  </div>;
}
