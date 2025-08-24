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

export default function App() {
  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
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
            maxWidth: 960,
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

      <main style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
        <h2 style={{ fontSize: 18, margin: "0 0 12px" }}>Animals</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {animals.map((a) => (
            <AnimalCard key={a.id} a={a} />
          ))}
        </div>
      </main>

      <footer
        style={{
          maxWidth: 960,
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

function AnimalCard({ a }) {
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
          style={{ width: "100%", height: 150, objectFit: "cover" }}
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
          <span style={{ fontSize: 12, color: "#334155" }}>ID: {a.id}</span>
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
        </div>
        <div style={{ display: "flex", gap: 8 }}>
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
          <a
            href="https://sydneydogsandcatshome.org/adopt/"
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: "none",
              border: "1px solid #cbd5e1",
              padding: "8px 12px",
              borderRadius: 12,
              color: "#0f172a",
            }}
          >
            View site
          </a>
        </div>
      </div>
    </div>
  );
}
