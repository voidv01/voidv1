import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Link as LinkIcon, Linkedin, Instagram, ChevronDown, ChevronUp, Search, ExternalLink, Trophy, Users, Info, Clock, AlertCircle, Zap, Heart, Brain, Leaf, Lightbulb } from 'lucide-react';

// --- Local Hosting Setup & Configuration ---
// To host locally:
// 1. Create a project: `npm create vite@latest my-hackathon -- --template react`
// 2. Install icons: `npm install lucide-react`
// 3. Replace the image URLs below with your local paths (e.g., import banner from './assets/banner.jpg')

const ASSETS = {
  // Local image path - replace with your actual banner image
  heroBanner: '/assets/607.jpg', // Place your banner image in public/assets/
};

// --- Data & Content ---

const NAV_LINKS = [
  { id: 'overview', label: 'OVERVIEW' },
  { id: 'prizes', label: 'PRIZES' },
  { id: 'speakers', label: 'SPEAKERS & JUDGES' },
  { id: 'schedule', label: 'SCHEDULE' },
];

const DOMAINS = [
  "FinTech & Digital Payments",
  "HealthTech & EdTech",
  "RetailTech, SaaS & Smart Mobility",
  "AgriTech & SDG",
  "Open Innovation",
  "Develop a multi-agentic AI system integrating image processing, computer vision, and AI/LLM techniques to automatically align scanned handwritten answer sheets and accurately auto-evaluate structured responses."
];

