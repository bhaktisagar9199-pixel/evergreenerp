import { useState, useRef, useCallback } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { useCmsData, CmsData } from "@/hooks/useCmsData";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import {
  LayoutDashboard, FileText, Bell, Newspaper, Calendar,
  Image, Palette, Settings, LogOut, ExternalLink, Plus,
  Trash2, ArrowUp, ArrowDown, Star, Pin, Upload, X,
  ChevronRight, Users, GraduationCap, Phone, Save,
  Menu, Check, ImagePlus, Eye
} from "lucide-react";

type Panel =
  | "overview"
  | "page-home" | "page-about" | "page-admission" | "page-contact"
  | "notices" | "news" | "events" | "gallery" | "team"
  | "media" | "design" | "settings";

const SIDEBAR_GROUPS = [
  {
    label: "Dashboard",
    items: [{ id: "overview" as Panel, label: "Overview", icon: LayoutDashboard }],
  },
  {
    label: "Pages",
    items: [
      { id: "page-home" as Panel, label: "Home Page", icon: FileText },
      { id: "page-about" as Panel, label: "About Page", icon: Users },
      { id: "page-admission" as Panel, label: "Admissions", icon: GraduationCap },
      { id: "page-contact" as Panel, label: "Contact Page", icon: Phone },
    ],
  },
  {
    label: "Content",
    items: [
      { id: "notices" as Panel, label: "Notices", icon: Bell },
      { id: "news" as Panel, label: "News", icon: Newspaper },
      { id: "events" as Panel, label: "Events", icon: Calendar },
      { id: "gallery" as Panel, label: "Gallery", icon: Image },
      { id: "team" as Panel, label: "Leadership Team", icon: Users },
    ],
  },
  {
    label: "System",
    items: [
      { id: "media" as Panel, label: "Media Manager", icon: ImagePlus },
      { id: "design" as Panel, label: "Design & Theme", icon: Palette },
      { id: "settings" as Panel, label: "Site Settings", icon: Settings },
    ],
  },
];

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
      {description && <p className="text-slate-400 text-sm">{description}</p>}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-slate-800 border border-slate-700 rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{children}</label>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50";
const textareaCls = inputCls + " resize-none";

function AdminInput({ value, onChange, placeholder = "", type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={inputCls} />;
}

function AdminTextarea({ value, onChange, placeholder = "", rows = 4 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} className={textareaCls} />;
}

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold gap-2 rounded-xl px-6">
      <Save className="w-4 h-4" /> Save Changes
    </Button>
  );
}

// ─── OVERVIEW PANEL ────────────────────────────────────────────────────────────
function OverviewPanel({ data, onNav }: { data: CmsData; onNav: (p: Panel) => void }) {
  const stats = [
    { label: "Notices", value: data.notices.length, icon: Bell, color: "bg-blue-500/20 text-blue-400", action: "notices" as Panel },
    { label: "News Articles", value: data.news.length, icon: Newspaper, color: "bg-green-500/20 text-green-400", action: "news" as Panel },
    { label: "Events", value: data.events.length, icon: Calendar, color: "bg-purple-500/20 text-purple-400", action: "events" as Panel },
    { label: "Gallery Images", value: data.gallery.length, icon: Image, color: "bg-amber-500/20 text-amber-400", action: "gallery" as Panel },
    { label: "Team Members", value: data.team.length, icon: Users, color: "bg-pink-500/20 text-pink-400", action: "team" as Panel },
    { label: "Media Files", value: data.media.length, icon: ImagePlus, color: "bg-indigo-500/20 text-indigo-400", action: "media" as Panel },
  ];

  return (
    <div>
      <SectionHeader title="Dashboard Overview" description="A summary of all content on your website." />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <button key={s.label} onClick={() => onNav(s.action)}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-5 text-left hover:border-amber-500/40 hover:bg-slate-750 transition-colors group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
            <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{s.label}</div>
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-amber-400" /> Pinned Notices</h3>
          {data.notices.filter(n => n.pinned).map(n => (
            <div key={n.id} className="flex items-center gap-3 py-2 border-b border-slate-700 last:border-0">
              <Pin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-sm text-slate-300 truncate">{n.title}</span>
            </div>
          ))}
          {data.notices.filter(n => n.pinned).length === 0 && <p className="text-slate-500 text-sm">No pinned notices.</p>}
        </Card>
        <Card>
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-400" /> Upcoming Events</h3>
          {data.events.slice(0, 4).map(e => (
            <div key={e.id} className="flex items-center gap-3 py-2 border-b border-slate-700 last:border-0">
              <span className="text-xs text-amber-400 font-bold w-16 shrink-0">{e.date}</span>
              <span className="text-sm text-slate-300 truncate">{e.title}</span>
            </div>
          ))}
          {data.events.length === 0 && <p className="text-slate-500 text-sm">No events.</p>}
        </Card>
      </div>
    </div>
  );
}

