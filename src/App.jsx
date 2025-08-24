import React, { useMemo, useState } from "react";

export default function App() {
  return <SDCHPetMatchPrototype />;
}

function SDCHPetMatchPrototype() {
  // ------- USER PROFILE -------
  const [profile, setProfile] = useState({
    name: "Alex",
    dwelling: "apartment",      // apartment | townhouse | house | acreage
    hasYard: false,
    yardSecure: false,
    fenceHeightCm: 0,
    awayHoursWeekday: 8,
    activityLevel: "moderate",  // low | moderate | high
    experienceDogs: "some",     // none | some | experienced
    experienceCats: "some",
    householdChildren: 0,
    otherPets: "none",          // none | dog | cat | both
    allergies: "none",          // none | cats | dogs | both
    budgetMonthlyAUD: 200,
    barkingTolerance: "moderate",
    sheddingTolerance: "moderate",
    trainingTimeHrsPerWeek: 3,
    prefers: "either"           // dog | cat | either
  });

  // ------- SAMPLE ANIMALS -------
  // ------- SAMPLE ANIMALS -------
cat > src/App.jsx <<'EOF'
import React from "react";

const animals = [
  {
    id: "D-101",
    name: "Milo",
    species: "dog",
    breed: "Kelpie mix",
    size: "medium",
    energy: "high",
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: false,
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "D-203",
    name: "Bear",
    species: "dog",
    breed: "Greyhound",
    size: "large",
    energy: "low",
    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: false,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "C-317",
    name: "Maisie",
    species: "cat",
    breed: "Domestic Shorthair",
    size: "small",
    energy: "moderate",
    goodWithKids: true,
    goodWithDogs: false,
    goodWithCats: true,
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1200&auto=format&fit=crop"
  }
];

export default function App() {
  return (
    <div style={{fontFamily:"system-ui,-apple-system, Segoe UI, Roboto", background:"#f8fafc", minHeight:"100vh"}}>
      <header style={{background:"#fff", borderBottom:"1px solid #e5e7eb", padding:"16px 24px", position:"sticky", top:0}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", maxWidth:960, margin:"0 auto"}}>
          <h1 style={{margin:0, fontSize:22, fontWeight:600}}>SDCH Pet Match (Prototype)</h1>
          <a href="https://sydneydogsandcatshome.org/adopt/" target="_blank" rel="noreferrer"
             style={{textDecoration:"none", color:"#0f172a", border:"1px solid #cbd5e1", padding:"8px 12px", borderRadius:12}}>
            View SDCH Adopt
          </a>
        </div>
      </header>

      <main style={{maxWidth:960, margin:"0 auto", padding:"24px"}}>
        <h2 style={{fontSize:18, margin:"0 0 12px"}}>Animals</h2>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:16}}>
          {animals.map(a => <AnimalCard key={a.id} a={a} />)}
        </div>
      </main>

      <footer style={{maxWidth:960, margin:"0 auto", padding:"12px 24px", color:"#64748b", fontSize:12}}>
        Prototype only — always follow SDCH’s adoption process.
      </footer>
    </div>
  );
}

