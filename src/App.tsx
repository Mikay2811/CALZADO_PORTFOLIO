/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Mail, 
  ExternalLink, 
  Code2, 
  GraduationCap, 
  Briefcase, 
  User, 
  FileText, 
  Wrench, 
  BookOpen,
  ChevronRight,
  Menu,
  X,
  Linkedin,
  Globe,
  Phone,
  MapPin
} from 'lucide-react';
import { cn } from './lib/utils';
import { Toaster, toast } from 'sonner';

// --- Types ---
interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  documentation?: string;
}

interface Skill {
  category: string;
  items: string[];
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: "RAKETERO",
    description: "a gig and freelance job marketplace platform — a digital place where freelancers (“raketeros”) and people looking for gig workers can connect, find work, or post jobs. ",
    image: "https://scontent.fceb1-4.fna.fbcdn.net/v/t39.30808-6/649053521_942874204873601_3717226035478119266_n.webp?_nc_cat=107&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeEjREdpfYZL_WYRT2JbuQ4GSzSLN_7pkeFLNIs3_umR4Rf9uZ6Ee9ZdRQsdBt1L-3P1HF-hsp9oeejEeSviThdH&_nc_ohc=c2_uhDzvA6QQ7kNvwFhF6iQ&_nc_oc=Adr3ct0zn3GYCHMb1I-3XqnwnoKpiNFD6nSZFQaNp05Cfnfgi9MrBLbT81Ew9Hr-5w8&_nc_zt=23&_nc_ht=scontent.fceb1-4.fna&_nc_gid=Bhi5_oE1tJhkHoJgMxRvTw&_nc_ss=7a3a8&oh=00_Af3qZqXMAwTTOR6fT18lTCC8vvG3cnRwp0p9myBGAKxvmQ&oe=69D814B0",
    tags: ["React", "Node.js", "D3.js", "PostgreSQL"],
    link: "#",
    github: "https://github.com",
    documentation: "#"
  }
];

