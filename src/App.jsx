import React, { useMemo, useState } from "react";

/** ----------------------------------------------------------------
 *  Sample animals (Dogs + Cats)
 *  Keep attributes aligned to the profile + scoring rules below.
 *  ---------------------------------------------------------------- */
const animals = [
 {
  id: "D-401",
  name: "Nala",
  species: "Dog",
  breed: "Staffy mix",
  size: "medium",
  energy: "moderate",
  needsYard: true,
  fenceMinHeightCm: 150,
  timeAloneToleranceHrs: 4,
  goodWithKids: true,
  goodWithDogs: true,
  goodWithCats: false,
  costEstimateAUD: 180,
  image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=1200&auto=format&fit=crop",
  focusY: 45,
},
{
  id: "D-402",
  name: "Koko",
  species: "Dog",
  breed: "Boxer x Staffy",
  size: "medium",
  energy: "moderate",
  needsYard: false,
  fenceMinHeightCm: 0,
  timeAloneToleranceHrs: 5,
  goodWithKids: true,
  goodWithDogs: true,
  goodWithCats: true,
  costEstimateAUD: 170,
  image: "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?q=80&w=1200&auto=format&fit=crop",
  focusY: 55,
},
{
  id: "D-403",
  name: "Biscuits",
  species: "Dog",
  breed: "Labrador mix",
  size: "medium",
  energy: "high",
  needsYard: true,
  fenceMinHeightCm: 150,
  timeAloneToleranceHrs: 3,
  goodWithKids: true,
  goodWithDogs: true,
  goodWithCats: false,
  costEstimateAUD: 190,
  image: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=1200&auto=format&fit=crop",
  focusY: 40,
},
{
  id: "D-404",
  name: "Lucky",
  species: "Dog",
  breed: "American Staffy mix",
  size: "medium",
  energy: "moderate",
  needsYard: true,
  fenceMinHeightCm: 150,
  timeAloneToleranceHrs: 4,
  goodWithKids: true,
  goodWithDogs: true,
  goodWithCats: true,
  costEstimateAUD: 185,
  image: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b6?q=80&w=1200&auto=format&fit=crop",
  focusY: 50,
},
{
  id: "D-405",
  name: "Cosmo",
  species: "Dog",
  breed: "Mastiff mix",
  size: "large",
  energy: "low",
  needsYard: false,
  fenceMinHeightCm: 0,
  timeAloneToleranceHrs: 6,
  goodWithKids: true,
  goodWithDogs: true,
  goodWithCats: true,
  costEstimateAUD: 200,
  image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=1200&auto=format&fit=crop",
  focusY: 42,
},
{
  id: "D-406",
  name: "Melody",
  species: "Dog",
  breed: "Staffy x",
  size: "medium",
  energy: "moderate",
  needsYard: false,
  fenceMinHeightCm: 0,
  timeAloneToleranceHrs: 5,
  goodWithKids: true,
  goodWithDogs: true,
  goodWithCats: false,
  costEstimateAUD: 175,
  image: "https://images.unsplash.com/photo-1543466838-8401bca9b91e?q=80&w=1200&auto=format&fit=crop",
  focusY: 60,
},
{
  id: "D-101",
  name: "Milo",
  species: "Dog",
  breed: "Kelpie mix",
  size: "medium",
  energy: "high",
  needsYard: true,
  fenceMinHeightCm: 150,
  timeAloneToleranceHrs: 4,
  goodWithKids: true,
  goodWithDogs: true,
  goodWithCats: false,
  costEstimateAUD: 180,
  image:
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop",
  focusY: 55, // show a touch more bottom if the top gets tight
},
{
  id: "D-203",
  name: "Bear",
  species: "Dog",
  breed: "Greyhound",
  size: "large",
  energy: "low",
  needsYard: false,
  fenceMinHeightCm: 0,
  timeAloneToleranceHrs: 6,
  goodWithKids: true,
  goodWithDogs: true,
  goodWithCats: false,
  costEstimateAUD: 160,
  image:
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1200&auto=format&fit=crop",
  focusY: 35, // face high in frame → bias upward to avoid chopping ears
},
{
  id: "D-244",
  name: "Archie",
  species: "Dog",
  breed: "Cavoodle",
  size: "small",
  energy: "moderate",
  needsYard: false,
  fenceMinHeightCm: 0,
  timeAloneToleranceHrs: 5,
  goodWithKids: true,
  goodWithDogs: true,
  goodWithCats: true,
  costEstimateAUD: 200,
  image:
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop",
  focusY: 50, // centered is fine here
},
{
  id: "D-318",
  name: "Daisy",
  species: "Dog",
  breed: "Labrador",
  size: "large",
  energy: "high",
  needsYard: true,
  fenceMinHeightCm: 150,
  timeAloneToleranceHrs: 3,
  goodWithKids: true,
  goodWithDogs: true,
  goodWithCats: false,
  costEstimateAUD: 220,
  image:
    "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1200&auto=format&fit=crop",
  focusY: 45,
},
{
  id: "D-351",
  name: "Rusty",
  species: "Dog",
  breed: "Cattle Dog",
  size: "medium",
  energy: "high",
  needsYard: true,
  fenceMinHeightCm: 180,
  timeAloneToleranceHrs: 4,
  goodWithKids: true,
  goodWithDogs: true,
  goodWithCats: false,
  costEstimateAUD: 190,
  image:
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop",
  focusY: 40,
},
{
  id: "C-317",
  name: "Maisie",
  species: "Cat",
  breed: "Domestic Shorthair",
  size: "small",
  energy: "moderate",
  needsYard: false,
  fenceMinHeightCm: 0,
  timeAloneToleranceHrs: 8,
  goodWithKids: true,
  goodWithDogs: false,
  goodWithCats: true,
  costEstimateAUD: 120,
  image:
    "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1200&auto=format&fit=crop",
  focusY: 50,
},
{
  id: "C-222",
  name: "Luna",
  species: "Cat",
  breed: "Ragdoll",
  size: "small",
  energy: "low",
  needsYard: false,
  fenceMinHeightCm: 0,
  timeAloneToleranceHrs: 6,
  goodWithKids: true,
  goodWithDogs: true,
  goodWithCats: true,
  costEstimateAUD: 140,
  image:
    "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1200&auto=format&fit=crop",
  focusY: 45,
},
{
  id: "C-289",
  name: "Pepper",
  species: "Cat",
  breed: "Bengal",
  size: "small",
  energy: "high",
  needsYard: false,
  fenceMinHeightCm: 0,
  timeAloneToleranceHrs: 4,
  goodWithKids: false,
  goodWithDogs: false,
  goodWithCats: true,
  costEstimateAUD: 150,
  image:
    "https://images.unsplash.com/photo-1596854307943-279e29c90b68?q=80&w=1200&auto=format&fit=crop",
  focusY: 50,
},
];