// ─── PAGE: HOME PANEL ──────────────────────────────────────────────────────────
function HomePanel({ data, updateSection }: { data: CmsData; updateSection: any }) {
  const { toast } = useToast();
  const [hero, setHero] = useState(data.hero);
  const [stats, setStats] = useState(data.stats);

  const save = () => {
    updateSection("hero", hero);
    updateSection("stats", stats);
    toast({ title: "Home page saved!" });
  };

  return (
    <div>
      <SectionHeader title="Home Page" description="Edit the hero section and statistics." />
      <div className="space-y-6">
        <Card>
          <h3 className="font-semibold text-white mb-4">Hero Section</h3>
          <div className="space-y-4">
            <Field label="Hero Title">
              <AdminInput value={hero.title} onChange={v => setHero(p => ({ ...p, title: v }))} />
            </Field>
            <Field label="Hero Subtitle">
              <AdminTextarea value={hero.subtitle} onChange={v => setHero(p => ({ ...p, subtitle: v }))} rows={3} />
            </Field>
            <Field label="CTA Button Text">
              <AdminInput value={hero.cta} onChange={v => setHero(p => ({ ...p, cta: v }))} />
            </Field>
            <Field label="Background Image URL">
              <AdminInput value={hero.backgroundImage} onChange={v => setHero(p => ({ ...p, backgroundImage: v }))} placeholder="https://..." />
            </Field>
            {hero.backgroundImage && (
              <img src={hero.backgroundImage} alt="Preview" className="w-full h-32 object-cover rounded-lg opacity-60" />
            )}
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold text-white mb-4">Statistics Bar</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <Field label={`Stat ${idx + 1} Value`}>
                  <AdminInput value={stat.value} onChange={v => setStats(s => { const n = [...s]; n[idx] = { ...n[idx], value: v }; return n; })} />
                </Field>
                <Field label="Label">
                  <AdminInput value={stat.label} onChange={v => setStats(s => { const n = [...s]; n[idx] = { ...n[idx], label: v }; return n; })} />
                </Field>
              </div>
            ))}
          </div>
        </Card>
        <div className="flex justify-end"><SaveButton onClick={save} /></div>
      </div>
    </div>
  );
}

// ─── PAGE: ABOUT PANEL ────────────────────────────────────────────────────────
function AboutPanel({ data, updateSection }: { data: CmsData; updateSection: any }) {
  const { toast } = useToast();
  const [about, setAbout] = useState(data.about);

  const save = () => {
    updateSection("about", about);
    toast({ title: "About page saved!" });
  };

  return (
    <div>
      <SectionHeader title="About Page" description="Edit the school history, mission, and vision." />
      <div className="space-y-6">
        <Card>
          <div className="space-y-4">
            <Field label="History">
              <AdminTextarea value={about.history} onChange={v => setAbout(p => ({ ...p, history: v }))} rows={6} />
            </Field>
            <Field label="History Section Image URL">
              <AdminInput value={about.historyImage || ""} onChange={v => setAbout(p => ({ ...p, historyImage: v }))} placeholder="https://..." />
            </Field>
            {about.historyImage && (
              <img src={about.historyImage} alt="Preview" className="w-full h-32 object-cover rounded-lg opacity-60" />
            )}
            <Field label="Mission">
              <AdminTextarea value={about.mission} onChange={v => setAbout(p => ({ ...p, mission: v }))} rows={4} />
            </Field>
            <Field label="Vision">
              <AdminTextarea value={about.vision} onChange={v => setAbout(p => ({ ...p, vision: v }))} rows={4} />
            </Field>
          </div>
        </Card>
        <div className="flex justify-end"><SaveButton onClick={save} /></div>
      </div>
    </div>
  );
}