function AnimalCard({ a }) {
  const pill = (text, bg="#f1f5f9", color="#0f172a") => (
    <span style={{fontSize:12, padding:"2px 8px", borderRadius:999, background:bg, color, display:"inline-block"}}>
      {text}
    </span>
  );

  const mailto = `mailto:adoptions@sydneydogsandcatshome.org?subject=${
    encodeURIComponent(`Adoption interest: ${a.name} (${a.id})`)
  }&body=${
    encodeURIComponent(`Hi SDCH team,\n\nI'm interested in ${a.name} (${a.id}).\n\nThanks!`)
  }`;

  return (
    <div style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:16, overflow:"hidden"}}>
      {a.image && (<img src={a.image} alt={a.name} style={{width:"100%", height:150, objectFit:"cover"}}/>)}
      <div style={{padding:12}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6}}>
          <div style={{fontWeight:600}}>{a.name}</div>
          <span style={{fontSize:12, color:"#334155"}}>ID: {a.id}</span>
        </div>
        <div style={{fontSize:13, color:"#475569", marginBottom:8, textTransform:"capitalize"}}>
          {a.species} • {a.breed} • {a.size} • energy: {a.energy}
        </div>
        <div style={{display:"flex", gap:6, flexWrap:"wrap", marginBottom:10}}>
          {a.goodWithKids && pill("Kid friendly", "#dcfce7", "#166534")}
          {a.goodWithDogs && pill("Dog friendly", "#dcfce7", "#166534")}
          {a.goodWithCats && pill("Cat friendly", "#dcfce7", "#166534")}
        </div>
        <div style={{display:"flex", gap:8}}>
          <a href={mailto} style={{textDecoration:"none", border:"1px solid #cbd5e1", padding:"8px 12px", borderRadius:12, color:"#0f172a"}}>
            Register interest
          </a>
          <a href="https://sydneydogsandcatshome.org/adopt/" target="_blank" rel="noreferrer"
             style={{textDecoration:"none", border:"1px solid #cbd5e1", padding:"8px 12px", borderRadius:12, color:"#0f172a"}}>
            View site
          </a>
        </div>
      </div>
    </div>
  );
}
EOF

// ---- tiny UI helpers ----
function Label({ children }) { return <label className="text-[13px] text-slate-600">{children}</label>; }
function TextArea({ value, onChange, rows=10 }) {
  return <textarea className="w-full border rounded p-2 font-mono text-xs" value={value} rows={rows}
    onChange={(e)=>onChange(e.target.value)} />;
}
function Number({ label, value, onChange, min, max, step=1 }) {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <input type="number" className="px-3 py-2 rounded-xl border bg-white" value={value}
        min={min} max={max} step={step} onChange={(e)=>onChange(Number(e.target.value))}/>
    </div>
  );
}
function Select({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <select className="px-3 py-2 rounded-xl border bg-white" value={value}
        onChange={(e)=>onChange(e.target.value)}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
function Switch({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between border rounded-xl px-3 py-2">
      <Label>{label}</Label>
      <button onClick={()=>onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? "bg-emerald-500" : "bg-slate-300"}`}>
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${value ? "translate-x-5" : "translate-x-1"}`} />
      </button>
    </div>
  );
}
function MatchCard({ animal, score, reasons }) {
  const [open, setOpen] = useState(false);
  const badge = scoreBadge(score);
  return (
    <div className="border rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 p-3">
        {animal.image && <img src={animal.image} alt={animal.name} className="h-16 w-16 object-cover rounded-xl" />}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{animal.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${badge.className}`}>{badge.label}</span>
          </div>
          <p className="text-sm text-slate-600 capitalize">
            {animal.species} • {animal.breed} • {animal.size} • energy: {animal.energy}
          </p>
          <p className="text-xs text-slate-500">ID: {animal.id}</p>
        </div>
        <button className="text-sm px-3 py-1.5 rounded-xl border hover:bg-slate-50" onClick={()=>setOpen(o=>!o)}>
          {open ? "Hide" : "View"} reasons
        </button>
      </div>
      {open && (
        <div className="px-4 pb-4">
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            {reasons.map((r,i)=>(<li key={i}>{r}</li>))}
          </ul>
        </div>
      )}
    </div>
  );
}
function scoreBadge(score) {
  if (score >= 25) return { label: "Excellent", className: "bg-emerald-100 text-emerald-700" };
  if (score >= 10) return { label: "Good", className: "bg-sky-100 text-sky-700" };
  if (score >= 0)  return { label: "Fair", className: "bg-amber-100 text-amber-700" };
  return { label: "Unsuitable", className: "bg-rose-100 text-rose-700" };
}
