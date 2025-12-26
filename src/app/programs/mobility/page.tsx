"use client";

import React from "react";
import Link from "next/link";
import { Dna, ThermometerSnowflake, Zap, ShieldCheck, Timer, Activity } from "lucide-react";

// Helper for Service Cards
const ServiceCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="bg-neutral-900 border border-white/10 p-8 rounded-2xl hover:border-[#d4a017] transition-all group">
    <div className="mb-6 inline-flex p-3 rounded-xl bg-[#d4a017]/10 text-[#d4a017] group-hover:bg-[#d4a017] group-hover:text-black transition-colors">
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

// --- THE DEFAULT EXPORT (Fixes your Runtime Error) ---
export default function MobilityRecoveryPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        {/* HERO SECTION */}
        <div className="text-center mb-24">
          <span className="text-[#d4a017] font-bold uppercase tracking-[0.2em] text-sm mb-4 block">
            Bio-Hacking & Longevity
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-[0.9]">
            Mobility & <span className="text-[#d4a017]">Recovery</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            DNA-personalized wellness meets elite bio-hacking technology. REST HARD. TRAIN HARDER.
          </p>
        </div>

        {/* DNA PERSONALIZED WELLNESS SECTION */}
        <div className="grid lg:grid-cols-2 gap-16 items-center bg-neutral-900/40 p-10 md:p-16 rounded-[2.5rem] border border-white/5 mb-24">
          <div className="relative aspect-square bg-black rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#d4a017_0%,_transparent_70%)]"></div>
            <Dna size={150} className="text-[#d4a017] animate-pulse relative z-10" />
          </div>
          <div>
            <h2 className="text-4xl font-black uppercase mb-6 leading-tight">DNA-Based <br/>Personalized Wellness</h2>
            <p className="text-gray-400 mb-8 text-lg">
              We analyze your unique genetic markers to identify inflammation triggers and nutrient deficiencies, creating a customized recovery protocol built for your specific biology.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider">
                <ShieldCheck className="text-[#d4a017]" /> Genetic Injury Risk Analysis
              </li>
              <li className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider">
                <ShieldCheck className="text-[#d4a017]" /> Custom Micronutrient Optimization
              </li>
              <li className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider">
                <ShieldCheck className="text-[#d4a017]" /> Metabolic Recovery Profiling
              </li>
            </ul>
          </div>
        </div>

        {/* RECOVERY SUITE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={ThermometerSnowflake} 
            title="Cryotherapy" 
            desc="Systemic inflammation reduction and endorphin release through sub-zero whole-body exposure." 
          />
          <ServiceCard 
            icon={Timer} 
            title="HBOT" 
            desc="Hyperbaric Oxygen Therapy to saturate your cells with 100% pure oxygen for accelerated healing." 
          />
          <ServiceCard 
            icon={Zap} 
            title="Infrared Sauna" 
            desc="Deep-penetrating cellular heat to promote detoxification and improve cardiovascular circulation." 
          />
          <ServiceCard 
            icon={Activity} 
            title="Compression" 
            desc="Dynamic air compression technology to increase lymphatic drainage and reduce muscle soreness." 
          />
          <ServiceCard 
            icon={ShieldCheck} 
            title="Red Light" 
            desc="Medical-grade LED therapy to stimulate ATP production and skin-deep tissue repair." 
          />
          <ServiceCard 
            icon={Timer} 
            title="Cold Plunge" 
            desc="Cold-water immersion protocols designed to reset the nervous system and build mental resilience." 
          />
        </div>
      </div>
    </div>
  );
}