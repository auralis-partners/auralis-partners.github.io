---
layout: post
title: "Can GPT Help Match Employees to Projects? We Ran an Experiment."
date: 2025-08-19 09:00:00 +0100
categories: [experiment, ai, staffing]
tags: [LLM, GPT, project-management]
---

At our software agency, one challenge keeps coming up again and again:
**How do we match the right people to the right projects — quickly and accurately?**
<br>
<br>
We wondered: could large language models (LLMs) help with this?

## The Challenge

At Auralis, we work with software engineers across a wide range of disciplines — from embedded systems to machine learning to cloud — and new projects come in every day.
Manually reviewing CVs, cross-checking with project requirements, and notifying good candidates is time-consuming  — especially when juggling dozens of projects and candidates each week.
<br>
<br>
The idea of using an LLM to assist with this seemed promising. 
But fully automated, "agentic" workflows are still too unreliable in practice for something as sensitive as staffing. 
We didn’t want the model making unverified decisions — but **if it could generate suggestions that were fast to review**, it could save us valuable time.

## What We Wanted

We set out with one simple goal:
<br><br>
✅ **Use an LLM to _score_ the fit between a given employee and a project.** <br>
👉 High scores would trigger a notification to our team with a link to the project and candidate — allowing quick, human review.<br>
<br>
Our key requirements:

- **Low cost** — we don't want to spend hundreds of dollars per month on API usage.

- **Accuracy** — scores should align with human judgment.

- **Consistency** — the same project-employee pair should yield stable scores. Fluctuations would erode trust.

- **Efficiency** — ideally, minimize the number of API calls needed.

## Experiment Setup

We explored two main approaches:
1. **Individual prompt strategy** — one API call per employee-project pair.
2. **Combined prompt strategy** — one project, multiple employees scored in one API call (to save tokens).

We also tested various models in the OpenAI family — balancing latency, cost, and reasoning power.


**The Prompt**

For the individual prompt strategy, we crafted a structured set of instructions for the LLM:

- Extract "must-have" and "secondary" skills from the project.
- Compare these to the employee's CV.
- Score the match (0–10) based on clear rules:
    - Strong match with all "must-have" skills? ➜ 8–10.
    - No "must-have" skills? ➜ Score below 8.
    - Partial match? ➜ 5–7.
- Output a structured JSON with just the score.

**Additionally**, to improve robustness and allow for better understanding of why a certain score was given, 
the LLM is instructed to generate **bullet-point “thoughts”** at each step:
- This extra context helps produce more stable and consistent results.
- It acts as lightweight "debug" output when a score seems off — giving us insight into how the model interpreted both the project and the employee CV.
- The bullet points also allow us to iteratively refine and tune the prompt if necessary (tightening or loosening match criteria).


### Testing the Individual Prompt Strategy
Since the goal was to score **many employee–project pairs every day**, reasoning-heavy models (like GPT-4o or o1) weren’t a good fit — too slow, too expensive, and unnecessary for this task.
<br>
What we needed for the individual prompt strategy was:
- Fast responses
- Low cost per request
- Good enough reasoning to follow structured instructions

That narrowed our choices to the **4.1 model family**. <br>
To test consistency, we ran each project–employee pair 10 times with both models, looking at how stable the scores were.

#### First Test: One Project, One Employee — 10 Runs
To get our feet wet, we started simple: One project. One employee. Run 10 times.
<br>
We picked a _spring/go project_ and scored the same employee 10x with both models to check for consistency.
<br>
<br>
<style>
.results {
  background: #f9f9f9;
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  display: inline-block;
  margin: 4px 0;
}
</style>

**4.1-nano** was disappointingly noisy, fluctuating by as much as 4 points for the exact same input — too unpredictable:  
<div class="results">3, 3, 4, 4, 4, 4, 4, 4, 4, 7</div>  

**4.1-mini** on the other hand, was much more stable:  
<div class="results">6, 6, 6, 6, 7, 7, 7, 7, 7, 7</div>
<br>

Across multiple projects, this pattern held:

<style>
table {
  border-collapse: collapse;
  width: 100%;
  font-size: 14px;
}
th, td {
  border: 1px solid #ccc;
  padding: 6px 10px;
  text-align: left;
}
th {
  background: #f8f8f8;
}
</style>

