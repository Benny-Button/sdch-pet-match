import React, { useMemo, useState } from "react";

// --- Sample animals (kept simple) ---
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
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1200&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1200&auto=format&fit=crop",
  },
];

// --- Simple helpers ---
const map3 = { low: 1, moderate: 2, high: 3 };
function scoreBadge(score) {
  if (score >= 25) return { label: "Excellent", bg: "#dcfce7", color: "#166534" };
  if (score >= 10) return { label: "Good", bg: "#e0f2fe", color: "#075985" };
  if (score >= 0) return { label: "Fair", bg: "#fef3c7", color: "#92400e" };
  return { label: "Unsuitable", bg: "#fee2e2", color: "#991b1b" };
}

// --- Match scoring (intentionally simple & explainable) ---
function scoreMatch(animal, profile) {
  let score = 0;
  const reasons = [];

  // Species preference
  if (profile.prefers !== "either" && animal.species !== profile.prefers) {
    score -= 20;
    reasons.push(`Prefers ${profile.prefers}, but this is a ${animal.species}.`);
  } else {
    score += 5;
    reasons.push("Species preference aligns or is flexible.");
  }

  // Energy vs activity
  const owner = map3[profile.activity] ?? 2;
  const pet = map3[animal.energy] ?? 2;
  if (owner < pet) {
    score -= 12;
    reasons.push(`Pet energy is ${animal.energy}; profile activity is ${profile.activity}.`);
  } else if (owner === pet) {
    score += 10;
    reasons.push("Energy levels are well matched.");
  } else {
    score += 4;
    reasons.push("Owner activity may exceed pet needs (fine).");
  }

  // Children compatibility
  if (profile.children > 0) {
    if (animal.goodWithKids) {
      score += 8;
      reasons.push("Good with children.");
    } else {
      score -= 20;
      reasons.push("Not recommended with children.");
    }
  }

  return { score, reasons };
}

export default function App() {
  // Minimal profile
  const [profile, setProfile] = useState({
    prefers: "either", // dog | cat | either
    activity: "moderate", // low | moderate | high
    children: 0, // number of children at home
  });

  // Pre-compute ranked matches
  const ranked = useMemo(() => {
    return animals
      .map((a) => ({ animal: a, ...scoreMatch(a, profile) }))
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
            maxWidth: 1040,
            margin: "0 auto",
          }}
        >
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>
            SDCH Pet Match (Prototype)
          </h1>
          <a
            href="https://sydneydogsandcatshome.org/adopt/"
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
          maxWidth: 1040,
          margin: "0 auto",
          padding: 24,
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: 16,
        }}
      >
        {/* Profile panel */}
        <section
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            padding: 16,
          }}
        >
          <h2 style={{ marginTop: 0, fontSize: 18 }}>Your profile</h2>

          {/* Prefers */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, color: "#475569" }}>Prefer</label>
            <select
              value={profile.prefers}
              onChange={(e) => setProfile((p) => ({ ...p, prefers: e.target.value }))}
              style={{
                display: "block",
                width: "100%",
                padding: "8px 10px",
                border: "1px solid #cbd5e1",
                borderRadius: 12,
                background: "#fff",
              }}
            >
              <option value="either">either</option>
              <option value="dog">dog</option>
              <option value="cat">cat</option>
            </select>
          </div>

          {/* Activity */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, color: "#475569" }}>Activity level</label>
            <select
              value={profile.activity}
              onChange={(e) => setProfile((p) => ({ ...p, activity: e.target.value }))}
              style={{
                display: "block",
                width: "100%",
                padding: "8px 10px",
                border: "1px solid #cbd5e1",
                borderRadius: 12,
                background: "#fff",
              }}
            >
              <option value="low">low</option>
              <option value="moderate">moderate</option>
              <option value="high">high</option>
            </select>
          </div>

          {/* Children */}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, color: "#475569" }}>Children at home</label>
            <input
              type="number"
              min={0}
              value={profile.children}
              onChange={(e) =>
                setProfile((p) => ({ ...p, children: Math.max(0, Number(e.target.value || 0)) }))
              }
              style={{
                display: "block",
                width: "100%",
                padding: "8px 10px",
                border: "1px solid #cbd5e1",
                borderRadius: 12,
                background: "#fff",
              }}
            />
          </div>

          <p style={{ fontSize: 12, color: "#64748b" }}>
            Tip: try “prefer: dog”, “activity: low”, children 1 — watch scores change.
          </p>
        </section>

        {/* Matches list */}
        <section>
          <h2 style={{ fontSize: 18, margin: "0 0 12px" }}>Matches</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {ranked.map(({ animal, score, reasons }) => (
              <MatchCard key={animal.id} a={animal} score={score} reasons={reasons} />
            ))}
          </div>
        </section>
      </main>

      <footer
        style={{
          maxWidth: 1040,
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

function MatchCard({ a, score, reasons }) {
  const [open, setOpen] = useState(false);
  const badge = scoreBadge(score);

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

  const mailto = `mailto:adoptions@sydneydogsandcatshome.org?subject=${encodeURIComponent(
    `Adoption interest: ${a.name} (${a.id})`
  )}&body=${encodeURIComponent(
    `Hi SDCH team,\n\nI'm interested in ${a.name} (${a.id}).\n\nThanks!`
  )}`;

  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden" }}>
      {/* Image */}
      {a.image && (
        <img src={a.image} alt={a.name} style={{ width: "100%", height: 160, objectFit: "cover" }} />
      )}

      {/* Content */}
      <div style={{ padding: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div style={{ fontWeight: 600 }}>{a.name}</div>
          <span
            style={{
              fontSize: 12,
              padding: "2px 8px",
              borderRadius: 999,
              background: badge.bg,
              color: badge.color,
              fontWeight: 600,
            }}
          >
            {badge.label}
          </span>
        </div>

        <div style={{ fontSize: 13, color: "#475569", marginBottom: 8, textTransform: "capitalize" }}>
          {a.species} • {a.breed} • {a.size} • energy: {a.energy}
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {a.goodWithKids && pill("Kid friendly", "#dcfce7", "#166534")}
          {a.goodWithDogs && pill("Dog friendly", "#dcfce7", "#166534")}
          {a.goodWithCats && pill("Cat friendly", "#dcfce7", "#166534")}
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <button
            onClick={() => setOpen((o) => !o)}
            style={{ border: "1px solid #cbd5e1", padding: "8px 12px", borderRadius: 12, background: "#fff" }}
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
