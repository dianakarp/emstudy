/* BCEMP content domains, mirroring the BPS Emergency Medicine Pharmacist
 * content outline. `weight` is an approximate share of exam emphasis and is
 * used to (a) proportionally build daily sessions and (b) compute a weighted
 * exam-readiness estimate. Weights are relative and need not sum to 100. */
window.BCEMP_DOMAINS = [
  { id: "cv",        name: "Cardiovascular Emergencies",        weight: 14, blurb: "ACS, arrhythmias, ACLS, hypertensive emergency, acute HF" },
  { id: "resus",     name: "Resuscitation & Shock",             weight: 13, blurb: "Sepsis, vasopressors, RSI, post-arrest care" },
  { id: "tox",       name: "Toxicology & Antidotes",            weight: 12, blurb: "Tox syndromes, antidotes, decontamination" },
  { id: "neuro",     name: "Neurologic Emergencies",            weight: 9,  blurb: "Acute stroke (alteplase/tenecteplase), status epilepticus, ICH" },
  { id: "id",        name: "Infectious Disease",                weight: 9,  blurb: "Empiric antibiotics, sepsis, meningitis" },
  { id: "trauma",    name: "Trauma & Hemostasis",               weight: 8,  blurb: "TXA, anticoagulant reversal, massive transfusion" },
  { id: "resp",      name: "Respiratory & Anaphylaxis",         weight: 7,  blurb: "Asthma/COPD, anaphylaxis" },
  { id: "pain",      name: "Analgesia & Sedation",              weight: 6,  blurb: "Procedural sedation, opioids, non-opioid analgesia" },
  { id: "endo",      name: "Endocrine & Metabolic",             weight: 6,  blurb: "DKA/HHS, hyperkalemia, electrolyte emergencies" },
  { id: "env",       name: "Environmental Emergencies",         weight: 3,  blurb: "Hyperthermia, hypothermia, envenomation" },
  { id: "special",   name: "Special Populations",               weight: 5,  blurb: "Peds, pregnancy, renal/hepatic, geriatric dosing" },
  { id: "safety",    name: "Medication & Patient Safety",       weight: 5,  blurb: "Systems, high-alert meds, error prevention" },
  { id: "pmr",       name: "Practice Management & Research",     weight: 3,  blurb: "Evidence appraisal, guidelines, EM pharmacist role" }
];

window.BCEMP_DOMAIN_MAP = window.BCEMP_DOMAINS.reduce(function (m, d) { m[d.id] = d; return m; }, {});
