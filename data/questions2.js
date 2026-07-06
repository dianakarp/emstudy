/* questions2.js - additional scored MCQs authored from the strongest flashcards
 * and comparison cards. Board-style: plausible near-miss distractors ("sneaky by
 * a digit"), correct answer distributed across all positions. Appends to the bank.
 * Study aid only; verify dosing against current guidelines and institutional protocols.
 */
window.BCEMP_QUESTIONS = (window.BCEMP_QUESTIONS || []).concat([

  /* ---- RESUSCITATION & SHOCK ---- */
  { id: "xq-001", domain: "resus", difficulty: 2,
    stem: "A 70 kg patient needs rapid-sequence intubation and you choose succinylcholine. What is the correct dose?",
    options: ["0.15 mg/kg", "0.5 mg/kg", "1.5 mg/kg", "15 mg/kg"], correctIndex: 2,
    tags: ["RSI", "succinylcholine"],
    rationale: "Succinylcholine for RSI is 1.5 mg/kg IV. 0.15 mg/kg is a 10-fold underdose, 0.5 mg/kg is sub-paralytic for RSI, and 15 mg/kg is a 10-fold overdose. Watch decimal shifts on the exam." },

  { id: "xq-002", domain: "resus", difficulty: 2,
    stem: "Succinylcholine is contraindicated, so you use rocuronium for RSI. Which dose gives the fastest onset?",
    options: ["0.6 mg/kg", "0.12 mg/kg", "12 mg/kg", "1.2 mg/kg"], correctIndex: 3,
    tags: ["RSI", "rocuronium"],
    rationale: "Rocuronium for RSI is 1.2 mg/kg (rapid onset ~60 s). 0.6 mg/kg is the standard intubating dose with slower onset; 0.12 and 12 mg/kg are decimal traps." },

  { id: "xq-003", domain: "resus", difficulty: 1,
    stem: "A patient in septic shock remains hypotensive after adequate fluid resuscitation. What is the first-line vasopressor?",
    options: ["Dopamine", "Norepinephrine", "Phenylephrine", "Vasopressin"], correctIndex: 1,
    tags: ["sepsis", "vasopressor"],
    rationale: "Norepinephrine is first-line in septic shock. Vasopressin (fixed 0.03 units/min) is added second; dopamine is reserved for select bradycardic patients (arrhythmia risk); phenylephrine is generally a niche agent here." },

  /* ---- RESPIRATORY & ANAPHYLAXIS ---- */
  { id: "xq-004", domain: "resp", difficulty: 2,
    stem: "An adult in anaphylaxis needs epinephrine. Which order is correct and safe?",
    options: ["0.3-0.5 mg IV of the 0.1 mg/mL (1:10,000) concentration", "3-5 mg IM of the 1 mg/mL concentration", "0.3-0.5 mg IM of the 1 mg/mL (1:1,000) concentration into the anterolateral thigh", "0.03-0.05 mg IM of the 1 mg/mL concentration"], correctIndex: 2,
    tags: ["anaphylaxis", "epinephrine"],
    rationale: "First-line is 0.3-0.5 mg IM of the 1 mg/mL (1:1,000) concentration in the thigh. The 0.1 mg/mL (1:10,000) product is the CARDIAC ARREST concentration; giving 0.3-0.5 mg of it IV push can be lethal. The other options are 10-fold errors." },

  { id: "xq-005", domain: "resp", difficulty: 2,
    stem: "A severe asthma exacerbation is refractory to continuous albuterol/ipratropium and systemic steroids. Which IV adjunct is guideline-recommended?",
    options: ["Magnesium sulfate 0.2 g IV over 20 min", "Magnesium sulfate 2 g IV over 20 min", "Magnesium sulfate 20 g IV over 20 min", "Aminophylline 2 g IV over 20 min"], correctIndex: 1,
    tags: ["asthma", "magnesium"],
    rationale: "IV magnesium sulfate 2 g over 20 minutes is recommended for severe/refractory asthma. 0.2 g is subtherapeutic, 20 g is a dangerous overdose, and aminophylline is not recommended (adverse effects without benefit)." },

  { id: "xq-006", domain: "resp", difficulty: 3,
    stem: "A patient on a nonselective beta-blocker has anaphylaxis that is refractory to repeated IM epinephrine. Which specific adjunct is indicated?",
    options: ["Diphenhydramine", "Calcium gluconate", "Vasopressin", "Glucagon"], correctIndex: 3,
    tags: ["anaphylaxis", "glucagon", "beta-blocker"],
    rationale: "Glucagon (1-5 mg IV) raises cAMP independent of the beta-receptor and is specifically recommended for epinephrine-refractory anaphylaxis in beta-blocked patients. Protect the airway due to emesis risk." },

  { id: "xq-007", domain: "resp", difficulty: 2,
    stem: "Which statement reflects the 2023 anaphylaxis guidance?",
    options: ["Corticosteroids should be given to all patients to prevent biphasic reactions", "Corticosteroids are not recommended routinely to prevent biphasic reactions", "Antihistamines are first-line and can substitute for epinephrine", "IV diphenhydramine is preferred over oral cetirizine in adults"], correctIndex: 1,
    tags: ["anaphylaxis", "guidelines"],
    rationale: "The 2023 Joint Task Force update: corticosteroids and antihistamines are NOT routine and never replace epinephrine (the only life-saving therapy). Oral cetirizine is favored over IV diphenhydramine when an antihistamine is used for symptom relief." },

  /* ---- TOXICOLOGY ---- */
  { id: "xq-008", domain: "tox", difficulty: 1,
    stem: "For a single acute acetaminophen ingestion, N-acetylcysteine provides the greatest benefit when started within how many hours?",
    options: ["2 hours", "24 hours", "48 hours", "8 hours"], correctIndex: 3,
    tags: ["acetaminophen", "NAC"],
    rationale: "NAC is most effective within 8 hours of ingestion. It still has value later (and in established hepatotoxicity), but the near-complete hepatoprotection window is the 8-hour mark used with the Rumack-Matthew nomogram." },

  { id: "xq-009", domain: "tox", difficulty: 2,
    stem: "A patient with confirmed methanol poisoning needs fomepizole. What is the loading dose?",
    options: ["1.5 mg/kg", "10 mg/kg", "15 mg/kg", "150 mg/kg"], correctIndex: 2,
    tags: ["toxic alcohol", "fomepizole"],
    rationale: "Fomepizole loads at 15 mg/kg, then 10 mg/kg q12h x4, then 15 mg/kg q12h (the maintenance rises due to autoinduction). 1.5 and 150 mg/kg are decimal traps; 10 mg/kg is the maintenance dose, not the load." },

  { id: "xq-010", domain: "tox", difficulty: 2,
    stem: "A fire victim has soot in the airway, altered mental status, and a lactate of 12 mmol/L. What is the correct hydroxocobalamin dose for presumed cyanide toxicity?",
    options: ["5 g IV", "0.5 g IV", "5 mg IV", "50 g IV"], correctIndex: 0,
    tags: ["cyanide", "hydroxocobalamin"],
    rationale: "Hydroxocobalamin 5 g IV is the adult dose; it does not cause methemoglobinemia, making it preferred in smoke inhalation. 0.5 g / 5 mg are underdoses and 50 g is a 10-fold overdose." },

  { id: "xq-011", domain: "tox", difficulty: 2,
    stem: "A tricyclic antidepressant overdose presents with QRS 130 ms and hypotension. What is the first-line therapy?",
    options: ["Amiodarone", "Sodium bicarbonate", "Calcium chloride", "Physostigmine"], correctIndex: 1,
    tags: ["TCA", "sodium bicarbonate"],
    rationale: "Sodium bicarbonate boluses (1-2 mEq/kg) treat TCA cardiotoxicity once QRS > 100 ms. Class Ia/Ic/III agents like amiodarone worsen sodium-channel blockade, and physostigmine is contraindicated (asystole/seizure risk)." },

  { id: "xq-012", domain: "tox", difficulty: 3,
    stem: "Which overdose classically produces HYPERglycemia?",
    options: ["Calcium channel blocker", "Beta-blocker", "Both produce hyperglycemia equally", "Neither affects glucose"], correctIndex: 0,
    tags: ["CCB", "beta-blocker"],
    rationale: "CCBs block L-type calcium channels on pancreatic beta cells, reducing insulin release and causing hyperglycemia (a marker of severity). Beta-blockers tend to cause HYPOglycemia (blunted glycogenolysis). This mirror-image glucose effect is a classic board point." },

  { id: "xq-013", domain: "tox", difficulty: 2,
    stem: "In organophosphate (cholinergic) toxicity, atropine should be titrated to which endpoint?",
    options: ["Heart rate > 100 bpm", "Pupillary dilation", "Drying of bronchial/pulmonary secretions", "Resolution of fasciculations"], correctIndex: 2,
    tags: ["organophosphate", "atropine"],
    rationale: "Atropine is titrated (often to large, escalating doses) to the endpoint of dried pulmonary secretions. Pupils and fasciculations are unreliable targets; pralidoxime is added for the nicotinic/muscle effects and enzyme reactivation." },

  { id: "xq-014", domain: "tox", difficulty: 2,
    stem: "Which end-organ injury is most characteristic of methanol poisoning?",
    options: ["Renal failure from oxalate crystals", "Optic neuropathy with visual loss", "Fulminant hepatic necrosis", "Dilated cardiomyopathy"], correctIndex: 1,
    tags: ["methanol"],
    rationale: "Methanol's toxic metabolite formic acid injures the optic nerve (blurred vision/'snowfield' blindness) and basal ganglia. Oxalate-mediated renal failure is the hallmark of ethylene glycol, not methanol." },

  { id: "xq-015", domain: "tox", difficulty: 2,
    stem: "Which urinary finding suggests ethylene glycol poisoning?",
    options: ["Uric acid crystals", "Cystine crystals", "No crystalluria is expected", "Calcium oxalate crystals"], correctIndex: 3,
    tags: ["ethylene glycol"],
    rationale: "Ethylene glycol is metabolized to oxalic acid, producing calcium oxalate crystals and hypocalcemia; urine may also fluoresce under a Wood's lamp (fluorescein in antifreeze). Methanol classically spares the kidneys." },

  { id: "xq-016", domain: "tox", difficulty: 3,
    stem: "Why is intubation particularly dangerous in severe salicylate toxicity?",
    options: ["The ventilator may fail to match the patient's high compensatory minute ventilation, worsening acidemia and driving salicylate into the CNS", "Salicylate directly injures the alveoli", "Salicylate causes neuromuscular junction blockade", "Sedatives chemically reverse salicylate"], correctIndex: 0,
    tags: ["salicylate", "acid-base"],
    rationale: "Salicylate toxicity drives a compensatory respiratory alkalosis; if intubation/sedation drops minute ventilation, pH falls, shifting salicylate into the brain and precipitating deterioration. Avoid intubation when possible; if unavoidable, match the high minute ventilation and continue alkalinization." },

  { id: "xq-017", domain: "tox", difficulty: 3,
    stem: "For refractory calcium-channel-blocker or beta-blocker toxicity, high-dose insulin euglycemia therapy is titrated within which range?",
    options: ["0.05 unit/kg/hr fixed", "0.5-1 unit/kg/hr, titrated up to about 10 units/kg/hr", "0.1 unit/kg/hr maximum", "A single fixed rate of 10 units/hr total"], correctIndex: 1,
    tags: ["HIET", "insulin"],
    rationale: "HIET starts around 1 unit/kg bolus then 0.5-1 unit/kg/hr, titrated upward to 10 units/kg/hr or higher with dextrose and potassium monitoring. Don't underdose it (a common error) - the numbers look alarming but are correct." },

  { id: "xq-018", domain: "tox", difficulty: 2,
    stem: "An asymptomatic 'body packer' has multiple well-wrapped, machine-sealed drug packets visible on CT. What is the preferred management?",
    options: ["Induce emesis", "Give activated charcoal then discharge", "Whole-bowel irrigation with observation; surgery if obstruction or packet rupture", "Routine endoscopic retrieval of all packets"], correctIndex: 2,
    tags: ["body packer"],
    rationale: "Well-wrapped packets in an asymptomatic packer are managed with whole-bowel irrigation and observation; surgery is reserved for obstruction, rupture, or toxicity. Endoscopy risks rupturing packets. (A 'body stuffer' with a poorly wrapped packet is more likely to become symptomatic.)" },

  { id: "xq-019", domain: "tox", difficulty: 3,
    stem: "Among the King's College criteria for acetaminophen-induced liver failure, which arterial pH threshold (independent of other variables) predicts poor outcome?",
    options: ["pH < 7.45", "pH < 6.90", "pH < 7.50", "pH < 7.30"], correctIndex: 3,
    tags: ["acetaminophen", "transplant"],
    rationale: "Arterial pH < 7.30 (after resuscitation) is a stand-alone King's College criterion. The alternative triad is INR > 6.5 plus creatinine > 3.4 mg/dL plus grade III/IV encephalopathy. 6.90 is a distractor set below the real cutoff." },

  /* ---- NEUROLOGY ---- */
  { id: "xq-020", domain: "neuro", difficulty: 2,
    stem: "An eligible patient presents with acute ischemic stroke. What is the correct alteplase dose?",
    options: ["0.09 mg/kg (max 9 mg)", "0.9 mg/kg (max 90 mg)", "0.6 mg/kg (max 60 mg)", "9 mg/kg (max 900 mg)"], correctIndex: 1,
    tags: ["stroke", "alteplase"],
    rationale: "Alteplase for acute ischemic stroke is 0.9 mg/kg (max 90 mg): 10% bolus, remainder over 60 min. 0.6 mg/kg is closer to a cardiac/other regimen; 0.09 and 9 mg/kg are 10-fold decimal traps." },

  { id: "xq-021", domain: "neuro", difficulty: 2,
    stem: "Your center uses tenecteplase for acute ischemic stroke. What is the dose?",
    options: ["0.025 mg/kg", "2.5 mg/kg", "0.25 mg/kg (max 25 mg) as a single bolus", "0.5 mg/kg"], correctIndex: 2,
    tags: ["stroke", "tenecteplase"],
    rationale: "Tenecteplase for stroke is 0.25 mg/kg (max 25 mg) as a single IV bolus. Note the STEMI dose is weight-banded and different - don't confuse them. 0.025 and 2.5 are decimal traps." },

  { id: "xq-022", domain: "neuro", difficulty: 2,
    stem: "Before administering IV thrombolysis for acute ischemic stroke, blood pressure must be lowered below which threshold?",
    options: ["< 185/110 mmHg", "< 220/120 mmHg", "< 160/90 mmHg", "< 140/90 mmHg"], correctIndex: 0,
    tags: ["stroke", "blood pressure"],
    rationale: "BP must be < 185/110 before tPA and kept < 180/105 for 24 h after. The < 220/120 figure applies to permissive hypertension when NOT giving thrombolysis - a classic swap distractor." },

  { id: "xq-023", domain: "neuro", difficulty: 2,
    stem: "A patient is in generalized convulsive status epilepticus with IV access. What is the correct first-line lorazepam dose?",
    options: ["0.01 mg/kg", "1 mg/kg", "0.5 mg/kg", "0.1 mg/kg"], correctIndex: 3,
    tags: ["status epilepticus", "lorazepam"],
    rationale: "Lorazepam 0.1 mg/kg IV (commonly up to ~4 mg/dose, may repeat) is first-line. 0.01 mg/kg is a 10-fold underdose; 0.5-1 mg/kg are overdoses. Second-line agents (levetiracetam, fosphenytoin, valproate) follow benzodiazepines." },

  { id: "xq-024", domain: "neuro", difficulty: 3,
    stem: "A warfarin-anticoagulated patient (INR 3.5) has a large intracerebral hemorrhage. What is the preferred reversal?",
    options: ["IV vitamin K alone", "4-factor PCC plus IV vitamin K", "FFP alone", "Andexanet alfa"], correctIndex: 1,
    tags: ["ICH", "warfarin reversal"],
    rationale: "4-factor PCC provides rapid factor replacement and MUST be paired with IV vitamin K 10 mg to sustain reversal (PCC factors are short-lived). Vitamin K alone is too slow; andexanet reverses factor Xa inhibitors, not warfarin." },

  /* ---- TRAUMA & HEMOSTASIS ---- */
  { id: "xq-025", domain: "trauma", difficulty: 2,
    stem: "Tranexamic acid improves survival in bleeding trauma only when started within what window from injury?",
    options: ["Within 12 hours", "Within 8 hours", "Within 3 hours", "Anytime in the first 24 hours"], correctIndex: 2,
    tags: ["TXA", "trauma"],
    rationale: "Per CRASH-2, TXA reduces bleeding-related mortality only within 3 hours of injury; given later it may increase mortality. The 8-hour figure is a distractor borrowed from other bleeding contexts." },

  { id: "xq-026", domain: "trauma", difficulty: 2,
    stem: "What is the standard trauma TXA regimen?",
    options: ["1 g IV over 10 min, then 1 g over 8 hours", "1 g IV over 1 minute, then 1 g over 8 hours", "10 g IV over 10 min, then 10 g over 8 hours", "100 mg IV over 10 min, then 100 mg over 8 hours"], correctIndex: 0,
    tags: ["TXA"],
    rationale: "TXA is 1 g IV over 10 minutes, then 1 g infused over 8 hours. Pushing the loading dose too fast can cause hypotension; the 10 g and 100 mg options are 10-fold traps." },

  { id: "xq-027", domain: "trauma", difficulty: 3,
    stem: "A patient on apixaban has life-threatening hemorrhage. Which agent is the FDA-approved specific reversal?",
    options: ["Idarucizumab", "Protamine", "Vitamin K", "Andexanet alfa"], correctIndex: 3,
    tags: ["DOAC reversal", "andexanet"],
    rationale: "Andexanet alfa reverses the factor Xa inhibitors apixaban and rivaroxaban. Idarucizumab is specific to dabigatran; where andexanet is unavailable, 4-factor PCC is a common off-label alternative." },

  { id: "xq-028", domain: "trauma", difficulty: 2,
    stem: "Which agent specifically reverses dabigatran?",
    options: ["Idarucizumab", "Andexanet alfa", "Protamine", "Vitamin K"], correctIndex: 0,
    tags: ["dabigatran", "idarucizumab"],
    rationale: "Idarucizumab is the monoclonal-antibody-fragment reversal for dabigatran (a direct thrombin inhibitor). Andexanet targets Xa inhibitors; protamine reverses heparin; vitamin K reverses warfarin." },

  { id: "xq-029", domain: "trauma", difficulty: 2,
    stem: "During massive transfusion, which electrolyte derangement should be anticipated and repleted?",
    options: ["Hypercalcemia", "Hypernatremia", "Ionized hypocalcemia from citrate", "Hyperchloremia"], correctIndex: 2,
    tags: ["massive transfusion", "calcium"],
    rationale: "Citrate anticoagulant in stored blood chelates calcium, producing ionized hypocalcemia that impairs coagulation and cardiac function. Monitor ionized calcium and replete with calcium chloride or gluconate." },

  /* ---- ENDOCRINE & METABOLIC ---- */
  { id: "xq-030", domain: "endo", difficulty: 2,
    stem: "In DKA, insulin should be withheld until potassium is repleted when the serum potassium is below what value?",
    options: ["K < 5.3 mEq/L", "K < 3.3 mEq/L", "K < 4.5 mEq/L", "K < 2.0 mEq/L"], correctIndex: 1,
    tags: ["DKA", "potassium"],
    rationale: "Hold insulin and replete first if K < 3.3 mEq/L (insulin drives K intracellularly and can cause fatal hypokalemia). The 5.3 value is the UPPER cutoff above which you start insulin without adding K - a classic swap." },

  { id: "xq-031", domain: "endo", difficulty: 2,
    stem: "A patient with K 7.2 mEq/L has peaked T waves. Which is the FIRST drug to give?",
    options: ["Insulin plus dextrose", "Nebulized albuterol", "Sodium polystyrene sulfonate", "IV calcium (gluconate or chloride)"], correctIndex: 3,
    tags: ["hyperkalemia", "calcium"],
    rationale: "IV calcium is given first to stabilize the myocardium when ECG changes are present; it does not lower potassium. Then shift K intracellularly (insulin/dextrose, beta-agonist, bicarbonate if acidotic) and remove it (diuresis, binders, dialysis)." },

  { id: "xq-032", domain: "endo", difficulty: 2,
    stem: "Which profile best fits hyperosmolar hyperglycemic state (HHS) rather than DKA?",
    options: ["Serum osmolality > 320, pH > 7.3, minimal ketones", "pH < 7.3 with large ketonemia", "Serum osmolality < 300", "Bicarbonate < 10 with a high anion gap"], correctIndex: 0,
    tags: ["HHS", "DKA"],
    rationale: "HHS features marked hyperosmolality (> 320), preserved pH (> 7.3), and minimal ketosis, with a much larger fluid deficit (~9 L). Acidosis with large ketones and low bicarbonate describes DKA." },

  { id: "xq-033", domain: "endo", difficulty: 3,
    stem: "A patient in myxedema coma requires thyroid hormone. What must be given before or with it to avoid precipitating adrenal crisis?",
    options: ["An insulin infusion", "A beta-blocker", "Stress-dose hydrocortisone", "Nothing - levothyroxine alone suffices"], correctIndex: 2,
    tags: ["myxedema", "hydrocortisone"],
    rationale: "Empiric stress-dose hydrocortisone is given because coexisting adrenal insufficiency is common and thyroid hormone increases cortisol turnover; giving thyroid hormone alone could trigger adrenal crisis. Then give IV levothyroxine (+/- liothyronine) and supportive care." },

  /* ---- CARDIOVASCULAR ---- */
  { id: "xq-034", domain: "cv", difficulty: 3,
    stem: "A patient with acute aortic dissection has HR 115 and BP 190/110. Which is the correct pharmacologic sequence?",
    options: ["Start nitroprusside first, then add a beta-blocker", "Give IV beta-blockade (esmolol/labetalol) to control rate BEFORE adding a vasodilator", "Give hydralazine first", "Start nicardipine alone"], correctIndex: 1,
    tags: ["aortic dissection", "beta-blocker"],
    rationale: "Beta-blockade first lowers dP/dt (aortic wall shear); target HR < 60 before adding a vasodilator. Leading with a pure vasodilator causes reflex tachycardia that worsens shear and can extend the dissection." },

  { id: "xq-035", domain: "cv", difficulty: 2,
    stem: "A patient with cocaine-associated chest pain and hypertension needs treatment. Which approach is correct?",
    options: ["Benzodiazepines first-line; avoid nonselective beta-blockade", "Metoprolol as first-line therapy", "Labetalol monotherapy is preferred", "Atenolol first-line"], correctIndex: 0,
    tags: ["cocaine", "hypertensive emergency"],
    rationale: "Benzodiazepines are first-line; add nitroglycerin, phentolamine, or nicardipine if needed. Nonselective beta-blockade is traditionally avoided over concern for unopposed alpha-mediated vasoconstriction." },

  { id: "xq-036", domain: "cv", difficulty: 2,
    stem: "In refractory VF/pulseless VT, what is the correct amiodarone dosing sequence?",
    options: ["150 mg then 75 mg IV/IO", "300 mg then 300 mg IV/IO", "150 mg then 150 mg IV/IO", "300 mg then 150 mg IV/IO"], correctIndex: 3,
    tags: ["ACLS", "amiodarone"],
    rationale: "Amiodarone in arrest is 300 mg IV/IO first, then 150 mg for the second dose. The other sequences are near-miss distractors; lidocaine 1-1.5 mg/kg then 0.5-0.75 mg/kg is the alternative antiarrhythmic." },

  { id: "xq-037", domain: "cv", difficulty: 2,
    stem: "A patient on sotalol develops torsades de pointes with a pulse. Besides stopping the drug and correcting potassium, what is first-line?",
    options: ["Amiodarone 150 mg IV", "Magnesium sulfate 1-2 g IV", "Calcium chloride 1 g IV", "Procainamide 17 mg/kg IV"], correctIndex: 1,
    tags: ["torsades", "magnesium"],
    rationale: "IV magnesium 1-2 g is first-line for torsades even with a normal magnesium level. Class III agents like amiodarone/procainamide prolong QT and can worsen it; consider overdrive pacing/isoproterenol for bradycardia-dependent torsades." },

  { id: "xq-038", domain: "cv", difficulty: 2,
    stem: "A stable patient with regular narrow-complex SVT fails vagal maneuvers. What is the correct adenosine administration?",
    options: ["0.6 mg then 1.2 mg IV", "6 mg slow IV over 5 minutes", "6 mg rapid IV push, then 12 mg if needed", "12 mg then 6 mg IV"], correctIndex: 2,
    tags: ["SVT", "adenosine"],
    rationale: "Adenosine is 6 mg rapid IV push (with a fast saline flush via a proximal vein), then 12 mg if needed. Slow administration fails because its half-life is ~10 seconds; the mg/decimal and reversed-order options are traps." },

  /* ---- INFECTIOUS DISEASE ---- */
  { id: "xq-039", domain: "id", difficulty: 2,
    stem: "A 60-year-old with suspected community-acquired bacterial meningitis needs empiric therapy. Which regimen is best before culture data?",
    options: ["Ceftriaxone alone", "Vancomycin alone", "Meropenem plus azithromycin", "Vancomycin + ceftriaxone, add ampicillin for Listeria risk, with dexamethasone"], correctIndex: 3,
    tags: ["meningitis", "empiric antibiotics"],
    rationale: "Empiric adult meningitis therapy is vancomycin + a third-generation cephalosporin; add ampicillin when Listeria is a concern (> 50 years, immunocompromised, pregnant). Adjunctive dexamethasone (with/before the first dose) benefits pneumococcal meningitis." },

  { id: "xq-040", domain: "id", difficulty: 2,
    stem: "Which CSF profile is most consistent with bacterial meningitis?",
    options: ["Neutrophil predominance, glucose < 40 mg/dL, protein > 100 mg/dL", "Lymphocyte predominance, normal glucose, mildly elevated protein", "Normal cell count and chemistries", "Eosinophilic pleocytosis with normal protein"], correctIndex: 0,
    tags: ["meningitis", "CSF"],
    rationale: "Bacterial meningitis shows neutrophilic pleocytosis, low glucose (CSF:serum ratio < 0.4), and high protein, often with elevated opening pressure. Lymphocytic, normal-glucose CSF suggests viral meningitis." },

  { id: "xq-041", domain: "id", difficulty: 2,
    stem: "Per Surviving Sepsis, empiric broad-spectrum antibiotics for septic shock should be given within what timeframe?",
    options: ["Within 3 hours", "Within 1 hour of recognition", "Within 6 hours", "Only after blood cultures result"], correctIndex: 1,
    tags: ["sepsis", "antibiotic timing"],
    rationale: "For septic shock, administer antimicrobials immediately, ideally within 1 hour. Obtain cultures first only if it does not meaningfully delay therapy." },

  { id: "xq-042", domain: "id", difficulty: 3,
    stem: "In necrotizing soft-tissue infection with streptococcal toxic shock, which agent is added specifically to suppress toxin production?",
    options: ["Metronidazole", "Gentamicin", "Clindamycin", "Daptomycin"], correctIndex: 2,
    tags: ["necrotizing fasciitis", "clindamycin"],
    rationale: "Clindamycin inhibits ribosomal protein synthesis, shutting down exotoxin production ('Eagle effect') in group A Streptococcus and toxin-producing S. aureus. It supplements broad gram-negative/anaerobic + MRSA coverage plus surgical debridement." },

  /* ---- PRACTICE MANAGEMENT & RESEARCH ---- */
  { id: "xq-043", domain: "pmr", difficulty: 2,
    stem: "A trial reports an absolute risk reduction of 4%. What is the number needed to treat?",
    options: ["4", "40", "2.5", "25"], correctIndex: 3,
    tags: ["biostats", "NNT"],
    rationale: "NNT = 1/ARR = 1/0.04 = 25 (round up). The distractors come from mis-scaling the percentage (4, 40) or confusing NNT with a relative measure (2.5)." },

  { id: "xq-044", domain: "pmr", difficulty: 3,
    stem: "When does an odds ratio meaningfully OVERESTIMATE the relative risk?",
    options: ["When the outcome is common (roughly > 10%)", "When the outcome is rare", "When the sample size is small", "Never - OR always equals RR"], correctIndex: 0,
    tags: ["biostats", "odds ratio"],
    rationale: "OR approximates RR only for rare outcomes (< ~10%). As the baseline event rate rises, the OR diverges from and exaggerates the RR - important when interpreting case-control data with common outcomes." },

  { id: "xq-045", domain: "pmr", difficulty: 3,
    stem: "Why must a per-protocol analysis accompany intention-to-treat in a noninferiority trial?",
    options: ["ITT biases against noninferiority, so per-protocol is unnecessary", "ITT tends toward 'no difference,' which can falsely support noninferiority, so per-protocol is needed as a check", "Per-protocol preserves randomization better than ITT", "The two analyses should never be reported together"], correctIndex: 1,
    tags: ["biostats", "noninferiority"],
    rationale: "ITT dilutes differences toward the null; in a noninferiority design 'no difference' favors the conclusion of noninferiority, so ITT alone could be falsely reassuring. Both ITT and per-protocol should support noninferiority." },

  { id: "xq-046", domain: "pmr", difficulty: 2,
    stem: "A test with very HIGH sensitivity is most useful in which situation?",
    options: ["Ruling disease IN when the result is positive", "Confirming a diagnosis definitively", "Ruling disease OUT when the result is negative", "It has no clinical utility"], correctIndex: 2,
    tags: ["biostats", "sensitivity"],
    rationale: "SnNOUT: a highly Sensitive test, when Negative, rules OUT disease (few false negatives). Ruling IN with a positive result is the property of a highly Specific test (SpPIN)." },

  /* ---- ENVIRONMENTAL ---- */
  { id: "xq-047", domain: "env", difficulty: 2,
    stem: "A patient with moderate-severe serotonin syndrome remains agitated and hyperthermic despite benzodiazepines and cooling. Which pharmacologic antidote is appropriate?",
    options: ["Cyproheptadine", "Dantrolene", "Bromocriptine", "Physostigmine"], correctIndex: 0,
    tags: ["serotonin syndrome", "cyproheptadine"],
    rationale: "Cyproheptadine, a 5-HT2A antagonist, is the antidote for serotonin syndrome after supportive care and benzodiazepines. Dantrolene and bromocriptine are used in neuroleptic malignant syndrome, not serotonin syndrome." },

  { id: "xq-048", domain: "env", difficulty: 3,
    stem: "Which finding favors serotonin syndrome OVER neuroleptic malignant syndrome?",
    options: ["Lead-pipe rigidity with hyporeflexia", "Onset over days to weeks", "CK > 10,000 as the defining hallmark", "Hyperreflexia with inducible ankle clonus"], correctIndex: 3,
    tags: ["serotonin syndrome", "NMS"],
    rationale: "Serotonin syndrome is fast in onset with hyperreflexia and clonus. NMS evolves over days to weeks with lead-pipe rigidity, hyporeflexia, and markedly elevated CK. Clonus is the most useful discriminator." },

  { id: "xq-049", domain: "env", difficulty: 2,
    stem: "A patient develops malignant hyperthermia after succinylcholine and a volatile anesthetic. What is the definitive treatment?",
    options: ["Cyproheptadine", "Dantrolene 2.5 mg/kg IV", "Bromocriptine", "External cooling measures alone"], correctIndex: 1,
    tags: ["malignant hyperthermia", "dantrolene"],
    rationale: "Dantrolene 2.5 mg/kg IV (repeat as needed) is definitive - it blocks ryanodine-receptor calcium release. Stop the trigger, cool aggressively, and treat hyperkalemia/acidosis. Cyproheptadine/bromocriptine treat other hyperthermic syndromes." },

  /* ---- SPECIAL POPULATIONS ---- */
  { id: "xq-050", domain: "special", difficulty: 2,
    stem: "A woman at 32 weeks has an eclamptic seizure. What is the first-line therapy?",
    options: ["Lorazepam", "Phenytoin", "Magnesium sulfate 4-6 g load then 1-2 g/hr", "Levetiracetam 60 mg/kg"], correctIndex: 2,
    tags: ["eclampsia", "magnesium"],
    rationale: "Magnesium sulfate is first-line for eclamptic seizures and prevention, superior to standard antiepileptics here. Monitor for toxicity (loss of reflexes, respiratory depression); the antidote is IV calcium gluconate." },

  { id: "xq-051", domain: "special", difficulty: 2,
    stem: "What is the correct intramuscular epinephrine dose for pediatric anaphylaxis?",
    options: ["0.01 mg/kg (max 0.3 mg) of the 1 mg/mL concentration", "0.1 mg/kg of the 1 mg/mL concentration", "0.001 mg/kg of the 1 mg/mL concentration", "0.01 mg/kg IV of the 0.1 mg/mL concentration"], correctIndex: 0,
    tags: ["pediatrics", "anaphylaxis"],
    rationale: "Pediatric IM epinephrine is 0.01 mg/kg of 1 mg/mL (max ~0.3 mg prepubertal, up to 0.5 mg), repeated q5-15 min. 0.1 and 0.001 mg/kg are 10-fold errors, and the IV 0.1 mg/mL option is the wrong route/concentration." },

  { id: "xq-052", domain: "special", difficulty: 3,
    stem: "A child in septic shock is cool and mottled with weak pulses and narrow pulse pressure (cold shock). Which vasoactive agent is preferred?",
    options: ["Phenylephrine", "Norepinephrine", "Dopamine", "Epinephrine"], correctIndex: 3,
    tags: ["pediatrics", "shock"],
    rationale: "Pediatric COLD shock (low cardiac output, high SVR) is supported with epinephrine for inotropy. WARM shock (vasodilated, wide pulse pressure) is treated with norepinephrine. Kids more often present with cold shock than adults." },

  /* ---- RENAL ---- */
  { id: "xq-053", domain: "renal", difficulty: 2,
    stem: "Which laboratory pattern best indicates PRE-renal acute kidney injury?",
    options: ["FENa > 2% with muddy brown casts", "FENa < 1% with BUN:Cr ratio > 20:1 and concentrated urine", "FENa > 2% with BUN:Cr < 15:1", "FENa 1-2% with WBC casts and eosinophiluria"], correctIndex: 1,
    tags: ["AKI", "FENa"],
    rationale: "Pre-renal AKI shows avid sodium retention: FENa < 1%, BUN:Cr > 20:1, high urine osmolality, bland sediment - the kidney is working but underperfused. High FENa with muddy brown casts indicates ATN; WBC casts + eosinophils suggest AIN." },

  { id: "xq-054", domain: "renal", difficulty: 2,
    stem: "Which urinary sediment finding is characteristic of acute tubular necrosis?",
    options: ["Red blood cell casts", "Hyaline casts only", "Muddy brown granular casts", "White blood cell casts with eosinophiluria"], correctIndex: 2,
    tags: ["ATN", "sediment"],
    rationale: "Muddy brown granular (pigmented) casts are the hallmark of ATN. RBC casts suggest glomerulonephritis, WBC casts with eosinophils suggest acute interstitial nephritis, and hyaline casts are nonspecific/pre-renal." },

  { id: "xq-055", domain: "env", difficulty: 2,
    stem: "A young marathon runner collapses with core temp 41.5°C and altered mental status (exertional heatstroke). What is the most effective cooling method?",
    options: ["Cold-water (ice-water) immersion", "Evaporative cooling only", "Acetaminophen antipyretics", "Dantrolene"], correctIndex: 0,
    tags: ["heatstroke", "cooling"],
    rationale: "Exertional heatstroke is cooled fastest by ice-water immersion ('cool first, transport second'). Antipyretics don't work (this isn't a prostaglandin-mediated fever) and dantrolene is not indicated. Frail elderly patients with classic heatstroke may instead get evaporative cooling if immersion isn't tolerated." }

]);