// You can replace the `logo` URLs below with your own hosted images (remote URLs)
// Example: logo: 'https://your-cdn.com/logos/ethindia.png'
const PRIZES = [
  { name: "VØID:V1", amount: "$1500", iconType: "Trophy", color: "bg-gray-900", logo: "https://voidv1.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fcd135b6f654549e6986aca42c83bc7b3%2Fassets%2Ffavicon%2F206.jpeg&w=1440&q=75" },
  { name: "ETHIndia", amount: "$1000", iconType: "Zap", logo: "https://voidv1.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fcompany%2F89c7e55700c14710a14a14de2d9ab5e9%2Fassets%2Ffavicon.png&w=1440&q=75" },
  { name: "Smartail", amount: "$450", iconType: "Heart", color: "bg-orange-500", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAQlBMVEVHcEzoUh3oUh3oUh3oUh3oUh3oUh3oThXwk3vnQQDoUh363NTnSgbuhWj97ejyo4/////sdlTqYzj+9/X0sqH4y8FQnNjyAAAAC3RSTlMAUbPn+Zf/////xRxk/IUAAAEASURBVHgBbdLRjoUgDIRhVLdlBHVQeP9X3SYc3Maz/6VfhsSkIYRpXtavlnkK1o/IKl/Zpx/biU9V/prCLN5ihDxtYXkAtkJKOcunJayD9iMZ42SESi98qCSS6YLgupNkh2rUq8iK1Mdjyad7h5imSz+oF13VVmTDG++WSMaM5rB0O2AdvJErax64dyyad1riMcf+KFRoEWg8X3igP1GBm/HBk30h+SYT7HGHtWOE6rlDbchdX8iCbCGRLOp+pdeKXPGgJQMFla8SZKCgHPS1LAMt9eN2QTqu0sOVHlLp+TM5jdIgaw2bPOVcjPyBTe/L9KfpbvPVHKxp++/iN9v9An2gHVaSPBsnAAAAAElFTkSuQmCC" },
  { name: "Perplexity AI", amount: "$535", iconType: "Brain", color: "bg-teal-600", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAASFBMVEUAAAAAAAAAAAAAAAAAAAAODg4lJSUxMTF5eXeLi4o5OTnz8/C1tbP///7k5OGwsK5oaGfAwL7OzsydnZxbW1pFRUTY2NZLS0pmsWyyAAAABXRSTlMzx//IxgDMHHYAAAEOSURBVHgBddLhEoMgCADgxhaGmCiqvf+bblrdpnfjD3mfpFDL8oA/8ZxtiNdy5vVMiMPyQrP1RNTTZga0TG23c62M2I64e0EAEQAUv0/IIaptaGMMPOMKSbNI1gTrL66ImQsiVe8rIRbOiOuFNrnITuRz2O4/yXF0yVx4VEctUsPUH109btTcJyBO1UnvMesXQ3t5dFbEur4zjFhUTGvFOB9mDD7BOQRInAbMKxPcCLTjcObBCPdsAfn4VpaqsWP2PneMWsuFuFFqGJRZQ8NEG/7OFmGrFCPVDXAavGEkT+1CnzSj5ejDedvg41y513y3kuv8sfX4tnLoiFh+f7CCA15hzLBcXvA3Hsvy/G9viXYUStfpMwoAAAAASUVORK5CYII=" },
  { name: "Chellam Hospital", amount: "$150", iconType: "Heart", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAABUFBMVEX7/O7///+/Iyf///T///L+//D///bLy8z///r///j8/Pz29+vPz88AaS7q6uq/ISXU1NLf39/19fW7AADc3Njq6+I4ekjV4c8AZSbe3+0AYiDi6tnx2dn89/fR0ubm5/Hv7/YAKaIqdD747Oy6vNljZ69WWqrHzNmwstSQksQALqOrs88XIZe8AA704tanqdAAHqAAAJv47uFse7lvAAC9EhlNAAB8fX17AACQAABbZ2ZBAACqAACeup/D18F4oH1nk23cnJ3mubrKXl/PcHHUgYLirKwAAI9scLIoMJpCSKOVn8iChr1EVq3u0sbov7UyO52YADqYibLVjIUwAABOVFQcKis9P0EAAABgSUTGQ0g4Ly3DODmoDRKtsbFgAABAEBGMlZXGsKzFxrpDHx+kpJo8VlYWAADMo5tvKymtfW5+OxpzRSBqTCNhUSaDely5ZjvXAAAKy0lEQVRogaWZ6WPayBnGGWskjIQAYXMZjDE3vvAR4iORBOYINuDQsm5ah5C62e223e32///Wd0YgZoSQnd35YGNZ+vHoea8R+NC6lfqQRcVsaQ9eRjV/MLIdU+iKxbaD/mBIJueUUPYIoX6p6I7wuR6tkkvrd7laCn6Hgv5IzIdF33yJoqgAX4NzctVSHc5DqeGr4fLFXQ6hPXRfJaqD/m0F+xxLFGOAJyfniqf1YrmE9l4Jj6LhOIpqKXgHpAFadKItfiwYjMIZgxrKVqPyKPUq+BAc7JezluzgAi1iukQQPb8P0bdNxRPNcum+KL8CXoxm4fQyiVHIvy3OyUpqMLy4GA4qSuywrtji/RGClHPlsizXci/Ci+VotZ5N7VFLYhYba8NRraLFlFClvH9XvKgsjBKVSJDEtVySUS61kjNOeK5YOqqibJZhi8qwVAFDRBwaHgxDg8PhQjlZEWJ8jpwf7Ve94TIoHhzVipStzNn3RUEkFg9OSxrGoYMKpiEQJErfpmGVUXZ8X9/zhNdrcJdFkrXaIpR4RGDgb+lDHWPlcFA99J2cPDx87HUta6gze8MjuHQoe8Bzw/F9Fu1FSSznfouVkUD1j/YrknI4rEiDwehPW7COt07mzkTgUnK3e1kv5VGU7d+Rio8u2D48uCBwfLFfCQ2GFajO+4M/h8MbsLYerHOUoEYyxhlOBxzeuY6yNTgzuG0nhHZagQotno6HA02ENK+cHZ40LPjHecYr/hAJaiqV2suthdfGtSyKgimRCFOJocNBfTAea6SCwJ7yUHTCId+jpPhq2fv+OniuOrgbE+9CfjbZsK8yHI0PRoeUXRqJ4olly/FHu+dsQ1BzKHUxXq8cvC7e5xjDaXEejs/Kg/1BcX+IcWr0ASpoDm/0bDi1PVU/4hsMCydNBUHANdYUpXTW10TfXV+IjQ/75bsyHFzAWzacGpM9hYuJqy5wUr57dd4UURlDzYiQM2f3pfGocnhaA+DJxhwuMJUaQXKdUKqucNoaoBIi20tT8OgghElzKVYG1XFFGZ+SvrJQPmHgJGOK2WrpqOQKr1s/QkFGePGMwETtw9kgULnH/f0S+fPcBS5uR2AyHvWr9ZwbfAjRKBZRkBVepuWJodvGKnex2v5djIV3JB8nPVrn04O15UO/VAbhzAXC3YD2lUq5Wu4LtdN9jYbwHDwPhxvHHSSKAd8i2UF6dS0c1U4vZE44FD2tfR8OQZX2Tw8sNoE33vzwePOXSyX26dM3SQhsbp6D9Gj1IroOTlaUqx9f7CwEjRxauVDc/9Cf92Ds23h3SaezdvNXGf2tN+k8bYWp9PXKyWJThYBCB7VKSCsOT89KqU1JEs7Podv2PmvMJe+OG41weKoQ6Z5wh3Ais1IbjUfDw9jkadrYstZbli2/JdElcF9E42kOOFucNl4QBJj77YaVIxsbXy6tk2eXM/gZemPBz8lmw2tYoGDMfZMCMW03Nubryk/PfbxqvAWXZ9fkWHjjXIQOE/KAr7jC3EBnAQ+/oYjn6/DGe5B+Q4+Dcuj125oH3MWVxRK6DvgPkOtfIyj0NkzXxgltX/J6+HpXfBIDp/r+DvAbhC7fH8PomG5M6UDlfeHgHq4QOOhrNI6Pt65nc1u+zCCoDw8nJ+fn5/RKhy8cPLTeFZ8w2dqYtjuT3seHf1jZ8ulL4+b5UoAiWwaGzxcO7qggPqAnDyeKAGUkxW4sedHH68Q3gT+LryMWLgdj65X7FgKVR9vXd9LKxj0SWgOPBtdbbi/p2cry0PPs+e2qAs50Fu5luX11zDJc+/H99ZuvTlfg3xHZHa55WL4UTluf/Lnx9dKvzS4Djv8r/jXwyPosX65LevHsGvLxeYYuV/QE3ae/7PeK5/y2ty1XLo9/hDf4GtF+coaUjSgD9yqhxcLfaAGhm+NHaCrXM/lS4k/gIsrAQ69IFuGnID139v4zwK+C0WdHSLlxxMA9uhYDtxIxcnXl/2fjZxRcsYWtUQ7OBWcx1LmrxW/zQfGpcfXl+hk9rwSUbYwsfHkiPPAoOjUJp3UFY4bwaF2r/Xz95hGhz5vOe1Pc4XYmipKh66bSJJqVptI09ISdzsLseR7+GURutuIKTKOoC9zuLDhtJhTDQCZ5behIT+OEacdauvEv9XxaEc61dAa+SHPF3DR1o2nqRJXQNE3D1DdNOyuEm5nN/teKcC7RV+GikTDSApYECwc9FgeMtJ62rw4839Drg5/ft5y9hTw5aq5w69ZxwjDSvCJsJHSmBgKxf797fPzhKtyYOEroRbgP8kTnFWETc0c227DJgqnX6Dj71jq4Xf2CnjYMVjo5kGAPBP7zyy+//vrf337733fDIaIBnYFhw1B07v4lCDJZenw1W16C44S+ufQY/pJMHiCZugQbPCHxari8bIqSrvv0hXQBMjPNF7lg0hDg3wUHacoi9zC5f0fGCfofgYvQUebSiXBn2ATd/ANwXwCQFhzS0HRmM/4dcGbKSaakz1+uZD2xaj18TfmzW6KAGVhkiOlbVW40LXj+tY2LH/4msm0JfBfcveWyO0WcUJtzMwQz1lzA8WI6GbTXu8P9rnBmzGFD3Zk3L0FPqvOOhhOJtGS9d5w8Ja2BvzRDBV1N+qy/BCOp0l4gGGo+rjbJh8ZAJdmfMFzgawY0s1WUTDWu0xEtpHVVJW0MG/k02KLHyf/TutmEFW+uNC7YLCI3OLMpCjRVEyanICiGDsoJXFGpT5KV4oL1+Lg6iNZtiphED8RV6Iw6aXzp9A6BQ4JQC7AS99w6sTXEwZe5KMVVXQBHYCTNPYdeRXt8Womnvbar3KOoBScx2GU2LpsETj6vFUlsSbZAr0rAe0h6Op52mcpL+OoWur319DRh9nPEc8G+CVLkkH2BZgJ2Gum4lyuQLKjQ3kVPDPwW3WbazGMLyM1brzBYTscQbuoBvWnguLP/covEs9trdW9Z5WhSaGWWEYUK3bHGKCRlkposKvFmIq0nTS82bVsT1O6wtvRat9N2hmkAGMqFphwInyeziPWdnaanbqv4O4Uuny2daaG7y5guQYlCvkAbyCcX2yGsqGrMm03rczJtdzOOVCzccs8WcVWNN/M7+aStVUwn856ZYlm+i1CmVXDAOxnS0m1f0qoOWy99x7D7LU4A3Fs4aeatTAHJnC27hVtiFNsYlWZciZvppQ/YSHpXJ9n5R1Frt424gKLedDpB/Me4OJA3TMTY8DKcPhB15a48cZb/bZvzBYKaV3V+V5f0LiBrxLWfupneSm8ptByfblu99jvg1vNQpr2VWYGTxT2LqkkODvXU9EwW2m47UJwZ2RXODlJFTXJ7W8G0CmvtouOz0J32dpE7nPmcWLHnqLUwdLPVzT4rnA6h29tOxgnfzfTa0M6YkBI427pfgpNWLmdQd9dWasNvw70MOawtpEMZ7fCZF0+u7L1Y4aT0dzvtFlqFo471jrZ00QlX4nyAnYvk4aSQmbZc4Jn5wYX0VXjeC06Fk2wu9FzgULeZDCMdbOFg0LdUj/FJv0LrdbjsYLOl055Aldo9AKuqyWx6IBM9aoimitxtTTPucGg40BmgWc6/WYCi2UksH5wTSY94Wt/O3d6izFPBXXmLFFfP/r5STO/k1cSm5YyUyHsJ95GvzzKTXcQtrohaHeu2NGtSwzjK75gJ2GBgRU/mvSYF+eIv0+21efj/AW6WVf2rNL+8AAAAAElFTkSuQmCC" },
  { name: ".xyz", amount: "$800", iconType: "Lightbulb", color: "bg-purple-600",},
  { name: "DevDock", amount: "$1100", iconType: "Zap",  logo: "https://devdock.ai/assests/images/web3.png" },
];

const SPEAKERS = [
  // Add 'image' property with local photo path to override the default avatar
  // Example: image: '/assets/speakers/kumaravel.jpg'
  { name: "Mr. Kumaravel N", image: "https://voidv1.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fcd135b6f654549e6986aca42c83bc7b3%2Fjudges%2F92ce4203654144e9935bc1aa35fd7d0a%2F519.jpeg&w=1440&q=75", role: "Tech Consultant, Sakz Consulting", imgColor: "bg-blue-100" },
  { name: "Nithes Prabu Raam JP", image:"https://voidv1.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fcd135b6f654549e6986aca42c83bc7b3%2Fjudges%2Feaf6a7fe229b4423aec73ede4afd3607%2F302.jpeg&w=1440&q=75", role: "Startup Coach / Founder & CEO", imgColor: "bg-green-100" },
  { name: "Col. Prof. Dr. Paul...",image:"https://voidv1.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fcd135b6f654549e6986aca42c83bc7b3%2Fjudges%2F72de42018a2d4cb6868762116399f43d%2F830.jpeg&w=1440&q=75", role: "Corporate Trainer & Leadership Coach", imgColor: "bg-gray-200" },
  { name: "Mr. Vadivel S M", image:"https://voidv1.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fcd135b6f654549e6986aca42c83bc7b3%2Fjudges%2F7e927431fe6949f88d6e01d44cf9c7bb%2F793.jpeg&w=1440&q=75", role: "Asst. Professor, Vellore Institute of Technology", imgColor: "bg-yellow-100" },
  { name: "Mrs. Janani Velmurugan", image:"https://voidv1.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fcd135b6f654549e6986aca42c83bc7b3%2Fjudges%2F586330554b9d45c6a6cf77401bb2b597%2F300.jpeg&w=1440&q=75", role: "Senior Specialist, PayPal", imgColor: "bg-pink-100" },
];

const SPONSORS = [
  { name: "ETHIndia", color: "text-slate-700" },
  { name: "Smartail", color: "text-orange-500" },
  { name: "Gemini", color: "text-blue-500" },
  { name: "Perplexity", color: "text-teal-600" },
  { name: "Chellam Hospital", color: "text-red-600" },
  { name: ".xyz", color: "text-purple-600" },
  { name: "DevDock", color: "text-black" },
  { name: "Kwikpic", color: "text-blue-400" },
  { name: "Aurelian Racing", color: "text-red-500" },
  { name: "SJCE Motorsports", color: "text-orange-600" },
];

const FAQS = [
  { q: "Team size", a: "Teams must consist of 4 to 6 members." },
  { q: "Registration costs?", a: "Nada. It's completely free to participate." },
  { q: "Who all can attend?", a: "Students from colleges all over India are eligible to attend. VØID:v1 welcomes students and technology enthusiasts eager to explore innovation and solve complex problems." },
  { q: "Will sleeping arrangements be provided?", a: "No, but you'll be too engaged with exciting activities and high-energy coding to even think about sleep!" },
  { q: "What all should I bring to the event?", a: "Extension Boards (for power ⚡), Snacks and Drinks (for power ⚡), Laptops (for power 💻)" },
  { q: "Do we need to have the entire idea fully working?", a: "For your project to be evaluated, it's highly advisable to have a working Prototype or a Minimum Viable Product (MVP). You don't need to implement the complete idea, but your entry must be operational for the judges to assess it." },
];

// --- Components ---

const SectionTitle = ({ children }) => (
  <h2 className="text-2xl font-bold text-slate-800 mb-6 mt-12">{children}</h2>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-slate-200 rounded-lg p-6 hover:shadow-sm transition-shadow ${className}`}>
    {children}
  </div>
);

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-lg mb-4 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-white hover:bg-slate-50 text-left"
      >
        <span className="font-medium text-slate-700">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>
      {isOpen && (
        <div className="p-4 bg-white border-t border-slate-100 text-slate-600 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

const renderPrizeIcon = (iconType) => {
  const iconProps = { className: "w-6 h-6" };
  switch(iconType) {
    case "Trophy": return <Trophy {...iconProps} />;
    case "Zap": return <Zap {...iconProps} />;
    case "Heart": return <Heart {...iconProps} />;
    case "Brain": return <Brain {...iconProps} />;
    case "Lightbulb": return <Lightbulb {...iconProps} />;
    default: return <Trophy {...iconProps} />;
  }
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  // Simple scroll spy logic (simplified)
  useEffect(() => {
    const handleScroll = () => {
      // Logic to update active tab based on scroll position could go here
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-slate-900">
      
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 md:px-8 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs tracking-tighter">
            VØID
          </div>
          <div className="hidden md:flex gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === link.id 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
            {/* User profile placeholder */}
             <div className="hidden md:block text-right">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500"></div>
             </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto pt-8 px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN (Main Content) */}
          <div className="lg:col-span-8">
            
            {/* Hero Banner Section */}
            <div 
                id="overview" 
                className="bg-black text-white rounded-xl overflow-hidden shadow-lg relative min-h-[400px] flex flex-col justify-between p-8 mb-8 group"
            >
               {/* Dynamic Background Image for easy local swapping */}
               <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay transition-opacity"
                    style={{ backgroundImage: `url(${ASSETS.heroBanner})` }}
               ></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
               
               <div className="relative z-10 flex justify-between items-start opacity-80 text-xs tracking-widest uppercase">
                  <span>VIT Chennai</span>
                  <span>Office of Student Welfare</span>
               </div>

               <div className="relative z-10 text-center my-auto">
                  <p className="text-xs tracking-[0.3em] uppercase mb-2 text-gray-300">Adrenaline Never Sleeps</p>
                  <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    VØID:v1
                  </h1>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                     <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                     Hackathon Begins Soon
                  </div>
               </div>

               <div className="relative z-10 flex justify-between items-end text-sm text-gray-300">
                  <div>
                    <p className="font-bold text-white mb-1">FACULTY COORDINATORS</p>
                    <p className="text-xs">Dr. Nisha R</p>
                    <p className="text-xs">Dr. Jayaram B</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-white">DECEMBER 14 - 17</p>
                    <p className="text-xs tracking-widest uppercase">MG Auditorium, VIT Chennai</p>
                  </div>
                   <div className="text-right">
                    <p className="font-bold text-white mb-1">STUDENT COORDINATORS</p>
                    <p className="text-xs">Dhanvanthini - 9095266634</p>
                    <p className="text-xs">Pranavakarth - 8072253459</p>
                  </div>
               </div>
            </div>

            {/* Overview Text */}
            <div className="prose prose-slate max-w-none text-slate-600 mb-12">
              <p className="text-lg leading-relaxed mb-6">
                Where the only drug is adrenaline and 72 hours of code. <br/>
                <span className="italic text-slate-400 block mt-2 border-l-4 border-slate-200 pl-4">Ordinary ideas? They don't survive here.</span>
              </p>
              
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-6 text-blue-800 text-sm">
                For all updates, join this WhatsApp group 👇 <br/>
                <a href="#" className="font-bold underline decoration-blue-400 decoration-2 underline-offset-2 hover:text-blue-600">VØID:v1 WhatsApp Group Link</a>
              </div>

              <p className="mb-4">
                <strong>VØID:v1</strong> is built for the restless. The ones who refuse to just watch the future and instead choose to hack it into existence. Happening on <strong>14th & 17th December 2025</strong>, this <strong>72-hour national hackathon</strong> is where ideas roar louder than Wall Street, where code meets chaos, and where teams don't just build projects, they build movements.<strong>INDIA'S BIGGEST HACKATHON</strong>
              </p>
              
              <p className="mb-6">
                Powered by the <br/>
                <strong>Open Source Programming Club (OSPC)</strong> and the <strong>Business Innovation Community (BIC)</strong> of VIT Chennai, hosted on Devfolio.
              </p>

              <h3 className="text-lg font-bold text-slate-800 mb-3">Domains at VØID:v1</h3>
              <ul className="list-disc pl-5 space-y-2 mb-8">
                {DOMAINS.map((domain, i) => (
                  <li key={i}>{domain}</li>
                ))}
              </ul>
              
               <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 text-sm text-yellow-900">
                  <p className="font-bold mb-1">🔥 What Makes VØID:v1 Stand Out</p>
                  This isn't about playing safe. It's about breaking rules, tearing down limits, and pitching like you already own the future.
               </div>

              <div className="space-y-6">
                <div>
                   <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2">
                     <Users className="w-5 h-5 text-purple-600" /> Eligibility Criteria
                   </h3>
                   <p className="text-sm">Teams must consist of 4 to 6 members only.</p>
                   <p className="text-sm italic text-slate-500">Each team member must submit the same idea and presentation using the VOID:v1 PPT template through Devfolio.</p>
                </div>

                <div>
                   <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2">
                     <MapPin className="w-5 h-5 text-red-500" /> Venue
                   </h3>
                   <p className="text-sm">MG Auditorium, VIT Chennai</p>
                </div>
                
                 <div>
                   <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-2">
                     <Clock className="w-5 h-5 text-blue-500" /> Rules
                   </h3>
                   <p className="text-sm">Follow the <a href="#" className="text-blue-600 underline">Code of Conduct</a>.</p>
                </div>
                
                <div className="flex gap-4 pt-4">
                    <button className="p-2 bg-slate-100 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors"><Linkedin size={20} /></button>
                    <button className="p-2 bg-slate-100 rounded-md hover:bg-pink-100 hover:text-pink-600 transition-colors"><Instagram size={20} /></button>
                </div>
              </div>
            </div>

            <hr className="border-slate-200 my-12" />

            {/* Prizes Section */}
            <div id="prizes">
              <div className="flex justify-between items-end mb-6">
                 <div>
                    <h2 className="text-3xl font-black text-slate-800">$5,250</h2>
                    <p className="text-slate-500">Available in Prizes</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRIZES.map((prize, idx) => (
                  <Card key={idx} className="flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform duration-300">
                    <div className={`w-12 h-12 rounded-lg ${prize.color} flex items-center justify-center text-white shadow-md`}>
                      {prize.logo ? (
                        <img src={prize.logo} alt={prize.name} className="w-6 h-6 object-contain" loading="lazy" />
                      ) : (
                        renderPrizeIcon(prize.iconType)
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{prize.name}</h4>
                      <p className="text-slate-500 text-sm">{prize.amount}</p>
                    </div>
                  </Card>
                ))}
                <div className="flex items-center justify-center p-6 bg-slate-50 border border-slate-200 border-dashed rounded-lg cursor-pointer hover:bg-slate-100 group">
                    <span className="font-bold text-slate-600 group-hover:text-black flex items-center gap-2">
                        All prizes <ExternalLink size={16} />
                    </span>
                </div>
              </div>
            </div>

             <hr className="border-slate-200 my-12" />

            {/* Speakers Section */}
            <div id="speakers">
              <SectionTitle>Speakers & Judges</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SPEAKERS.map((speaker, idx) => (
                  <Card key={idx} className="flex items-center gap-4 p-4">
                     <div className={`w-16 h-16 rounded-full ${speaker.imgColor} flex-shrink-0 border-2 border-white shadow-sm overflow-hidden`}>
                        <img 
                            src={speaker.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${speaker.name}`} 
                            alt={speaker.name}
                            className="w-full h-full object-cover"
                        />
                     </div>
                     <div>
                        <h4 className="font-bold text-slate-800 text-sm">{speaker.name}</h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{speaker.role}</p>
                        <div className="mt-2">
                           <Linkedin size={16} className="text-slate-400 hover:text-blue-700 cursor-pointer" />
                        </div>
                     </div>
                  </Card>
                ))}
                <div className="flex items-center justify-center p-6 bg-slate-50 border border-slate-200 border-dashed rounded-lg cursor-pointer hover:bg-slate-100 group">
                    <span className="font-bold text-slate-600 group-hover:text-black flex items-center gap-2">
                        All speakers & judges <ExternalLink size={16} />
                    </span>
                </div>
              </div>
            </div>

            <hr className="border-slate-200 my-12" />

            {/* Sponsors Section */}
            <div>
               <SectionTitle>Sponsors</SectionTitle>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {SPONSORS.map((sponsor, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-lg p-6 flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 hover:shadow-md">
                          <span className={`font-black text-xl ${sponsor.color}`}>{sponsor.name}</span>
                      </div>
                  ))}
               </div>
            </div>

            <hr className="border-slate-200 my-12" />

            {/* FAQs Section */}
            <div id="schedule">
              <SectionTitle>FAQs</SectionTitle>
              <div className="relative mb-6">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                 <input 
                    type="text" 
                    placeholder="Search FAQs" 
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                 />
              </div>
              <div>
                {FAQS.map((faq, idx) => (
                  <AccordionItem key={idx} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (Sticky Sidebar) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 space-y-6">
              
              {/* Event Status Card */}
              <Card className="p-6 border-t-4 border-t-slate-900 shadow-md">
                <div className="flex gap-4 mb-6">
                   <div className="p-2 bg-yellow-100 rounded-md text-yellow-700 font-bold text-xs flex items-center gap-1">2 <span className="text-yellow-500">★</span></div>
                   <div className="flex gap-2 text-slate-400">
                      <LinkIcon size={20} className="hover:text-blue-500 cursor-pointer" />
                      <Linkedin size={20} className="hover:text-blue-700 cursor-pointer" />
                   </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">RUNS FROM</p>
                        <p className="text-lg font-bold text-slate-900">Dec 14 - 17, 2025</p>
                    </div>

                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">HAPPENING</p>
                        <p className="text-lg font-bold text-slate-900">Chennai, India</p>
                    </div>

                    <div className="bg-slate-100 rounded-lg p-4 border border-slate-200">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">APPLICATIONS CLOSED</p>
                        <p className="text-lg font-bold text-slate-900">Hackathon starts on 14th Dec 2025</p>
                    </div>
                </div>
              </Card>

              {/* Devfolio Promo */}
              <div className="text-center pt-8 opacity-60">
                 <p className="text-sm text-slate-500">Organized by</p>
                 <div className="font-black text-xl tracking-tighter">VØID:v1</div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="max-w-xs">
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                    We love <span className="text-blue-600">software</span> and the <span className="text-orange-500">people</span> who build it.
                </h3>
                <div className="flex gap-4 mt-6">
                   {[1,2,3,4,5].map(i => (
                       <div key={i} className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 text-xs">
                           <ExternalLink size={12}/>
                       </div>
                   ))}
                </div>
                <div className="mt-8 font-bold text-2xl tracking-tighter text-slate-800">Devfolio</div>
                <p className="text-xs text-slate-400 mt-2">© 2025, NSB Classic PTE LTD</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
                <div>
                    <h4 className="font-bold text-slate-900 mb-4">COMMUNITY</h4>
                    <ul className="space-y-3 text-slate-500">
                        <li><a href="#" className="hover:text-blue-600">Organize a hackathon</a></li>
                        <li><a href="#" className="hover:text-blue-600">Explore hackathons</a></li>
                        <li><a href="#" className="hover:text-blue-600">Code of Conduct</a></li>
                        <li><a href="#" className="hover:text-blue-600">Brand Assets</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mb-4">COMPANY</h4>
                    <ul className="space-y-3 text-slate-500">
                        <li><a href="#" className="hover:text-blue-600">About</a></li>
                        <li><a href="#" className="hover:text-blue-600">Blog</a></li>
                        <li><a href="#" className="hover:text-blue-600">Careers</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mb-4">SUPPORT</h4>
                    <ul className="space-y-3 text-slate-500">
                        <li><a href="#" className="hover:text-blue-600">Help</a></li>
                        <li><a href="#" className="hover:text-blue-600">Status</a></li>
                        <li><a href="#" className="hover:text-blue-600">Contact us</a></li>
                    </ul>
                </div>
            </div>
         </div>
      </footer>
    </div>
  );
}