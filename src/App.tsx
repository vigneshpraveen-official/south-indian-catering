import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ChevronRight, Phone, Mail, MapPin, Instagram, Facebook, Clock, Send } from 'lucide-react';

// --- Types ---
interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  delay: number;
}

// --- Components ---

const NavLink: React.FC<NavLinkProps> = ({ href, label, onClick }) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        if (onClick) onClick();
      }
    }}
    className="relative font-sans text-secondary-brown hover:text-primary-maroon transition-colors duration-300 group cursor-pointer"
  >
    {label}
    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-gold transition-all duration-300 group-hover:w-full" />
  </a>
);

const SectionHeading: React.FC<{ title: string; subtitle?: string; tamil?: string; light?: boolean }> = ({ title, subtitle, tamil, light }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-16"
  >
    {tamil && (
      <p className={`font-tamil font-black text-xl md:text-2xl mb-4 tracking-wide uppercase ${light ? 'text-primary-gold' : 'text-primary-maroon'}`}>
        {tamil}
      </p>
    )}
    <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-secondary-brown'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`max-w-2xl mx-auto italic ${light ? 'text-white/70' : 'text-secondary-brown/70'}`}>
        {subtitle}
      </p>
    )}
    <div className="w-24 h-1 bg-primary-gold mx-auto mt-6" />
  </motion.div>
);

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, image, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-primary-gold/10 group overflow-hidden"
  >
    <div className="relative h-48 mb-6 overflow-hidden rounded-xl">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-primary-maroon/20 group-hover:bg-transparent transition-colors duration-500" />
    </div>
    <h3 className="text-2xl font-bold text-primary-maroon mb-4">{title}</h3>
    <p className="text-secondary-brown/80 leading-relaxed">{description}</p>
    <motion.button 
      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
      whileHover={{ x: 5 }}
      className="mt-6 flex items-center text-primary-gold font-bold group"
    >
      Inquire Now <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
    </motion.button>
  </motion.div>
);