/** ----------------------- Scoring helpers ----------------------- */
const map3 = { low: 1, moderate: 2, high: 3 };
const sizeMap = { small: 1, medium: 2, large: 3 };

function badgeFor(score) {
  if (score >= 30) return { label: "Excellent", bg: "#dcfce7", color: "#166534" };
  if (score >= 15) return { label: "Good", bg: "#e0f2fe", color: "#075985" };
  if (score >= 0) return { label: "Fair", bg: "#fef3c7", color: "#92400e" };
  return { label: "Unsuitable", bg: "#fee2e2", color: "#991b1b" };
}

function scoreMatch(a, p) {
  let score = 0;
  const reasons = [];

  // Species preference
  if (p.prefers !== "either" && a.species !== p.prefers) {
    score -= 20;
    reasons.push(`Prefers ${p.prefers}, but this is a ${a.species}.`);
  } else {
    score += 5;
    reasons.push("Species preference aligns or is flexible.");
  }

  // Energy vs owner activity
  const owner = map3[p.activity] ?? 2;
  const pet = map3[a.energy] ?? 2;
  if (owner < pet) {
    score -= 12;
    reasons.push(`Pet energy ${a.energy}; profile activity ${p.activity}.`);
  } else if (owner === pet) {
    score += 10;
    reasons.push("Energy levels are well matched.");
  } else {
    score += 4;
    reasons.push("Owner activity may exceed pet needs (fine).");
  }

  // Children compatibility
  if (p.children > 0) {
    if (a.goodWithKids) {
      score += 8;
      reasons.push("Good with children.");
    } else {
      score -= 20;
      reasons.push("Not recommended with children.");
    }
  }

  // Dwelling suitability
  if (p.dwelling === "Apartment") {
    if (a.species === "Cat") {
      score += 6;
      reasons.push("Apartment-suitable: Cat.");
    } else if (sizeMap[a.size] >= 3 || a.energy === "high") {
      score -= 10;
      reasons.push("Big/high-energy Dog in apartment may be unsuitable.");
    } else {
      score += 4;
      reasons.push("Dog is small/medium or moderate energy — OK for apartment.");
    }
  } else {
    score += 2;
    reasons.push("House/townhouse gives more space.");
  }

  // Yard needs
  if (a.needsYard) {
    if (!p.hasYard) {
      score -= 25;
      reasons.push("Pet requires a yard; profile has none.");
    } else {
      score += 6;
      reasons.push("Yard available.");
      if (a.fenceMinHeightCm > 0 && (p.fenceHeightCm || 0) < a.fenceMinHeightCm) {
        score -= 10;
        reasons.push(`Needs ${a.fenceMinHeightCm}cm fence; profile has ${p.fenceHeightCm || 0}cm.`);
      }
    }
  }

  // Time alone tolerance
  if (p.awayWeekdayHours > 0) {
    if (p.awayWeekdayHours > a.timeAloneToleranceHrs + 2) {
      score -= 10;
      reasons.push(
        `Owner away ~${p.awayWeekdayHours}h; pet tolerates ~${a.timeAloneToleranceHrs}h.`
      );
    } else {
      score += 5;
      reasons.push("Time-alone tolerance within range.");
    }
  }

  // Other pets at home
  if (p.otherPets === "Dog" && !a.goodWithDogs) {
    score -= 12;
    reasons.push("Not good with Dogs; home has a Dog.");
  }
  if (p.otherPets === "Cat" && !a.goodWithCats) {
    score -= 12;
    reasons.push("Not good with Cats; home has a Cat.");
  }

  // Budget (very rough, soft gate)
  if (p.budgetAUD > 0) {
    if (p.budgetAUD < a.costEstimateAUD) {
      score -= 8;
      reasons.push(
        `Monthly budget ~A$${p.budgetAUD}; estimated costs ~A$${a.costEstimateAUD}.`
      );
    } else {
      score += 3;
      reasons.push("Budget likely sufficient.");
    }
  }

  return { score, reasons };
}

