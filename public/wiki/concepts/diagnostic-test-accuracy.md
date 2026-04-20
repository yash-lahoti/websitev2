---
tags: [step2, biostats]
system: "Biostatistics & Epidemiology"
topic: "Diagnostic Test Accuracy"
source: "[[uworld-q-20541]]"
difficulty: medium
last_reviewed: 2026-04-05
related:
  - "[[sensitivity-and-specificity]]"
---
# Diagnostic Test Accuracy

## Definition
Accuracy is the probability that an individual is **correctly classified** by a diagnostic test. It represents the overall proportion of correct results (both true positives and true negatives) out of the total number of people tested.

## Calculation
The formula for accuracy is:
$$\text{Accuracy} = \frac{\text{True Positives (TP)} + \text{True Negatives (TN)}}{\text{Total Number of Individuals Tested}}$$

$$\text{Total} = \text{TP} + \text{TN} + \text{False Positives (FP)} + \text{False Negatives (FN)}$$

## Step-by-Step Derivation (from Prevalence, Sens, Spec)
When given prevalence, sensitivity, and specificity, the easiest way to calculate accuracy is to assume a sample size (e.g., $N=100$):

1. **Determine Disease Status:**
   - $\text{Infected} = \text{Prevalence} \times N$
   - $\text{Uninfected} = N - \text{Infected}$
2. **Calculate Correct Classifications:**
   - $\text{True Positives (TP)} = \text{Sensitivity} \times \text{Infected}$
   - $\text{True Negatives (TN)} = \text{Specificity} \times \text{Uninfected}$
3. **Compute Accuracy:**
   - $\text{Accuracy} = \frac{\text{TP} + \text{TN}}{N}$

## Related Metrics
- **Positive Predictive Value (PPV):** Probability that a positive result is a true positive. $\frac{\text{TP}}{\text{TP} + \text{FP}}$.
- **Negative Predictive Value (NPV):** Probability that a negative result is a true negative. $\frac{\text{TN}}{\text{TN} + \text{FN}}$.
- **Likelihood Ratios:** Help determine how much a test result changes the post-test probability of disease.
