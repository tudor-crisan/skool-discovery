"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  ShieldCheck, 
  MessageSquare, 
  LineChart, 
  ArrowRight, 
  Bot, 
  Settings, 
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function PresentationPage() {
  const [calculator, setCalculator] = useState({
    leads: 100,
    timePerLead: 15, // minutes
    dealValue: 10000
  });

  const manualHours = (calculator.leads * calculator.timePerLead) / 60;
  const potentialSavings = manualHours * 50; // Assume $50/hr labor cost

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 font-sans selection:bg-emerald-500/30">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full emerald-gradient -z-10" />
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 mb-8 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Intelligence Report: Top 3 Community Pain Points Identified
            </div>
            <span className="block py-1 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6 mx-auto w-fit">
              Wholesale Systems Architect & Consultant
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
              Scale Beyond the <span className="text-emerald-400">Grind.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              I build custom software and automation systems for high-volume wholesalers who are tired of manual follow-ups and CRM chaos.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://calendly.com/t2060891/30min?month=2026-04"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold transition-all flex items-center gap-2 group shadow-lg shadow-emerald-900/20"
              >
                Book a Systems Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="https://tudorcrisan.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl font-semibold transition-all"
              >
                View My Tech Stack
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section (Bento Grid) */}
      <section className="py-24 px-6 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Is Your Business Built on Sand?</h2>
            <p className="text-slate-400">Most wholesalers fail because their "systems" are just manual effort in disguise.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-8 rounded-3xl group">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">SMS Deliverability</h3>
              <p className="text-slate-400 leading-relaxed">Stop getting flagged. I build automated rotation and template testing systems to ensure your messages hit the inbox.</p>
            </div>

            <div className="glass p-8 rounded-3xl group md:col-span-1">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20">
                <Layers className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">CRM Optimization</h3>
              <p className="text-slate-400 leading-relaxed">Podio or REsimpli feeling like a mess? I specialize in API integrations that keep your data clean and actionable.</p>
            </div>

            <div className="glass p-8 rounded-3xl group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 border border-amber-500/20">
                <Bot className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Lead Nurturing</h3>
              <p className="text-slate-400 leading-relaxed">Let AI handle the "Is it still for sale?" tire-kickers, so your closers only talk to motivated sellers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto glass p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Calculate Your <span className="text-emerald-400">Inefficiency</span></h2>
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-4">Monthly Lead Volume: <span className="text-white font-bold">{calculator.leads}</span></label>
                  <input 
                    type="range" min="10" max="1000" step="10" 
                    value={calculator.leads}
                    onChange={(e) => setCalculator({...calculator, leads: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-4">Minutes per Manual Follow-up: <span className="text-white font-bold">{calculator.timePerLead}</span></label>
                  <input 
                    type="range" min="5" max="60" step="5" 
                    value={calculator.timePerLead}
                    onChange={(e) => setCalculator({...calculator, timePerLead: parseInt(e.target.value)})}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 text-center">
              <div className="mb-6">
                <span className="text-slate-400 text-sm uppercase tracking-widest font-bold">Wasted Human Hours</span>
                <div className="text-5xl font-bold text-emerald-400 mt-2">{manualHours.toFixed(0)}h</div>
                <p className="text-slate-500 text-xs mt-2">Every single month</p>
              </div>
              <div className="pt-6 border-t border-slate-800">
                <span className="text-slate-400 text-sm">Potential Monthly Savings</span>
                <div className="text-3xl font-bold text-white mt-1">${potentialSavings.toLocaleString()}</div>
                <p className="text-emerald-500/60 text-[10px] mt-2 italic font-medium tracking-wide">Ready to automate this?</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution / Services */}
      <section className="py-24 px-6 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tailored Solutions for Wholesalers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Automated Skip Tracing</h3>
                <p className="text-slate-400 leading-relaxed">Build custom pipelines that automatically pull and verify data the moment a lead enters your system.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <MessageSquare className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Multi-Channel Follow-up</h3>
                <p className="text-slate-400 leading-relaxed">Integrated SMS, Email, and Voice Drop systems that work in harmony without triggering spam filters.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <LineChart className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">KPI Dashboards</h3>
                <p className="text-slate-400 leading-relaxed">Custom real-time reporting that shows you exactly which markets and lists are generating your highest ROI.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Settings className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Custom Software Dev</h3>
                <p className="text-slate-400 leading-relaxed">Need a proprietary tool? I build custom web apps and mobile interfaces tailored for your unique acquisition model.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto glass p-16 rounded-[3rem] border-emerald-500/20 shadow-2xl shadow-emerald-950/20">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 italic tracking-tight">Ready to stop grinding and start <span className="text-emerald-400 font-bold not-italic">scaling?</span></h2>
          <p className="text-slate-400 text-lg mb-12">I only work with 2 new wholesale teams per month to ensure dedicated systems support.</p>
          <a 
            href="https://calendly.com/t2060891/30min?month=2026-04"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-xl transition-all shadow-xl shadow-emerald-900/40 transform hover:-translate-y-1 active:scale-95"
          >
            Apply for a Systems Audit
          </a>
          <p className="mt-8 text-slate-500 text-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Guaranteed response within 24 hours
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-900 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-sm">© 2026 Developed for the Wholesaling Community. Built with Next.js & Tailwind.</p>
          <div className="flex gap-6">
            <a href="mailto:tudor.crisan.webdev@gmail.com" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-emerald-400 transition-colors">Email</a>
            <a href="https://wa.me/40757754718" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-emerald-400 transition-colors">WhatsApp</a>
            <a href="https://www.linkedin.com/in/tudor-crisan-0b0ab5404/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-emerald-400 transition-colors">LinkedIn</a>
            <a href="https://github.com/tudor-crisan" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-emerald-400 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
