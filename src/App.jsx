import React, { useMemo, useState } from "react";

export default function App() {
  return <SDCHPetMatchPrototype />;
}

function SDCHPetMatchPrototype() {
  const [profile, setProfile] = useState({
    name: "Alex",
    householdAdults: 2,
    householdChildren: 0,
    childrenAges: "",
    dwelling: "apartment",
    hasYard: false,
    yardSecure: false,
    fenceHeightCm: 0,
    awayHoursWeekday: 8,
    awayHoursWeekend: 3,
    activityLevel: "moderate",
    experienceDogs: "some",
    experienceCats: "some",
    otherPets: "none",
    allergies: "none",
    budgetMonthlyAUD: 200,
    barkingTolerance: "moderate",
    sheddingTolerance: "moderate",
    trainingTimeHrsPerWeek: 3,
    prefers: "either",
    sizePreference: "small-medium",
    adoptionTimeline: "ready-now",
    renter: true,
    landlordApproval: false,
    notes: "Quiet building; close to parks."
  });

  const [animalsText, setAnimalsText] = useState(() => JSON.stringify(
    [
      {
        id: "D-101",
        name: "Milo",
        species: "dog",
        breed: "Kelpie mix",
        ageYears: 2,
        sex: "M",
        size: "medium",
        energy: "high",
        exerciseNeedsHrsPerDay: 2,
        needsYard: true,
        fenceMinHeightCm: 150,
        goodWithKids: true,
        goodWithDogs: true,
        goodWithCats: false,
        houseTrained: true,
        shedLevel: "moderate",
        vocalLevel: "moderate",
        timeAloneToleranceHrs: 4,
        specialNotes: "Working-breed mix: needs daily enrichment.",
        image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "D-203",
        name: "Bear",
        species: "dog",
        breed: "Greyhound",
        ageYears: 5,
        sex: "M",
        size: "large",
        energy: "low",
        exerciseNeedsHrsPerDay: 0.75,
        needsYard: false,
        fenceMinHeightCm: 120,
        goodWithKids: true,
        goodWithDogs: true,
        goodWithCats: false,
        houseTrained: true,
        shedLevel: "low",
        vocalLevel: "low",
        timeAloneToleranceHrs: 6,
        specialNotes: "Apartment-friendly couch potato.",
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: "C-317",
        name: "Maisie",
        species: "cat",
        breed: "Domestic Shorthair",
        ageYears: 3,
        sex: "F",
        size: "small",
        energy: "moderate",
        needsYard: false,
        fenceMinHeightCm: 0,
        goodWithKids: true,
        goodWithDogs: false,
        goodWithCats: true,
        houseTrained: true,
        shedLevel: "low",
        vocalLevel: "moderate",
        timeAloneToleranceHrs: 10,
        specialNotes: "Independent but cuddly; great for full-time workers.",
        image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1200&auto=format&fit=crop"
      }
    ], null, 2));

  const animals = useMemo(() => {
    try { return JSON.parse(animalsText); } catch { return []; }
  }, [animalsText]);

  function scoreMatch(animal, p) {
    let score = 0;
    const reasons = [];

    if (p.prefers !== "either" && animal.species !== p.prefers) {
      score -= 20; reasons.push(`Prefers ${p.prefers}, but this is a ${animal.species}.`);
    } else {
      score += 5; reasons.push("Species preference aligns or is flexible.");
    }

    if (animal.species === "dog") {
      if (animal.needsYard && !p.hasYard) {
        score -= 25; reasons.push("Dog needs a yard; profile has no yard.");
      } else if (!animal.needsYard && p.dwelling === "apartment") {
        score += 8; reasons.push("Apartment-suitable dog.");
      }
      if (animal.fenceMinHeightCm > 0) {
        if (!p.yardSecure || p.fenceHeightCm < animal.fenceMinHeightCm) {
          score -= 15; reasons.push(`Needs ${animal.fenceMinHeightCm}cm fence; profile has ${p.fenceHeightCm}cm or insecure.`);
        } else {
          score += 5; reasons.push("Fence height/secure yard adequate.");
        }
      }
    }

    const typicalAlone = p.awayHoursWeekday;
    if (animal.timeAloneToleranceHrs != null) {
      if (typicalAlone > animal.timeAloneToleranceHrs + 2) {
        score -= 20; reasons.push(`Away ${typicalAlone}h; animal tolerates ~${animal.timeAloneToleranceHrs}h.`);
      } else if (typicalAlone <= animal.timeAloneToleranceHrs) {
        score += 10; reasons.push("Time-alone tolerance compatible.");
      }
    }

    if (animal.species === "dog") {
      const activityMap = { low: 1, moderate: 2, high: 3 };
      const owner = activityMap[p.activityLevel] || 2;
      const pet = activityMap[animal.energy] || 2;
      if (owner < pet) {
        score -= 12; reasons.push(`Dog energy is ${animal.energy}; profile activity ${p.activityLevel}.`);
      } else if (owner === pet) {
        score += 10; reasons.push("Energy levels well matched.");
      } else {
        score += 4; reasons.push("Owner activity may exceed dog's needs (fine).");
      }
      if (animal.exerciseNeedsHrsPerDay && p.trainingTimeHrsPerWeek) {
        const dailyAvail = p.trainingTimeHrsPerWeek / 7;
        if (dailyAvail + 0.25 < animal.exerciseNeedsHrsPerDay) {
          score -= 10; reasons.push(`Exercise need ${animal.exerciseNeedsHrsPerDay}h/day vs avail ~${dailyAvail.toFixed(1)}h.`);
        } else {
          score += 6; reasons.push("Exercise time likely adequate.");
        }
      }
    }

    if (p.householdChildren > 0 && animal.goodWithKids) {
      score += 8; reasons.push("Known to be good with children.");
    }
    if (p.householdChildren > 0 && animal.goodWithKids === false) {
      score -= 20; reasons.push("Not recommended with children.");
    }

    if (p.otherPets === "dog" && animal.goodWithDogs === false) {
      score -= 20; reasons.push("Animal not good with dogs; household has a dog.");
    }
    if (p.otherPets === "cat" && animal.goodWithCats === false) {
      score -= 20; reasons.push("Animal not good with cats; household has a cat.");
    }

    if (p.allergies === "cats" && animal.species === "cat") {
      score -= 25; reasons.push("Household cat allergy.");
    }
    if (p.allergies === "dogs" && animal.species === "dog") {
      score -= 25; reasons.push("Household dog allergy.");
    }

    const tolMap = { low: 1, moderate: 2, high: 3 };
    const shedMap = { low: 1, moderate: 2, high: 3 };
    if (animal.shedLevel && p.sheddingTolerance) {
      if (shedMap[animal.shedLevel] > tolMap[p.sheddingTolerance]) {
        score -= 8; reasons.push("Shedding may exceed tolerance.");
      } else {
        score += 4; reasons.push("Shedding within tolerance.");
      }
    }
    if (animal.vocalLevel && p.barkingTolerance) {
      const vocalMap = { low:1, moderate:2, high:3 };
      if (tolMap[p.barkingTolerance] < (vocalMap[animal.vocalLevel]||2)) {
        score -= 6; reasons.push("Vocal level may exceed tolerance.");
      } else {
        score += 3; reasons.push("Vocal level within tolerance.");
      }
    }

    if (animal.species === "dog") {
      const expGood = p.experienceDogs !== "none";
      if (expGood) { score += 4; reasons.push("Has some dog experience."); }
      if (animal.energy === "high" && p.experienceDogs === "none") {
        score -= 8; reasons.push("High-energy dog may challenge first-time owner.");
      }
    } else {
      const expGood = p.experienceCats !== "none";
      if (expGood) { score += 3; reasons.push("Has some cat experience."); }
    }

    if (p.renter && !p.landlordApproval) {
      score -= 10; reasons.push("Renter without documented pet approval.");
    } else if (p.renter && p.landlordApproval) {
      score += 4; reasons.push("Renter with approval.");
    }

    const roughMonthlyCost = animal.species === "dog" ? 180 : 120;
    if (p.budgetMonthlyAUD < roughMonthlyCost * 0.7) {
      score -= 6; reasons.push("Budget may be tight for typical care costs.");
    } else {
      score += 2; reasons.push("Budget likely sufficient.");
    }

    return { score, reasons };
  }

  const ranked = useMemo(() => {
    return animals.map(a => ({ animal: a, ...scoreMatch(a, profile) }))
      .sort((x,y) => y.score - x.score);
  }, [animals, profile]);

  const topMatches = ranked.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="px-6 py-4 border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center gap-4 justify-between">
          <h1 className="text-2xl font-semibold">SDCH Pet Match (Prototype)</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <section className="lg:col-span-1 bg-white rounded-2xl shadow-sm border p-4">
          <h2 className="text-lg font-semibold mb-2">Your profile</h2>
          <p className="text-sm text-slate-600 mb-4">Adjust these to see how matches change.</p>
        </section>

        <section className="lg:col-span-1 bg-white rounded-2xl shadow-sm border p-4">
          <h2 className="text-lg font-semibold mb-2">Animals (JSON)</h2>
          <textarea value={animalsText} onChange={(e)=>setAnimalsText(e.target.value)} rows={20}
            className="w-full border rounded p-2 font-mono text-xs" />
        </section>

        <section className="lg:col-span-1 bg-white rounded-2xl shadow-sm border p-4">
          <h2 className="text-lg font-semibold mb-2">Matches</h2>
          {topMatches.map(({animal, score, reasons}) => (
            <div key={animal.id} className="border rounded-xl p-3 mb-2">
              <strong>{animal.name}</strong> ({animal.species}) — Score {score}
              <ul className="list-disc pl-5 text-sm text-slate-600">
                {reasons.map((r,i)=>(<li key={i}>{r}</li>))}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
