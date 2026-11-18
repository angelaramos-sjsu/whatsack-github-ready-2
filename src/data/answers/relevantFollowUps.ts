import type { ScriptedAnswer } from './types';

/**
 * Editorially curated next questions for the 72 Education & Workforce scripts.
 * Each id points to an approved, already-registered scripted answer.
 * A next question is actionable and relevant to the answer just given.
 */
const educationWorkforceFollowUps: Record<string, string[]> = {
  "ans-goal-sofia-entry": [],
  "ans-pathway-sofia-s1": [
    "ans-pathway-sofia-s2",
    "ans-pathway-sofia-s3",
    "ans-pathway-sofia-s6"
  ],
  "ans-pathway-sofia-s2": [
    "ans-pathway-sofia-s3",
    "ans-pathway-sofia-s1",
    "ans-pathway-sofia-s5"
  ],
  "ans-pathway-sofia-s3": [
    "ans-fafsa-intro",
    "ans-fafsa-aid-types",
    "ans-fafsa-ca-after"
  ],
  "ans-pathway-sofia-s4": [
    "ans-sara-majors",
    "ans-sara-transfer",
    "ans-ew-support-classes"
  ],
  "ans-pathway-sofia-s5": [
    "ans-pathway-sofia-s3",
    "ans-pathway-sofia-s2",
    "ans-pathway-sofia-s6"
  ],
  "ans-pathway-sofia-s6": [
    "ans-college-fafsa-vs-cadaa",
    "ans-pathway-sofia-s3",
    "ans-pathway-sofia-s1"
  ],
  "ans-pathway-sofia-s7": [
    "ans-pathway-sofia-s1",
    "ans-pathway-sofia-s2",
    "ans-ew-support-classes"
  ],
  "ans-pathway-sofia-s8": [
    "ans-pathway-sofia-careers",
    "ans-pathway-sofia-undecided",
    "ans-pathway-sofia-s6"
  ],
  "ans-pathway-sofia-careers": [
    "ans-pathway-sofia-s8",
    "ans-pathway-sofia-s4",
    "ans-pathway-sofia-undecided"
  ],
  "ans-pathway-sofia-undecided": [
    "ans-pathway-sofia-s2",
    "ans-pathway-sofia-careers",
    "ans-pathway-sofia-s8"
  ],
  "ans-ew-s1": [
    "ans-ew-support-classes",
    "ans-ew-support-firstgen-scholar",
    "ans-ew-support-transfer"
  ],
  "ans-ew-s2": [
    "ans-fafsa-aid-types",
    "ans-fafsa-apply",
    "ans-fafsa-cash4college"
  ],
  "ans-ew-s3": [
    "ans-fafsa-grants-v-scholarships",
    "ans-fafsa-pell-cal",
    "ans-fafsa-apply"
  ],
  "ans-ew-s4": [
    "ans-ew-support-classes",
    "ans-sara-transfer",
    "ans-ew-support-supplies"
  ],
  "ans-ew-s5": [
    "ans-ew-support-withdraw",
    "ans-ew-support-highschool-scholar",
    "ans-sara-transfer"
  ],
  "ans-ew-s6": [
    "ans-ew-support-parttime",
    "ans-ew-support-workstudy",
    "ans-ew-s3"
  ],
  "ans-ew-support-classes": [
    "ans-sara-transfer",
    "ans-ew-s4",
    "ans-ew-s1"
  ],
  "ans-ew-support-transfer": [
    "ans-sara-transfer",
    "ans-ew-s1",
    "ans-ew-support-classes"
  ],
  "ans-ew-support-supplies": [
    "ans-ew-s3",
    "ans-ew-s2",
    "ans-ew-s1"
  ],
  "ans-ew-support-firstgen-scholar": [
    "ans-ew-s3",
    "ans-ew-s1",
    "ans-college-fafsa-vs-cadaa"
  ],
  "ans-ew-support-highschool-scholar": [
    "ans-ew-s3",
    "ans-college-fafsa-vs-cadaa",
    "ans-pathway-sofia-s3"
  ],
  "ans-ew-support-withdraw": [
    "ans-ew-support-classes",
    "ans-ew-s4",
    "ans-ew-s6"
  ],
  "ans-ew-support-parttime": [
    "ans-fafsa-aid-types",
    "ans-ew-s6",
    "ans-college-fafsa-vs-cadaa"
  ],
  "ans-ew-support-workstudy": [
    "ans-ew-s6",
    "ans-ew-support-parttime",
    "ans-ew-s3"
  ],
  "ans-sara-college-start": [
    "ans-sara-nearby-colleges",
    "ans-sara-affordability",
    "ans-sara-fafsa-cadaa"
  ],
  "ans-sara-nearby-colleges": [
    "ans-sara-transfer",
    "ans-sara-affordability",
    "ans-sara-majors"
  ],
  "ans-sara-majors": [
    "ans-sara-transfer",
    "ans-ew-support-classes",
    "ans-pathway-sofia-s4"
  ],
  "ans-sara-transfer": [
    "ans-ew-support-transfer",
    "ans-sara-affordability",
    "ans-ew-support-classes"
  ],
  "ans-sara-affordability": [
    "ans-sara-fafsa-cadaa",
    "ans-ew-support-supplies",
    "ans-ew-s3"
  ],
  "ans-sara-fafsa-cadaa": [
    "ans-fafsa-apply",
    "ans-fafsa-cadaa-apply",
    "ans-fafsa-cash4college"
  ],
  "ans-sara-family-income": [
    "ans-sara-fafsa-cadaa",
    "ans-sara-next-steps",
    "ans-ew-s3"
  ],
  "ans-sara-first-generation": [
    "ans-ew-s1",
    "ans-sara-next-steps",
    "ans-ew-support-firstgen-scholar"
  ],
  "ans-sara-after-graduation": [
    "ans-ew-s4",
    "ans-sara-next-steps",
    "ans-sara-fafsa-cadaa"
  ],
  "ans-sara-next-steps": [
    "ans-ew-support-classes",
    "ans-sara-transfer",
    "ans-sara-fafsa-cadaa"
  ],
  "ans-college-tuition-free": [
    "ans-fafsa-aid-types",
    "ans-fafsa-promise",
    "ans-college-fafsa-vs-cadaa"
  ],
  "ans-college-fafsa-vs-cadaa": [
    "ans-fafsa-apply",
    "ans-fafsa-cadaa-apply",
    "ans-fafsa-mixedstatus"
  ],
  "ans-college-campus-help": [
    "ans-college-fafsa-vs-cadaa",
    "ans-college-promise-requirements",
    "ans-ew-s4"
  ],
  "ans-college-promise-requirements": [
    "ans-college-fafsa-vs-cadaa",
    "ans-ew-support-parttime",
    "ans-ew-support-supplies"
  ],
  "ans-goal-daniel-entry": [],
  "ans-pathway-daniel-d1": [
    "ans-ew-d7",
    "ans-pathway-daniel-d3",
    "ans-pathway-daniel-d4"
  ],
  "ans-pathway-daniel-d2": [
    "ans-pathway-daniel-d6",
    "ans-pathway-daniel-d5",
    "ans-ew-d4"
  ],
  "ans-pathway-daniel-d3": [
    "ans-ew-support-resume",
    "ans-pathway-daniel-d1",
    "ans-pathway-daniel-d5"
  ],
  "ans-pathway-daniel-d4": [
    "ans-ew-support-employer",
    "ans-ew-d7",
    "ans-ew-d8"
  ],
  "ans-pathway-daniel-d5": [
    "ans-pathway-daniel-d2",
    "ans-pathway-daniel-d3",
    "ans-pathway-daniel-d6"
  ],
  "ans-pathway-daniel-d6": [
    "ans-pathway-daniel-d2",
    "ans-ew-d4",
    "ans-ew-d3"
  ],
  "ans-pathway-daniel-d7": [
    "ans-ew-d7",
    "ans-pathway-daniel-d2",
    "ans-ew-d2"
  ],
  "ans-pathway-daniel-d8": [
    "ans-pathway-daniel-d1",
    "ans-ew-support-ajcc",
    "ans-pathway-daniel-compare"
  ],
  "ans-pathway-daniel-certificate": [
    "ans-ew-d5",
    "ans-ew-support-wioa",
    "ans-pathway-daniel-d4"
  ],
  "ans-pathway-daniel-compare": [
    "ans-pathway-daniel-d1",
    "ans-pathway-daniel-d4",
    "ans-pathway-daniel-d5"
  ],
  "ans-ew-d1": [
    "ans-ew-d5",
    "ans-ew-d7",
    "ans-pathway-daniel-d4"
  ],
  "ans-ew-d2": [
    "ans-ew-support-shortcert",
    "ans-ew-d6",
    "ans-ew-d5"
  ],
  "ans-ew-d3": [
    "ans-ew-d6",
    "ans-ew-d4",
    "ans-work-evening-classes"
  ],
  "ans-ew-d4": [
    "ans-ew-support-pell",
    "ans-ew-support-wioa",
    "ans-ew-support-scholar-costs"
  ],
  "ans-ew-d5": [
    "ans-ew-support-wioa",
    "ans-ew-support-shortcert",
    "ans-ew-d4"
  ],
  "ans-ew-d6": [
    "ans-ew-support-cpl-evidence",
    "ans-ew-d3",
    "ans-pathway-daniel-d2"
  ],
  "ans-ew-d7": [
    "ans-ew-support-resume",
    "ans-ew-support-ajcc",
    "ans-pathway-daniel-d1"
  ],
  "ans-ew-d8": [
    "ans-ew-support-reportedd",
    "ans-ew-support-ctb-search",
    "ans-ew-support-wioa"
  ],
  "ans-ew-support-employer": [
    "ans-pathway-daniel-d4",
    "ans-ew-d1",
    "ans-ew-d7"
  ],
  "ans-ew-support-shortcert": [
    "ans-ew-d5",
    "ans-pathway-daniel-certificate",
    "ans-ew-support-wioa"
  ],
  "ans-ew-support-pell": [
    "ans-ew-d4",
    "ans-ew-support-wioa",
    "ans-ew-d3"
  ],
  "ans-ew-support-wioa": [
    "ans-ew-d5",
    "ans-ew-support-shortcert",
    "ans-ew-d7"
  ],
  "ans-ew-support-scholar-costs": [
    "ans-ew-d4",
    "ans-ew-d5",
    "ans-ew-support-wioa"
  ],
  "ans-ew-support-cpl-evidence": [
    "ans-ew-d6",
    "ans-ew-d3"
  ],
  "ans-ew-support-ajcc": [
    "ans-ew-support-resume",
    "ans-ew-d7",
    "ans-ew-d2"
  ],
  "ans-ew-support-resume": [
    "ans-ew-support-ajcc",
    "ans-ew-d7",
    "ans-pathway-daniel-d3"
  ],
  "ans-ew-support-reportedd": [
    "ans-ew-d8",
    "ans-ew-support-ctb-search"
  ],
  "ans-ew-support-ctb-search": [
    "ans-ew-d8",
    "ans-ew-support-reportedd"
  ],
  "ans-work-tech-certificates": [
    "ans-ew-d5",
    "ans-ew-d8",
    "ans-ew-support-ajcc"
  ],
  "ans-work-edd-impact": [
    "ans-ew-support-reportedd",
    "ans-ew-support-ctb-search",
    "ans-ew-d8"
  ],
  "ans-work-evening-classes": [
    "ans-ew-d3",
    "ans-ew-d5",
    "ans-pathway-daniel-d6"
  ],
  "ans-work-interview-practice": [
    "ans-ew-support-resume",
    "ans-ew-support-ajcc",
    "ans-ew-d7"
  ]
};

/**
 * Never suggest the exact answer again. For other WhatSack topics, preserve
 * their reviewed follow-ups while keeping the UI concise. Combined support
 * requests may include four questions (two from each requested category).
 */
export const getRelevantFollowUpIds = (answer: ScriptedAnswer): string[] => {
  if (answer.pathwayChoices?.length || answer.topic === 'fallback') return [];
  const explicit = educationWorkforceFollowUps[answer.id];
  const candidates = explicit ?? answer.followUpIds ?? [];
  const maxItems = answer.needSuggestions?.length ? Math.min(6, answer.needSuggestions.length * 2) : 3;
  return [...new Set(candidates)].filter((id) => id !== answer.id).slice(0, maxItems);
};
