import React, { useState } from 'react';
import { Terminal, GitBranch, Cpu, Camera, Check, Copy, FileText } from 'lucide-react';
import { profileData } from '../data/portfolioData';

export function TerminalCard({ darkMode }) {
  const [activeTab, setActiveTab] = useState('git');
  const [copied, setCopied] = useState(false);
  const [customCommand, setCustomCommand] = useState('');
  const [cliHistory, setCliHistory] = useState([
    { cmd: 'whoami', out: 'Md. Zobaer Ahmed — CSE @ United International University' },
    { cmd: 'role --status', out: 'Digital PM Trainee @ Interactive Cares | VP @ UIU Photography Club' }
  ]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = customCommand.trim().toLowerCase();
    if (!cmd) return;

    let response = '';
    if (cmd === 'clear') {
      setCliHistory([]);
      setCustomCommand('');
      return;
    } else if (cmd === 'help') {
      response = 'Available commands: whoami, stack, edu, exif, awards, cv, contact, clear';
    } else if (cmd === 'whoami') {
      response = 'Md. Zobaer Ahmed — CS Undergrad, Aspiring Product Manager & Award-Winning Photographer';
    } else if (cmd === 'git') {
      response = `Commit: ${profileData.activeCommit.hash} [${profileData.activeCommit.branch}] - ${profileData.activeCommit.message}`;
    } else if (cmd === 'stack') {
      response = 'Programming: C, C++, Python, JavaScript, PHP, SQL, NoSQL | Tools: MS Office, Canva, Lightroom';
    } else if (cmd === 'edu') {
      response = 'UIU (B.Sc. CSE, 10th Trimester) | DRMC (HSC Science, GPA 5.00) | Chairman Bazar Sec. School (SSC, GPA 5.00)';
    } else if (cmd === 'exif') {
      response = 'Glass: Fujifilm X-T5 + Fujinon XF 35mm f/1.4 R @ f/1.4, 1/200s, ISO 200';
    } else if (cmd === 'awards') {
      response = 'Winner: Life at UIU (2024) | Winner: Reflection 3.0 GSCPC | 1st Runner-up: DRMC Nature Fest | Greece & Scotland (2024-2026)';
    } else if (cmd === 'cv') {
      response = 'CV available at /Academic_CV.pdf (Click "Download CV" in navbar or about)';
    } else if (cmd === 'contact') {
      response = 'Email: mdzobaerahmed31@gmail.com';
    } else {
      response = `command not found: ${cmd}. Type 'help' for commands.`;
    }

    setCliHistory(prev => [...prev, { cmd: customCommand, out: response }]);
    setCustomCommand('');
  };

  const copyGitHash = () => {
    navigator.clipboard.writeText(profileData.activeCommit.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full rounded-xl border font-mono text-xs shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 ${
      darkMode 
        ? 'bg-[#0E1524]/90 border-slate-800 text-slate-300 shadow-black/40' 
        : 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-200/50'
    }`}>
      {/* Terminal Titlebar */}
      <div className={`px-4 py-2.5 flex items-center justify-between border-b ${
        darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="ml-2 text-[11px] text-slate-400 font-medium tracking-tight">
            zobaer@uiu-station:~/{activeTab}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('git')}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              activeTab === 'git' 
                ? (darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-800') 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            git
          </button>
          <button
            onClick={() => setActiveTab('sys')}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              activeTab === 'sys' 
                ? (darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-800') 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            academics
          </button>
          <button
            onClick={() => setActiveTab('lens')}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              activeTab === 'lens' 
                ? (darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-800') 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            lens
          </button>
          <button
            onClick={() => setActiveTab('cli')}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              activeTab === 'cli' 
                ? (darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-800') 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            shell
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 space-y-3 min-h-[175px]">
        {activeTab === 'git' && (
          <div className="space-y-2 text-[11.5px] leading-relaxed">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-amber-400" />
                <span>On branch <strong className="text-slate-200">main</strong></span>
              </span>
              <button 
                onClick={copyGitHash}
                title="Copy commit hash"
                className="flex items-center gap-1 hover:text-amber-400 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span className="text-[10px]">#{profileData.activeCommit.hash}</span>
              </button>
            </div>

            <div className={`p-2.5 rounded border text-[11px] ${
              darkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="text-slate-400 text-[10px] mb-1">HEAD commit:</div>
              <p className="text-amber-400 font-medium truncate">
                {profileData.activeCommit.message}
              </p>
              <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
                <span>Committed {profileData.activeCommit.timestamp}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  ● working tree clean
                </span>
              </div>
            </div>

            <div className="pt-1 flex flex-wrap gap-2 text-[10.5px]">
              <span className="text-slate-500">$ git log --oneline -2:</span>
              <span className="text-amber-400">{profileData.activeCommit.hash}</span>
              <span className="text-slate-400">feat(eduwave): tenant isolation</span>
            </div>
          </div>
        )}

        {activeTab === 'sys' && (
          <div className="space-y-2 text-[11px]">
            <div className="grid grid-cols-2 gap-2">
              <div className={`p-2 rounded border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-slate-500 text-[10px]">INSTITUTION</div>
                <div className="text-emerald-400 font-bold text-xs truncate">UIU (United Int'l Univ)</div>
                <div className="text-[10px] text-slate-400">8th Trimester • CSE</div>
              </div>
              <div className={`p-2 rounded border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-slate-500 text-[10px]">ACADEMIC RECORD</div>
                <div className="text-amber-400 font-bold text-xs">GPA 5.00 / 5.00</div>
                <div className="text-[10px] text-slate-400">DRMC HSC & SSC Golden</div>
              </div>
            </div>
            <div className="text-slate-400 flex items-center justify-between text-[10.5px] pt-1">
              <span>Program: Digital PM @ Interactive Cares</span>
              <span className="text-slate-500">VP @ UIUPC</span>
            </div>
          </div>
        )}

        {activeTab === 'lens' && (
          <div className="space-y-2 text-[11px]">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                <span>Camera & Optics</span>
              </span>
              <span className="text-amber-400 text-[10px]">Fujifilm X-T5</span>
            </div>
            <div className={`p-2 rounded border space-y-1 text-[10.5px] ${
              darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex justify-between">
                <span className="text-slate-500">Primary Lens:</span>
                <span className="text-slate-200">Fujinon XF 35mm f/1.4 R</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Telephoto Zoom:</span>
                <span className="text-slate-200">Fujinon XF 50-140mm f/2.8 WR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Exhibitions:</span>
                <span className="text-amber-400">Greece & Scotland (2024-2025)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cli' && (
          <div className="space-y-2 text-[11px]">
            <div className="max-h-24 overflow-y-auto space-y-1 pr-1">
              {cliHistory.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-amber-400 flex items-center gap-1">
                    <span className="text-slate-500">$</span> {item.cmd}
                  </div>
                  <div className="text-slate-300 pl-2 text-[10.5px] font-sans opacity-90">
                    {item.out}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleCommandSubmit} className="flex items-center gap-1.5 pt-1 border-t border-slate-800/40">
              <span className="text-amber-400">$</span>
              <input 
                type="text" 
                value={customCommand}
                onChange={(e) => setCustomCommand(e.target.value)}
                placeholder="type 'help', 'whoami', 'stack', 'edu'..." 
                className="bg-transparent text-xs w-full focus:outline-hidden text-slate-200 placeholder:text-slate-600 font-mono"
              />
              <span className="animate-blink text-amber-400">_</span>
            </form>
          </div>
        )}
      </div>

      {/* Terminal Footer status */}
      <div className={`px-4 py-1.5 text-[10px] flex items-center justify-between border-t ${
        darkMode ? 'bg-slate-900/40 border-slate-800/80 text-slate-500' : 'bg-slate-100/60 border-slate-200 text-slate-500'
      }`}>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>UIUPC / IDP Active</span>
        </span>
        <span className="text-amber-400 font-medium">READY FOR INTERNSHIPS</span>
      </div>
    </div>
  );
}
