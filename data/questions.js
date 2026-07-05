/* Seed MCQ bank for the BCEMP study tool.
 * Schema: { id, domain, difficulty(1-3), stem, options[], correctIndex, rationale, tags[], source? }
 * This is a study aid authored from common EM pharmacotherapy guidelines/references.
 * ALWAYS verify against primary literature, current guidelines, and institutional
 * protocols before applying to patient care. Expand this bank via Import.
 */
window.BCEMP_QUESTIONS = [
  /* ===================== CARDIOVASCULAR ===================== */
  {
    id: "cv-001", domain: "cv", difficulty: 2,
    stem: "A 62-year-old man presents with STEMI. He is going to primary PCI. He has no contraindications to anticoagulation. Which loading dose of aspirin is most appropriate?",
    options: ["81 mg", "162–325 mg chewed", "600 mg", "No aspirin until after PCI"],
    correctIndex: 1, tags: ["ACS","antiplatelet","aspirin"],
    rationale: "Non–enteric-coated aspirin 162–325 mg chewed provides rapid platelet inhibition and is recommended as soon as possible for suspected ACS. Chewing speeds absorption. 81 mg is the typical maintenance dose."
  },
  {
    id: "cv-002", domain: "cv", difficulty: 2,
    stem: "For a patient with new-onset stable, narrow-complex SVT that failed vagal maneuvers, which first-line pharmacologic agent is preferred?",
    options: ["Amiodarone 150 mg IV", "Adenosine 6 mg rapid IV push", "Metoprolol 5 mg IV", "Diltiazem 0.25 mg/kg IV"],
    correctIndex: 1, tags: ["SVT","adenosine","arrhythmia"],
    rationale: "Adenosine 6 mg rapid IV push (followed by 12 mg if needed) is first-line for stable regular narrow-complex SVT after vagal maneuvers fail. Give via a proximal vein with a rapid saline flush because of its ~10-second half-life."
  },
  {
    id: "cv-003", domain: "cv", difficulty: 2,
    stem: "A patient in cardiac arrest is in refractory VF after 3 shocks, epinephrine, and amiodarone 300 mg. What is the recommended second dose of amiodarone?",
    options: ["150 mg IV/IO", "300 mg IV/IO", "1 mg/kg IV/IO", "No further amiodarone"],
    correctIndex: 0, tags: ["ACLS","amiodarone","VF"],
    rationale: "In refractory VF/pVT, amiodarone is dosed 300 mg IV/IO first, then a second dose of 150 mg IV/IO. Lidocaine 1–1.5 mg/kg (then 0.5–0.75 mg/kg) is an acceptable alternative antiarrhythmic."
  },
  {
    id: "cv-004", domain: "cv", difficulty: 3,
    stem: "A patient with aortic dissection has a HR of 110 and BP 190/110. Per guidelines, which agent should be initiated FIRST to reach the HR goal before adding a vasodilator?",
    options: ["Nitroprusside", "Hydralazine", "Esmolol", "Nicardipine"],
    correctIndex: 2, tags: ["aortic dissection","beta-blocker","hypertensive emergency"],
    rationale: "Rate control with an IV beta-blocker (e.g., esmolol or labetalol) should precede vasodilators in aortic dissection to blunt reflex tachycardia and reduce aortic wall shear stress (dP/dt). Adding a pure vasodilator first can cause reflex tachycardia and worsen shear. Target HR <60."
  },
  {
    id: "cv-005", domain: "cv", difficulty: 2,
    stem: "Which is the preferred IV antihypertensive for a hypertensive emergency with acute sympathetic crisis suspected from cocaine toxicity?",
    options: ["Metoprolol", "Labetalol as monotherapy", "A benzodiazepine ± nicardipine/phentolamine", "Esmolol infusion"],
    correctIndex: 2, tags: ["cocaine","hypertensive emergency","unopposed alpha"],
    rationale: "In cocaine-associated hypertension/chest pain, benzodiazepines are first-line; if further BP control is needed, use nitroglycerin, phentolamine, or nicardipine. Non-selective beta-blockade is traditionally avoided due to concern for unopposed alpha stimulation."
  },
  {
    id: "cv-006", domain: "cv", difficulty: 2,
    stem: "A patient with acute decompensated heart failure and pulmonary edema (SBP 160) needs afterload/preload reduction. Which is the most appropriate initial IV vasodilator?",
    options: ["Nitroglycerin infusion", "Nesiritide", "Milrinone", "Dobutamine"],
    correctIndex: 0, tags: ["acute HF","nitroglycerin","vasodilator"],
    rationale: "IV nitroglycerin is a first-line vasodilator for hypertensive acute pulmonary edema, reducing preload (and afterload at higher doses). Inotropes (milrinone/dobutamine) are reserved for low-output/hypotensive states, not hypertensive flash edema."
  },
  {
    id: "cv-007", domain: "cv", difficulty: 3,
    stem: "A patient on maintenance sotalol develops torsades de pointes. In addition to stopping the offending drug and correcting K+, what is the first-line treatment?",
    options: ["Amiodarone 150 mg IV", "Magnesium sulfate 1–2 g IV", "Procainamide", "Immediate synchronized cardioversion"],
    correctIndex: 1, tags: ["torsades","magnesium","QT"],
    rationale: "IV magnesium sulfate 1–2 g is first-line for torsades de pointes (even with normal Mg). Correct K+ (goal high-normal), stop QT-prolonging drugs, and consider overdrive pacing/isoproterenol for bradycardia-dependent TdP. Class III antiarrhythmics like amiodarone can worsen QT."
  },

  /* ===================== RESUSCITATION & SHOCK ===================== */
  {
    id: "resus-001", domain: "resus", difficulty: 2,
    stem: "Per Surviving Sepsis guidelines, which vasopressor is first-line for septic shock refractory to fluids?",
    options: ["Dopamine", "Norepinephrine", "Phenylephrine", "Vasopressin"],
    correctIndex: 1, tags: ["sepsis","norepinephrine","vasopressor"],
    rationale: "Norepinephrine is the first-line vasopressor in septic shock. Vasopressin (fixed 0.03 units/min) is added to raise MAP or reduce norepinephrine dose. Dopamine is reserved for select bradycardic patients due to arrhythmia risk."
  },
  {
    id: "resus-002", domain: "resus", difficulty: 2,
    stem: "For RSI of a hemodynamically unstable patient in septic shock, which induction agent is most likely to preserve blood pressure?",
    options: ["Propofol", "Ketamine", "Midazolam 0.3 mg/kg", "Thiopental"],
    correctIndex: 1, tags: ["RSI","ketamine","induction"],
    rationale: "Ketamine (1–2 mg/kg IV) is hemodynamically favorable and is preferred for RSI in shock. Propofol commonly causes hypotension. Etomidate is also hemodynamically neutral but carries adrenal-suppression concerns in sepsis."
  },
  {
    id: "resus-003", domain: "resus", difficulty: 2,
    stem: "A 90 kg patient requires paralysis for RSI and you want the fastest onset with the shortest duration, assuming no contraindications. Which agent and dose?",
    options: ["Rocuronium 1.2 mg/kg", "Succinylcholine 1.5 mg/kg", "Vecuronium 0.1 mg/kg", "Cisatracurium 0.15 mg/kg"],
    correctIndex: 1, tags: ["RSI","paralytic","succinylcholine"],
    rationale: "Succinylcholine 1.5 mg/kg has rapid onset (~45 s) and short duration (~6–10 min). Contraindications include hyperkalemia, several-day-old burns/denervation injury, and history of malignant hyperthermia—use rocuronium 1.2 mg/kg in those cases."
  },
  {
    id: "resus-004", domain: "resus", difficulty: 3,
    stem: "Which statement about push-dose phenylephrine for transient peri-intubation hypotension is MOST accurate?",
    options: ["Typical bolus is 50–200 mcg with onset in ~1 min", "It is preferred over norepinephrine for septic shock", "It reliably increases heart rate", "Standard bolus is 1 mg"],
    correctIndex: 0, tags: ["push-dose pressor","phenylephrine"],
    rationale: "Push-dose phenylephrine is given in ~50–200 mcg boluses with onset within about a minute; it is a pure alpha-agonist bridge for transient hypotension, not definitive therapy. Because it raises afterload without beta activity, it can cause reflex bradycardia. (Push-dose epinephrine, by contrast, is ~5–20 mcg.)"
  },
  {
    id: "resus-005", domain: "resus", difficulty: 2,
    stem: "In the 2020+ ACLS adult cardiac arrest algorithm, what is the recommended epinephrine dose and interval?",
    options: ["1 mg IV/IO every 3–5 minutes", "1 mg IV/IO every 1 minute", "0.5 mg IV/IO every 5 minutes", "High-dose 0.1 mg/kg every 3–5 minutes"],
    correctIndex: 0, tags: ["ACLS","epinephrine"],
    rationale: "Standard-dose epinephrine 1 mg IV/IO every 3–5 minutes is recommended. For nonshockable rhythms, give epinephrine as soon as feasible. High-dose epinephrine is not recommended."
  },
  {
    id: "resus-006", domain: "resus", difficulty: 3,
    stem: "A septic shock patient remains hypotensive on norepinephrine 0.5 mcg/kg/min and vasopressin 0.03 units/min. Guidelines suggest adding which agent, and considering which adjunct?",
    options: ["Add epinephrine; consider IV hydrocortisone", "Add phenylephrine; consider bicarbonate", "Add dopamine; consider albumin bolus", "Add dobutamine; consider calcium"],
    correctIndex: 0, tags: ["sepsis","steroids","catecholamine-refractory"],
    rationale: "For norepinephrine + vasopressin–refractory septic shock, epinephrine is a reasonable third agent, and IV hydrocortisone (e.g., 200 mg/day) is suggested for patients with ongoing vasopressor requirements."
  },

  /* ===================== TOXICOLOGY ===================== */
  {
    id: "tox-001", domain: "tox", difficulty: 1,
    stem: "Which is the antidote for acetaminophen (paracetamol) toxicity?",
    options: ["N-acetylcysteine", "Fomepizole", "Flumazenil", "Naloxone"],
    correctIndex: 0, tags: ["acetaminophen","NAC","antidote"],
    rationale: "N-acetylcysteine replenishes glutathione and detoxifies NAPQI. It is most effective within 8 hours of ingestion; use the Rumack-Matthew nomogram for single acute ingestions with a known time."
  },
  {
    id: "tox-002", domain: "tox", difficulty: 2,
    stem: "A patient with a suspected toxic alcohol ingestion (methanol) has an elevated osmolar and anion gap. Besides supportive care, what is the preferred antidote?",
    options: ["Ethanol infusion", "Fomepizole", "Sodium bicarbonate only", "Thiamine"],
    correctIndex: 1, tags: ["methanol","fomepizole","toxic alcohol"],
    rationale: "Fomepizole inhibits alcohol dehydrogenase, preventing formation of toxic metabolites (formic acid in methanol, glycolic/oxalic acid in ethylene glycol). It is preferred over ethanol due to easier dosing and fewer adverse effects. Hemodialysis may still be required."
  },
  {
    id: "tox-003", domain: "tox", difficulty: 2,
    stem: "A patient overdoses on a tricyclic antidepressant and has a QRS of 130 ms with hypotension. What is the first-line therapy?",
    options: ["Sodium bicarbonate bolus", "Amiodarone", "Physostigmine", "Calcium gluconate"],
    correctIndex: 0, tags: ["TCA","sodium bicarbonate","sodium channel"],
    rationale: "Sodium bicarbonate (1–2 mEq/kg boluses) is first-line for TCA cardiotoxicity with QRS widening (>100 ms), overcoming sodium-channel blockade and providing serum alkalinization. Avoid class Ia/Ic/III antiarrhythmics. Physostigmine is contraindicated in TCA overdose."
  },
  {
    id: "tox-004", domain: "tox", difficulty: 2,
    stem: "A farmer presents with miosis, salivation, lacrimation, bronchorrhea, and bradycardia after pesticide exposure. Which is the primary antidote to counter muscarinic effects?",
    options: ["Pralidoxime alone", "Atropine titrated to dry secretions", "Naloxone", "Glycopyrrolate 1 mg once"],
    correctIndex: 1, tags: ["organophosphate","atropine","cholinergic"],
    rationale: "In cholinergic (organophosphate) toxicity, atropine is titrated (often large, escalating doses) to the endpoint of dried pulmonary secretions. Pralidoxime (2-PAM) is added to reactivate acetylcholinesterase and address nicotinic/muscle effects but does not replace atropine."
  },
  {
    id: "tox-005", domain: "tox", difficulty: 3,
    stem: "A patient with a calcium-channel blocker overdose remains hypotensive and bradycardic despite calcium, glucagon, and vasopressors. Which therapy specifically improves myocardial glucose uptake and inotropy?",
    options: ["High-dose insulin euglycemia therapy (HIET)", "Sodium bicarbonate", "Digoxin immune Fab", "Hydroxocobalamin"],
    correctIndex: 0, tags: ["CCB overdose","HIET","insulin"],
    rationale: "High-dose insulin euglycemia therapy (e.g., regular insulin 1 unit/kg bolus then 0.5–1 unit/kg/hr, titrated, with dextrose and K+ monitoring) improves cardiac contractility and metabolism in CCB (and beta-blocker) toxicity. Monitor glucose and potassium closely."
  },
  {
    id: "tox-006", domain: "tox", difficulty: 2,
    stem: "A patient rescued from a house fire has soot in the airway, altered mental status, and lactate of 12 mmol/L. Which antidote targets suspected cyanide toxicity?",
    options: ["Hydroxocobalamin", "Methylene blue", "Deferoxamine", "Dimercaprol"],
    correctIndex: 0, tags: ["cyanide","hydroxocobalamin","smoke inhalation"],
    rationale: "Hydroxocobalamin (5 g IV) binds cyanide to form cyanocobalamin, which is renally excreted, and is preferred in smoke-inhalation victims because it does not induce methemoglobinemia. A markedly elevated lactate (≥8–10) supports cyanide toxicity."
  },
  {
    id: "tox-007", domain: "tox", difficulty: 2,
    stem: "Which opioid-overdose statement about naloxone is most accurate for a patient with respiratory depression who is opioid-dependent?",
    options: ["Start with the smallest effective dose (e.g., 0.04–0.4 mg) and titrate", "Always give 2 mg IV push immediately", "Naloxone has a longer duration than most opioids", "Naloxone reverses benzodiazepine sedation"],
    correctIndex: 0, tags: ["naloxone","opioid","overdose"],
    rationale: "In opioid-dependent patients, titrate naloxone from low doses to restore adequate ventilation without precipitating severe withdrawal. Because naloxone's duration (~30–90 min) is often shorter than the offending opioid, re-sedation can occur and repeat dosing or an infusion may be needed."
  },

  /* ===================== NEUROLOGY ===================== */
  {
    id: "neuro-001", domain: "neuro", difficulty: 2,
    stem: "For acute ischemic stroke within 3 hours of onset in an eligible patient, what is the alteplase dose?",
    options: ["0.9 mg/kg (max 90 mg), 10% bolus then remainder over 60 min", "0.6 mg/kg (max 60 mg)", "0.25 mg/kg single bolus", "100 mg over 2 hours"],
    correctIndex: 0, tags: ["stroke","alteplase","thrombolysis"],
    rationale: "IV alteplase for acute ischemic stroke is 0.9 mg/kg (maximum 90 mg): 10% as an initial bolus over 1 minute, then the remaining 90% infused over 60 minutes. Tenecteplase 0.25 mg/kg is an increasingly used single-bolus alternative."
  },
  {
    id: "neuro-002", domain: "neuro", difficulty: 2,
    stem: "Prior to giving alteplase for acute ischemic stroke, what is the blood pressure threshold that must be achieved?",
    options: ["<220/120 mmHg", "<185/110 mmHg", "<160/90 mmHg", "<140/90 mmHg"],
    correctIndex: 1, tags: ["stroke","blood pressure","alteplase"],
    rationale: "BP must be lowered to <185/110 mmHg before IV thrombolysis and maintained <180/105 mmHg for 24 hours afterward. Labetalol or nicardipine infusions are commonly used. Without thrombolysis, permissive hypertension up to <220/120 is generally tolerated."
  },
  {
    id: "neuro-003", domain: "neuro", difficulty: 2,
    stem: "A patient in generalized convulsive status epilepticus has an IV. What is the first-line benzodiazepine and appropriate initial dose?",
    options: ["Lorazepam 0.1 mg/kg IV (max ~4 mg/dose)", "Diazepam 20 mg IV once", "Levetiracetam 60 mg/kg IV", "Phenytoin 20 mg/kg IV"],
    correctIndex: 0, tags: ["status epilepticus","lorazepam","benzodiazepine"],
    rationale: "First-line for status epilepticus is a benzodiazepine: IV lorazepam 0.1 mg/kg (up to ~4 mg/dose, may repeat), IV diazepam 0.15–0.2 mg/kg, or IM midazolam 10 mg if no IV. Levetiracetam, fosphenytoin, or valproate are second-line (after benzodiazepines)."
  },
  {
    id: "neuro-004", domain: "neuro", difficulty: 3,
    stem: "A patient on warfarin (INR 3.5) presents with a large intracerebral hemorrhage. What is the preferred reversal strategy?",
    options: ["Vitamin K 10 mg IV alone", "4-factor PCC plus IV vitamin K", "FFP 2 units only", "Idarucizumab"],
    correctIndex: 1, tags: ["ICH","warfarin reversal","PCC"],
    rationale: "For warfarin-associated major/intracranial hemorrhage, 4-factor PCC is preferred over FFP (faster correction, lower volume) and MUST be combined with IV vitamin K 10 mg to sustain reversal, since PCC factors are short-lived. Idarucizumab reverses dabigatran, not warfarin."
  },

  /* ===================== INFECTIOUS DISEASE ===================== */
  {
    id: "id-001", domain: "id", difficulty: 2,
    stem: "An adult with suspected community-acquired bacterial meningitis should receive empiric antibiotics. Which regimen is most appropriate before culture data?",
    options: ["Ceftriaxone + vancomycin (+ dexamethasone)", "Ceftriaxone alone", "Vancomycin alone", "Meropenem + azithromycin"],
    correctIndex: 0, tags: ["meningitis","empiric antibiotics","dexamethasone"],
    rationale: "Empiric therapy for adult bacterial meningitis is vancomycin + a third-generation cephalosporin (ceftriaxone/cefotaxime). Add ampicillin if Listeria is a concern (>50 yrs, immunocompromised, pregnant). Adjunctive dexamethasone (given before/with first dose) reduces morbidity in pneumococcal meningitis."
  },
  {
    id: "id-002", domain: "id", difficulty: 2,
    stem: "Per Surviving Sepsis, once septic shock is recognized, empiric broad-spectrum antibiotics should be administered within what timeframe?",
    options: ["Within 1 hour", "Within 3 hours", "Within 6 hours", "After blood cultures result"],
    correctIndex: 0, tags: ["sepsis","antibiotic timing"],
    rationale: "For septic shock (and probable sepsis), guidelines recommend administering antimicrobials immediately, ideally within 1 hour of recognition. Obtain blood cultures before antibiotics only if doing so does not substantially delay therapy."
  },
  {
    id: "id-003", domain: "id", difficulty: 3,
    stem: "A patient with necrotizing soft tissue infection is started on broad-spectrum antibiotics. Which agent is added specifically to suppress toxin production in streptococcal/staphylococcal necrotizing infections?",
    options: ["Clindamycin", "Metronidazole", "Gentamicin", "Daptomycin"],
    correctIndex: 0, tags: ["necrotizing fasciitis","clindamycin","toxin"],
    rationale: "Clindamycin is added for its ribosomal (protein-synthesis) inhibition, which suppresses exotoxin production in group A Streptococcus and toxin-producing S. aureus ('Eagle effect'). Empiric coverage also includes broad gram-negative/anaerobic and MRSA agents plus surgical debridement."
  },
  {
    id: "id-004", domain: "id", difficulty: 2,
    stem: "Which empiric regimen best covers Pseudomonas for a neutropenic febrile patient?",
    options: ["Cefepime (or piperacillin-tazobactam or meropenem)", "Ceftriaxone", "Ertapenem", "Ampicillin-sulbactam"],
    correctIndex: 0, tags: ["febrile neutropenia","pseudomonas","cefepime"],
    rationale: "Empiric monotherapy for febrile neutropenia uses an antipseudomonal beta-lactam: cefepime, piperacillin-tazobactam, or a carbapenem (meropenem/imipenem). Ertapenem and ceftriaxone lack reliable Pseudomonas coverage. Add vancomycin only for specific indications (e.g., catheter infection, MRSA risk)."
  },

  /* ===================== TRAUMA & HEMOSTASIS ===================== */
  {
    id: "trauma-001", domain: "trauma", difficulty: 2,
    stem: "Per CRASH-2, tranexamic acid (TXA) in trauma reduces mortality when given within what window from injury?",
    options: ["Within 3 hours", "Within 8 hours", "Within 12 hours", "Any time in the first 24 hours"],
    correctIndex: 0, tags: ["TXA","trauma","hemorrhage"],
    rationale: "TXA improves survival in bleeding trauma patients when started within 3 hours of injury; administration after 3 hours may increase bleeding-related mortality. Typical dosing: 1 g IV over 10 min, then 1 g over 8 hours."
  },
  {
    id: "trauma-002", domain: "trauma", difficulty: 3,
    stem: "A patient on apixaban presents with life-threatening GI hemorrhage. Which specific reversal agent is FDA-approved for apixaban/rivaroxaban?",
    options: ["Idarucizumab", "Andexanet alfa", "Protamine", "Vitamin K"],
    correctIndex: 1, tags: ["DOAC reversal","andexanet","factor Xa inhibitor"],
    rationale: "Andexanet alfa is the specific reversal agent for apixaban and rivaroxaban (factor Xa inhibitors). Idarucizumab reverses dabigatran. Where andexanet is unavailable/cost-prohibitive, 4-factor PCC is a common off-label alternative."
  },
  {
    id: "trauma-003", domain: "trauma", difficulty: 2,
    stem: "During massive transfusion for hemorrhagic shock, which electrolyte derangement is most associated with citrate from stored blood and warrants monitoring/repletion?",
    options: ["Hypercalcemia", "Ionized hypocalcemia", "Hypernatremia", "Hypophosphatemia"],
    correctIndex: 1, tags: ["massive transfusion","hypocalcemia","citrate"],
    rationale: "Citrate in stored blood chelates calcium, causing ionized hypocalcemia during massive transfusion, which impairs coagulation and cardiac function. Monitor ionized calcium and replete with calcium chloride/gluconate."
  },

  /* ===================== RESPIRATORY & ANAPHYLAXIS ===================== */
  {
    id: "resp-001", domain: "resp", difficulty: 1,
    stem: "A patient with anaphylaxis has hypotension and airway swelling. What is the first-line drug, route, and initial adult dose?",
    options: ["Epinephrine 0.3–0.5 mg IM (1 mg/mL) into the anterolateral thigh", "Epinephrine 1 mg IV push", "Diphenhydramine 50 mg IV", "Methylprednisolone 125 mg IV"],
    correctIndex: 0, tags: ["anaphylaxis","epinephrine","IM"],
    rationale: "Intramuscular epinephrine (0.3–0.5 mg of the 1 mg/mL concentration) into the anterolateral thigh is first-line and may repeat every 5–15 minutes. Antihistamines and steroids are adjuncts only and never replace epinephrine. IV epinephrine (infusion) is reserved for refractory shock with monitoring."
  },
  {
    id: "resp-002", domain: "resp", difficulty: 2,
    stem: "For a severe asthma exacerbation not responding to continuous albuterol and ipratropium plus systemic steroids, which IV agent is recommended by guidelines as adjunct bronchodilation?",
    options: ["Magnesium sulfate 2 g IV over 20 min", "Aminophylline infusion", "IV montelukast", "Racemic epinephrine nebulizer"],
    correctIndex: 0, tags: ["asthma","magnesium","bronchodilator"],
    rationale: "IV magnesium sulfate (2 g over 20 minutes) is recommended for severe/life-threatening asthma exacerbations refractory to initial therapy. Aminophylline is not recommended due to its adverse-effect profile without clear benefit."
  },
  {
    id: "resp-003", domain: "resp", difficulty: 2,
    stem: "A patient on a nonselective beta-blocker has anaphylaxis refractory to repeated IM epinephrine. Which adjunct is specifically recommended?",
    options: ["Glucagon", "Calcium chloride", "High-dose diphenhydramine", "Vasopressin bolus"],
    correctIndex: 0, tags: ["anaphylaxis","glucagon","beta-blocker"],
    rationale: "Glucagon (1–5 mg IV) bypasses the beta-receptor to increase cAMP and is recommended for anaphylaxis refractory to epinephrine in patients taking beta-blockers. Protect the airway due to glucagon-induced emesis."
  },

  /* ===================== ANALGESIA & SEDATION ===================== */
  {
    id: "pain-001", domain: "pain", difficulty: 2,
    stem: "Which agent provides dissociative sedation with analgesia and preserved airway reflexes, making it useful for procedural sedation?",
    options: ["Ketamine", "Propofol", "Etomidate", "Fentanyl"],
    correctIndex: 0, tags: ["procedural sedation","ketamine","analgesia"],
    rationale: "Ketamine produces dissociative sedation with analgesia and generally maintains respiratory drive and airway reflexes, making it valuable for procedural sedation (e.g., 1 mg/kg IV). Propofol and etomidate lack analgesia; fentanyl alone provides analgesia without dissociation."
  },
  {
    id: "pain-002", domain: "pain", difficulty: 2,
    stem: "A subdissociative ('analgesic-dose') ketamine strategy for acute pain in the ED typically uses which dose range?",
    options: ["0.1–0.3 mg/kg IV", "1–2 mg/kg IV", "3–5 mg/kg IM", "0.01 mg/kg IV"],
    correctIndex: 0, tags: ["ketamine","analgesia","subdissociative"],
    rationale: "Low-dose/subdissociative ketamine for analgesia is ~0.1–0.3 mg/kg IV (often infused over 10–15 minutes to reduce psychoperceptual effects). Dissociative sedation doses are ~1–2 mg/kg IV."
  },
  {
    id: "pain-003", domain: "pain", difficulty: 1,
    stem: "Which opioid is generally preferred in a patient with significant renal impairment because it lacks clinically significant active metabolites?",
    options: ["Morphine", "Hydromorphone", "Fentanyl", "Codeine"],
    correctIndex: 2, tags: ["opioid","renal","fentanyl"],
    rationale: "Fentanyl lacks active/renally-cleared metabolites and is preferred in renal impairment. Morphine accumulates morphine-6-glucuronide (active), and codeine relies on variable CYP2D6 conversion; both are problematic in renal dysfunction."
  },

  /* ===================== ENDOCRINE & METABOLIC ===================== */
  {
    id: "endo-001", domain: "endo", difficulty: 2,
    stem: "In DKA management, when should potassium be repleted BEFORE starting the insulin infusion?",
    options: ["When serum K+ is <3.3 mEq/L", "When serum K+ is >5.3 mEq/L", "Never—always start insulin first", "Only if the patient is symptomatic"],
    correctIndex: 0, tags: ["DKA","potassium","insulin"],
    rationale: "If serum K+ <3.3 mEq/L, hold insulin and replete potassium first, because insulin drives K+ intracellularly and can precipitate life-threatening hypokalemia/arrhythmias. If K+ 3.3–5.3, give insulin and add K+ to fluids; if K+ >5.3, start insulin and monitor."
  },
  {
    id: "endo-002", domain: "endo", difficulty: 2,
    stem: "A patient with hyperkalemia (K+ 7.2) has peaked T waves on ECG. What is the FIRST agent to administer to stabilize the myocardium?",
    options: ["IV calcium gluconate or chloride", "Regular insulin with dextrose", "Sodium polystyrene sulfonate", "Albuterol nebulizer"],
    correctIndex: 0, tags: ["hyperkalemia","calcium","membrane stabilization"],
    rationale: "IV calcium (gluconate or chloride) is given first to stabilize the cardiac membrane when ECG changes are present; it does not lower K+. Then shift K+ intracellularly (insulin/dextrose, beta-agonist, bicarbonate if acidotic) and remove it (diuresis, GI binders, dialysis)."
  },
  {
    id: "endo-003", domain: "endo", difficulty: 3,
    stem: "A patient in myxedema coma requires thyroid hormone replacement. What critical therapy must be given before or with thyroid hormone to avoid precipitating adrenal crisis?",
    options: ["IV hydrocortisone (stress-dose steroids)", "IV insulin", "Oral levothyroxine only", "Beta-blocker"],
    correctIndex: 0, tags: ["myxedema","hydrocortisone","adrenal"],
    rationale: "Empiric stress-dose hydrocortisone should be given because coexisting adrenal insufficiency is common, and thyroid hormone increases cortisol metabolism—giving thyroid hormone alone could precipitate adrenal crisis. IV levothyroxine (± liothyronine) plus supportive care is standard."
  },

  /* ===================== ENVIRONMENTAL ===================== */
  {
    id: "env-001", domain: "env", difficulty: 3,
    stem: "A patient with severe serotonin syndrome has hyperthermia and rigidity refractory to benzodiazepines and cooling. Which specific antidote may be considered?",
    options: ["Cyproheptadine", "Dantrolene", "Bromocriptine", "Physostigmine"],
    correctIndex: 0, tags: ["serotonin syndrome","cyproheptadine"],
    rationale: "Cyproheptadine, a 5-HT2A antagonist, is the pharmacologic antidote considered for moderate–severe serotonin syndrome after supportive care and benzodiazepines. Dantrolene and bromocriptine are used for neuroleptic malignant syndrome, not serotonin syndrome."
  },
  {
    id: "env-002", domain: "env", difficulty: 2,
    stem: "Which agent is the definitive treatment for malignant hyperthermia triggered by inhaled anesthetics or succinylcholine?",
    options: ["Dantrolene", "Acetaminophen", "Bromocriptine", "Ice packs alone"],
    correctIndex: 0, tags: ["malignant hyperthermia","dantrolene"],
    rationale: "Dantrolene (2.5 mg/kg IV, repeated as needed) is the specific treatment for malignant hyperthermia; it inhibits ryanodine-receptor–mediated calcium release. Stop the trigger, provide aggressive cooling, and correct hyperkalemia/acidosis."
  },

  /* ===================== SPECIAL POPULATIONS ===================== */
  {
    id: "special-001", domain: "special", difficulty: 2,
    stem: "A pregnant patient at 30 weeks presents in status epilepticus due to eclampsia. Which agent is first-line for seizure control/prophylaxis?",
    options: ["Magnesium sulfate", "Lorazepam", "Levetiracetam", "Phenytoin"],
    correctIndex: 0, tags: ["eclampsia","magnesium","pregnancy"],
    rationale: "Magnesium sulfate (e.g., 4–6 g IV load, then 1–2 g/hr) is first-line for eclamptic seizures and prevention, superior to standard antiepileptics in this setting. Monitor for magnesium toxicity (loss of reflexes, respiratory depression); antidote is IV calcium."
  },
  {
    id: "special-002", domain: "special", difficulty: 2,
    stem: "For pediatric anaphylaxis, what is the recommended IM epinephrine dose?",
    options: ["0.01 mg/kg (max 0.3–0.5 mg) of 1 mg/mL", "0.1 mg/kg IV", "0.5 mg/kg IM", "1 mg IM regardless of weight"],
    correctIndex: 0, tags: ["pediatrics","anaphylaxis","epinephrine"],
    rationale: "Pediatric IM epinephrine is 0.01 mg/kg of the 1 mg/mL concentration (maximum 0.3 mg for prepubertal, up to 0.5 mg), into the anterolateral thigh, repeatable every 5–15 minutes."
  },
  {
    id: "special-003", domain: "special", difficulty: 3,
    stem: "Which analgesic/sedative consideration is MOST important when dosing in a patient with severe hepatic dysfunction?",
    options: ["Reduce/avoid drugs with high hepatic metabolism and prolonged sedation risk (e.g., diazepam, midazolam accumulation)", "Hepatic dysfunction has no effect on benzodiazepine dosing", "Fentanyl is contraindicated in liver disease", "Acetaminophen is always safe at full dose"],
    correctIndex: 0, tags: ["hepatic","benzodiazepine","dosing"],
    rationale: "In severe liver disease, hepatically metabolized sedatives accumulate; lorazepam/oxazepam (glucuronidated) are often preferred over diazepam/midazolam. Acetaminophen dosing should be reduced (e.g., ≤2 g/day) in significant hepatic impairment."
  },

  /* ===================== MEDICATION & PATIENT SAFETY ===================== */
  {
    id: "safety-001", domain: "safety", difficulty: 1,
    stem: "According to ISMP, which of the following is classified as a 'high-alert medication' warranting extra safeguards in the ED?",
    options: ["IV insulin", "Oral acetaminophen", "Normal saline maintenance fluid", "Oral multivitamin"],
    correctIndex: 0, tags: ["high-alert","ISMP","safety"],
    rationale: "IV insulin, heparin/anticoagulants, opioids, and concentrated electrolytes (e.g., KCl) are ISMP high-alert medications—those with heightened risk of significant patient harm when used in error—requiring safeguards such as independent double-checks and standardized concentrations."
  },
  {
    id: "safety-002", domain: "safety", difficulty: 2,
    stem: "Which strategy is the most effective error-prevention safeguard for high-alert continuous infusions like heparin or insulin in the ED?",
    options: ["Standardized concentrations with smart-pump dose-error reduction software", "Verbal orders for all infusions", "Allowing each nurse to choose a concentration", "Removing pump alerts to reduce alarm fatigue"],
    correctIndex: 0, tags: ["smart pump","standardization","safety"],
    rationale: "Standardized concentrations paired with smart-pump libraries (dose-error reduction software / guardrails) are among the most effective safeguards, reducing variability and catching programming errors. Independent double-checks add another layer for the highest-risk agents."
  },
  {
    id: "safety-003", domain: "safety", difficulty: 2,
    stem: "A look-alike/sound-alike (LASA) mix-up between which pair is a classic ED medication-safety concern?",
    options: ["Hydromorphone vs. morphine", "Sodium chloride vs. dextrose", "Aspirin vs. acetaminophen", "Lisinopril vs. metoprolol"],
    correctIndex: 0, tags: ["LASA","opioid","safety"],
    rationale: "Hydromorphone and morphine are a well-known LASA/high-alert pair; confusing them (and their very different potencies) can cause serious opioid overdose. Tall-man lettering, separation, and independent checks help mitigate LASA errors."
  },

  /* ===================== PRACTICE MANAGEMENT & RESEARCH ===================== */
  {
    id: "pmr-001", domain: "pmr", difficulty: 2,
    stem: "A trial reports a number needed to treat (NNT) of 25 for a therapy. What does this indicate?",
    options: ["25 patients must be treated to prevent one additional bad outcome", "25% relative risk reduction", "The therapy harms 1 in 25 patients", "The p-value is 0.25"],
    correctIndex: 0, tags: ["evidence","NNT","statistics"],
    rationale: "NNT = 1 / absolute risk reduction; an NNT of 25 means treating 25 patients prevents one additional adverse outcome. Lower NNTs indicate greater treatment effect. NNT is not a measure of relative risk or of harm (that's NNH)."
  },
  {
    id: "pmr-002", domain: "pmr", difficulty: 2,
    stem: "Which role best exemplifies the emergency medicine pharmacist's value during a resuscitation/code?",
    options: ["Real-time dosing, preparation, and verification of emergency medications at bedside", "Retrospective chart review only", "Managing the hospital formulary during the code", "Performing chest compressions exclusively"],
    correctIndex: 0, tags: ["EM pharmacist","role","resuscitation"],
    rationale: "Bedside EM pharmacists improve safety and timeliness by providing real-time medication dosing, preparation, verification, and guideline expertise during resuscitations, RSI, and time-critical therapies (e.g., thrombolytics, antidotes)."
  }
];
