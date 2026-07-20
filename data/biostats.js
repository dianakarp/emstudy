/* biostats.js - cheat sheet for the Stats tab.
 * Study aid only; verify definitions against your primary references. */
window.BCEMP_BIOSTATS = {

  formulas: [
    { n: "Control event rate (CER)", eq: "CER = events in control / total in control",
      d: "Baseline risk in the untreated group.", ex: "20 events / 200 patients = 10%" },
    { n: "Experimental event rate (EER)", eq: "EER = events in treatment / total in treatment",
      d: "Risk in the treated group.", ex: "12 events / 200 patients = 6%" },
    { n: "Absolute risk reduction (ARR)", eq: "ARR = CER − EER",
      d: "The real-world size of the benefit. This is the number that matters clinically.", ex: "10% − 6% = 4%" },
    { n: "Relative risk (RR)", eq: "RR = EER / CER",
      d: "Ratio of risks. RR < 1 = benefit, 1 = no effect, > 1 = harm. Used in RCTs and cohorts.", ex: "6% / 10% = 0.60" },
    { n: "Relative risk reduction (RRR)", eq: "RRR = ARR / CER = 1 − RR",
      d: "Always looks bigger than ARR. This is the number marketing quotes.", ex: "4% / 10% = 40%" },
    { n: "Number needed to treat (NNT)", eq: "NNT = 1 / ARR   (round UP)",
      d: "Patients treated to prevent one additional bad outcome. Lower = better.", ex: "1 / 0.04 = 25" },
    { n: "Absolute risk increase (ARI)", eq: "ARI = EER − CER",
      d: "Used when the treatment causes harm rather than benefit.", ex: "8% − 5% = 3%" },
    { n: "Number needed to harm (NNH)", eq: "NNH = 1 / ARI",
      d: "Patients treated to cause one additional harm. Higher = safer. Pair with NNT for net benefit.", ex: "1 / 0.03 = 34" },
    { n: "Odds ratio (OR)", eq: "OR = (a × d) / (b × c)",
      d: "Effect measure for case-control studies. Approximates RR ONLY when the outcome is rare (< ~10%).", ex: "cross-multiply the 2x2" },
    { n: "Sensitivity (Sn)", eq: "Sn = TP / (TP + FN)",
      d: "Detects disease when present. SnNOUT: a highly Sensitive test, when Negative, rules OUT.", ex: "Property of the test; prevalence-independent" },
    { n: "Specificity (Sp)", eq: "Sp = TN / (TN + FP)",
      d: "Correctly clears the well. SpPIN: a highly Specific test, when Positive, rules IN.", ex: "Property of the test; prevalence-independent" },
    { n: "Positive predictive value (PPV)", eq: "PPV = TP / (TP + FP)",
      d: "Given a positive test, probability disease is real. Rises with prevalence.", ex: "Depends on your population" },
    { n: "Negative predictive value (NPV)", eq: "NPV = TN / (TN + FN)",
      d: "Given a negative test, probability the patient is truly well. Falls with prevalence.", ex: "Depends on your population" },
    { n: "Likelihood ratio positive (LR+)", eq: "LR+ = Sn / (1 − Sp)",
      d: "How much a positive result raises the odds of disease. > 10 = strong rule-in.", ex: "0.95 / (1 − 0.80) = 4.75" },
    { n: "Likelihood ratio negative (LR−)", eq: "LR− = (1 − Sn) / Sp",
      d: "How much a negative result lowers the odds. < 0.1 = strong rule-out.", ex: "(1 − 0.95) / 0.80 = 0.06" },
    { n: "Power", eq: "Power = 1 − β",
      d: "Probability of detecting a true difference. Convention is 80-90%.", ex: "β = 0.20 gives 80% power" },
    { n: "Accuracy", eq: "Accuracy = (TP + TN) / total",
      d: "Overall proportion correct. Misleading when disease is rare.", ex: "—" },
    { n: "Bonferroni correction", eq: "adjusted α = α / number of comparisons",
      d: "Controls family-wise type I error when testing many hypotheses.", ex: "0.05 / 5 = 0.01" }
  ],

  tables: [
    { title: "Therapeutic 2×2 (treatment vs outcome)",
      note: "EER = a/(a+b) · CER = c/(c+d) · RR = EER/CER · ARR = CER − EER · NNT = 1/ARR",
      head: ["", "Outcome YES", "Outcome NO"],
      rows: [["Treatment", "a", "b"], ["Control", "c", "d"]] },

    { title: "Diagnostic 2×2 (test vs disease)",
      note: "Sn = a/(a+c) · Sp = d/(b+d) · PPV = a/(a+b) · NPV = d/(c+d)",
      head: ["", "Disease PRESENT", "Disease ABSENT"],
      rows: [["Test POSITIVE", "a = TP (true positive)", "b = FP (false positive)"],
             ["Test NEGATIVE", "c = FN (false negative)", "d = TN (true negative)"]] },

    { title: "Hypothesis testing 2×2 (the truth vs your decision)",
      note: "You never PROVE the null — you either reject it or fail to reject it.",
      head: ["", "H₀ is TRUE (no real difference)", "H₀ is FALSE (real difference)"],
      rows: [["You REJECT H₀", "TYPE I ERROR (α) — false positive", "Correct — this is POWER (1 − β)"],
             ["You FAIL to reject H₀", "Correct", "TYPE II ERROR (β) — false negative"]] }
  ],

  terms: [
    { t: "Null hypothesis (H₀)", d: "The assumption of NO difference or no association. Every test starts by assuming it is true. You never accept or prove H₀ — you only reject it or fail to reject it." },
    { t: "Alternative hypothesis (H₁ / Hₐ)", d: "The claim that a real difference or association exists. Two-tailed tests look for a difference in either direction; one-tailed only in one." },
    { t: "Alpha (α)", d: "The pre-specified threshold for a type I error, conventionally 0.05. It is the probability of rejecting a TRUE null. Set BEFORE the study, not after." },
    { t: "Type I error", d: "False positive — concluding a difference exists when it does not. Its probability is α. Mnemonic: Type 1 = One word, positive." },
    { t: "Beta (β)", d: "The probability of a type II error, conventionally 0.10-0.20." },
    { t: "Type II error", d: "False negative — missing a real difference. Usually caused by too small a sample size. Mnemonic: Type 2 = Two words, false negative." },
    { t: "Power (1 − β)", d: "Probability of detecting a true difference. Target 80-90%. Increased by a larger sample, a larger effect size, less variability, or a higher α." },
    { t: "p-value", d: "Probability of observing a result at least this extreme IF H₀ were true. p < α means reject H₀. It is NOT the probability that H₀ is true, and NOT the probability the finding is due to chance." },
    { t: "Confidence interval (95% CI)", d: "The range of values compatible with the data. For RATIOS (RR, OR, HR) it is non-significant if it crosses 1. For DIFFERENCES (ARR, mean difference) it is non-significant if it crosses 0. Narrower = more precise." },
    { t: "Eta-squared (η²)", d: "Effect size for ANOVA — the proportion of total variance explained by a factor. Roughly 0.01 small, 0.06 medium, 0.14 large." },
    { t: "Cohen's d", d: "Effect size for the difference between two means. Roughly 0.2 small, 0.5 medium, 0.8 large. Effect size answers HOW BIG, while the p-value only answers whether it is detectable." },
    { t: "Hazard ratio (HR)", d: "Relative rate of an event over time, from survival / Cox analysis. Interpreted like RR; CI crossing 1 is non-significant." },
    { t: "I² (heterogeneity)", d: "In meta-analysis, the proportion of variability due to real differences between studies rather than chance. Under 25% low, ~50% moderate, over 75% considerable — pooling may not be appropriate." },
    { t: "Intention-to-treat (ITT)", d: "Analyze every patient in the group they were randomized to, regardless of adherence. Preserves randomization and estimates real-world EFFECTIVENESS. Preferred in superiority trials." },
    { t: "Per-protocol (PP)", d: "Analyze only adherent completers. Estimates biological EFFICACY but reintroduces selection bias. Required alongside ITT in noninferiority trials." },
    { t: "Noninferiority margin (delta)", d: "The largest difference that would still be considered clinically acceptable. Chosen in advance; noninferiority is claimed only if the CI stays within it." }
  ],

  pearls: [
    "Statistical significance is not clinical significance. A huge trial can make a trivial ARR statistically significant. Always look at ARR and NNT, not just the p-value.",
    "RRR always sounds bigger than ARR. Dropping risk from 2% to 1% is a 50% RRR but only a 1% ARR — an NNT of 100. Advertising quotes RRR; you should read ARR.",
    "OR overestimates RR when the outcome is common (over ~10%). They only converge for rare outcomes.",
    "A confidence interval tells you significance AND precision; a p-value only tells you significance. Prefer the CI.",
    "Sensitivity and specificity are properties of the TEST. PPV and NPV depend on the PREVALENCE in your population — the same test performs differently in a screening clinic than in the ED.",
    "Composite endpoints are often driven by the softest component (e.g. revascularization rather than death). Always check the individual components.",
    "Surrogate endpoints (LDL, HbA1c, blood pressure) are not patient-oriented outcomes (death, MI, stroke). A drug can improve one and worsen the other.",
    "Failing to reject H₀ does not prove there is no difference — the study may simply have been underpowered. Absence of evidence is not evidence of absence."
  ]
};