/** ----------------------------- UI ----------------------------- */
export default function App() {
  // Profile state
  const [profile, setProfile] = useState({
    prefers: "either", // Dog | Cat | either
    dwelling: "apartment", // apartment | townhouse | house
    hasYard: false,
    fenceHeightCm: 0,
    activity: "moderate", // low | moderate | high
    awayWeekdayHours: 8,
    children: 0,
    otherPets: "none", // none | Dog | Cat
    budgetAUD: 200,
  });

  const ranked = useMemo(() => {
    return animals
      .map((a) => ({ a, ...scoreMatch(a, profile) }))
      .sort((x, y) => y.score - x.score);
  }, [profile]);

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 24px",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>
            SDCH Pet Match (Prototype)
          </h1>
          <a
            href="https://sydneyDogsandCatshome.org/adopt/"
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: "none",
              color: "#0f172a",
              border: "1px solid #cbd5e1",
              padding: "8px 12px",
              borderRadius: 12,
            }}
          >
            View SDCH Adopt
          </a>
        </div>
      </header>

      {/* Main */}
      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: 24,
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 16,
        }}
      >
        {/* Profile */}
        <section
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            padding: 16,
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: 18 }}>Your profile</h2>

          <Field label="Prefer">
            <Select
              value={profile.prefers}
              onChange={(v) => setProfile((p) => ({ ...p, prefers: v }))}
              options={["either", "Dog", "Cat"]}
            />
          </Field>

          <Field label="Dwelling">
            <Select
              value={profile.dwelling}
              onChange={(v) => setProfile((p) => ({ ...p, dwelling: v }))}
              options={["apartment", "townhouse", "house"]}
            />
          </Field>

          <Field label="Has yard">
            <Switch
              checked={profile.hasYard}
              onChange={(v) => setProfile((p) => ({ ...p, hasYard: v }))}
            />
          </Field>

         <Field label="Fence height (cm)">
  <NumInput
    value={Number.isFinite(profile.fenceHeightCm) ? profile.fenceHeightCm : 0}
    min={0}
    disabled={!profile.hasYard}
    onChange={(v) => setProfile((p) => ({ ...p, fenceHeightCm: v }))}
  />
</Field>

          <Field label="Activity level">
            <Select
              value={profile.activity}
              onChange={(v) => setProfile((p) => ({ ...p, activity: v }))}
              options={["low", "moderate", "high"]}
            />
          </Field>

          <Field label="Away hrs (weekday)">
            <NumInput
              value={profile.awayWeekdayHours}
              min={0}
              onChange={(v) => setProfile((p) => ({ ...p, awayWeekdayHours: v }))}
            />
          </Field>

          <Field label="Children at home">
            <NumInput
              value={profile.children}
              min={0}
              onChange={(v) => setProfile((p) => ({ ...p, children: v }))}
            />
          </Field>

          <Field label="Other pets">
            <Select
              value={profile.otherPets}
              onChange={(v) => setProfile((p) => ({ ...p, otherPets: v }))}
              options={["none", "Dog", "Cat"]}
            />
          </Field>

          <Field label="Budget (AUD/mo)">
            <NumInput
              value={profile.budgetAUD}
              min={0}
              onChange={(v) => setProfile((p) => ({ ...p, budgetAUD: v }))}
            />
          </Field>

          <p style={{ fontSize: 12, color: "#64748b", marginTop: 12 }}>
            Tip: try “prefer: Dog”, “dwelling: apartment”, “has yard: off”, “activity:
            low”, “away: 8h”, “children: 1” — watch scores change.
          </p>
        </section>

        {/* Matches */}
        <section>
          <h2 style={{ fontSize: 18, margin: "0 0 12px" }}>Matches</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {ranked.map(({ a, score, reasons }) => (
              <MatchCard key={a.id} a={a} score={score} reasons={reasons} />
            ))}
          </div>
        </section>
      </main>

      <footer
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "12px 24px",
          color: "#64748b",
          fontSize: 12,
        }}
      >
        Prototype only — always follow SDCH’s adoption process.
      </footer>
    </div>
  );
}