// ─── PAGE: ADMISSION PANEL ────────────────────────────────────────────────────
function AdmissionPanel({ data, updateSection }: { data: CmsData; updateSection: any }) {
  const { toast } = useToast();
  const [ad, setAd] = useState(data.admission);

  const save = () => {
    updateSection("admission", ad);
    toast({ title: "Admissions page saved!" });
  };

  const updateReq = (idx: number, val: string) => setAd(p => { const r = [...p.requirements]; r[idx] = val; return { ...p, requirements: r }; });
  const addReq = () => setAd(p => ({ ...p, requirements: [...p.requirements, ""] }));
  const removeReq = (idx: number) => setAd(p => ({ ...p, requirements: p.requirements.filter((_, i) => i !== idx) }));

  const updateStep = (idx: number, field: "step" | "description", val: string) => setAd(p => { const pr = [...p.process]; pr[idx] = { ...pr[idx], [field]: val }; return { ...p, process: pr }; });
  const addStep = () => setAd(p => ({ ...p, process: [...p.process, { step: `Step ${p.process.length + 1}`, description: "" }] }));
  const removeStep = (idx: number) => setAd(p => ({ ...p, process: p.process.filter((_, i) => i !== idx) }));

  return (
    <div>
      <SectionHeader title="Admissions Page" description="Manage all admissions content and process." />
      <div className="space-y-6">
        <Card>
          <h3 className="font-semibold text-white mb-4">Page Header</h3>
          <div className="space-y-4">
            <Field label="Title"><AdminInput value={ad.title} onChange={v => setAd(p => ({ ...p, title: v }))} /></Field>
            <Field label="Subtitle"><AdminInput value={ad.subtitle} onChange={v => setAd(p => ({ ...p, subtitle: v }))} /></Field>
            <Field label="Introduction Text"><AdminTextarea value={ad.intro} onChange={v => setAd(p => ({ ...p, intro: v }))} rows={4} /></Field>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Requirements</h3>
            <button onClick={addReq} className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add</button>
          </div>
          <div className="space-y-3">
            {ad.requirements.map((req, idx) => (
              <div key={idx} className="flex gap-2">
                <input value={req} onChange={e => updateReq(idx, e.target.value)} className={inputCls + " flex-1"} />
                <button onClick={() => removeReq(idx)} className="text-red-400 hover:text-red-300 p-2"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Application Process Steps</h3>
            <button onClick={addStep} className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add Step</button>
          </div>
          <div className="space-y-4">
            {ad.process.map((step, idx) => (
              <div key={idx} className="bg-slate-700/50 rounded-xl p-4 space-y-3">
                <div className="flex gap-2">
                  <input value={step.step} onChange={e => updateStep(idx, "step", e.target.value)} className={inputCls + " flex-1"} placeholder="Step name" />
                  <button onClick={() => removeStep(idx)} className="text-red-400 hover:text-red-300 p-2"><Trash2 className="w-4 h-4" /></button>
                </div>
                <textarea value={step.description} onChange={e => updateStep(idx, "description", e.target.value)} rows={2} className={textareaCls} placeholder="Description" />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold text-white mb-4">Additional Details</h3>
          <div className="space-y-4">
            <Field label="Fees Information"><AdminTextarea value={ad.fees} onChange={v => setAd(p => ({ ...p, fees: v }))} rows={3} /></Field>
            <Field label="Application Deadline"><AdminInput value={ad.deadline} onChange={v => setAd(p => ({ ...p, deadline: v }))} /></Field>
            <Field label="Admissions Contact Email"><AdminInput value={ad.contactEmail} onChange={v => setAd(p => ({ ...p, contactEmail: v }))} type="email" /></Field>
          </div>
        </Card>
        <div className="flex justify-end"><SaveButton onClick={save} /></div>
      </div>
    </div>
  );
}

// ─── PAGE: CONTACT PANEL ──────────────────────────────────────────────────────
function ContactPanel({ data, updateSection }: { data: CmsData; updateSection: any }) {
  const { toast } = useToast();
  const [contact, setContact] = useState(data.contact);

  const save = () => {
    updateSection("contact", contact);
    toast({ title: "Contact page saved!" });
  };

  return (
    <div>
      <SectionHeader title="Contact Page" description="Edit contact details shown on the Contact page." />
      <div className="space-y-6">
        <Card>
          <div className="space-y-4">
            <Field label="Address"><AdminInput value={contact.address} onChange={v => setContact(p => ({ ...p, address: v }))} /></Field>
            <Field label="Phone Number"><AdminInput value={contact.phone} onChange={v => setContact(p => ({ ...p, phone: v }))} /></Field>
            <Field label="Email Address"><AdminInput value={contact.email} onChange={v => setContact(p => ({ ...p, email: v }))} type="email" /></Field>
            <Field label="Office Hours"><AdminTextarea value={contact.hours} onChange={v => setContact(p => ({ ...p, hours: v }))} rows={3} /></Field>
          </div>
        </Card>
        <div className="flex justify-end"><SaveButton onClick={save} /></div>
      </div>
    </div>
  );
}

// ─── NOTICES PANEL ────────────────────────────────────────────────────────────
function NoticesPanel({ data, updateSection }: { data: CmsData; updateSection: any }) {
  const { toast } = useToast();
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);

  const add = () => {
    const n = { id: Date.now().toString(), title: "New Notice", content: "Notice content here.", category: "General", date: new Date().toISOString().split("T")[0], pinned: false };
    updateSection("notices", [n, ...data.notices]);
    setEditId(n.id); setEditData(n);
    toast({ title: "Notice created" });
  };

  const del = (id: string) => {
    if (!confirm("Delete this notice?")) return;
    updateSection("notices", data.notices.filter(x => x.id !== id));
    if (editId === id) { setEditId(null); setEditData(null); }
  };

  const saveEdit = () => {
    updateSection("notices", data.notices.map(n => n.id === editId ? editData : n));
    toast({ title: "Notice saved" });
  };

  const togglePin = (id: string) => {
    updateSection("notices", data.notices.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  const move = (idx: number, dir: -1 | 1) => {
    const arr = [...data.notices];
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= arr.length) return;
    [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
    updateSection("notices", arr);
  };

  return (
    <div>
      <SectionHeader title="Notices" description="Manage all school notices and announcements." />
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <button onClick={add} className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold py-2.5 rounded-xl text-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Notice
          </button>
          {data.notices.map((notice, idx) => (
            <div key={notice.id}
              onClick={() => { setEditId(notice.id); setEditData({ ...notice }); }}
              className={`bg-slate-800 border rounded-xl p-4 cursor-pointer transition-colors ${editId === notice.id ? "border-amber-400/60" : "border-slate-700 hover:border-slate-500"}`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-medium text-white text-sm leading-tight line-clamp-1">{notice.title}</p>
                <div className="flex gap-1 shrink-0">
                  <button onClick={e => { e.stopPropagation(); togglePin(notice.id); }} className={`p-1 rounded ${notice.pinned ? "text-amber-400" : "text-slate-500 hover:text-slate-300"}`}><Pin className="w-3.5 h-3.5" /></button>
                  <button onClick={e => { e.stopPropagation(); move(idx, -1); }} disabled={idx === 0} className="p-1 text-slate-500 hover:text-slate-300 disabled:opacity-30"><ArrowUp className="w-3.5 h-3.5" /></button>
                  <button onClick={e => { e.stopPropagation(); move(idx, 1); }} disabled={idx === data.notices.length - 1} className="p-1 text-slate-500 hover:text-slate-300 disabled:opacity-30"><ArrowDown className="w-3.5 h-3.5" /></button>
                  <button onClick={e => { e.stopPropagation(); del(notice.id); }} className="p-1 text-red-400 hover:text-red-300"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <div className="flex gap-2 text-xs text-slate-500">
                <span className="bg-slate-700 px-2 py-0.5 rounded-full">{notice.category}</span>
                <span>{notice.date}</span>
                {notice.pinned && <span className="text-amber-400">Pinned</span>}
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-3">
          {editData ? (
            <Card>
              <h3 className="font-semibold text-white mb-4">Edit Notice</h3>
              <div className="space-y-4">
                <Field label="Title"><input value={editData.title} onChange={e => setEditData((p: any) => ({ ...p, title: e.target.value }))} className={inputCls} /></Field>
                <Field label="Content"><textarea value={editData.content} onChange={e => setEditData((p: any) => ({ ...p, content: e.target.value }))} rows={5} className={textareaCls} /></Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Category"><input value={editData.category} onChange={e => setEditData((p: any) => ({ ...p, category: e.target.value }))} className={inputCls} /></Field>
                  <Field label="Date"><input type="date" value={editData.date} onChange={e => setEditData((p: any) => ({ ...p, date: e.target.value }))} className={inputCls} /></Field>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div onClick={() => setEditData((p: any) => ({ ...p, pinned: !p.pinned }))} className={`w-10 h-5 rounded-full transition-colors flex items-center px-0.5 ${editData.pinned ? "bg-amber-500" : "bg-slate-600"}`}>
                    <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${editData.pinned ? "translate-x-5" : "translate-x-0"}`} />
                  </div>
                  <span className="text-sm text-slate-300">Pinned</span>
                </label>
                <div className="flex justify-end"><SaveButton onClick={saveEdit} /></div>
              </div>
            </Card>
          ) : (
            <div className="bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-2xl h-48 flex items-center justify-center text-slate-500">
              Select a notice to edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── NEWS PANEL ───────────────────────────────────────────────────────────────
function NewsPanel({ data, updateSection }: { data: CmsData; updateSection: any }) {
  const { toast } = useToast();
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);

  const add = () => {
    const n = { id: Date.now().toString(), title: "New Article", summary: "Article summary.", content: "", date: new Date().toISOString().split("T")[0], image: "https://picsum.photos/800/600?random=" + Math.floor(Math.random() * 200), featured: false };
    updateSection("news", [n, ...data.news]);
    setEditId(n.id); setEditData(n);
    toast({ title: "Article created" });
  };

  const del = (id: string) => {
    if (!confirm("Delete this article?")) return;
    updateSection("news", data.news.filter(x => x.id !== id));
    if (editId === id) { setEditId(null); setEditData(null); }
  };

  const saveEdit = () => {
    updateSection("news", data.news.map(n => n.id === editId ? editData : n));
    toast({ title: "Article saved" });
  };

  const setFeatured = (id: string) => {
    updateSection("news", data.news.map(n => ({ ...n, featured: n.id === id ? !n.featured : false })));
  };

  return (
    <div>
      <SectionHeader title="News Articles" description="Manage news and announcements for the website." />
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <button onClick={add} className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold py-2.5 rounded-xl text-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Article
          </button>
          {data.news.map((article) => (
            <div key={article.id}
              onClick={() => { setEditId(article.id); setEditData({ ...article }); }}
              className={`bg-slate-800 border rounded-xl p-4 cursor-pointer transition-colors ${editId === article.id ? "border-amber-400/60" : "border-slate-700 hover:border-slate-500"}`}
            >
              <div className="flex gap-3 mb-2">
                {article.image && <img src={article.image} className="w-12 h-12 rounded-lg object-cover shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm leading-tight line-clamp-2">{article.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{article.date}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button onClick={e => { e.stopPropagation(); setFeatured(article.id); }} className={`text-xs px-2 py-1 rounded-full ${article.featured ? "bg-amber-500/20 text-amber-400" : "text-slate-500 hover:text-amber-400"}`}>
                  {article.featured ? "★ Featured" : "☆ Feature"}
                </button>
                <button onClick={e => { e.stopPropagation(); del(article.id); }} className="p-1 text-red-400 hover:text-red-300"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-3">
          {editData ? (
            <Card>
              <h3 className="font-semibold text-white mb-4">Edit Article</h3>
              <div className="space-y-4">
                <Field label="Title"><input value={editData.title} onChange={e => setEditData((p: any) => ({ ...p, title: e.target.value }))} className={inputCls} /></Field>
                <Field label="Summary"><textarea value={editData.summary} onChange={e => setEditData((p: any) => ({ ...p, summary: e.target.value }))} rows={3} className={textareaCls} /></Field>
                <Field label="Full Content"><textarea value={editData.content} onChange={e => setEditData((p: any) => ({ ...p, content: e.target.value }))} rows={5} className={textareaCls} /></Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Date"><input type="date" value={editData.date} onChange={e => setEditData((p: any) => ({ ...p, date: e.target.value }))} className={inputCls} /></Field>
                  <Field label="Image URL"><input value={editData.image} onChange={e => setEditData((p: any) => ({ ...p, image: e.target.value }))} className={inputCls} /></Field>
                </div>
                {editData.image && <img src={editData.image} className="w-full h-28 object-cover rounded-lg opacity-70" />}
                <div className="flex justify-end"><SaveButton onClick={saveEdit} /></div>
              </div>
            </Card>
          ) : (
            <div className="bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-2xl h-48 flex items-center justify-center text-slate-500">
              Select an article to edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── EVENTS PANEL ─────────────────────────────────────────────────────────────
function EventsPanel({ data, updateSection }: { data: CmsData; updateSection: any }) {
  const { toast } = useToast();
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);

  const add = () => {
    const n = { id: Date.now().toString(), title: "New Event", description: "Event description.", date: new Date().toISOString().split("T")[0], time: "10:00", location: "TBD" };
    updateSection("events", [...data.events, n]);
    setEditId(n.id); setEditData(n);
    toast({ title: "Event created" });
  };

  const del = (id: string) => {
    if (!confirm("Delete this event?")) return;
    updateSection("events", data.events.filter(x => x.id !== id));
    if (editId === id) { setEditId(null); setEditData(null); }
  };

  const saveEdit = () => {
    updateSection("events", data.events.map(e => e.id === editId ? editData : e));
    toast({ title: "Event saved" });
  };

  const sorted = [...data.events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      <SectionHeader title="Events Calendar" description="Add and manage school events and activities." />
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <button onClick={add} className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold py-2.5 rounded-xl text-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Event
          </button>
          {sorted.map((event) => (
            <div key={event.id}
              onClick={() => { setEditId(event.id); setEditData({ ...event }); }}
              className={`bg-slate-800 border rounded-xl p-4 cursor-pointer transition-colors ${editId === event.id ? "border-amber-400/60" : "border-slate-700 hover:border-slate-500"}`}
            >
              <div className="flex gap-3 items-center">
                <div className="bg-slate-700 rounded-lg p-2 text-center min-w-[48px]">
                  <div className="text-amber-400 text-xs font-bold">{event.date.split("-")[1]}/{event.date.split("-")[2]}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm truncate">{event.title}</p>
                  <p className="text-xs text-slate-500">{event.time} · {event.location}</p>
                </div>
                <button onClick={e => { e.stopPropagation(); del(event.id); }} className="p-1 text-red-400 hover:text-red-300 shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-3">
          {editData ? (
            <Card>
              <h3 className="font-semibold text-white mb-4">Edit Event</h3>
              <div className="space-y-4">
                <Field label="Event Title"><input value={editData.title} onChange={e => setEditData((p: any) => ({ ...p, title: e.target.value }))} className={inputCls} /></Field>
                <Field label="Description"><textarea value={editData.description} onChange={e => setEditData((p: any) => ({ ...p, description: e.target.value }))} rows={4} className={textareaCls} /></Field>
                <div className="grid grid-cols-3 gap-4">
                  <Field label="Date"><input type="date" value={editData.date} onChange={e => setEditData((p: any) => ({ ...p, date: e.target.value }))} className={inputCls} /></Field>
                  <Field label="Time"><input type="time" value={editData.time} onChange={e => setEditData((p: any) => ({ ...p, time: e.target.value }))} className={inputCls} /></Field>
                  <Field label="Location"><input value={editData.location} onChange={e => setEditData((p: any) => ({ ...p, location: e.target.value }))} className={inputCls} /></Field>
                </div>
                <div className="flex justify-end"><SaveButton onClick={saveEdit} /></div>
              </div>
            </Card>
          ) : (
            <div className="bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-2xl h-48 flex items-center justify-center text-slate-500">
              Select an event to edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── GALLERY PANEL ────────────────────────────────────────────────────────────
function GalleryPanel({ data, updateSection }: { data: CmsData; updateSection: any }) {
  const { toast } = useToast();
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);

  const add = () => {
    const n = { id: Date.now().toString(), title: "New Image", category: "General", image: "https://picsum.photos/800/600?random=" + Math.floor(Math.random() * 200) };
    updateSection("gallery", [n, ...data.gallery]);
    setEditId(n.id); setEditData(n);
    toast({ title: "Image added" });
  };

  const del = (id: string) => {
    if (!confirm("Delete this image?")) return;
    updateSection("gallery", data.gallery.filter(x => x.id !== id));
    if (editId === id) { setEditId(null); setEditData(null); }
  };

  const saveEdit = () => {
    updateSection("gallery", data.gallery.map(g => g.id === editId ? editData : g));
    toast({ title: "Image saved" });
  };

  return (
    <div>
      <SectionHeader title="Photo Gallery" description="Manage all gallery images and categories." />
      <div className="flex justify-end mb-4">
        <button onClick={add} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold py-2 px-4 rounded-xl text-sm transition-colors">
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {data.gallery.map((item) => (
          <div key={item.id}
            onClick={() => { setEditId(item.id); setEditData({ ...item }); }}
            className={`relative group rounded-xl overflow-hidden aspect-square cursor-pointer border-2 transition-colors ${editId === item.id ? "border-amber-400" : "border-transparent hover:border-amber-400/40"}`}
          >
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">{item.title}</p>
                <p className="text-amber-400 text-xs">{item.category}</p>
              </div>
            </div>
            <button onClick={e => { e.stopPropagation(); del(item.id); }} className="absolute top-2 right-2 bg-red-500 hover:bg-red-400 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      {editData && (
        <Card>
          <h3 className="font-semibold text-white mb-4">Edit Image</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Field label="Title"><input value={editData.title} onChange={e => setEditData((p: any) => ({ ...p, title: e.target.value }))} className={inputCls} /></Field>
              <Field label="Category"><input value={editData.category} onChange={e => setEditData((p: any) => ({ ...p, category: e.target.value }))} className={inputCls} placeholder="Campus, Sports, Arts..." /></Field>
              <Field label="Image URL"><input value={editData.image} onChange={e => setEditData((p: any) => ({ ...p, image: e.target.value }))} className={inputCls} /></Field>
              <SaveButton onClick={saveEdit} />
            </div>
            <div>
              {editData.image && <img src={editData.image} className="w-full h-48 object-cover rounded-xl" />}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── TEAM PANEL ───────────────────────────────────────────────────────────────
function TeamPanel({ data, updateSection }: { data: CmsData; updateSection: any }) {
  const { toast } = useToast();
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);

  const add = () => {
    const n = { id: Date.now().toString(), name: "New Member", role: "Title", bio: "Biography here.", image: "https://picsum.photos/400/400?random=" + Math.floor(Math.random() * 200) };
    updateSection("team", [...data.team, n]);
    setEditId(n.id); setEditData(n);
    toast({ title: "Team member added" });
  };

  const del = (id: string) => {
    if (!confirm("Delete this team member?")) return;
    updateSection("team", data.team.filter(x => x.id !== id));
    if (editId === id) { setEditId(null); setEditData(null); }
  };

  const saveEdit = () => {
    updateSection("team", data.team.map(t => t.id === editId ? editData : t));
    toast({ title: "Team member saved" });
  };

  return (
    <div>
      <SectionHeader title="Leadership Team" description="Manage the team members displayed on the About page." />
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <button onClick={add} className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold py-2.5 rounded-xl text-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Member
          </button>
          {data.team.map((member) => (
            <div key={member.id}
              onClick={() => { setEditId(member.id); setEditData({ ...member }); }}
              className={`bg-slate-800 border rounded-xl p-4 cursor-pointer transition-colors flex gap-3 items-center ${editId === member.id ? "border-amber-400/60" : "border-slate-700 hover:border-slate-500"}`}
            >
              <img src={member.image} className="w-12 h-12 rounded-full object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm">{member.name}</p>
                <p className="text-xs text-slate-500">{member.role}</p>
              </div>
              <button onClick={e => { e.stopPropagation(); del(member.id); }} className="p-1 text-red-400 hover:text-red-300 shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
        <div className="lg:col-span-3">
          {editData ? (
            <Card>
              <h3 className="font-semibold text-white mb-4">Edit Team Member</h3>
              <div className="space-y-4">
                <Field label="Full Name"><input value={editData.name} onChange={e => setEditData((p: any) => ({ ...p, name: e.target.value }))} className={inputCls} /></Field>
                <Field label="Role / Title"><input value={editData.role} onChange={e => setEditData((p: any) => ({ ...p, role: e.target.value }))} className={inputCls} /></Field>
                <Field label="Biography"><textarea value={editData.bio} onChange={e => setEditData((p: any) => ({ ...p, bio: e.target.value }))} rows={4} className={textareaCls} /></Field>
                <Field label="Photo URL"><input value={editData.image} onChange={e => setEditData((p: any) => ({ ...p, image: e.target.value }))} className={inputCls} /></Field>
                {editData.image && <img src={editData.image} className="w-20 h-20 rounded-full object-cover" />}
                <div className="flex justify-end"><SaveButton onClick={saveEdit} /></div>
              </div>
            </Card>
          ) : (
            <div className="bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-2xl h-48 flex items-center justify-center text-slate-500">
              Select a member to edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MEDIA PANEL ──────────────────────────────────────────────────────────────
function MediaPanel({ data, updateSection }: { data: CmsData; updateSection: any }) {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState("");

  const addUrl = () => {
    if (!urlInput.trim()) return;
    const n = { id: Date.now().toString(), name: urlInput.split("/").pop() || "image", url: urlInput.trim(), type: "image" as const, uploadedAt: new Date().toISOString() };
    updateSection("media", [n, ...data.media]);
    setUrlInput("");
    toast({ title: "Image added from URL" });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const n = { id: Date.now().toString() + Math.random(), name: file.name, url: ev.target?.result as string, type: "image" as const, uploadedAt: new Date().toISOString() };
        updateSection("media", (prev: any) => [n, ...(prev.media || [])]);
      };
      reader.readAsDataURL(file);
    });
    // Simpler version: just read one at a time
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const n = { id: Date.now().toString(), name: files[0].name, url: ev.target?.result as string, type: "image" as const, uploadedAt: new Date().toISOString() };
        updateSection("media", [n, ...data.media]);
        toast({ title: `${files[0].name} uploaded` });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const del = (id: string) => updateSection("media", data.media.filter(m => m.id !== id));

  const copy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: "URL copied to clipboard!" });
  };

  return (
    <div>
      <SectionHeader title="Media Manager" description="Upload and manage images. Use image URLs in your content." />
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Card>
          <h3 className="font-semibold text-white mb-3 text-sm">Upload from Computer</h3>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          <button onClick={() => fileRef.current?.click()} className="w-full border-2 border-dashed border-slate-600 hover:border-amber-400/50 rounded-xl p-8 text-center transition-colors group">
            <Upload className="w-8 h-8 text-slate-500 group-hover:text-amber-400 mx-auto mb-2 transition-colors" />
            <p className="text-slate-400 text-sm">Click to upload an image</p>
            <p className="text-slate-600 text-xs mt-1">PNG, JPG, WebP supported</p>
          </button>
        </Card>
        <Card>
          <h3 className="font-semibold text-white mb-3 text-sm">Add Image by URL</h3>
          <div className="flex gap-2">
            <input value={urlInput} onChange={e => setUrlInput(e.target.value)} placeholder="https://example.com/image.jpg" className={inputCls + " flex-1"} onKeyDown={e => e.key === "Enter" && addUrl()} />
            <button onClick={addUrl} className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 rounded-lg font-semibold text-sm transition-colors">Add</button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data.media.map((item) => (
          <div key={item.id} className="group relative rounded-xl overflow-hidden aspect-square bg-slate-800 border border-slate-700">
            <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
              <button onClick={() => copy(item.url)} className="bg-amber-500 text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-lg w-full">Copy URL</button>
              <button onClick={() => del(item.id)} className="bg-red-500/80 text-white text-xs px-3 py-1.5 rounded-lg w-full">Delete</button>
            </div>
          </div>
        ))}
        {data.media.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-500">
            <ImagePlus className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No media uploaded yet. Add images above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DESIGN PANEL ─────────────────────────────────────────────────────────────
function DesignPanel({ data, updateSection }: { data: CmsData; updateSection: any }) {
  const { toast } = useToast();
  const [design, setDesign] = useState(data.design);

  const save = () => {
    updateSection("design", design);
    toast({ title: "Design settings saved! Refresh to see full effect." });
  };

  const headingFonts = ["Playfair Display", "Merriweather", "Lora", "Libre Baskerville", "Georgia"];
  const bodyFonts = ["Inter", "Lato", "Open Sans", "Roboto", "Source Sans 3"];

  const presets = [
    { name: "Forest Green", primary: "#0a2a1a", accent: "#4a9e6a", bg: "#f0f7f4" },
    { name: "Midnight Blue", primary: "#0a1628", accent: "#c9a84c", bg: "#f8f5f0" },
    { name: "Royal Purple", primary: "#1a0a2e", accent: "#c084fc", bg: "#faf5ff" },
    { name: "Crimson", primary: "#1a0808", accent: "#e05252", bg: "#fff8f8" },
    { name: "Slate", primary: "#1e293b", accent: "#38bdf8", bg: "#f8fafc" },
    { name: "Charcoal", primary: "#1c1c1e", accent: "#f5a623", bg: "#fafafa" },
  ];

  return (
    <div>
      <SectionHeader title="Design & Theme" description="Customise the look and feel of your school website." />
      <div className="space-y-6">
        <Card>
          <h3 className="font-semibold text-white mb-4">Colour Presets</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {presets.map((p) => (
              <button key={p.name} onClick={() => setDesign(d => ({ ...d, primaryColor: p.primary, accentColor: p.accent, backgroundColor: p.bg }))}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-600 hover:border-amber-400/50 transition-colors"
              >
                <div className="flex gap-1">
                  <div className="w-5 h-5 rounded-full border border-slate-500" style={{ background: p.primary }} />
                  <div className="w-5 h-5 rounded-full border border-slate-500" style={{ background: p.accent }} />
                </div>
                <span className="text-slate-400 text-xs">{p.name}</span>
              </button>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold text-white mb-4">Custom Colours</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Label>Primary Colour</Label>
              <div className="flex gap-3 items-center">
                <input type="color" value={design.primaryColor} onChange={e => setDesign(d => ({ ...d, primaryColor: e.target.value }))} className="w-12 h-10 rounded-lg border border-slate-600 bg-transparent cursor-pointer" />
                <input value={design.primaryColor} onChange={e => setDesign(d => ({ ...d, primaryColor: e.target.value }))} className={inputCls + " flex-1"} />
              </div>
            </div>
            <div>
              <Label>Accent Colour</Label>
              <div className="flex gap-3 items-center">
                <input type="color" value={design.accentColor} onChange={e => setDesign(d => ({ ...d, accentColor: e.target.value }))} className="w-12 h-10 rounded-lg border border-slate-600 bg-transparent cursor-pointer" />
                <input value={design.accentColor} onChange={e => setDesign(d => ({ ...d, accentColor: e.target.value }))} className={inputCls + " flex-1"} />
              </div>
            </div>
            <div>
              <Label>Background Colour</Label>
              <div className="flex gap-3 items-center">
                <input type="color" value={design.backgroundColor} onChange={e => setDesign(d => ({ ...d, backgroundColor: e.target.value }))} className="w-12 h-10 rounded-lg border border-slate-600 bg-transparent cursor-pointer" />
                <input value={design.backgroundColor} onChange={e => setDesign(d => ({ ...d, backgroundColor: e.target.value }))} className={inputCls + " flex-1"} />
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold text-white mb-4">Typography</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Heading Font</Label>
              <select value={design.headingFont} onChange={e => setDesign(d => ({ ...d, headingFont: e.target.value }))} className={inputCls}>
                {headingFonts.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <p className="mt-2 text-lg" style={{ fontFamily: design.headingFont }}>Evergreen Academy</p>
            </div>
            <div>
              <Label>Body Font</Label>
              <select value={design.bodyFont} onChange={e => setDesign(d => ({ ...d, bodyFont: e.target.value }))} className={inputCls}>
                {bodyFonts.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <p className="mt-2 text-sm text-slate-400" style={{ fontFamily: design.bodyFont }}>A world-class education nurturing the leaders of tomorrow.</p>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold text-white mb-4">Logo</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Logo Text (initials shown in navbar)">
              <input value={design.logoText} onChange={e => setDesign(d => ({ ...d, logoText: e.target.value.slice(0, 3) }))} maxLength={3} className={inputCls} placeholder="EA" />
            </Field>
            <Field label="Logo Image URL (optional)">
              <input value={design.logoUrl} onChange={e => setDesign(d => ({ ...d, logoUrl: e.target.value }))} className={inputCls} placeholder="https://..." />
            </Field>
          </div>
        </Card>
        <div className="flex justify-end gap-3">
          <button onClick={() => { setDesign(data.design); }} className="px-4 py-2 text-slate-400 hover:text-white text-sm rounded-xl border border-slate-700 hover:border-slate-500 transition-colors">Reset</button>
          <SaveButton onClick={save} />
        </div>
      </div>
    </div>
  );
}

// ─── SETTINGS PANEL ───────────────────────────────────────────────────────────
function SettingsPanel({ data, updateSection, exportData, importData }: { data: CmsData; updateSection: any; exportData: () => void; importData: (s: string) => boolean }) {
  const { toast } = useToast();
  const [school, setSchool] = useState(data.school);
  const importRef = useRef<HTMLInputElement>(null);

  const save = () => {
    updateSection("school", school);
    toast({ title: "Site settings saved!" });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const ok = importData(ev.target?.result as string);
      toast({ title: ok ? "Data imported successfully!" : "Import failed — invalid file.", variant: ok ? "default" : "destructive" });
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <SectionHeader title="Site Settings" description="Configure the school name, tagline, and data management." />
      <div className="space-y-6">
        <Card>
          <h3 className="font-semibold text-white mb-4">School Information</h3>
          <div className="space-y-4">
            <Field label="School Name"><input value={school.name} onChange={e => setSchool(p => ({ ...p, name: e.target.value }))} className={inputCls} /></Field>
            <Field label="Tagline"><input value={school.tagline} onChange={e => setSchool(p => ({ ...p, tagline: e.target.value }))} className={inputCls} /></Field>
            <Field label="Founded Year"><input value={school.founded} onChange={e => setSchool(p => ({ ...p, founded: e.target.value }))} className={inputCls} placeholder="1924" /></Field>
          </div>
          <div className="flex justify-end mt-4"><SaveButton onClick={save} /></div>
        </Card>
        <Card>
          <h3 className="font-semibold text-white mb-2">Admin Credentials</h3>
          <p className="text-slate-400 text-sm mb-4">Default login: <span className="text-amber-400 font-mono">admin</span> / <span className="text-amber-400 font-mono">school2024</span></p>
          <div className="bg-slate-700/50 rounded-xl p-4 text-sm text-slate-400">
            To change credentials, update the <code className="text-amber-400 text-xs">useAdmin.ts</code> hook in the source code.
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold text-white mb-4">Data Backup</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-xl p-5">
              <h4 className="font-medium text-white mb-2 text-sm">Export Data</h4>
              <p className="text-slate-400 text-xs mb-4">Download all your CMS content as a JSON backup file.</p>
              <button onClick={exportData} className="w-full flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-500 text-white py-2.5 rounded-xl text-sm font-medium transition-colors">
                <ExternalLink className="w-4 h-4" /> Export JSON Backup
              </button>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-5">
              <h4 className="font-medium text-white mb-2 text-sm">Import Data</h4>
              <p className="text-slate-400 text-xs mb-4">Restore a previously exported JSON backup. This overwrites all current data.</p>
              <input ref={importRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
              <button onClick={() => importRef.current?.click()} className="w-full flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-500 text-white py-2.5 rounded-xl text-sm font-medium transition-colors">
                <Upload className="w-4 h-4" /> Import JSON Backup
              </button>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold text-white mb-2 text-sm">Reset to Defaults</h3>
          <p className="text-slate-400 text-xs mb-4">Clear all data and restore the original demo content. This cannot be undone.</p>
          <button onClick={() => {
            if (confirm("Reset ALL content to defaults? This cannot be undone.")) {
              localStorage.removeItem("school_cms_data");
              window.location.reload();
            }
          }} className="text-red-400 hover:text-red-300 border border-red-400/30 hover:border-red-400/60 px-4 py-2 rounded-xl text-sm transition-colors">
            Reset to Defaults
          </button>
        </Card>
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { isAdmin, logout } = useAdmin();
  const { data, updateSection, exportData, importData } = useCmsData();
  const [, setLocation] = useLocation();
  const [activePanel, setActivePanel] = useState<Panel>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!isAdmin) setLocation("/admin");
  }, [isAdmin, setLocation]);

  if (!isAdmin) return null;

  const handleLogout = () => {
    logout();
    setLocation("/admin");
  };

  const panelProps = { data, updateSection };

  const renderPanel = () => {
    switch (activePanel) {
      case "overview": return <OverviewPanel data={data} onNav={setActivePanel} />;
      case "page-home": return <HomePanel {...panelProps} />;
      case "page-about": return <AboutPanel {...panelProps} />;
      case "page-admission": return <AdmissionPanel {...panelProps} />;
      case "page-contact": return <ContactPanel {...panelProps} />;
      case "notices": return <NoticesPanel {...panelProps} />;
      case "news": return <NewsPanel {...panelProps} />;
      case "events": return <EventsPanel {...panelProps} />;
      case "gallery": return <GalleryPanel {...panelProps} />;
      case "team": return <TeamPanel {...panelProps} />;
      case "media": return <MediaPanel {...panelProps} />;
      case "design": return <DesignPanel {...panelProps} />;
      case "settings": return <SettingsPanel {...panelProps} exportData={exportData} importData={importData} />;
      default: return null;
    }
  };

  const activeLabel = SIDEBAR_GROUPS.flatMap(g => g.items).find(i => i.id === activePanel)?.label || "";

  return (
    <div className="min-h-screen bg-slate-900 flex" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 flex flex-col ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"} bg-slate-950 border-r border-slate-800`}>
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-900 font-serif font-bold text-sm shrink-0">
            {data.design.logoText || "EA"}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-white text-sm leading-tight truncate">{data.school.name}</p>
            <p className="text-slate-500 text-xs">CMS Dashboard</p>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {SIDEBAR_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-slate-600 text-xs font-bold uppercase tracking-widest px-2 mb-2">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <button key={item.id} onClick={() => setActivePanel(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${activePanel === item.id ? "bg-amber-500/15 text-amber-400 border border-amber-500/20" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                    {activePanel === item.id && <ChevronRight className="w-3 h-3 ml-auto" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-3 py-4 border-t border-slate-800 shrink-0 space-y-1">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
          >
            <Eye className="w-4 h-4" /> View Website
          </a>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
        {/* Topbar */}
        <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white transition-colors p-1">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Dashboard</span>
              {activePanel !== "overview" && <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-300">{activeLabel}</span>
              </>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-slate-400 hover:text-amber-400 text-sm font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> View Site
            </a>
            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2">
              <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 text-xs font-bold">A</div>
              <span className="text-slate-300 text-sm hidden md:block">Admin</span>
            </div>
          </div>
        </header>

        {/* Panel Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {renderPanel()}
        </main>
      </div>
    </div>
  );
}
