---
tags: [step2, biostats, epidemiology]
system: "Biostatistics & Epidemiology"
topic: "Sensitivity and Specificity"
source: "[[uworld-q-107550]]"
difficulty: easy
last_reviewed: 2026-04-05
related:
  - "[[diagnostic-accuracy]]"
---
# Sensitivity and Specificity (Complements)

## Summary
Sensitivity and specificity are intrinsic properties of a diagnostic test. Understanding their complements (False Positive and False Negative rates) is critical for interpreting test results.

## Definitions
- **Sensitivity:** Probability that an individual **with the disease** will have a **positive test result**.
    - $Sensitivity = \frac{TP}{TP + FN}$
- **Specificity:** Probability that an individual **without the disease** will have a **negative test result**.
    - $Specificity = \frac{TN}{TN + FP}$

## The Complements (Error Rates)
The complements of sensitivity and specificity describe the probability of incorrect identification.

### 1. False Negative Rate (FNR)
- **Formula:** $100\% - Sensitivity$
- **Meaning:** The percentage of individuals **with the disease** who are **incorrectly identified as negative**.
- **Clinical Impact:** High FNR means more diseased patients are missed (screen-out failure).

### 2. False Positive Rate (FPR)
- **Formula:** $100\% - Specificity$
- **Meaning:** The percentage of individuals **without the disease** who are **incorrectly identified as positive**.
- **Clinical Impact:** High FPR means more healthy patients are subjected to unnecessary follow-up/treatment (over-diagnosis).

## Example Application
If a test has **Sensitivity = 26%** and **Specificity = 95%**:
- **FNR:** $100\% - 26\% = 74\%$ (74% of diseased patients will test negative).
- **FPR:** $100\% - 95\% = 5\%$ (5% of healthy patients will test positive).

## Common Traps
- Confusing Specificity with PPV $\rightarrow$ Specificity is about the population **without** disease; PPV is about the population that **tested positive**.
- Confusing Sensitivity with NPV $\rightarrow$ Sensitivity is about the population **with** disease; NPV is about the population that **tested negative**.
