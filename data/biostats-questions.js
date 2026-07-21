/* biostats-questions.js - scored MCQ bank focused on biostatistics and literature
 * evaluation for the BCEMP. Written to drill the calculation-heavy items the
 * cheat sheet in data/biostats.js only summarizes.
 *
 * Convention matches data/questions.js: the correct answer is authored at
 * index 0 and options are shuffled at display time.
 * Study aid only; verify definitions against your primary references. */
window.BCEMP_BIOSTATS_QUESTIONS = [

  /* ---------- Risk, effect measures, NNT ---------- */

  { id: "bs-001", domain: "pmr", difficulty: 3, tags: ["Biostatistics", "Effect measures"],
    stem: "A randomized trial of a new anticoagulant reports 30-day mortality of 15% in the placebo group and 10% in the treatment group. What is the absolute risk reduction?",
    options: ["5%", "33%", "0.67", "10%"], correctIndex: 0,
    rationale: "ARR = CER − EER = 15% − 10% = 5%. The 33% figure is the relative risk reduction (5/15) and 0.67 is the relative risk (10/15). ARR is the clinically meaningful number because it reflects the actual event burden avoided." },

  { id: "bs-002", domain: "pmr", difficulty: 3, tags: ["Biostatistics", "NNT"],
    stem: "In the same trial (15% placebo mortality vs 10% treatment mortality), how many patients must be treated to prevent one additional death?",
    options: ["20", "5", "10", "33"], correctIndex: 0,
    rationale: "NNT = 1/ARR = 1/0.05 = 20. Always convert the ARR to a decimal before dividing, and round the result UP — a fractional patient cannot be treated." },

  { id: "bs-003", domain: "pmr", difficulty: 3, tags: ["Biostatistics", "Effect measures"],
    stem: "A trial reports a control event rate of 15% and an experimental event rate of 10%. What is the relative risk reduction?",
    options: ["33%", "5%", "50%", "67%"], correctIndex: 0,
    rationale: "RRR = ARR/CER = 5%/15% = 33%, which is the same as 1 − RR = 1 − 0.67. Note how much larger the RRR (33%) sounds than the ARR (5%) describing the identical result — this is why marketing quotes RRR." },

  { id: "bs-004", domain: "pmr", difficulty: 3, tags: ["Biostatistics", "NNT"],
    stem: "A sepsis bundle reduces mortality from 28% to 24.3%. What is the number needed to treat?",
    options: ["28", "27", "37", "4"], correctIndex: 0,
    rationale: "ARR = 28% − 24.3% = 3.7% = 0.037. NNT = 1/0.037 = 27.03, which rounds UP to 28. Rounding down to 27 would overstate the treatment's benefit, so NNT is always rounded up." },

  { id: "bs-005", domain: "pmr", difficulty: 3, tags: ["Biostatistics", "NNH"],
    stem: "A new antithrombotic causes major bleeding in 6% of treated patients versus 2% of controls. What is the number needed to harm?",
    options: ["25", "4", "50", "3"], correctIndex: 0,
    rationale: "ARI = EER − CER = 6% − 2% = 4% = 0.04. NNH = 1/ARI = 25, meaning one additional major bleed occurs for every 25 patients treated. A higher NNH is safer; compare it against the NNT to judge net benefit." },

  { id: "bs-006", domain: "pmr", difficulty: 3, tags: ["Biostatistics", "Effect measures"],
    stem: "A drug carries an NNT of 25 for preventing one stroke and an NNH of 100 for causing one major bleed. How should this be interpreted?",
    options: ["Favorable — strokes prevented outnumber bleeds caused by about 4 to 1", "Unfavorable — the NNH is larger than the NNT", "The two cannot be compared", "Neutral — the drug prevents and causes events equally"], correctIndex: 0,
    rationale: "Treating 100 patients prevents four strokes (100/25) while causing one major bleed (100/100). A low NNT paired with a high NNH is the favorable combination. The comparison is only valid when the outcomes are of comparable severity to the patient." },

  { id: "bs-007", domain: "pmr", difficulty: 3, tags: ["Biostatistics", "Odds ratio"],
    stem: "In a case-control study of NSAID exposure and GI bleeding, 60 of 100 cases were exposed and 30 of 100 controls were exposed. What is the odds ratio?",
    options: ["3.5", "2.0", "0.29", "1.5"], correctIndex: 0,
    rationale: "Build the 2x2: a = 60 exposed cases, b = 40 unexposed cases, c = 30 exposed controls, d = 70 unexposed controls. OR = (a x d)/(b x c) = (60 x 70)/(40 x 30) = 4200/1200 = 3.5. Case-control studies sample by outcome, so incidence and therefore relative risk cannot be calculated directly." },

  { id: "bs-008", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Odds ratio"],
    stem: "A cohort study of an outcome occurring in roughly 40% of participants reports an odds ratio of 3.0. How does this compare to the relative risk?",
    options: ["The OR overestimates the RR because the outcome is common", "The OR and RR will be nearly identical", "The OR underestimates the RR", "The RR cannot be calculated in a cohort study"], correctIndex: 0,
    rationale: "The odds ratio only approximates the relative risk when the outcome is rare, conventionally under about 10%. With a 40% event rate the OR is pushed away from 1.0 and exaggerates the apparent effect. Cohort studies can and should report relative risk directly." },

  { id: "bs-009", domain: "pmr", difficulty: 3, tags: ["Biostatistics", "Effect measures"],
    stem: "A press release states a drug 'cuts the risk of MI by half.' The trial found MI in 2% of controls and 1% of treated patients. What is the NNT?",
    options: ["100", "2", "50", "10"], correctIndex: 0,
    rationale: "The 50% figure is the RRR. The ARR is only 2% − 1% = 1%, giving NNT = 1/0.01 = 100. A halved risk sounds dramatic but 99 of every 100 patients treated derive no benefit from it. Always recalculate the ARR when a claim is framed in relative terms." },

  { id: "bs-010", domain: "pmr", difficulty: 3, tags: ["Biostatistics", "Effect measures"],
    stem: "Baseline risk of the primary outcome is 20% and a trial reports a relative risk reduction of 25%. What is the number needed to treat?",
    options: ["20", "4", "25", "5"], correctIndex: 0,
    rationale: "ARR = baseline risk x RRR = 0.20 x 0.25 = 0.05, so NNT = 1/0.05 = 20. This conversion matters because a fixed RRR produces a very different NNT depending on baseline risk — the same 25% RRR in a population with 2% baseline risk yields an NNT of 200." },

  { id: "bs-011", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Confidence intervals"],
    stem: "A trial reports a relative risk of 0.75 with a 95% confidence interval of 0.55 to 1.02. How should this be interpreted?",
    options: ["A possible benefit that did not reach statistical significance", "A statistically significant 25% reduction in risk", "Statistically significant harm", "Proof that the treatment has no effect"], correctIndex: 0,
    rationale: "For ratio measures such as RR, OR, and HR, the null value is 1.0. This interval crosses 1.0, so the result is not statistically significant at the 0.05 level. That is not the same as proving no effect — the interval is compatible with anything from a 45% reduction to a 2% increase." },

  { id: "bs-012", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Confidence intervals"],
    stem: "A trial reports an absolute risk reduction of 3% with a 95% confidence interval of −1% to 7%. Is this result statistically significant?",
    options: ["No — for a difference measure the interval must exclude 0", "Yes — the point estimate favors treatment", "No — the interval must exclude 1", "Yes — the interval is narrow"], correctIndex: 0,
    rationale: "For DIFFERENCE measures such as ARR, mean difference, and risk difference, the null value is 0; for RATIO measures such as RR, OR, and HR it is 1. This interval spans 0, so it is non-significant. Mixing up the two null values is a common exam trap." },

  { id: "bs-013", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Confidence intervals"],
    stem: "Two trials of the same drug both report a hazard ratio of 0.80. Trial A's 95% CI is 0.60 to 1.07 and Trial B's is 0.74 to 0.86. What does the difference between the intervals tell you?",
    options: ["Trial B provides a more precise estimate, likely from a larger sample", "Trial B found a larger treatment effect", "Trial A had less variability", "The trials disagree about the direction of effect"], correctIndex: 0,
    rationale: "Both trials estimate the same effect size (HR 0.80). The width of a confidence interval reflects precision, driven mostly by sample size and variability, not by the magnitude of effect. Trial B's narrow interval also excludes 1.0, making it statistically significant." },

  /* ---------- Diagnostic testing ---------- */

  { id: "bs-014", domain: "pmr", difficulty: 3, tags: ["Biostatistics", "Diagnostics"],
    stem: "A test is applied to 500 patients. There are 80 true positives, 20 false negatives, 50 false positives, and 350 true negatives. What is the sensitivity?",
    options: ["80%", "87.5%", "61.5%", "86%"], correctIndex: 0,
    rationale: "Sn = TP/(TP + FN) = 80/(80 + 20) = 80%. The denominator is everyone WITH the disease. The 87.5% figure is the specificity, 61.5% is the PPV, and 86% is the overall accuracy — knowing which denominator belongs to which metric is the whole skill here." },

  { id: "bs-015", domain: "pmr", difficulty: 3, tags: ["Biostatistics", "Diagnostics"],
    stem: "Using the same data (80 true positives, 20 false negatives, 50 false positives, 350 true negatives), what is the positive predictive value?",
    options: ["61.5%", "80%", "87.5%", "94.6%"], correctIndex: 0,
    rationale: "PPV = TP/(TP + FP) = 80/(80 + 50) = 80/130 = 61.5%. The denominator is everyone who TESTED POSITIVE. Read across the row for predictive values and down the column for sensitivity and specificity." },

  { id: "bs-016", domain: "pmr", difficulty: 3, tags: ["Biostatistics", "Diagnostics"],
    stem: "A test has a sensitivity of 90% and a specificity of 80%. It is applied to 1000 patients in a population where disease prevalence is 10%. What is the positive predictive value?",
    options: ["33%", "90%", "80%", "99%"], correctIndex: 0,
    rationale: "Of 1000 patients, 100 have disease and 900 do not. TP = 0.90 x 100 = 90 and FP = 0.20 x 900 = 180. PPV = 90/(90 + 180) = 33%. Despite good test characteristics, most positives are false because disease is uncommon — build the 2x2 from prevalence before answering PPV questions." },

  { id: "bs-017", domain: "pmr", difficulty: 3, tags: ["Biostatistics", "Diagnostics"],
    stem: "The same test (sensitivity 90%, specificity 80%) is used in a high-risk ED population where prevalence is 50%. What happens to the predictive values compared with a 10% prevalence population?",
    options: ["PPV rises and NPV falls", "Both PPV and NPV rise", "PPV falls and NPV rises", "Neither changes, since both are test properties"], correctIndex: 0,
    rationale: "At 50% prevalence, TP = 450 and FP = 100, so PPV = 450/550 = 82%, up from 33%. NPV falls from about 99% to 400/450 = 89%. Sensitivity and specificity belong to the TEST and stay fixed; predictive values belong to the POPULATION and move with prevalence." },

  { id: "bs-018", domain: "pmr", difficulty: 3, tags: ["Biostatistics", "Diagnostics"],
    stem: "A D-dimer assay has a sensitivity of 98% and a specificity of 40%. What is the negative likelihood ratio, and what does it mean clinically?",
    options: ["0.05 — a negative result strongly argues against the diagnosis", "1.63 — a negative result mildly supports the diagnosis", "0.40 — a negative result is uninformative", "2.45 — a negative result raises the odds of disease"], correctIndex: 0,
    rationale: "LR− = (1 − Sn)/Sp = 0.02/0.40 = 0.05. An LR− below 0.1 is a strong rule-out. The corresponding LR+ = 0.98/0.60 = 1.63 is nearly useless for ruling in, which is exactly why D-dimer is used to exclude rather than confirm venous thromboembolism." },

  { id: "bs-019", domain: "pmr", difficulty: 3, tags: ["Biostatistics", "Diagnostics"],
    stem: "A test has a sensitivity of 95% and a specificity of 90%. What is the positive likelihood ratio?",
    options: ["9.5", "1.06", "0.06", "0.86"], correctIndex: 0,
    rationale: "LR+ = Sn/(1 − Sp) = 0.95/0.10 = 9.5. An LR+ above 10 is considered a strong rule-in, so this test is close to that threshold. Likelihood ratios are useful because, unlike predictive values, they are independent of prevalence and can be applied to any pretest probability." },

  { id: "bs-020", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Diagnostics"],
    stem: "A rapid strep test is highly specific but only moderately sensitive. How should a positive result be interpreted?",
    options: ["It rules in strep pharyngitis (SpPIN)", "It rules out strep pharyngitis", "It is uninformative without a culture", "It establishes the prevalence of strep in the population"], correctIndex: 0,
    rationale: "SpPIN: a highly SPecific test, when POSitive, rules IN disease, because few false positives occur. SnNOUT is the mirror rule: a highly SeNsitive test, when NEGative, rules OUT. This is why a negative rapid strep in a child is often reflexed to culture — the sensitivity is not high enough to exclude." },

  { id: "bs-021", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Diagnostics"],
    stem: "A laboratory raises the troponin cutoff used to call a result positive. What is the expected effect on the test's performance?",
    options: ["Specificity increases and sensitivity decreases", "Both sensitivity and specificity increase", "Sensitivity increases and specificity decreases", "Neither changes, because both are fixed test properties"], correctIndex: 0,
    rationale: "Raising the threshold means fewer results are called positive, so false positives drop (specificity rises) but true positives are also missed (sensitivity falls). Sensitivity and specificity are independent of PREVALENCE, not of the chosen cutoff — moving the cutoff always trades one against the other." },

  { id: "bs-022", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Diagnostics"],
    stem: "A screening test for a disease affecting 1 in 10,000 people is reported as having 99% accuracy. Why is accuracy a misleading summary here?",
    options: ["A test calling everyone negative would be 99.99% accurate while detecting no cases", "Accuracy cannot be calculated for screening tests", "Accuracy overstates the specificity", "Accuracy is only valid when sensitivity equals specificity"], correctIndex: 0,
    rationale: "Accuracy = (TP + TN)/total, and when disease is rare the true negatives dominate the numerator. A useless test that never returns a positive still scores near-perfect accuracy. Report sensitivity, specificity, and predictive values instead." },

  /* ---------- Hypothesis testing, error, power ---------- */

  { id: "bs-023", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Hypothesis testing"],
    stem: "A trial reports p = 0.03 for its primary outcome. What does this p-value mean?",
    options: ["If the null hypothesis were true, a result at least this extreme would occur 3% of the time", "There is a 3% probability the null hypothesis is true", "There is a 3% probability the finding is due to chance", "There is a 97% probability the treatment works"], correctIndex: 0,
    rationale: "A p-value is calculated ASSUMING the null is true; it is the probability of data this extreme under that assumption. It is not the probability that the null is true, not the probability the result is due to chance, and not the probability the treatment works. Those three misreadings are the most commonly tested errors in biostatistics." },

  { id: "bs-024", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Hypothesis testing"],
    stem: "Investigators conclude a drug reduces mortality when in truth it has no effect. What error has occurred?",
    options: ["Type I error", "Type II error", "Confounding", "Regression to the mean"], correctIndex: 0,
    rationale: "Rejecting a TRUE null hypothesis is a type I error, a false positive, and its probability is alpha. Mnemonic: Type 1 = One word, a false POSITIVE. Type 2 = Two words, a FALSE NEGATIVE, which is failing to detect a real difference." },

  { id: "bs-025", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Power"],
    stem: "A small trial finds no significant difference between two vasopressors, but the confidence interval around the mortality difference is very wide. What is the most likely explanation?",
    options: ["The study was underpowered — absence of evidence is not evidence of absence", "The drugs are proven equivalent", "A type I error occurred", "The null hypothesis has been proven true"], correctIndex: 0,
    rationale: "A non-significant result with a wide interval means the study lacked precision to detect a difference that may well exist — a type II error. You never PROVE the null; you only fail to reject it. Demonstrating equivalence requires a purpose-designed equivalence or noninferiority trial." },

  { id: "bs-026", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Power"],
    stem: "A trial is designed with beta set at 0.20. What is its statistical power?",
    options: ["80%", "20%", "95%", "5%"], correctIndex: 0,
    rationale: "Power = 1 − beta = 1 − 0.20 = 80%, meaning the study has an 80% chance of detecting a true difference of the size it was designed around. Convention is 80% to 90%. Do not confuse beta (type II error) with alpha (type I error, conventionally 0.05)." },

  { id: "bs-027", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Power"],
    stem: "Investigators want to increase the power of a planned trial. Which change would NOT increase power?",
    options: ["Lowering alpha from 0.05 to 0.01", "Enrolling more patients", "Choosing a population with a higher baseline event rate", "Reducing measurement variability"], correctIndex: 0,
    rationale: "Lowering alpha makes the significance threshold stricter and REDUCES power — the trade-off is fewer false positives at the cost of more false negatives. Power rises with a larger sample, a larger true effect size, less variability, or a higher alpha." },

  { id: "bs-028", domain: "pmr", difficulty: 3, tags: ["Biostatistics", "Multiple comparisons"],
    stem: "A trial tests four secondary endpoints in addition to the primary outcome. Applying a Bonferroni correction across the four secondary comparisons, what alpha should be used for each?",
    options: ["0.0125", "0.05", "0.20", "0.01"], correctIndex: 0,
    rationale: "Bonferroni-adjusted alpha = alpha/number of comparisons = 0.05/4 = 0.0125. Without correction, testing many endpoints at 0.05 each inflates the family-wise chance of at least one false positive well above 5%. Bonferroni is conservative but simple and commonly tested." },

  { id: "bs-029", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Multiple comparisons"],
    stem: "A trial's primary endpoint is negative, but a subgroup analysis of diabetic patients shows a significant benefit. How should this be regarded?",
    options: ["Hypothesis-generating only — subgroup findings require prospective confirmation", "As definitive evidence of benefit in diabetics", "As grounds to change practice for diabetic patients", "As proof the primary analysis was underpowered"], correctIndex: 0,
    rationale: "Post-hoc subgroup analyses multiply comparisons and inflate type I error, so a 'significant' subgroup in a negative trial is very often a chance finding. Credible subgroup effects are pre-specified, biologically plausible, supported by a significant interaction test, and reproduced in a later trial." },

  { id: "bs-030", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Hypothesis testing"],
    stem: "Why is a confidence interval generally more informative than a p-value alone?",
    options: ["It conveys both statistical significance and the precision and magnitude of the effect", "It is calculated without assumptions", "It proves the null hypothesis when it crosses the null value", "It is unaffected by sample size"], correctIndex: 0,
    rationale: "A p-value answers only a yes/no question about significance. A confidence interval shows the range of effects compatible with the data, so you can see whether the plausible values are clinically meaningful, and its width tells you how precise the estimate is." },

  { id: "bs-031", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Effect size"],
    stem: "A trial of 40,000 patients reports that a drug lowers systolic blood pressure by 1.2 mmHg with p < 0.001. How should this be interpreted?",
    options: ["A statistically significant but clinically trivial effect", "A clinically important effect because the p-value is very small", "An underpowered study", "Evidence of a large effect size"], correctIndex: 0,
    rationale: "Very large samples can detect vanishingly small differences with impressive p-values. Statistical significance answers whether an effect is detectable; effect size and clinical judgment answer whether it matters. Look at the magnitude and its confidence interval, not the number of zeroes in the p-value." },

  { id: "bs-032", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Effect size"],
    stem: "A study reports a Cohen's d of 0.8 for the difference between two means. How is this best described?",
    options: ["A large effect size", "A small effect size", "A statistically significant result", "A 0.8% difference between groups"], correctIndex: 0,
    rationale: "Cohen's d expresses the difference between two means in standard deviation units: roughly 0.2 small, 0.5 medium, 0.8 large. Effect size answers HOW BIG the difference is, which is a separate question from whether the p-value cleared a threshold." },

  /* ---------- Choosing the right test ---------- */

  { id: "bs-033", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Test selection"],
    stem: "Researchers compare mean systolic blood pressure between a drug group and a placebo group. The data are continuous and normally distributed. Which test is appropriate?",
    options: ["Independent (unpaired) Student t-test", "Paired t-test", "Chi-square test", "One-way ANOVA"], correctIndex: 0,
    rationale: "Two independent groups with a continuous, normally distributed outcome calls for the unpaired t-test. Work through three questions in order: what is the data type, how many groups, and are the groups paired? That sequence identifies the right test nearly every time." },

  { id: "bs-034", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Test selection"],
    stem: "Investigators measure serum potassium in the same 40 patients before and after a treatment protocol. Which test compares the two sets of values?",
    options: ["Paired t-test", "Independent t-test", "Mann-Whitney U test", "Chi-square test"], correctIndex: 0,
    rationale: "The same patients measured twice produces paired data, so the paired t-test is used — it analyzes the within-person differences, which is more powerful than treating the measurements as independent. The nonparametric equivalent is the Wilcoxon signed-rank test." },

  { id: "bs-035", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Test selection"],
    stem: "A study compares median pain scores on a 0-10 scale between two independent groups. The distributions are skewed. Which test is appropriate?",
    options: ["Mann-Whitney U (Wilcoxon rank-sum) test", "Independent t-test", "Paired t-test", "Log-rank test"], correctIndex: 0,
    rationale: "Pain scores are ordinal and the data are skewed, so a nonparametric test is required. Mann-Whitney U is the nonparametric counterpart to the unpaired t-test for two independent groups. Ordinal data are summarized with the median and IQR rather than the mean and SD." },

  { id: "bs-036", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Test selection"],
    stem: "A trial compares mean length of stay across three different sedation protocols. The data are continuous and approximately normal. Which test should be used first?",
    options: ["One-way ANOVA", "Three separate t-tests", "Chi-square test", "Kruskal-Wallis test"], correctIndex: 0,
    rationale: "Three or more independent groups with a normally distributed continuous outcome calls for one-way ANOVA. Running three separate t-tests inflates the family-wise type I error to roughly 14%. ANOVA tells you only THAT a difference exists, so a post-hoc test such as Tukey HSD is needed to locate it." },

  { id: "bs-037", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Test selection"],
    stem: "The same three-group comparison is repeated, but length of stay turns out to be heavily right-skewed. Which test replaces ANOVA?",
    options: ["Kruskal-Wallis test", "Friedman test", "Two-way ANOVA", "McNemar test"], correctIndex: 0,
    rationale: "Kruskal-Wallis is the nonparametric equivalent of one-way ANOVA for three or more independent groups. Friedman is its repeated-measures counterpart for related groups. When normality fails you switch to the nonparametric twin, but the question being asked stays the same." },

  { id: "bs-038", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Test selection"],
    stem: "A study compares the proportion of patients achieving ROSC between two resuscitation strategies, with roughly 200 patients per group. Which test is appropriate?",
    options: ["Chi-square test", "Fisher exact test", "Independent t-test", "Pearson correlation"], correctIndex: 0,
    rationale: "A binary categorical outcome compared across independent groups calls for chi-square, provided every expected cell count is at least 5 and observations are independent. With a sparse table or small expected counts, use the Fisher exact test instead." },

  { id: "bs-039", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Test selection"],
    stem: "A pilot study of 18 patients compares a categorical outcome across two groups; several cells in the 2x2 table have expected counts below 5. Which test should be used?",
    options: ["Fisher exact test", "Chi-square test", "McNemar test", "Mann-Whitney U test"], correctIndex: 0,
    rationale: "Fisher exact replaces chi-square when the sample is small or expected cell counts fall below 5, because the chi-square approximation becomes unreliable there. McNemar is for PAIRED categorical data, which is a different situation." },

  { id: "bs-040", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Test selection"],
    stem: "Investigators record whether each of 120 patients screened positive for delirium before and after a protocol change, comparing each patient with themselves. Which test is appropriate?",
    options: ["McNemar test", "Chi-square test", "Fisher exact test", "Paired t-test"], correctIndex: 0,
    rationale: "McNemar is the test for paired or matched CATEGORICAL data — the same subject assessed twice. Chi-square assumes independent observations and would be wrong here. The paired t-test handles paired CONTINUOUS data, not categorical." },

  { id: "bs-041", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Test selection"],
    stem: "A study compares time to death between two treatment arms over 12 months, with many patients lost to follow-up or still alive at study end. Which analysis is appropriate?",
    options: ["Kaplan-Meier curves compared with the log-rank test", "Chi-square test of mortality at 12 months", "Independent t-test of survival days", "Logistic regression"], correctIndex: 0,
    rationale: "Time-to-event data with censoring requires survival analysis. Kaplan-Meier estimates the survival curves and the log-rank test compares them, correctly handling patients who were censored. A chi-square on mortality at a single timepoint discards all timing information." },

  { id: "bs-042", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Test selection"],
    stem: "Investigators want to estimate the effect of a drug on survival while adjusting for age, renal function, and severity of illness. Which analysis is appropriate?",
    options: ["Cox proportional hazards regression", "Log-rank test", "One-way ANOVA", "Spearman correlation"], correctIndex: 0,
    rationale: "Cox regression models time-to-event data while adjusting for multiple covariates and reports hazard ratios. It assumes hazards remain proportional between groups over time. The log-rank test compares curves but cannot adjust for covariates." },

  { id: "bs-043", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Test selection"],
    stem: "Investigators want to identify which of several patient characteristics predict in-hospital mortality, a yes/no outcome. Which analysis is appropriate?",
    options: ["Logistic regression", "Linear regression", "One-way ANOVA", "Pearson correlation"], correctIndex: 0,
    rationale: "Logistic regression predicts a BINARY outcome from multiple predictors and reports adjusted odds ratios. Linear regression is used when the outcome is CONTINUOUS. Matching the regression type to the outcome type is the key distinction." },

  { id: "bs-044", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Test selection"],
    stem: "A study examines the association between two normally distributed continuous variables, drug clearance and creatinine clearance. Which statistic is appropriate?",
    options: ["Pearson correlation coefficient", "Spearman rank correlation", "Chi-square test", "Cohen's kappa"], correctIndex: 0,
    rationale: "Pearson r measures linear association between two normally distributed continuous variables and runs from −1 to +1. Spearman is the rank-based alternative for ordinal or skewed data. Correlation never establishes causation regardless of how strong r is." },

  { id: "bs-045", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Test selection"],
    stem: "The same 30 patients have their sedation depth scored at four separate timepoints, and the scores are normally distributed. Which test compares the timepoints?",
    options: ["Repeated-measures ANOVA", "One-way ANOVA", "Kruskal-Wallis test", "Independent t-test"], correctIndex: 0,
    rationale: "Three or more measurements in the SAME subjects means repeated-measures ANOVA, which accounts for the within-person correlation. One-way ANOVA assumes independent groups. The nonparametric equivalent for related groups is the Friedman test." },

  /* ---------- Data types and description ---------- */

  { id: "bs-046", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Data types"],
    stem: "NYHA functional class (I through IV) is best described as which type of data?",
    options: ["Ordinal", "Nominal", "Interval", "Ratio"], correctIndex: 0,
    rationale: "The categories have a meaningful order but the spacing between them is not equal, which defines ordinal data. Ordinal data are summarized with the median and interquartile range and analyzed with nonparametric tests. Nominal data such as blood type have no order at all." },

  { id: "bs-047", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Data types"],
    stem: "Serum sodium concentration is best classified as which type of data?",
    options: ["Ratio", "Ordinal", "Nominal", "Interval"], correctIndex: 0,
    rationale: "Ratio data have equal intervals AND a true zero, so ratios are meaningful. Temperature in Celsius is the classic INTERVAL example, since 20 degrees is not twice as warm as 10 degrees. Ratio data are the most informative type and use the mean and SD when normally distributed." },

  { id: "bs-048", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Descriptive"],
    stem: "Hospital length of stay in a cohort is heavily right-skewed by a few very long stays. Which measure best summarizes the central tendency?",
    options: ["Median", "Mean", "Mode", "Standard deviation"], correctIndex: 0,
    rationale: "The median resists distortion by outliers, while the mean is pulled toward the long tail and would overstate a typical stay. Report the median with the interquartile range for skewed data, and the mean with SD only when the distribution is roughly normal." },

  { id: "bs-049", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Descriptive"],
    stem: "What is the difference between the standard deviation and the standard error of the mean?",
    options: ["SD describes the spread of individual values; SEM describes the precision of the estimated mean", "They are two names for the same quantity", "SEM describes the spread of individual values; SD describes precision", "SD applies to samples and SEM applies to populations"], correctIndex: 0,
    rationale: "SD tells you how much individual patients vary. SEM = SD divided by the square root of n, and shrinks as the sample grows, describing how precisely the sample mean estimates the true mean. Papers sometimes report SEM because it looks smaller and tidier — check which one is actually being shown." },

  { id: "bs-050", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Descriptive"],
    stem: "In a normal distribution, approximately what proportion of values falls within two standard deviations of the mean?",
    options: ["95%", "68%", "99.7%", "50%"], correctIndex: 0,
    rationale: "The empirical rule for a normal distribution: about 68% of values lie within 1 SD, about 95% within 2 SD, and about 99.7% within 3 SD. This is the basis for the 95% confidence interval convention." },

  /* ---------- Study design, bias, appraisal ---------- */

  { id: "bs-051", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Study design"],
    stem: "A superiority trial analyzes every patient in the group to which they were randomized, including those who never took the study drug. What is this approach called, and why is it used?",
    options: ["Intention-to-treat — it preserves randomization and estimates real-world effectiveness", "Per-protocol — it estimates biological efficacy", "As-treated — it corrects for nonadherence", "Modified analysis — it excludes protocol violators"], correctIndex: 0,
    rationale: "ITT keeps the randomized groups intact, preserving the balance of known and unknown confounders that randomization created, and reflects effectiveness under real-world nonadherence. It is the preferred primary analysis for superiority trials." },

  { id: "bs-052", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Study design"],
    stem: "Why does a noninferiority trial require a per-protocol analysis alongside the intention-to-treat analysis?",
    options: ["Nonadherence blurs differences between groups, so ITT can falsely favor noninferiority", "Per-protocol analysis is always more valid", "ITT cannot be calculated in noninferiority designs", "Regulators require it only for safety endpoints"], correctIndex: 0,
    rationale: "In a superiority trial, sloppy conduct pushes results toward the null and makes it HARDER to declare superiority — a conservative bias. In a noninferiority trial the same blurring makes the arms look alike and makes it EASIER to declare noninferiority. Both analyses must support the conclusion." },

  { id: "bs-053", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Study design"],
    stem: "A noninferiority trial pre-specifies a margin (delta) of 3% for the difference in mortality. The result is a difference of 1.2% favoring the comparator, with a 95% CI of −0.5% to 3.8%. What is the correct conclusion?",
    options: ["Noninferiority is not established, because the CI extends beyond the margin", "Noninferiority is established, because the point estimate is under 3%", "The new drug is superior", "The new drug is inferior"], correctIndex: 0,
    rationale: "Noninferiority is claimed only when the ENTIRE confidence interval stays within the pre-specified margin. Here the upper bound of 3.8% exceeds delta of 3%, so a clinically unacceptable difference has not been excluded. The point estimate alone never settles the question." },

  { id: "bs-054", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Bias"],
    stem: "In a trial of a new analgesic, outcome assessors know which patients received the active drug. Which bias is this most likely to introduce?",
    options: ["Detection (ascertainment) bias", "Selection bias", "Confounding", "Recall bias"], correctIndex: 0,
    rationale: "Unblinded assessors may measure or interpret outcomes differently by group, which is detection bias, and it matters most for subjective endpoints such as pain. Randomization addresses confounding, allocation concealment addresses selection bias, and blinding addresses performance and detection bias — each safeguard has its own job." },

  { id: "bs-055", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Bias"],
    stem: "What is the purpose of allocation concealment, and how does it differ from blinding?",
    options: ["It hides the upcoming assignment before enrollment, preventing selection bias; blinding hides assignment after enrollment", "It is another term for blinding", "It hides the results from investigators until the trial ends", "It prevents confounding by balancing baseline characteristics"], correctIndex: 0,
    rationale: "Allocation concealment stops enrollers from knowing which arm the next patient will receive, so they cannot steer sicker or healthier patients into a preferred group. Blinding operates AFTER assignment. A trial can be allocation-concealed but unblinded, as in most open-label designs." },

  { id: "bs-056", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Bias"],
    stem: "In a case-control study of medication exposure and birth defects, mothers of affected infants search their memories more thoroughly than control mothers. Which bias does this create?",
    options: ["Recall bias", "Lead-time bias", "Attrition bias", "Publication bias"], correctIndex: 0,
    rationale: "Recall bias arises when cases and controls remember or report past exposures with differing accuracy, and it is a characteristic weakness of retrospective case-control designs. Using objective exposure records such as pharmacy fills rather than interviews reduces it." },

  { id: "bs-057", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Bias"],
    stem: "A screening program appears to improve survival, but only because the disease is detected earlier without changing the date of death. What is this called?",
    options: ["Lead-time bias", "Length-time bias", "Detection bias", "Immortal time bias"], correctIndex: 0,
    rationale: "Lead-time bias inflates measured survival simply by starting the clock earlier, with no change in the actual course of disease. Length-time bias is the related phenomenon where screening preferentially catches slow-growing, better-prognosis disease. Mortality rate, not survival time, is the honest endpoint for screening." },

  { id: "bs-058", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Bias"],
    stem: "An observational study finds coffee drinkers have more lung cancer, but coffee drinkers are also far more likely to smoke. What does smoking represent here?",
    options: ["A confounder", "An effect modifier", "A mediator", "A source of recall bias"], correctIndex: 0,
    rationale: "A confounder is associated with both the exposure and the outcome and does not lie on the causal pathway, distorting the apparent association. Confounding is addressed prospectively by randomization and analytically by stratification, matching, or multivariable adjustment." },

  { id: "bs-059", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Appraisal"],
    stem: "A trial of a lipid-lowering agent reports a significant reduction in LDL but no difference in MI, stroke, or death. How should this be interpreted?",
    options: ["The benefit was shown only on a surrogate endpoint, not a patient-oriented outcome", "The drug reduces cardiovascular events", "The study was underpowered by definition", "LDL reduction guarantees eventual mortality benefit"], correctIndex: 0,
    rationale: "Surrogate endpoints such as LDL, HbA1c, and blood pressure are stand-ins that may or may not translate into outcomes patients feel. Drugs have improved surrogates while worsening hard outcomes. Patient-oriented evidence — death, MI, stroke, symptoms, function — is what should drive practice change." },

  { id: "bs-060", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Appraisal"],
    stem: "A trial's composite primary endpoint of death, MI, or urgent revascularization is significantly reduced. What should you check before applying this result?",
    options: ["Whether the result was driven by the least patient-important component", "Whether the sample size exceeded 1000", "Whether the p-value was below 0.01", "Whether the trial was industry-funded"], correctIndex: 0,
    rationale: "Composite endpoints are often driven by the most frequent and softest component, here urgent revascularization, while mortality shows no difference at all. Always inspect the individual components — the headline result can rest entirely on the outcome that matters least." },

  { id: "bs-061", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Meta-analysis"],
    stem: "A meta-analysis of eight trials reports I-squared of 82%. What does this indicate?",
    options: ["Considerable heterogeneity — pooling the studies may not be appropriate", "Excellent agreement between studies", "82% of patients benefited", "The pooled effect is statistically significant"], correctIndex: 0,
    rationale: "I-squared estimates the proportion of variability across studies due to real differences rather than chance: under 25% is low, around 50% moderate, and over 75% considerable. High heterogeneity suggests the trials differed meaningfully in population, dose, or outcome definition, so a single pooled estimate may be misleading." },

  { id: "bs-062", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Meta-analysis"],
    stem: "A funnel plot in a meta-analysis is markedly asymmetric, with small negative studies missing. What does this suggest?",
    options: ["Publication bias, which inflates the pooled effect estimate", "High statistical power", "Excellent methodological quality", "That a random-effects model was used"], correctIndex: 0,
    rationale: "Small studies scatter widely and large ones cluster near the true effect, producing a symmetric funnel when all results are published. Missing small negative studies skews the plot and inflates the pooled estimate, since positive findings are published more readily than null ones." },

  { id: "bs-063", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Study design"],
    stem: "For a question about the harm of a rare adverse drug event with a long latency, which study design is usually most efficient?",
    options: ["Case-control study", "Randomized controlled trial", "Prospective cohort study", "Cross-sectional survey"], correctIndex: 0,
    rationale: "Case-control designs start from the outcome and look backward, so they are efficient for rare events and long latencies where a prospective cohort would need enormous numbers and years of follow-up. The trade-off is vulnerability to recall and selection bias, and only odds ratios can be calculated." },

  { id: "bs-064", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Appraisal"],
    stem: "A well-conducted RCT of an ED sepsis intervention enrolled only patients under 65 with no comorbidities. Your patient is 82 with heart failure and CKD. Which aspect of the trial is in question?",
    options: ["External validity (generalizability)", "Internal validity", "Statistical power", "Allocation concealment"], correctIndex: 0,
    rationale: "Internal validity concerns whether the trial correctly measured an effect in ITS patients, and rigorous methods can make that strong. External validity concerns whether that result transfers to YOUR patient. A methodologically flawless trial in a narrow population can still be inapplicable at the bedside." },

  { id: "bs-065", domain: "pmr", difficulty: 2, tags: ["Biostatistics", "Study design"],
    stem: "A trial is stopped early at an interim analysis because the treatment shows a large benefit. What is the main concern with this result?",
    options: ["Trials stopped early for benefit tend to overestimate the true effect size", "The result cannot be published", "The type II error rate is inflated", "Randomization is invalidated by stopping early"], correctIndex: 0,
    rationale: "Stopping rules are triggered by a favorable random fluctuation as often as by a genuine large effect, so early-stopped trials systematically exaggerate benefit, particularly when few events have accrued. Pre-specified stopping boundaries such as O'Brien-Fleming limit but do not eliminate this." }

];