const FloatingAsset: React.FC<{ src: string; className: string }> = ({ src, className }) => (
  <motion.img
    src={src}
    className={className}
    animate={{ y: [0, -15, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  />
);

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const services = [
    {
      title: "Wedding Catering",
      description: "Transform your special day with our authentic thali presentations and royal hospitality.",
      image: "/assets/service-wedding.png",
      delay: 0.1
    },
    {
      title: "Corporate Events",
      description: "Sophisticated lunch boxes and buffet spreads tailored for professional excellence.",
      image: "/assets/service-corporate.png",
      delay: 0.2
    },
    {
      title: "Housewarming & Poojas",
      description: "Traditional satvik menus served with the warmth of heritage and devotion.",
      image: "/assets/service-traditional.png",
      delay: 0.3
    }
  ];

  const menuItems = [
    { id: 1, name: "Traditional Thali", img: "/assets/menu-thali.png", angle: 0 },
    { id: 2, name: "Mysore Pak", img: "/assets/menu-dessert.png", angle: 72 },
    { id: 3, name: "Ghee Roast Dosa", img: "/assets/menu-dosa.png", angle: 144 },
    { id: 4, name: "Bisi Bele Bath", img: "/assets/menu-rice.png", angle: 216 },
    { id: 5, name: "Filter Coffee", img: "/assets/menu-coffee.png", angle: 288 },
  ];

  return (
    <div className="relative overflow-hidden bg-secondary-beige min-h-screen">
      <div className="kolam-pattern fixed inset-0 z-0 pointer-events-none" />
      
      {/* Header */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 py-4 ${
          isScrolled ? 'bg-secondary-beige/90 backdrop-blur-md shadow-lg border-b border-primary-gold/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src="/logo.png" alt="Dreams Catering" className="w-10 h-10 object-contain rounded-full bg-primary-maroon" />
            <span className="text-2xl font-serif font-bold text-primary-maroon tracking-tighter uppercase">DREAMS <span className="text-primary-gold">CATERING</span></span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            <NavLink href="#about" label="Heritage" />
            <NavLink href="#services" label="Services" />
            <NavLink href="#menu" label="The Feast" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="bg-primary-maroon text-primary-gold px-8 py-2.5 rounded-full font-bold border border-primary-gold/30 hover:bg-primary-maroon/90 transition-all shadow-lg shadow-primary-maroon/20"
            >
              Book Now
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-primary-maroon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-secondary-beige/95 border-b border-primary-gold/20 mt-4 overflow-hidden"
            >
              <div className="flex flex-col gap-6 p-8">
                <NavLink href="#about" label="Heritage" onClick={() => setIsMobileMenuOpen(false)} />
                <NavLink href="#services" label="Services" onClick={() => setIsMobileMenuOpen(false)} />
                <NavLink href="#menu" label="The Feast" onClick={() => setIsMobileMenuOpen(false)} />
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-primary-maroon text-primary-gold px-8 py-3 rounded-xl font-bold"
                >
                  Book Event
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-tamil font-black text-primary-maroon text-xl md:text-2xl mb-4 tracking-wide"
            >
              பாரம்பரிய தென்னிந்திய உணவு விருந்து
            </motion.p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-secondary-brown leading-[1.1] mb-8">
              Authentic <span className="text-primary-maroon italic">South Indian</span> Heritage
            </h1>
            <p className="text-lg md:text-xl text-secondary-brown/70 mb-10 leading-relaxed max-w-lg">
              Experience the royalty of Chettinad, the richness of Mysore, and the simplicity of Tanjore in every bite.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => scrollToSection('menu')}
                className="bg-primary-maroon text-primary-gold px-10 py-4 rounded-full font-bold text-lg shadow-2xl shadow-primary-maroon/20"
              >
                View Our Menus
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => scrollToSection('about')}
                className="bg-transparent border-2 border-primary-gold text-primary-maroon px-10 py-4 rounded-full font-bold text-lg"
              >
                Our Story
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)] border-8 border-white/50">
              <img src="/assets/hero-thali.png" alt="South Indian Thali" className="w-full aspect-[4/5] object-cover" />
            </div>
            {/* Floating Assets */}
            <FloatingAsset src="/assets/hero-leaf.png" className="absolute -top-20 -right-24 w-24 z-0 opacity-80 drop-shadow-lg" />
            <FloatingAsset src="/assets/brass-lamp.png" className="absolute -bottom-20 -left-24 w-20 z-0 opacity-80 drop-shadow-lg" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-primary-gold/10 rounded-full animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-12 bg-white/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            <img src="/assets/about-kitchen.png" alt="Traditional Kitchen" className="rounded-3xl shadow-2xl w-full aspect-square object-cover" />
            <div className="absolute -bottom-8 -right-8 bg-primary-gold p-8 rounded-3xl shadow-xl max-w-[200px]">
              <p className="text-secondary-brown font-bold text-4xl mb-1">30+</p>
              <p className="text-secondary-brown/80 font-sans text-sm font-bold uppercase tracking-wider">Years of Heritage</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <p className="font-tamil font-black text-primary-maroon text-xl mb-4">எங்கள் கதை</p>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-brown mb-8 leading-tight">Preserving Culinary <br/><span className="text-primary-maroon italic">Artistry Since 1995</span></h2>
            <div className="space-y-6 text-lg text-secondary-brown/80 leading-relaxed">
              <p>Founded on the principles of authenticity and purity, Dreams Catering has been the custodian of traditional South Indian recipes passed down through generations.</p>
              <p>Every dish is crafted using hand-ground spices, locally sourced ingredients, and the slow-cooking techniques that define the soul of our heritage.</p>
            </div>
            <motion.div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <h4 className="font-bold text-primary-maroon mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-gold rounded-full" /> Authentic Spices
                </h4>
                <p className="text-sm">Sourced directly from farmers in the South.</p>
              </div>
              <div>
                <h4 className="font-bold text-primary-maroon mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-gold rounded-full" /> Heritage Chefs
                </h4>
                <p className="text-sm">Masters of traditional slow-cooking.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 md:px-12 relative overflow-hidden">
        <SectionHeading 
          tamil="எங்கள் சேவைகள்"
          title="Elevating Every Occasion"
          subtitle="From intimate gatherings to grand celebrations, we bring the essence of the South to your table."
        />
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>

      {/* Menu Showcase */}
      <section id="menu" className="py-32 bg-secondary-brown text-secondary-beige relative overflow-hidden">
        <div className="kolam-pattern absolute inset-0 opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading 
            light
            tamil="சுவை மற்றும் மணம்"
            title="The Grand Thali Showcase"
            subtitle="Explore our signature creations presented in a traditional scattered thali style."
          />
          
          <div className="relative h-[600px] md:h-[800px] flex items-center justify-center">
            {/* Center Piece */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] border-2 border-primary-gold/20 rounded-full border-dashed"
            />
            
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="z-20 w-48 md:w-80 h-48 md:h-80 rounded-full overflow-hidden border-8 border-primary-gold/50 shadow-2xl"
            >
              <img src="/assets/menu-main-center.png" alt="Center Dish" className="w-full h-full object-cover" />
            </motion.div>

            {/* Orbiting Items */}
            {menuItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  x: Math.cos(item.angle * (Math.PI / 180)) * (window.innerWidth < 768 ? 150 : 350),
                  y: Math.sin(item.angle * (Math.PI / 180)) * (window.innerWidth < 768 ? 150 : 350)
                }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.1 }}
                className="absolute z-30 flex flex-col items-center group cursor-pointer"
              >
                <div className="w-24 md:w-40 h-24 md:h-40 rounded-full overflow-hidden border-4 border-primary-gold shadow-lg mb-4 bg-white">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="bg-secondary-brown/80 backdrop-blur-sm px-4 py-1 rounded-full shadow-lg group-hover:bg-primary-gold group-hover:text-primary-maroon transition-all">
                  <p className="text-primary-gold font-bold text-sm md:text-lg whitespace-nowrap group-hover:text-inherit">{item.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 md:px-12 relative overflow-hidden bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-secondary-beige/30 rounded-[3rem] shadow-2xl border border-primary-gold/10 overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-2/5 bg-primary-maroon p-12 text-primary-gold flex flex-col justify-between">
              <div>
                <p className="font-tamil font-black text-2xl mb-4 opacity-80 uppercase tracking-widest">தொடர்பு கொள்ள</p>
                <h2 className="text-4xl font-bold mb-8 font-serif leading-tight text-white">Start Your <br/>Grand Feast</h2>
                <div className="space-y-8 mt-12">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><Phone size={24} /></div>
                    <div>
                      <p className="text-sm opacity-60 font-bold uppercase tracking-widest">Call Us</p>
                      <p className="text-xl font-bold">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><Mail size={24} /></div>
                    <div>
                      <p className="text-sm opacity-60 font-bold uppercase tracking-widest">Email</p>
                      <p className="text-xl font-bold">hello@dreamscatering.in</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><MapPin size={24} /></div>
                    <div>
                      <p className="text-sm opacity-60 font-bold uppercase tracking-widest">Location</p>
                      <p className="text-xl font-bold">Mylapore, Chennai</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-12">
                <motion.a href="https://www.instagram.com/dreams_cateringg" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 cursor-pointer"><Instagram size={18} /></motion.a>
                <motion.a href="https://www.facebook.com/dreamscatering" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 cursor-pointer"><Facebook size={18} /></motion.a>
              </div>
            </div>

            <div className="lg:w-3/5 p-12 bg-white relative">
              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <Send size={48} className="text-secondary-green mb-4" />
                    <h3 className="text-3xl font-bold text-primary-maroon">Namaskaram!</h3>
                    <p className="text-lg text-secondary-brown/70">Your inquiry has been sent. We'll contact you soon.</p>
                    <button onClick={() => setFormStatus('idle')} className="text-primary-gold font-bold underline">Send another</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary-brown/60 uppercase tracking-widest">Your Name <span className="text-red-500">*</span></label>
                        <input required type="text" className="w-full bg-secondary-beige/50 border-2 border-transparent focus:border-primary-gold focus:bg-white outline-none p-4 rounded-xl transition-all" placeholder="Enter Name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-secondary-brown/60 uppercase tracking-widest">Phone <span className="text-red-500">*</span></label>
                        <input required type="tel" className="w-full bg-secondary-beige/50 border-2 border-transparent focus:border-primary-gold focus:bg-white outline-none p-4 rounded-xl transition-all" placeholder="Enter Number" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary-brown/60 uppercase tracking-widest">Event Type <span className="text-red-500">*</span></label>
                      <select required className="w-full bg-secondary-beige/50 border-2 border-transparent focus:border-primary-gold focus:bg-white outline-none p-4 rounded-xl transition-all cursor-pointer">
                        <option value="">Select Event</option>
                        <option>Wedding Celebration</option>
                        <option>Corporate Gala</option>
                        <option>House Warming</option>
                        <option>Private Party</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary-brown/60 uppercase tracking-widest">Estimated Guests <span className="text-red-500">*</span></label>
                      <input required type="number" className="w-full bg-secondary-beige/50 border-2 border-transparent focus:border-primary-gold focus:bg-white outline-none p-4 rounded-xl transition-all" placeholder="e.g. 500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary-brown/60 uppercase tracking-widest">Your Message</label>
                      <textarea rows={4} className="w-full bg-secondary-beige/50 border-2 border-transparent focus:border-primary-gold focus:bg-white outline-none p-4 rounded-xl transition-all resize-none" placeholder="Tell us about your requirements..." />
                    </div>
                    <motion.button
                      disabled={formStatus === 'submitting'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-primary-gold text-primary-maroon font-bold text-lg py-5 rounded-2xl shadow-xl shadow-primary-gold/20"
                    >
                      {formStatus === 'submitting' ? 'Processing...' : 'Send Inquiry'}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-maroon pt-20 pb-10 px-6 md:px-12 text-primary-gold relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <img src="/logo.png" alt="Dreams Catering" className="w-12 h-12 object-contain rounded-full bg-primary-gold p-1" />
                <span className="text-3xl font-serif font-bold tracking-tighter uppercase text-white">DREAMS <span className="text-primary-gold">CATERING</span></span>
              </div>
              <p className="text-lg text-white/70 max-w-md leading-relaxed">
                Weaving stories through flavors since 1995. Our mission is to preserve and celebrate the rich culinary traditions of South India for generations to come.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-sm">Quick Links</h4>
              <ul className="space-y-4 font-sans opacity-80">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">Our Heritage</button></li>
                <li><button onClick={() => scrollToSection('menu')} className="hover:text-white transition-colors">Curated Menus</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Our Services</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-sm">Working Hours</h4>
              <ul className="space-y-4 font-sans opacity-80">
                <li className="flex items-center gap-3"><Clock size={16} /> 09:00 AM - 08:00 PM</li>
                <li>Mon - Sun (Open All Days)</li>
                <li className="pt-4 text-white font-bold italic">Planning a late-night feast? <br/>We're available 24/7 for events.</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 text-sm font-bold">
            <p>© 2026 Dreams Catering Services. Crafted with Tradition in Chennai.</p>
            <div className="flex gap-8">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="kolam-pattern absolute inset-0 opacity-5 pointer-events-none" />
      </footer>
    </div>
  );
};

export default App;
