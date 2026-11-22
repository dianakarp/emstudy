/* comparisons.js - side-by-side high-yield distinctions for the Compare review tab.
 * One table per block and one row per line, so edits show up as small diffs. */
window.BCEMP_COMPARISONS = [
  {"title": "NMS vs Serotonin Syndrome", "section": "Psychiatry / Tox", "tagline": "Both = hyperthermia + AMS + autonomic chaos. The reflexes tell you which", "cols": ["NMS (Neuroleptic Malignant Syndrome)","Serotonin Syndrome"], "source": "Boyer EW, Shannon M. NEJM 2005; Gurrera RJ, et al. NMS consensus criteria, J Clin Psychiatry 2011", "updated": "2026-11", "rows": [
    ["Cause","Dopamine antagonist (typical/atypical antipsychotic, metoclopramide) OR abrupt dopamine agonist withdrawal","Serotonergic agent (SSRI, SNRI, MAOI, TCA, tramadol, fentanyl, ondansetron, linezolid, dextromethorphan, St. John's wort)"],
    ["Onset","Days to weeks (slow)","Hours (rapid)"],
    ["Rigidity","LEAD-PIPE (sustained, uniform), with bradykinesia","Increased tone, worse in the LEGS; truncal rigidity in severe cases (can mask clonus)"],
    ["Reflexes","HYPO-reflexia or normal","HYPER-reflexia + CLONUS (especially ankle)"],
    ["Pupils","Normal","Dilated (mydriasis)"],
    ["CK","Elevated, often markedly (at least 4x normal in the consensus criteria)","Normal or mildly elevated; rises with severe rigidity"],
    ["GI symptoms","Minimal","Diarrhea, hyperactive bowel sounds"],
    ["Skin","Diaphoresis, pale","Diaphoresis, flushed"],
    ["Treatment","STOP antipsychotic + supportive (cooling, IVF, benzos). Severe: DANTROLENE 2.5 mg/kg q6h + BROMOCRIPTINE 2.5 mg TID","STOP serotonergic agents + supportive + benzos. Severe: CYPROHEPTADINE 12 mg load → 2 mg q2h"],
    ["Memory hook","\"Lead-pipe + HYPO + slow\"","\"Clonus + HYPER + fast\""]
  ]},
  {"title": "Warm Shock vs Cold Shock (Pediatric Septic Shock)", "section": "Pediatrics", "tagline": "Kids vasoconstrict — cold shock more common than in adults. Choose pressor by physiology", "cols": ["Warm / Distributive Shock","Cold / Cardiogenic Shock"], "source": "Surviving Sepsis Campaign pediatric guidelines (2020); 2025 AHA/AAP PALS", "updated": "2026-11", "rows": [
    ["Skin","Warm, flushed extremities","Cool, mottled, delayed cap refill (>3s)"],
    ["Pulses","Bounding","Thready, weak"],
    ["Pulse pressure","Wide","Narrow"],
    ["Mechanism","Vasodilation, low SVR","Vasoconstriction, low CO, myocardial dysfunction"],
    ["More common in","Adults","Pediatrics"],
    ["Goal","Clamp down peripheral vasculature (increase SVR)","Support the heart (increase contractility)"],
    ["First-line pressor","NOREPINEPHRINE often chosen","EPINEPHRINE often chosen"],
    ["Guideline note","SSC 2020 and 2025 PALS accept EITHER epinephrine or norepinephrine first (not dopamine); bedside warm-vs-cold assessment is imperfect, so reassess often","Same"],
    ["Memory hook","Warm = Wide pulse pressure = Want Norepi","Cold = Constricted = Crank up Epi"]
  ]},
  {"title": "Exertional vs Classic Heatstroke", "section": "Environmental Tox", "tagline": "Same diagnosis, different cooling strategies. Wrong choice = harm in elderly", "cols": ["Exertional Heatstroke","Classic Heatstroke"], "rows": [
    ["Population","Young, athletes, military, firefighters","Elderly, comorbid, anticholinergic meds, no AC in heat wave"],
    ["Onset","Rapid (minutes-hours)","Insidious (days)"],
    ["Sweating","Often PRESERVED","ANHIDROSIS classic"],
    ["Best cooling method","ICE WATER IMMERSION (neck-deep)","EVAPORATIVE (cool mist + fans)"],
    ["Why distinction matters","Cool first, transport second — outcomes worsen if delayed","Ice immersion not tolerated hemodynamically in elderly"],
    ["Target temp","38.3-38.8°C (101-102°F)","Same — stop to avoid overshoot"],
    ["AVOID","Antipyretics (NSAIDs, APAP) — wrong mechanism; dantrolene (NOT MH/NMS)","Same — plus aggressive cardiac stress"]
  ]},
  {"title": "BB Overdose vs CCB Overdose", "section": "Toxicology", "tagline": "Mechanistically opposite glucose effects — classic board pearl", "cols": ["Beta-Blocker Overdose","Calcium Channel Blocker Overdose"], "source": "2023 AHA Focused Update on Cardiac Arrest or Life-Threatening Toxicity Due to Poisoning", "updated": "2026-11", "rows": [
    ["Glucose","HYPOGLYCEMIA, mainly in children (β2 blockade impairs glycogenolysis)","HYPERGLYCEMIA (L-type Ca channel blocks insulin release)"],
    ["Heart rate","Bradycardia","Bradycardia (verapamil/diltiazem); reflex tachy then brady (DHCCB)"],
    ["BP","Hypotension","Hypotension"],
    ["Mental status","AMS, seizures (especially propranolol)","Often PRESERVED despite profound hypotension (a classic clue)"],
    ["Propranolol specifics","Lipophilic + Na channel blockade → wide QRS → NaHCO3 helps","—"],
    ["Sotalol specifics","K channel block → prolonged QT → torsades → MgSO4 + overdrive pacing","—"],
    ["Treatment (2023 AHA)","Vasopressors + EARLY high-dose insulin (both class 1); glucagon bolus + infusion (2a); atropine or pacing for bradycardia (2b); VA-ECMO if refractory (2a); hemodialysis may help for atenolol or sotalol (2b). Lipid emulsion is not likely to help","Vasopressors + EARLY high-dose insulin (both class 1); calcium (2a); atropine (2a); VA-ECMO if refractory (2a); pacing, glucagon, and methylene blue of uncertain benefit (2b). Routine lipid emulsion is NOT recommended"],
    ["HIE dosing","Both: regular insulin 1 unit/kg bolus, then 1 unit/kg/h titrated up to 10 units/kg/h, with dextrose and K+ monitoring. Don't fear the dose","Same"],
    ["Memory hook","BB OD = β-blocked Blood sugar (LOW)","CCB OD = Can't Cut insulin → HIGH blood sugar"]
  ]},
  {"title": "CroFab vs ANAVIP (Pit Viper Antivenoms)", "section": "Environmental Tox", "tagline": "Key difference: maintenance dosing — driven by molecular fragment size", "cols": ["CroFab (Ovine Fab)","ANAVIP (Equine F(ab')2)"], "rows": [
    ["Source","Ovine (sheep) — Fab monomers","Equine (horse) — F(ab')2 dimers"],
    ["Half-life","~12-23 hours (short)","~14-17 days (long)"],
    ["Initial control dose","4-6 vials (8-12 in severe)","10 vials"],
    ["Maintenance","SCHEDULED: 2 vials q6h × 3 doses","NOT routine — monitor 18 hr, redose only if recrudescence"],
    ["Why the difference","Short Fab half-life → venom recrudescence common → scheduled redosing required","Longer F(ab')2 half-life → covers redistribution → no scheduled maintenance"],
    ["Delayed coagulopathy","More common","Less common"],
    ["Memory hook","CroFab needs more 'CRO' (continued dosing)","ANAVIP is 'A One-time And done' approach"]
  ]},
  {"title": "Salicylate vs TCA Overdose", "section": "Toxicology", "tagline": "Both treated with NaHCO3 but for completely different reasons", "cols": ["Salicylate Overdose","TCA Overdose"], "source": "Juurlink DN, et al. EXTRIP salicylates, Ann Emerg Med 2015; Yates C, et al. EXTRIP tricyclic antidepressants, Semin Dial 2014", "updated": "2026-11", "rows": [
    ["Toxidrome","Mixed respiratory alkalosis + AGMA, tinnitus, fever, sweating","Anticholinergic + Na channel blockade + α1 block"],
    ["Classic ABG","Mixed (resp alk + met acid). Pure metabolic = severe","Metabolic acidosis + wide QRS"],
    ["ECG","Variable","QRS > 100 ms → seizure risk; > 160 → arrhythmia risk; R wave aVR > 3 mm"],
    ["Why NaHCO3","Urine alkalinization (target pH > 7.5) — traps ionized salicylate → eliminates","Serum alkalinization (target pH 7.45-7.55) — overcomes Na channel blockade"],
    ["HD indications","EXTRIP recommends: level > 100 mg/dL (> 90 with impaired kidney function), altered mental status, new hypoxemia needing O2, or failing standard therapy. Suggests: level > 90 (> 80 with kidney impairment) or pH ≤ 7.20","None: not dialyzable (protein-bound, huge volume of distribution); EXTRIP recommends AGAINST it"],
    ["Intubation pitfall","DON'T — can't match patient's MV → acidosis worsens → CNS shift → death","May be necessary; manage with bicarb + supportive"],
    ["AVOID","Acetazolamide, sedation","Phenytoin (worsens Na block), physostigmine (asystole risk), flumazenil"]
  ]},
  {"title": "Methanol vs Ethylene Glycol Poisoning", "section": "Toxicology", "tagline": "Both blocked by fomepizole — end-organ damage differs", "cols": ["Methanol","Ethylene Glycol"], "source": "AACT practice guidelines (1999, 2002); Roberts DM, et al. EXTRIP methanol, Crit Care Med 2015; Ghannoum M, et al. EXTRIP ethylene glycol, Crit Care 2023", "updated": "2026-11", "rows": [
    ["Toxic metabolite","FORMIC ACID (formaldehyde → formate)","Glycolic acid → OXALIC ACID"],
    ["End-organ injury","OPTIC NEUROPATHY (\"snowfield blindness\"), basal ganglia (parkinsonism)","RENAL FAILURE from calcium oxalate crystals, hypocalcemia"],
    ["Classic finding","Visual changes, normal renal","Calcium oxalate crystals (envelope shape) in urine, hypoCa from oxalate binding"],
    ["Wood's lamp","—","Urine may fluoresce (fluorescein in antifreeze), but the test is unreliable; don't use it to rule in or out"],
    ["Start fomepizole if","Level > 20 mg/dL, or suspected ingestion with an osmolal gap > 10 or unexplained anion-gap acidosis (don't wait for the level)","Same"],
    ["Fomepizole","Yes — 15 mg/kg load → 10 mg/kg q12h × 4 → 15 mg/kg q12h","Same dosing"],
    ["Adjunct vitamins","FOLATE 50 mg q4-6h (shunts to CO2 + water)","PYRIDOXINE 50-100 mg + THIAMINE 100 mg (shunts to less-toxic metabolites)"],
    ["HD threshold (EXTRIP)","Coma, seizures, new vision deficits, pH ≤ 7.15, anion gap > 24, or methanol > 70 mg/dL on fomepizole (> 60 on ethanol, > 50 with no ADH blocker); suggested with impaired kidney function","Coma, seizures, or AKI; anion gap > 27 (suggested at 23–27); or EG > 310 mg/dL (50 mmol/L) or osmolal gap > 50 (recommended on ethanol, suggested on fomepizole)"]
  ]},
  {"title": "Type I vs Type II Statistical Errors", "section": "Biostats", "tagline": "The 2×2 table everyone confuses", "cols": ["Type I Error (α)","Type II Error (β)"], "rows": [
    ["What happened","Rejected H0 when actually TRUE","Failed to reject H0 when actually FALSE"],
    ["Plain English","Concluded difference exists when it doesn't","Missed a real difference"],
    ["Other name","False POSITIVE","False NEGATIVE"],
    ["Typical threshold","α = 0.05 (5%)","β = 0.10-0.20 (10-20%)"],
    ["Relationship to power","Independent","Power = 1 − β. Power usually 80-90%"],
    ["How to reduce","Lower α (e.g., 0.01), Bonferroni for multiple comparisons","Bigger sample size, larger effect size, less variability"],
    ["Mnemonic","Type 1 = One word: 'positive' (false positive)","Type 2 = Two words: 'false negative'"]
  ]},
  {"title": "Case-Control vs Cohort Study", "section": "Biostats", "tagline": "Direction of investigation determines which fits", "cols": ["Case-Control","Cohort"], "rows": [
    ["Starts with","Disease status (cases + controls)","Exposure status"],
    ["Direction","Looks BACKWARD at exposures","Looks FORWARD for outcomes"],
    ["Effect measure","Odds Ratio (OR)","Relative Risk (RR), Hazard Ratio (HR)"],
    ["Best for","RARE diseases, long latency, hypothesis generation, fast & cheap","RARE exposures, multiple outcomes from one exposure, establishing temporality"],
    ["Time","Retrospective usually","Pro- or retrospective"],
    ["Recall bias risk","HIGH (cases search memory more thoroughly)","Low if prospective"],
    ["Causality","Suggests association","Stronger inference; establishes temporality"],
    ["Example","Lung cancer cases vs controls → smoking history","Smokers vs nonsmokers → who develops lung cancer over time"]
  ]},
  {"title": "ITT vs Per-Protocol Analysis", "section": "Biostats", "tagline": "ITT preserves randomization. PP needed in noninferiority. Both for NI", "cols": ["Intention-to-Treat (ITT)","Per-Protocol (PP)"], "rows": [
    ["Who's analyzed","EVERYONE randomized, in their original group, regardless of what they did","Only adherent / completed protocol patients"],
    ["Preserves randomization?","YES","NO — selection bias re-enters"],
    ["Estimates","EFFECTIVENESS (real-world)","EFFICACY (true biological effect under ideal conditions)"],
    ["Preferred in","SUPERIORITY trials (preserves Type I error)","Co-primary in NONINFERIORITY trials"],
    ["Why both for NI","ITT alone biases TOWARD null (no difference) — in NI that means falsely concluding noninferiority","—"],
    ["Bias direction","Conservative; tends to dilute effects","Can OVER-estimate by excluding informative dropouts (who couldn't tolerate)"],
    ["Memory hook","ITT = Include Them ALL","PP = Pure Performers"]
  ]},
  {"title": "Sensitivity vs Specificity", "section": "Biostats", "tagline": "SnNOUT and SpPIN — memorize this in two seconds", "cols": ["Sensitivity (Sn)","Specificity (Sp)"], "rows": [
    ["Definition","TP / (TP + FN) — probability test is positive when disease present","TN / (TN + FP) — probability test is negative when disease absent"],
    ["Detects","Detects disease (true positives)","Detects absence (true negatives)"],
    ["Failure mode","Misses disease (false negatives)","Falsely flags disease (false positives)"],
    ["When test is negative","If HIGH Sn → rules OUT (SnNOUT)","—"],
    ["When test is positive","—","If HIGH Sp → rules IN (SpPIN)"],
    ["Use for screening","HIGH sensitivity test (don't miss disease)","—"],
    ["Use for confirmation","—","HIGH specificity test (don't falsely treat)"],
    ["Depends on prevalence?","NO (property of test)","NO (property of test)"]
  ]},
  {"title": "PPV/NPV vs Sensitivity/Specificity", "section": "Biostats", "tagline": "PPV/NPV are population-dependent — Sn/Sp are not", "cols": ["Sensitivity / Specificity","PPV / NPV"], "rows": [
    ["Property of","The TEST itself (intrinsic)","Test + POPULATION (prevalence-dependent)"],
    ["Question answered","Given the disease status, what's the probability of this test result?","Given the test result, what's the probability of disease?"],
    ["PPV formula","—","TP / (TP + FP) — true positives among all positives"],
    ["NPV formula","—","TN / (TN + FN) — true negatives among all negatives"],
    ["Effect of HIGH prevalence","Unchanged","PPV ↑, NPV ↓"],
    ["Effect of LOW prevalence","Unchanged","PPV ↓ (most positives are false), NPV ↑"],
    ["Clinical use","Compare tests intrinsically","Interpret your patient's actual test result"],
    ["Memory hook","'Test properties'","'Patient probabilities'"]
  ]},
  {"title": "Bacterial vs Viral vs Fungal Meningitis (CSF)", "section": "Pediatrics / ID", "tagline": "Classic CSF profile distinguishes — memorize the pattern", "cols": ["Bacterial","Viral","Fungal"], "source": "IDSA bacterial meningitis guideline (2004); IDSA cryptococcal disease guideline (2010)", "updated": "2026-11", "rows": [
    ["Opening pressure","Increased (> 250)","Normal or mildly increased","Increased (> 200)"],
    ["WBC count","> 500 (often > 1000)","< 500","50-750"],
    ["Predominant cell","NEUTROPHILS (> 80%)","LYMPHOCYTES (< 50% PMN)","LYMPHOCYTES (< 50% PMN)"],
    ["Glucose","LOW (< 40)","Normal (> 40)","LOW (< 40)"],
    ["CSF/serum glucose ratio","≤ 0.4","Normal (about 0.6)","Low (≤ 0.4)"],
    ["Protein","HIGH (> 100)","Mildly elevated (< 100)","50-200"],
    ["Gram stain","Often positive","Negative","Cryptococcal antigen (more sensitive than India ink)"]
  ]},
  {"title": "DKA vs HHS", "section": "Endocrine", "tagline": "Same hyperglycemia, very different pathophysiology and risk", "cols": ["DKA","HHS"], "source": "Umpierrez GE, et al. Hyperglycemic crises in adults with diabetes: consensus report. Diabetes Care 2024", "updated": "2026-11", "rows": [
    ["Population","T1DM > T2DM, younger","T2DM, elderly"],
    ["Glucose","≥ 200 mg/dL, or known diabetes (euglycemic DKA occurs)","≥ 600 mg/dL"],
    ["pH","< 7.3 and/or bicarbonate < 18","≥ 7.3"],
    ["Bicarb","< 18 (or pH < 7.3)","≥ 15"],
    ["Anion gap","Usually elevated, but no longer a diagnostic criterion (2024)","Variable (often normal)"],
    ["Ketones","β-OHB ≥ 3.0 mmol/L (or urine ketones ≥ 2+)","β-OHB < 3.0 mmol/L"],
    ["Osmolality","Variable","Effective osmolality > 300 (total > 320 mOsm/kg)"],
    ["Insulin","Absolute deficiency","Relative deficiency (enough to suppress ketogenesis)"],
    ["Mental status","May be AMS late","Often profoundly altered (osm-driven)"],
    ["Mortality","Lower (~1-2%)","Higher (~10-20%)"],
    ["Volume deficit","~6 L (5-8)","~9 L (8-12) — much greater"],
    ["Treatment focus","Fluids (balanced crystalloid suggested) + insulin 0.1 units/kg/h; hold insulin until K > 3.5; dextrose when glucose < 250; bicarbonate only if pH < 7.0","VOLUME first, then lower-dose insulin (0.05 units/kg/h)"]
  ]},
  {"title": "Acetaminophen Toxicity Phases", "section": "Toxicology", "tagline": "Recognize where the patient is in the timeline to treat appropriately", "cols": ["Phase 1 (0-24h)","Phase 2 (24-72h)","Phase 3 (72-96h)","Phase 4 (recovery)"], "source": "Dart RC, et al. Acetaminophen poisoning consensus statement, JAMA Netw Open 2023", "updated": "2026-11", "rows": [
    ["Symptoms","Mild (N/V/anorexia) — or nothing","RUQ pain emerges","Lactic acidosis, hepatic failure, renal failure, jaundice, hypoglycemia, coagulopathy","Resolution if survived phase 3"],
    ["AST/ALT","Normal","Rising","PEAK (often > 10,000)","Normalizing"],
    ["INR","Normal","Rising","Peak (> 6 = severe)","Normalizing"],
    ["Bilirubin","Normal","Rising","Peak","Normalizing"],
    ["Action","Level at 4 hr or later → nomogram (treat at or above the 150 line); start NAC first if the level won't be back by 8 hr. Consider AC for a potentially hepatotoxic dose (even beyond 4 hr if high-risk or extended-release)","Start NAC if not started. King's College criteria assessed","NAC + supportive + ICU. King's College criteria for transplant","Stop NAC only when APAP < 10 mcg/mL, INR < 2.0, ALT/AST normal or down 25–50% from peak, and clinically well"],
    ["King's College criteria","—","—","pH < 7.30 after fluid resuscitation, OR all three of INR > 6.5 + Cr > 3.4 + grade III/IV encephalopathy","—"]
  ]},
  {"title": "Body Packer vs Body Stuffer", "section": "Toxicology", "tagline": "Different stories, different management", "cols": ["Body Packer","Body Stuffer"], "updated": "2026-11", "rows": [
    ["Context","International drug trafficker, INTENTIONAL","Panicked swallow during arrest, IMPROVISED"],
    ["Packaging","Well-wrapped (latex, condoms, machine sealed)","Poorly wrapped (cellophane, baggie)"],
    ["Quantity","Large amount, multiple packets","Smaller amount, often single packet"],
    ["Presentation","ASYMPTOMATIC usually (intact wrap)","Often asymptomatic at first, but poorly wrapped packets can leak fast; observe for delayed toxicity"],
    ["Risk","Massive overdose if packet RUPTURES, bowel obstruction","Rapid absorption from leaky packet"],
    ["Management","WBI + observation. SURGERY if obstruction, rupture, or symptomatic","AC + supportive care. WBI sometimes"],
    ["Imaging","Multiple packets visible on KUB/CT","Often radiolucent (not visible)"]
  ]},
  {"title": "Pre-renal vs Intrinsic vs Post-renal AKI", "section": "Renal", "tagline": "FENa + urine osm + sediment classify the cause", "cols": ["Pre-renal","Intrinsic (ATN)","Post-renal"], "rows": [
    ["Cause","Hypovolemia, shock, CHF, hepatorenal, NSAIDs/ACEi/ARBs reducing GFR","Direct tubular damage: ATN, AIN, glomerulonephritis","Obstruction: BPH, stone, tumor"],
    ["BUN:Cr ratio","> 20:1","< 15:1","Variable"],
    ["FENa","< 1%","> 2%","Variable (often > 2% late)"],
    ["FEUrea","< 35%","> 50%","Variable"],
    ["Urine osm","> 500 (concentrated — kidney working)","< 350 (isosthenuric — kidney failing)","Variable"],
    ["Urine Na","< 20","> 40","Variable"],
    ["Urine sediment","Bland (occasional hyaline casts)","MUDDY BROWN CASTS (ATN), RBC casts (GN), WBC casts + eos (AIN)","Crystals, blood, infection"],
    ["Frequency","Most common AKI in hospital","Common in critically ill","Common with BPH, malignancy"],
    ["Treatment","Restore volume / perfusion","Supportive, remove offending agent, treat cause","Foley, decompress (stent, nephrostomy)"]
  ]},
  {"title": "Anaphylaxis 2023 Update: What Changed", "section": "Pulmonary", "tagline": "Old teaching is now wrong — the 2023 Joint Task Force shifted practice", "cols": ["OLD Teaching (pre-2023)","NEW (2023 Joint Task Force)"], "source": "Golden DBK, et al. Anaphylaxis: a 2023 practice parameter update. Ann Allergy Asthma Immunol 2024; neffy prescribing information (2024, 2025)", "updated": "2026-11", "rows": [
    ["Epinephrine IM","First-line, definitive","UNCHANGED — still ONLY life-saving treatment"],
    ["H1 + H2 antihistamines","Routine adjunct (Benadryl + famotidine)","NOT routine — symptom relief only; a second-generation agent (e.g., cetirizine) is preferred over diphenhydramine"],
    ["Corticosteroids","Routine to prevent biphasic","NOT recommended routinely — insufficient evidence"],
    ["Observation period","4-6 hours routine for all","1 hour OK if: full response to single epi dose, no asthma, reliable follow-up. Extended only for severe / asthmatic"],
    ["Discharge epi","Single auto-injector","More than one auto-injector if the patient ever needed multiple doses or had a biphasic reaction; otherwise shared decision. Teach every patient to use it"],
    ["New formulation","—","NEFFY epinephrine nasal spray: 2 mg (2024) for ≥ 30 kg; 1 mg (2025) for age ≥ 4 and 15 to < 30 kg"],
    ["BB on board + refractory","—","GLUCAGON 1-5 mg IV over 5 min — bypasses β blockade via cAMP"]
  ]},
  {"title": "TXA Indications by Scenario", "section": "Trauma / Heme", "tagline": "Dose + timing varies by bleeding source", "cols": ["Major Trauma (CRASH-2)","Postpartum Hemorrhage (WOMAN)","Massive Hemoptysis","Other"], "source": "CRASH-2 (Lancet 2010); WOMAN (Lancet 2017) and WHO 2017 PPH recommendation; Wand O, et al. Chest 2018 (inhaled TXA); HALT-IT (Lancet 2020)", "updated": "2026-11", "rows": [
    ["Setting","Suspected significant bleeding in trauma","PPH of any cause (WHO 2017)","> 500 mL/24h or > 100 mL/hr","GI bleed (negative HALT-IT), epistaxis, dental, surgical"],
    ["Dose","1 g IV over 10 min, then 1 g over 8 hr","1 g IV over 10 min, repeat × 1 if continues","1 g IV over 10 min, then 1 g over 8 hr; or nebulized 500 mg TID (the regimen studied)","1 g IV over 10 min for acute"],
    ["Time window","Within 3 HOURS of injury (after 3 h it increased bleeding deaths)","Within 3 HOURS of delivery","ASAP","ASAP"],
    ["Mortality benefit","Yes, CRASH-2: all-cause death 14.5% vs 16.0% (1.5% ARR); bleeding deaths 4.9% vs 5.7%","Yes, WOMAN: bleeding deaths 1.5% vs 1.9%, mainly when given within 3 h","No mortality data; small RCTs of inhaled TXA (500 mg TID) reduced bleeding","GI bleed: HALT-IT showed NO benefit + ↑ thromboembolism risk"],
    ["Contraindications / Cautions","Active intravascular thrombosis, allergy","Same","Same","Same — and AVOID in GI bleed per HALT-IT"]
  ]}
];