<table>
  <thead>
    <tr>
      <th>Project</th>
      <th>mini (values)</th>
      <th>nano (values)</th>
      <th>mini range</th>
      <th>nano range</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>project_ai_mlops_engineer</td>
      <td>2, 2, 3, 3, 3, 3, 3, 3, 3, 3</td>
      <td>3, 3, 4, 4, 4, 4, 4, 4, 4, 7</td>
      <td><b>1</b></td>
      <td>4</td>
    </tr>
    <tr>
      <td>project_ai_robotic</td>
      <td>3, 4, 4, 4, 4, 4, 4, 4, 4, 4</td>
      <td>4, 4, 4, 4, 4, 4, 5, 5, 6, 7</td>
      <td><b>1</b></td>
      <td>3</td>
    </tr>
    <tr>
      <td>project_aws</td>
      <td>6, 6, 6, 6, 6, 6, 6, 6, 7, 7</td>
      <td>7, 7, 7, 7, 7, 8, 8, 8, 8, 8</td>
      <td><b>1</b></td>
      <td>1</td>
    </tr>
    <tr>
      <td>project_cloud</td>
      <td>8, 8, 8, 8, 8, 8, 9, 9, 9, 9</td>
      <td>7, 8, 8, 8, 8, 8, 9, 9, 9, 9</td>
      <td><b>1</b></td>
      <td>2</td>
    </tr>
    <tr>
      <td>project_embedded</td>
      <td>1, 1, 1, 2, 2, 2, 2, 2, 2, 2</td>
      <td>0, 1, 1, 1, 1, 1, 1, 2, 2, 2</td>
      <td><b>1</b></td>
      <td>2</td>
    </tr>
    <tr>
      <td>project_embedded_architect</td>
      <td>1, 1, 2, 2, 2, 2, 2, 2, 2, 2</td>
      <td>1, 2, 2, 2, 2, 2, 2, 2, 2, 2</td>
      <td><b>1</b></td>
      <td>1</td>
    </tr>
    <tr>
      <td>project_react_spring</td>
      <td>9, 9, 9, 9, 9, 9, 9, 9, 9, 9</td>
      <td>8, 8, 9, 9, 9, 9, 9, 9, 10, 10</td>
      <td><b>0</b></td>
      <td>2</td>
    </tr>
    <tr>
      <td>project_spring</td>
      <td>6, 6, 6, 6, 7, 7, 7, 7, 7, 7</td>
      <td>4, 4, 4, 5, 5, 6, 6, 7, 7, 7</td>
      <td><b>1</b></td>
      <td>3</td>
    </tr>
    <tr>
      <td>project_spring_azure</td>
      <td>8, 9, 9, 9, 9, 9, 9, 9, 9, 9</td>
      <td>7, 9, 9, 9, 9, 9, 9, 9, 9, 10</td>
      <td><b>1</b></td>
      <td>3</td>
    </tr>
  </tbody>
</table>




### What About the Combined Prompt Strategy?

We also tested the combined approach — putting multiple employees in one prompt to further reduce API calls:

- **mini**: quality degraded — skipped steps, inconsistent bullet points.
- **higher models (4.1 full, o1)**: much better output, but token costs increased significantly  — making each request more expensive relative to the number of employees scored. Results also remained less stable compared to the individual prompt approach.
<br>

These findings align with the [OpenAI-MRCR tests](https://openai.com/index/gpt-4-1/) published by OpenAI.
<br>

<img 
  src="{{ '/assets/posts/openai-mrcr.svg' | relative_url }}" 
  alt="OpenAI MRCR accuracy graphic" 
  width="600" 
/>

<br>

## Key Takeaways

✅ The **individual prompt strategy with 4.1-mini** hit the sweet spot: <br>
Stable, accurate, cheap. <br>
<br>
⚠️ The **combined strategy** — while tempting — wasn’t worth it. Output degraded and cost was actually higher.

## Reflection

This experiment taught us something valuable:
<br><br>
👉 You don’t need complex agentic workflows to get value from LLMs. <br>
👉 A well-designed prompt + lightweight model = practical gains today. <br>
<br>
If your team is exploring LLMs for similar use cases — consider focusing first on simple, human-in-the-loop scenarios.