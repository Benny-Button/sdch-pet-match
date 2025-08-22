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
  const [animalsText, setAnimalsText] = useState(() =>
   const [showJson, setShowJson] = useState(false);

function importFile(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => setAnimalsText(String(reader.result || ""));
  reader.readAsText(file);
}

function downloadJSON() {
  const blob = new Blob([animalsText], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "animals.json";
  a.click();
  URL.revokeObjectURL(url);
}
=80&w=1200&auto=format&fit=crop"
        }
      ],
      null,
      2
    )
  );

  const animals = useMemo(() => {
    try { return JSON.parse(animalsText); } catch { return []; }
  }, [animalsText]);

  // ------- MATCHING -------
  function scoreMatch(animal, p) {
    let score = 0;
    const reasons = [];

    // Species preference
    if (p.prefers !== "either" && animal.species !== p.prefers) {
      score -= 20; reasons.push(`Prefers ${p.prefers}, but this is a ${animal.species}.`);
    } else { score += 5; reasons.push("Species preference aligns or is flexible."); }

    // Yard & fence (dogs)
    if (animal.species === "dog") {
      if (animal.needsYard && !p.hasYard) {
        score -= 25; reasons.push("Dog needs a yard; profile has no yard.");
      } else if (!animal.needsYard && p.dwelling === "apartment") {
        score += 8; reasons.push("Apartment-suitable dog.");
      }
      if (animal.fenceMinHeightCm > 0) {
        if (!p.yardSecure || p.fenceHeightCm < animal.fenceMinHeightCm) {
          score -= 15; reasons.push(`Needs ${animal.fenceMinHeightCm}cm fence; profile has ${p.fenceHeightCm}cm or insecure.`);
        } else { score += 5; reasons.push("Fence height/secure yard adequate."); }
      }
    }

    // Time alone
    const typicalAlone = p.awayHoursWeekday;
    if (animal.timeAloneToleranceHrs != null) {
      if (typicalAlone > animal.timeAloneToleranceHrs + 2) {
        score -= 20; reasons.push(`Away ${typicalAlone}h; animal tolerates ~${animal.timeAloneToleranceHrs}h.`);
      } else if (typicalAlone <= animal.timeAloneToleranceHrs) {
        score += 10; reasons.push("Time-alone tolerance compatible.");
      }
    }

    // Energy & owner activity (dogs)
    if (animal.species === "dog") {
      const map = { low: 1, moderate: 2, high: 3 };
      const owner = map[p.activityLevel] || 2;
      const pet = map[animal.energy] || 2;
      if (owner < pet) { score -= 12; reasons.push(`Dog energy is ${animal.energy}; profile activity ${p.activityLevel}.`); }
      else if (owner === pet) { score += 10; reasons.push("Energy levels well matched."); }
      else { score += 4; reasons.push("Owner activity may exceed dog's needs (fine)."); }

      // Exercise time
      if (animal.exerciseNeedsHrsPerDay && p.trainingTimeHrsPerWeek) {
        const dailyAvail = p.trainingTimeHrsPerWeek / 7;
        if (dailyAvail + 0.25 < animal.exerciseNeedsHrsPerDay) {
          score -= 10; reasons.push(`Exercise need ${animal.exerciseNeedsHrsPerDay}h/day vs avail ~${dailyAvail.toFixed(1)}h.`);
        } else { score += 6; reasons.push("Exercise time likely adequate."); }
      }
    }

    // Kids & other pets
    if (p.householdChildren > 0 && animal.goodWithKids) { score += 8; reasons.push("Good with children."); }
    if (p.householdChildren > 0 && animal.goodWithKids === false) { score -= 20; reasons.push("Not recommended with children."); }
    if (p.otherPets === "dog" && animal.goodWithDogs === false) { score -= 20; reasons.push("Not good with dogs; home has a dog."); }
    if (p.otherPets === "cat" && animal.goodWithCats === false) { score -= 20; reasons.push("Not good with cats; home has a cat."); }

    // Allergies
    if (p.allergies === "cats" && animal.species === "cat") { score -= 25; reasons.push("Household cat allergy."); }
    if (p.allergies === "dogs" && animal.species === "dog") { score -= 25; reasons.push("Household dog allergy."); }

    // Shedding & vocal tolerance
    const tol = { low: 1, moderate: 2, high: 3 };
    const shed = { low: 1, moderate: 2, high: 3 };
    if (animal.shedLevel && shed[animal.shedLevel] > tol[p.sheddingTolerance]) {
      score -= 8; reasons.push("Shedding may exceed tolerance.");
    } else { score += 4; reasons.push("Shedding within tolerance."); }
    const vocal = { low: 1, moderate: 2, high: 3 };
    if (animal.vocalLevel && vocal[animal.vocalLevel] > tol[p.barkingTolerance]) {
      score -= 6; reasons.push("Vocal level may exceed tolerance.");
    } else { score += 3; reasons.push("Vocal level within tolerance."); }

    // Experience bonus
    if (animal.species === "dog" && profile.experienceDogs !== "none") {
      score += 4; reasons.push("Has some dog experience.");
    }
    if (animal.species === "cat" && profile.experienceCats !== "none") {
      score += 3; reasons.push("Has some cat experience.");
    }

    // Budget sanity (very rough)
    const roughMonthly = animal.species === "dog" ? 180 : 120;
    if (p.budgetMonthlyAUD < roughMonthly * 0.7) { score -= 6; reasons.push("Budget may be tight."); }
    else { score += 2; reasons.push("Budget likely sufficient."); }

    return { score, reasons };
  }

  const ranked = useMemo(() => {
    return animals.map(a => ({ animal: a, ...scoreMatch(a, profile) }))
                  .sort((x, y) => y.score - x.score);
  }, [animals, profile]);

  const top = ranked.slice(0, 6);

  // ------- UI -------
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="px-6 py-4 border-b bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold">SDCH Pet Match (Prototype)</h1>
          <a className="text-sm px-3 py-2 rounded-xl border hover:bg-slate-50"
             href="https://sydneydogsandcatshome.org/adopt/" target="_blank" rel="noreferrer">
            View SDCH Adopt
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Profile */}
        <section className="bg-white rounded-2xl shadow-sm border p-4">
          <h2 className="text-lg font-semibold mb-2">Your profile</h2>
          <div className="grid grid-cols-2 gap-3">
            <Select label="Dwelling" value={profile.dwelling}
              onChange={(v)=>setProfile(p=>({...p,dwelling:v}))}
              options={["apartment","townhouse","house","acreage"]}/>
            <Switch label="Has yard" value={profile.hasYard}
              onChange={(v)=>setProfile(p=>({...p,hasYard:v}))}/>
            <Switch label="Secure yard" value={profile.yardSecure}
              onChange={(v)=>setProfile(p=>({...p,yardSecure:v}))}/>
            <Number label="Fence height (cm)" value={profile.fenceHeightCm} min={0} step={10}
              onChange={(v)=>setProfile(p=>({...p,fenceHeightCm:v}))}/>
            <Number label="Away hrs (weekday)" value={profile.awayHoursWeekday} min={0}
              onChange={(v)=>setProfile(p=>({...p,awayHoursWeekday:v}))}/>
            <Select label="Activity level" value={profile.activityLevel}
              onChange={(v)=>setProfile(p=>({...p,activityLevel:v}))}
              options={["low","moderate","high"]}/>
            <Select label="Prefer" value={profile.prefers}
              onChange={(v)=>setProfile(p=>({...p,prefers:v}))}
              options={["either","dog","cat"]}/>
            <Number label="Budget (AUD/mo)" value={profile.budgetMonthlyAUD} min={50} step={10}
              onChange={(v)=>setProfile(p=>({...p,budgetMonthlyAUD:v}))}/>
          </div>
        </section>

        {/* Animals JSON */}
        <section className="bg-white rounded-2xl shadow-sm border p-4">
          <h2 className="text-lg font-semibold mb-2">Animals (JSON)</h2>
          <TextArea value={animalsText} onChange={setAnimalsText} rows={20}/>
        </section>

        {/* Matches */}
        <section className="bg-white rounded-2xl shadow-sm border p-4">
          <h2 className="text-lg font-semibold mb-2">Matches</h2>
          <div className="space-y-3">
            {top.map(({animal, score, reasons}) => (
              <MatchCard key={animal.id} animal={animal} score={score} reasons={reasons}/>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

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