/** ------------------------ Small UI bits ----------------------- */
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ fontSize: 13, color: "#475569", display: "block", marginBottom: 6 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        display: "block",
        width: "100%",
        padding: "8px 10px",
        border: "1px solid #cbd5e1",
        borderRadius: 12,
        background: "#fff",
      }}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function NumInput({ value, onChange, min = 0, disabled = false }) {
  return (
    <input
      type="number"
      inputMode="numeric"
      pattern="[0-9]*"
      step="1"
      min={min}
      value={value}
      disabled={disabled}
      onChange={(e) => {
        const raw = e.target.value;
        // allow quick edits; treat blank as 0
        const next = raw === "" ? 0 : Math.max(min, Number.parseFloat(raw));
        onChange(next);
      }}
      style={{
        display: "block",
        width: "100%",
        padding: "8px 10px",
        border: "1px solid #cbd5e1",
        borderRadius: 12,
        background: disabled ? "#f1f5f9" : "#fff",
      }}
    />
  );
}

function Switch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      style={{
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid #cbd5e1",
        background: checked ? "#dcfce7" : "#fff",
        color: checked ? "#166534" : "#0f172a",
      }}
    >
      {checked ? "Yes" : "No"}
    </button>
  );
}

function MatchCard({ a, score, reasons }) {
  const [open, setOpen] = useState(false);
  const b = badgeFor(score);

  const pill = (text, bg = "#f1f5f9", color = "#0f172a") => (
    <span
      style={{
        fontSize: 12,
        padding: "2px 8px",
        borderRadius: 999,
        background: bg,
        color,
        display: "inline-block",
      }}
    >
      {text}
    </span>
  );

  const mailto = `mailto:adoptions@sydneyDogsandCatshome.org?subject=${encodeURIComponent(
    `Adoption interest: ${a.name} (${a.id})`
  )}&body=${encodeURIComponent(
    `Hi SDCH team,\n\nI'm interested in ${a.name} (${a.id}).\n\nThanks!`
  )}`;

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
{a.image && (
  <img
    src={a.image}
    alt={a.name}
    style={{
      width: "100%",
      aspectRatio: "4 / 3",                 // taller than 16:9 → less forehead cropping
      objectFit: "cover",
      objectPosition: `50% ${typeof a.focusY === "number" ? `${a.focusY}%` : "50%"}`,
      display: "block",
      background: "#eef2f7",
    }}
    loading="lazy"
    decoding="async"
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src =
        a.species === "Cat"
          ? "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1200&auto=format&fit=crop"
          : "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=1200&auto=format&fit=crop";
    }}
  />
)}

      <div style={{ padding: 12 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <div style={{ fontWeight: 600 }}>{a.name}</div>
          <span
            style={{
              fontSize: 12,
              padding: "2px 8px",
              borderRadius: 999,
              background: b.bg,
              color: b.color,
              fontWeight: 600,
            }}
            title={`Score ${score}`}
          >
            {b.label}
          </span>
        </div>

        <div
          style={{
            fontSize: 13,
            color: "#475569",
            marginBottom: 8,
            textTransform: "capitalize",
          }}
        >
          {a.species} • {a.breed} • {a.size} • energy: {a.energy}
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {a.goodWithKids && pill("Kid friendly", "#dcfce7", "#166534")}
          {a.goodWithDogs && pill("Dog friendly", "#dcfce7", "#166534")}
          {a.goodWithCats && pill("Cat friendly", "#dcfce7", "#166534")}
          {a.needsYard && pill("Needs yard")}
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <button
            onClick={() => setOpen((o) => !o)}
            style={{
              border: "1px solid #cbd5e1",
              padding: "8px 12px",
              borderRadius: 12,
              background: "#fff",
            }}
          >
            {open ? "Hide reasons" : "View reasons"}
          </button>
          <a
            href={mailto}
            style={{
              textDecoration: "none",
              border: "1px solid #cbd5e1",
              padding: "8px 12px",
              borderRadius: 12,
              color: "#0f172a",
            }}
          >
            Register interest
          </a>
        </div>

        {open && (
          <ul style={{ margin: 0, paddingLeft: 18, color: "#334155" }}>
            {reasons.map((r, i) => (
              <li key={i} style={{ fontSize: 13, marginBottom: 4 }}>
                {r}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
