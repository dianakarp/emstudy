/* Seed flashcard bank for the BCEMP study tool.
 * Schema: { id, domain, front, back, tags[] }
 * Study aid only — verify against current guidelines and institutional protocols.
 */
window.BCEMP_FLASHCARDS = [
  /* CARDIOVASCULAR */
  { id: "fc-cv-01", domain: "cv", front: "Amiodarone dosing in cardiac arrest (VF/pVT)?", back: "300 mg IV/IO first dose, then 150 mg IV/IO second dose.", tags: ["ACLS","amiodarone"] },
  { id: "fc-cv-02", domain: "cv", front: "Lidocaine dosing as antiarrhythmic in arrest?", back: "1–1.5 mg/kg IV/IO, then 0.5–0.75 mg/kg every 5–10 min (max ~3 mg/kg).", tags: ["ACLS","lidocaine"] },
  { id: "fc-cv-03", domain: "cv", front: "Adenosine dosing for stable regular narrow-complex SVT?", back: "6 mg rapid IV push → 12 mg if no response (some protocols repeat 12 mg). Fast flush, proximal vein.", tags: ["SVT","adenosine"] },
  { id: "fc-cv-04", domain: "cv", front: "First-line therapy for torsades de pointes?", back: "Magnesium sulfate 1–2 g IV; correct K+; stop QT-prolonging drugs; overdrive pacing/isoproterenol if bradycardia-dependent.", tags: ["torsades","magnesium"] },
  { id: "fc-cv-05", domain: "cv", front: "Aortic dissection: which drug class FIRST and target HR?", back: "IV beta-blocker (esmolol or labetalol) FIRST to blunt dP/dt, titrated to HR 60–80. Add an IV vasodilator (nicardipine, clevidipine, nitroprusside) after rate control if BP stays high. Target SBP < 120, or the lowest BP that keeps end-organ perfusion.", tags: ["aortic dissection"], source: "2022 ACC/AHA Guideline for the Diagnosis and Management of Aortic Disease", updated: "2026-11" },
  { id: "fc-cv-06", domain: "cv", front: "Cocaine chest pain/hypertension: first-line drug?", back: "Benzodiazepines first; add nitroglycerin, phentolamine, or nicardipine. Avoid nonselective beta-blockade (unopposed alpha concern).", tags: ["cocaine"] },
  { id: "fc-cv-07", domain: "cv", front: "STEMI aspirin loading dose?", back: "162–325 mg non–enteric-coated, chewed, ASAP.", tags: ["ACS","aspirin"] },
  { id: "fc-cv-08", domain: "cv", front: "2026 AHA/ACC acute PE categories A–E: what are they, and where does systemic thrombolysis fit?", back: "A = subclinical (incidental, no symptoms): can go home from the ED. B = symptomatic, low severity score: early discharge or outpatient care is reasonable (Hestia, PESI, or sPESI). C = elevated severity score, RV dysfunction, and/or elevated biomarkers: admit and anticoagulate. D = incipient cardiopulmonary failure (transient hypotension or normotensive shock). E = cardiopulmonary failure (E1 persistent hypotension or shock, E2 refractory shock or arrest). Systemic thrombolysis: harmful in A–C2, unclear in C3, may be considered in D, reasonable in E. Activate a PE response team for C–E; DOACs over warfarin, LMWH over UFH.", tags: ["pulmonary embolism", "risk stratification"], source: "2026 AHA/ACC Guideline for the Evaluation and Management of Acute Pulmonary Embolism in Adults", updated: "2026-11" },
  { id: "fc-cv-09", domain: "cv", front: "Synchronized cardioversion starting energies (2025 AHA, biphasic)?", back: "Atrial fibrillation 200 J (at least 200 J is reasonable, then escalate), atrial flutter 200 J, regular narrow-complex tachycardia 100 J, monomorphic VT 100 J. Polymorphic VT gets an unsynchronized high-energy shock (defibrillation). The device maker's settings take precedence; if unknown, use the maximum.", tags: ["cardioversion", "tachycardia"], source: "2025 AHA Electrical Cardioversion and Adult Tachyarrhythmia algorithms; 2025 AHA Adult ALS guidelines", updated: "2026-11" },
  { id: "fc-cv-10", domain: "cv", front: "NSTE-ACS with angiography planned within 24 h: when do you load the P2Y12 inhibitor?", back: "Give aspirin now and load the P2Y12 inhibitor once the coronary anatomy is known, so a patient who needs CABG has not been loaded. The 2025 ACC/AHA ACS guideline suggests upstream clopidogrel or ticagrelor only when angiography is expected more than 24 h later. For PCI, ticagrelor or prasugrel is preferred over clopidogrel (prasugrel: avoid after stroke or TIA, and generally at age 75 or older).", tags: ["NSTEMI", "antiplatelet"], source: "2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Acute Coronary Syndromes", updated: "2026-11" },
  { id: "fc-cv-11", domain: "cv", front: "ACEP 2025: asymptomatic elevated blood pressure at ED discharge, what do you do?", back: "No IV antihypertensives. Consider starting an outpatient oral antihypertensive at discharge (Level C), and refer every patient for follow-up (consensus). AHA statements now call this markedly elevated BP without target-organ damage rather than hypertensive urgency.", tags: ["hypertension", "disposition"], source: "ACEP Clinical Policy: Outpatient Management of Asymptomatic Elevated Blood Pressure (Ann Emerg Med 2025)", updated: "2026-11" },

  /* RESUSCITATION & SHOCK */
  { id: "fc-resus-01", domain: "resus", front: "First-line vasopressor in septic shock?", back: "Norepinephrine. Add vasopressin (fixed 0.03 units/min) to raise MAP / spare norepinephrine; epinephrine third-line.", tags: ["sepsis","vasopressor"] },
  { id: "fc-resus-02", domain: "resus", front: "ACLS epinephrine dose/interval?", back: "1 mg IV/IO every 3–5 minutes (give early in nonshockable rhythms).", tags: ["ACLS","epinephrine"] },
  { id: "fc-resus-03", domain: "resus", front: "RSI induction in a critically ill or shocked adult: ketamine or etomidate?", back: "Either is acceptable. In the 2025 RSI trial (ketamine 1–2 mg/kg vs etomidate 0.2–0.3 mg/kg), 28-day mortality was the same (28% vs 29%), but cardiovascular collapse during intubation was MORE common with ketamine (22% vs 17%). Resuscitate first, consider a lower dose in shock, have a pressor ready, and avoid propofol.", tags: ["RSI","ketamine","etomidate"], source: "RSI trial: Ketamine or Etomidate for Tracheal Intubation of Critically Ill Adults. NEJM 2025", updated: "2026-11" },
  { id: "fc-resus-04", domain: "resus", front: "Succinylcholine RSI dose and key contraindications?", back: "1.5 mg/kg IV. Avoid in hyperkalemia, subacute burns/denervation/crush (days+), malignant hyperthermia history.", tags: ["RSI","succinylcholine"] },
  { id: "fc-resus-05", domain: "resus", front: "Rocuronium RSI dose?", back: "1.2 mg/kg IV (rapid onset ~60 s; longer duration ~45+ min).", tags: ["RSI","rocuronium"] },
  { id: "fc-resus-06", domain: "resus", front: "Push-dose pressors: phenylephrine vs epinephrine?", back: "Phenylephrine 50–200 mcg boluses (pure alpha); epinephrine 5–20 mcg boluses (alpha+beta). Bridges only.", tags: ["push-dose"] },
  { id: "fc-resus-07", domain: "resus", front: "Steroid for vasopressor-dependent septic shock?", back: "IV hydrocortisone ~200 mg/day (e.g., 50 mg q6h or infusion) when ongoing vasopressor requirement.", tags: ["sepsis","hydrocortisone"] },

  /* TOXICOLOGY */
  { id: "fc-tox-01", domain: "tox", front: "Antidote: acetaminophen?", back: "N-acetylcysteine (replenishes glutathione; detoxifies NAPQI). Most effective <8 h.", tags: ["acetaminophen","NAC"] },
  { id: "fc-tox-02", domain: "tox", front: "Antidote: methanol/ethylene glycol?", back: "Fomepizole (inhibits alcohol dehydrogenase). ± hemodialysis. Cofactors: folate (methanol), thiamine/pyridoxine (ethylene glycol).", tags: ["toxic alcohol","fomepizole"] },
  { id: "fc-tox-03", domain: "tox", front: "TCA overdose with wide QRS: treatment?", back: "Sodium bicarbonate 1–2 mEq/kg boluses for QRS >100 ms/hypotension. Avoid class Ia/Ic/III antiarrhythmics.", tags: ["TCA","bicarbonate"] },
  { id: "fc-tox-04", domain: "tox", front: "Antidote: organophosphate (cholinergic) toxicity?", back: "Atropine titrated to dried secretions + pralidoxime (2-PAM) for nicotinic/AChE reactivation. Benzos for seizures.", tags: ["organophosphate","atropine"] },
  { id: "fc-tox-05", domain: "tox", front: "Antidote: cyanide (smoke inhalation)?", back: "Hydroxocobalamin 5 g IV (preferred—no methemoglobinemia). Alt: sodium thiosulfate ± nitrites.", tags: ["cyanide"] },
  { id: "fc-tox-06", domain: "tox", front: "CCB/beta-blocker overdose refractory therapy?", back: "High-dose insulin (2023 AHA: class 1 for hypotension in both): regular insulin 1 unit/kg bolus, then 1 unit/kg/h titrated up to 10 units/kg/h, with dextrose and close glucose and K+ checks. Plus vasopressors; calcium (CCB); glucagon (beta-blocker; uncertain benefit in CCB); VA-ECMO if refractory. Routine lipid emulsion is NOT recommended for either.", tags: ["CCB","HIET"], source: "2023 AHA Focused Update on Cardiac Arrest or Life-Threatening Toxicity Due to Poisoning", updated: "2026-11" },
  { id: "fc-tox-07", domain: "tox", front: "Antidote: benzodiazepine? Caution?", back: "Flumazenil—rarely used; avoid in chronic use / co-ingestion (seizure and withdrawal risk).", tags: ["flumazenil"] },
  { id: "fc-tox-08", domain: "tox", front: "Antidote: digoxin toxicity?", back: "Digoxin immune Fab (DigiFab). Indicated for life-threatening arrhythmia, K+ >5 in acute toxicity, or large ingestion.", tags: ["digoxin","Fab"] },
  { id: "fc-tox-09", domain: "tox", front: "Antidote: iron overdose?", back: "Deferoxamine (chelation) for severe toxicity (shock, acidosis, high serum iron).", tags: ["iron","deferoxamine"] },
  { id: "fc-tox-10", domain: "tox", front: "Antidote: methemoglobinemia?", back: "Methylene blue 1–2 mg/kg IV. Avoid/ineffective in G6PD deficiency.", tags: ["methemoglobinemia","methylene blue"] },
  { id: "fc-tox-11", domain: "tox", front: "Antidote: local anesthetic systemic toxicity (LAST)?", back: "IV lipid emulsion 20% (1.5 mL/kg bolus, then infusion) + ACLS (reduced epinephrine doses, avoid vasopressin).", tags: ["LAST","lipid emulsion"] },

  /* NEUROLOGY */
  { id: "fc-neuro-01", domain: "neuro", front: "Alteplase dose for acute ischemic stroke?", back: "0.9 mg/kg (max 90 mg): 10% bolus over 1 min, remainder over 60 min.", tags: ["stroke","alteplase"] },
  { id: "fc-neuro-02", domain: "neuro", front: "Tenecteplase dose for stroke?", back: "0.25 mg/kg IV single bolus (max 25 mg). FDA-approved for acute ischemic stroke in 2025, and the 2026 AHA/ASA guideline recommends it equally with alteplase within 4.5 h (class 1). The 0.4 mg/kg dose is not recommended.", tags: ["stroke","tenecteplase"], source: "2026 AHA/ASA Guideline for the Early Management of Patients With Acute Ischemic Stroke", updated: "2026-11" },
  { id: "fc-neuro-03", domain: "neuro", front: "BP targets around IV thrombolysis for stroke?", back: "< 185/110 before thrombolysis; keep < 180/105 for 24 h after (labetalol, nicardipine, or clevidipine). Don't push lower: SBP < 140 adds nothing after thrombolysis and is harmful in the first 72 h after successful thrombectomy.", tags: ["stroke","BP"], source: "2026 AHA/ASA Guideline for the Early Management of Patients With Acute Ischemic Stroke", updated: "2026-11" },
  { id: "fc-neuro-04", domain: "neuro", front: "Status epilepticus: first-line and doses?", back: "Benzodiazepine: lorazepam 0.1 mg/kg IV (≤4 mg/dose), diazepam 0.15–0.2 mg/kg, or IM midazolam 10 mg. Then second-line: levetiracetam, fosphenytoin, or valproate.", tags: ["status epilepticus"] },
  { id: "fc-neuro-05", domain: "neuro", front: "Warfarin-associated ICH reversal?", back: "4-factor PCC + IV vitamin K 10 mg (vitamin K sustains reversal; PCC acts fast).", tags: ["ICH","warfarin"] },

  /* INFECTIOUS DISEASE */
  { id: "fc-id-01", domain: "id", front: "Empiric antibiotics for adult bacterial meningitis?", back: "Vancomycin + ceftriaxone (or cefotaxime); add ampicillin if Listeria risk (>50, immunocompromised, pregnant). Dexamethasone with/before first dose for pneumococcal.", tags: ["meningitis"] },
  { id: "fc-id-02", domain: "id", front: "Antibiotic timing in septic shock?", back: "Within 1 hour of recognition (Surviving Sepsis).", tags: ["sepsis"] },
  { id: "fc-id-03", domain: "id", front: "Add-on antibiotic to suppress toxin in necrotizing/strep TSS?", back: "Clindamycin (protein synthesis inhibition → decreased exotoxin).", tags: ["necrotizing","clindamycin"] },
  { id: "fc-id-04", domain: "id", front: "Antipseudomonal beta-lactams for febrile neutropenia?", back: "Cefepime, piperacillin-tazobactam, or meropenem/imipenem. (Ceftriaxone & ertapenem do NOT cover Pseudomonas.)", tags: ["pseudomonas"] },

  /* TRAUMA & HEMOSTASIS */
  { id: "fc-trauma-01", domain: "trauma", front: "TXA in trauma: window and dose?", back: "Within 3 h of injury. 1 g IV over 10 min, then 1 g over 8 h. (CRASH-2)", tags: ["TXA"] },
  { id: "fc-trauma-02", domain: "trauma", front: "Reversal of dabigatran?", back: "Idarucizumab (Praxbind). Alt: activated PCC / hemodialysis.", tags: ["dabigatran","idarucizumab"] },
  { id: "fc-trauma-03", domain: "trauma", front: "Reversal of apixaban/rivaroxaban?", back: "4-factor PCC (e.g., a fixed 2,000 units per the 2020 ACC pathway, or 25–50 units/kg); activated PCC is an alternative. Andexanet alfa was withdrawn from the US market in December 2025 (more thrombosis in ANNEXA-I).", tags: ["Xa inhibitor","andexanet"], source: "FDA safety communication on Andexxa (Dec 2025); 2020 ACC Expert Consensus Decision Pathway", updated: "2026-11" },
  { id: "fc-trauma-04", domain: "trauma", front: "Reversal of unfractionated heparin?", back: "Protamine sulfate (1 mg per ~100 units heparin, max 50 mg). Partial reversal of LMWH.", tags: ["heparin","protamine"] },
  { id: "fc-trauma-05", domain: "trauma", front: "Key electrolyte to monitor/replete in massive transfusion?", back: "Ionized calcium (citrate chelates Ca2+ → hypocalcemia). Also watch K+ and temperature.", tags: ["massive transfusion","calcium"] },

  /* RESPIRATORY & ANAPHYLAXIS */
  { id: "fc-resp-01", domain: "resp", front: "Anaphylaxis first-line drug/route/dose (adult)?", back: "Epinephrine 0.3–0.5 mg IM (1 mg/mL) anterolateral thigh; repeat q5–15 min. IV infusion if refractory.", tags: ["anaphylaxis"] },
  { id: "fc-resp-02", domain: "resp", front: "Anaphylaxis refractory to epi in a patient on beta-blockers?", back: "Glucagon 1–5 mg IV (bypasses beta receptor). Protect airway (emesis risk).", tags: ["anaphylaxis","glucagon"] },
  { id: "fc-resp-03", domain: "resp", front: "Severe asthma adjunct IV bronchodilator?", back: "Magnesium sulfate 2 g IV over 20 min. (Aminophylline NOT recommended.)", tags: ["asthma","magnesium"] },
  { id: "fc-resp-04", domain: "resp", front: "Anaphylaxis adjuncts (not first-line)?", back: "H1 antihistamine (diphenhydramine), H2 blocker, corticosteroids, bronchodilators, IV fluids — none replace epinephrine.", tags: ["anaphylaxis"] },

  /* ANALGESIA & SEDATION */
  { id: "fc-pain-01", domain: "pain", front: "Analgesic (subdissociative) ketamine dose?", back: "0.1–0.3 mg/kg IV (often over 10–15 min to reduce dysphoria).", tags: ["ketamine"] },
  { id: "fc-pain-02", domain: "pain", front: "Dissociative sedation ketamine dose?", back: "~1–2 mg/kg IV (or 4–5 mg/kg IM).", tags: ["ketamine"] },
  { id: "fc-pain-03", domain: "pain", front: "Preferred opioid in renal failure?", back: "Fentanyl (no active/renally-cleared metabolites). Avoid morphine (M6G) and meperidine (normeperidine).", tags: ["opioid","renal"] },
  { id: "fc-pain-04", domain: "pain", front: "Etomidate: benefit and caution?", back: "Hemodynamically neutral induction (0.3 mg/kg); causes transient adrenal suppression—caution in sepsis.", tags: ["etomidate"] },

  /* ENDOCRINE & METABOLIC */
  { id: "fc-endo-01", domain: "endo", front: "DKA: when to hold insulin for potassium?", back: "Hold insulin if K+ <3.3 mEq/L and replete first. K+ 3.3–5.3: insulin + add K+ to fluids. K+ >5.3: insulin, monitor.", tags: ["DKA","potassium"] },
  { id: "fc-endo-02", domain: "endo", front: "Hyperkalemia with ECG changes: first drug?", back: "IV calcium (gluconate or chloride) to stabilize myocardium (does not lower K+).", tags: ["hyperkalemia","calcium"] },
  { id: "fc-endo-03", domain: "endo", front: "Hyperkalemia: agents that SHIFT K+ intracellularly?", back: "Insulin + dextrose, beta-2 agonist (albuterol high-dose), sodium bicarbonate (if acidotic).", tags: ["hyperkalemia"] },
  { id: "fc-endo-04", domain: "endo", front: "Hyperkalemia: agents that REMOVE K+?", back: "Loop diuretics (if making urine), GI cation binders (patiromer, SZC, SPS), dialysis.", tags: ["hyperkalemia"] },
  { id: "fc-endo-05", domain: "endo", front: "Myxedema coma: co-therapy with thyroid hormone?", back: "Stress-dose hydrocortisone (avoid precipitating adrenal crisis) + IV levothyroxine ± liothyronine + supportive care.", tags: ["myxedema"] },

  /* ENVIRONMENTAL */
  { id: "fc-env-01", domain: "env", front: "Serotonin syndrome antidote?", back: "Cyproheptadine (5-HT2A antagonist) + benzodiazepines + cooling/supportive care.", tags: ["serotonin syndrome"] },
  { id: "fc-env-02", domain: "env", front: "Neuroleptic malignant syndrome treatment?", back: "Stop antipsychotic; dantrolene and/or bromocriptine + supportive care/cooling + benzodiazepines.", tags: ["NMS"] },
  { id: "fc-env-03", domain: "env", front: "Malignant hyperthermia treatment?", back: "Dantrolene 2.5 mg/kg IV (repeat); stop trigger; cool; treat hyperkalemia/acidosis.", tags: ["malignant hyperthermia"] },

  /* SPECIAL POPULATIONS */
  { id: "fc-special-01", domain: "special", front: "Eclampsia seizure treatment?", back: "Magnesium sulfate 4–6 g IV load then 1–2 g/hr. Toxicity antidote: IV calcium gluconate.", tags: ["eclampsia"] },
  { id: "fc-special-02", domain: "special", front: "Pediatric IM epinephrine dose for anaphylaxis?", back: "0.01 mg/kg of 1 mg/mL (max 0.3 mg prepubertal, up to 0.5 mg), anterolateral thigh, repeat q5–15 min.", tags: ["pediatrics","anaphylaxis"] },
  { id: "fc-special-03", domain: "special", front: "Acetaminophen max in significant hepatic impairment?", back: "Reduce to ≤2 g/day (some say avoid in severe/active disease).", tags: ["hepatic","acetaminophen"] },

  /* MEDICATION & PATIENT SAFETY */
  { id: "fc-safety-01", domain: "safety", front: "Examples of ISMP high-alert medications in the ED?", back: "Insulin, anticoagulants/heparin, opioids, concentrated electrolytes (KCl, hypertonic saline), neuromuscular blockers, chemo, IV inotropes.", tags: ["high-alert"] },
  { id: "fc-safety-02", domain: "safety", front: "Most effective safeguards for high-alert infusions?", back: "Standardized concentrations + smart-pump DERS (guardrails) + independent double-checks + limiting available concentrations.", tags: ["smart pump"] },
  { id: "fc-safety-03", domain: "safety", front: "What is a LASA error? Mitigations?", back: "Look-Alike/Sound-Alike name confusion (e.g., hydromorphone/morphine). Mitigate with tall-man lettering, separation, barcode scanning, independent checks.", tags: ["LASA"] },

  /* PRACTICE MANAGEMENT & RESEARCH */
  { id: "fc-pmr-01", domain: "pmr", front: "NNT formula and meaning?", back: "NNT = 1 / absolute risk reduction. Number of patients treated to prevent one additional bad outcome. Lower = more effective.", tags: ["evidence","NNT"] },
  { id: "fc-pmr-02", domain: "pmr", front: "Intention-to-treat vs per-protocol analysis?", back: "ITT analyzes patients by assigned group (preserves randomization, real-world estimate); per-protocol includes only compliant completers (efficacy, prone to bias).", tags: ["evidence","ITT"] }
];