const SKILLS: Skill[] = [
  {
    category: "Programming Languages",
    items: ["TypeScript", "JavaScript", "HTML", "Cxx", "C++", "SQL"]
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Next.js", "Node.js"]
  },
  {
    category: "Tools & Technologies",
    items: ["Git", "AWS", "Firebase", "PostgreSQL", "MongoDB"]
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Portfolio', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "sticky top-0 w-full z-40 transition-all duration-300",
      scrolled ? "bg-white/90 backdrop-blur-md border-b border-zinc-100 py-3" : "bg-white/50 backdrop-blur-sm py-5"
    )}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <a href="#home" className="text-xl font-black tracking-tighter text-zinc-900">
          IM.
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                {link.name}
              </a>
          ))}
          <a 
            href="#contact"
            className="px-5 py-2 bg-zinc-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/10"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-zinc-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-b border-zinc-200 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-10">
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 mb-3">{title}</h2>
    {subtitle && <p className="text-zinc-500 max-w-2xl text-sm leading-relaxed">{subtitle}</p>}
    <div className="h-1 w-12 bg-zinc-900 mt-6 rounded-full" />
  </div>
);

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xqegegev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `New Portfolio Message from ${formState.name}`
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success('Message sent successfully!');
        setFormState({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        const errorMessage = data.errors?.[0]?.message || 'Something went wrong. Please try again.';
        toast.error(errorMessage);
        console.error('Formspree Error:', data);
      }
    } catch (error) {
      toast.error('Failed to send message. Check your connection.');
      console.error('Submission Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4 selection:bg-zinc-200">
      <Toaster position="bottom-right" />
      
      <AnimatePresence>
        {!isModalOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-zinc-900 text-white rounded-full font-bold shadow-2xl hover:bg-zinc-800 transition-all z-10"
          >
            Open Portfolio
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[800px] h-full max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 z-[60] p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors text-zinc-900"
              >
                <X size={20} />
              </button>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto scroll-smooth">
                <Navbar />
                
                {/* Hero Section (Home) */}
                <section id="home" className="pt-24 pb-20 px-8">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-zinc-100 text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
                        Available for Opportunities
                      </span>
                      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-6 leading-tight">
                        Issa Mikaela <br />
                        Calzado
                      </h1>
                      <p className="text-base text-zinc-600 mb-8 max-w-lg leading-relaxed">
                        Computer Engineering Student specializing in Software Engineering. 
                        Passionate about building scalable systems and intelligent applications.
                      </p>
                      
                      <div className="flex flex-wrap gap-4 mb-12">
                        <motion.a 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href="https://github.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 bg-[#18181b] text-white rounded-xl hover:bg-black transition-all font-bold text-sm"
                        >
                          <Github size={16} /> GitHub
                        </motion.a>
                        <motion.a 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href="#contact" 
                          className="flex items-center gap-2 px-5 py-2.5 border border-zinc-200 text-zinc-900 rounded-xl hover:bg-zinc-50 transition-all font-bold text-sm"
                        >
                          <Mail size={16} /> Contact
                        </motion.a>
                      </div>

                      <div className="flex gap-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Program</span>
                          <span className="text-sm font-bold text-zinc-900 tracking-tight">BS Computer Engineering</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Track</span>
                          <span className="text-sm font-bold text-zinc-900 tracking-tight">Software Engineering</span>
                        </div>
                      </div>
                    </motion.div>

                    <div className="flex flex-col gap-6">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative aspect-square w-full max-w-[350px] rounded-full overflow-hidden shadow-2xl mx-auto border-4 border-white"
                      >
                        <img 
                          src="/id_formal.jpeg" 
                          alt="Issa Mikaela Calzado" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "id_formal.jpeg";
                          }}
                        />
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap gap-3 justify-center"
                      >
                        <a href="mailto:issamikaela@gmail.com" className="contact-card group !px-4 !py-2.5">
                          <div className="icon-box !w-8 !h-8">
                            <Mail size={14} className="text-white" />
                          </div>
                          <span className="text !text-[11px]">issamikaela@gmail.com</span>
                        </a>
                        <div className="contact-card group !px-4 !py-2.5">
                          <div className="icon-box !w-8 !h-8">
                            <Phone size={14} className="text-white" />
                          </div>
                          <span className="text !text-[11px]">09070921908</span>
                        </div>
                        <div className="contact-card group !px-4 !py-2.5">
                          <div className="icon-box !w-8 !h-8">
                            <MapPin size={14} className="text-white" />
                          </div>
                          <span className="text !text-[11px]">Llorente Eastern Samar</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </section>

      {/* About Me Section */}
      <section id="about" className="py-20 px-8 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="About Me" subtitle="My journey, academic background, and career aspirations." />
          
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-4 tracking-tight">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                    <GraduationCap className="text-zinc-900" size={20} />
                  </div>
                  Academic Background
                </h3>
                <p className="text-zinc-600 leading-relaxed mb-4 text-sm">
                  I am currently pursuing my Bachelor of Science in Computer Engineering, where I've maintained a strong focus on algorithmic efficiency and system design. My coursework has covered advanced data structures, machine learning, and cloud computing.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-4 text-xs text-zinc-600">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-900 shrink-0" />
                    <span className="font-medium tracking-tight">Relevant Coursework: Distributed Systems, AI Ethics, Full-Stack Development</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-4 tracking-tight">
                  <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                    <Briefcase className="text-zinc-900" size={20} />
                  </div>
                  Career Goals
                </h3>
                <p className="text-zinc-600 leading-relaxed text-sm">
                  My goal is to contribute to high-impact projects that leverage technology to solve real-world problems. I am particularly interested in the intersection of AI and sustainable infrastructure. I aim to become a Lead Software Architect, designing systems that are both robust and ethically sound.
                </p>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-zinc-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl" />
                <h3 className="text-xl font-bold mb-6 flex items-center gap-4 tracking-tight">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <Globe className="text-white" size={20} />
                  </div>
                  Certifications
                </h3>
                <div className="space-y-3">
                  {[
                    "AWS Certified Cloud Practitioner"
                  ].map((cert, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer group border border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform" />
                      <span className="text-xs font-bold tracking-tight">{cert}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-4">Contact Info</h4>
                  <div className="space-y-3">
                    <a href="mailto:issamikaela@gmail.com" className="contact-card group !px-3 !py-2">
                      <div className="icon-box !w-7 !h-7">
                        <Mail size={12} className="text-white" />
                      </div>
                      <span className="text !text-[10px] uppercase">issamikaela@gmail.com</span>
                    </a>
                    <div className="contact-card group !px-3 !py-2">
                      <div className="icon-box !w-7 !h-7">
                        <Globe size={12} className="text-white" />
                      </div>
                      <span className="text !text-[10px]">09070921908</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Featured Projects" subtitle="A selection of my recent work, from web apps to system optimizations." />
          
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-[2rem] border border-zinc-100 overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://picsum.photos/seed/project/1200/800";
                    }}
                  />
                  <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 backdrop-blur-sm">
                    <a href={project.link} className="p-4 bg-white rounded-full text-zinc-900 hover:scale-110 transition-transform shadow-xl"><Globe size={24} /></a>
                    <a href={project.github} className="p-4 bg-white rounded-full text-zinc-900 hover:scale-110 transition-transform shadow-xl"><Github size={24} /></a>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-bold uppercase tracking-widest rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-3 tracking-tight leading-tight">{project.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-8 font-light">
                    {project.description}
                  </p>
                  <a href={project.link} className="text-sm font-bold text-zinc-900 flex items-center gap-1 hover:gap-2 transition-all">
                    View Project <ChevronRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Skills and Tools */}
      <section id="skills" className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Skills & Tools" subtitle="My technical arsenal for building modern digital solutions." />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((skill, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -8 }}
                className="p-6 rounded-[2rem] border border-zinc-100 hover:border-zinc-200 transition-all hover:shadow-lg group"
              >
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-4 group-hover:bg-zinc-900 group-hover:text-white transition-all">
                    {i === 0 && <Code2 size={24} className="transition-colors" />}
                    {i === 1 && <Wrench size={24} className="transition-colors" />}
                    {i === 2 && <Globe size={24} className="transition-colors" />}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 tracking-tight">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map(item => (
                    <span key={item} className="px-3 py-1.5 bg-zinc-100 text-zinc-600 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-zinc-900 hover:text-white transition-all cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Page */}
      <section id="contact" className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/5">
            <div className="p-10 md:w-1/2 text-white relative">
              <div className="absolute top-0 left-0 w-full h-full bg-white/5" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10 leading-tight">Let's build <br />something <span className="text-zinc-400">great</span>.</h2>
              <p className="text-zinc-400 mb-10 text-base font-light relative z-10">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              
              <div className="space-y-4">
                <a href="mailto:issamikaela@gmail.com" className="contact-card group w-fit !px-4 !py-2.5">
                  <div className="icon-box !w-8 !h-8">
                    <Mail size={16} className="text-white" />
                  </div>
                  <span className="text !text-[11px] uppercase">issamikaela@gmail.com</span>
                </a>
                <a href="https://linkedin.com/in/issamikaela" target="_blank" rel="noopener noreferrer" className="contact-card group w-fit !px-4 !py-2.5">
                  <div className="icon-box !w-8 !h-8">
                    <Linkedin size={16} className="text-white" />
                  </div>
                  <span className="text !text-[11px] uppercase">LinkedIn Profile</span>
                </a>
              </div>
            </div>

            <div className="p-10 md:w-1/2 bg-white">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-zinc-100 text-zinc-900 rounded-3xl flex items-center justify-center">
                    <FileText size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-zinc-900">Message Sent!</h3>
                  <p className="text-zinc-500 text-lg font-light">Thank you for reaching out. I'll get back to you soon.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b-2 border-zinc-200 pb-1 hover:border-zinc-900 transition-all"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Name</label>
                      <input 
                        required
                        type="text" 
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900 transition-all" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email</label>
                      <input 
                        required
                        type="email" 
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900 transition-all" 
                        placeholder="john@example.com" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Message</label>
                    <textarea 
                      required
                      rows={4} 
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900 transition-all" 
                      placeholder="Tell me about your project..." 
                    />
                  </div>
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-5 bg-zinc-900 text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl shadow-zinc-900/10"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
                <footer className="py-12 px-8 border-t border-zinc-100">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                      © 2026 Issa Mikaela Calzado.
                    </p>
                    <div className="flex gap-6">
                      {[
                        { icon: <Github size={18} />, href: "#" },
                        { icon: <Linkedin size={18} />, href: "#" },
                        { icon: <Globe size={18} />, href: "#" }
                      ].map((social, i) => (
                        <motion.a 
                          key={i}
                          whileHover={{ y: -3, color: "#18181b" }}
                          href={social.href} 
                          className="text-zinc-400 transition-all"
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </footer>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
