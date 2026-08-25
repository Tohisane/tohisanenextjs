export type Dimension =
  | "Clarity"
  | "Recovery"
  | "Leadership"
  | "Purpose"
  | "Belonging"
  | "Communication"
  | "Workload"
  | "Environment"

export type Question = {
  id: string
  dimension: Dimension
  prompt: string
  reverse?: boolean
}

export const dimensions: Dimension[] = [
  "Clarity",
  "Recovery",
  "Leadership",
  "Purpose",
  "Belonging",
  "Communication",
  "Workload",
  "Environment",
]

export const dimensionIntros: Record<Dimension, string> = {
  Clarity: "Do people understand expectations, priorities, and what success looks like?",
  Recovery: "Does the culture allow people to restore energy and use time away from work?",
  Leadership: "Do managers create trust, recognition, and consistency?",
  Purpose: "Can employees connect their work to a meaningful organizational mission?",
  Belonging: "Do people feel respected, included, and connected?",
  Communication: "Does useful information move clearly across teams and levels?",
  Workload: "Are demands, resources, and employee control reasonably balanced?",
  Environment: "Does the physical and cultural environment support focused, healthy work?",
}

export const questions: Question[] = [
  { id: "q1", dimension: "Clarity", prompt: "Employees understand what success looks like in their roles." },
  { id: "q2", dimension: "Clarity", prompt: "Priorities remain clear when demands or deadlines change." },
  { id: "q3", dimension: "Clarity", prompt: "Employees know where to go when they need information or support." },

  { id: "q4", dimension: "Recovery", prompt: "Employees are able to disconnect from work outside normal working hours." },
  {
    id: "q5",
    dimension: "Recovery",
    prompt: "People use their paid time off without fear of falling behind or appearing less committed.",
  },
  { id: "q6", dimension: "Recovery", prompt: "The organization allows enough recovery after unusually demanding periods." },

  { id: "q7", dimension: "Leadership", prompt: "Managers communicate expectations consistently and respectfully." },
  { id: "q8", dimension: "Leadership", prompt: "Good work is recognized in meaningful ways." },
  {
    id: "q9",
    dimension: "Leadership",
    prompt: "Leaders model the healthy work practices they encourage employees to follow.",
  },

  {
    id: "q10",
    dimension: "Purpose",
    prompt: "Employees understand how their work contributes to the organization's mission.",
  },
  { id: "q11", dimension: "Purpose", prompt: "The organization's stated values are visible in daily decisions." },
  {
    id: "q12",
    dimension: "Purpose",
    prompt: "People can see a meaningful connection between their effort and the people they serve.",
  },

  {
    id: "q13",
    dimension: "Belonging",
    prompt: "Employees feel respected regardless of role, background, or level of seniority.",
  },
  { id: "q14", dimension: "Belonging", prompt: "People feel safe asking for help before a problem becomes a crisis." },
  { id: "q15", dimension: "Belonging", prompt: "Employees have a genuine sense of connection with their team." },

  { id: "q16", dimension: "Communication", prompt: "Important information reaches the right people in time to act." },
  {
    id: "q17",
    dimension: "Communication",
    prompt: "Employees receive useful feedback, not only criticism when something goes wrong.",
  },
  {
    id: "q18",
    dimension: "Communication",
    prompt: "Departments communicate effectively across organizational boundaries.",
  },

  { id: "q19", dimension: "Workload", prompt: "Work demands are generally realistic for the time and resources available." },
  {
    id: "q20",
    dimension: "Workload",
    prompt: "Employees have reasonable control over how they organize and complete their work.",
  },
  {
    id: "q21",
    dimension: "Workload",
    prompt: "Persistent overload is addressed as an organizational issue rather than an individual weakness.",
  },

  {
    id: "q22",
    dimension: "Environment",
    prompt: "The physical workplace supports concentration, comfort, and effective work.",
  },
  { id: "q23", dimension: "Environment", prompt: "Employees can access quiet, private, or restorative space when needed." },
  {
    id: "q24",
    dimension: "Environment",
    prompt: "Workplace policies and systems make healthy choices easier, not harder.",
  },
]

export const responseOptions = [
  { label: "Strongly disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Neutral", value: 3 },
  { label: "Agree", value: 4 },
  { label: "Strongly agree", value: 5 },
]

export const questionsPerStep = 3

export type AssessmentResult = {
  overall: number
  dimensionScores: Record<Dimension, number>
}

export function calculateScores(answers: Record<string, number>): AssessmentResult {
  const byDimension = Object.fromEntries(dimensions.map((d) => [d, [] as number[]])) as Record<Dimension, number[]>

  for (const question of questions) {
    const raw = answers[question.id]
    if (!raw) continue
    const value = question.reverse ? 6 - raw : raw
    byDimension[question.dimension].push(value)
  }

  const dimensionScores = Object.fromEntries(
    dimensions.map((dimension) => {
      const values = byDimension[dimension]
      const average = values.length > 0 ? values.reduce((sum, v) => sum + v, 0) / values.length : 0
      return [dimension, Math.round(((average - 1) / 4) * 100)]
    }),
  ) as Record<Dimension, number>

  const overall = Math.round(
    dimensions.reduce((sum, dimension) => sum + dimensionScores[dimension], 0) / dimensions.length,
  )

  return { overall, dimensionScores }
}

export function scoreBand(score: number) {
  if (score >= 80)
    return {
      title: "Strong salutogenic foundation",
      description:
        "Your workplace appears to create many of the conditions that help people understand demands, access resources, and sustain healthy performance.",
    }
  if (score >= 65)
    return {
      title: "Generally supportive, with meaningful pressure points",
      description:
        "Your organization has several healthy foundations, but some workplace conditions may be creating avoidable strain or inconsistency.",
    }
  if (score >= 50)
    return {
      title: "Mixed workplace conditions",
      description:
        "Employees may experience supportive practices in some areas and chronic friction in others. Targeted changes could produce a noticeable improvement.",
    }
  return {
    title: "High organizational strain",
    description:
      "Several workplace conditions may be making health, trust, and sustainable performance harder to maintain. Prioritization is important.",
  }
}

export const recommendations: Record<Dimension, string> = {
  Clarity: "Clarify decision rights, weekly priorities, and where employees should go for answers.",
  Recovery: "Review after-hours expectations, PTO usage, meeting load, and recovery after peak periods.",
  Leadership: "Equip managers with practical habits for recognition, consistency, and healthy role-modeling.",
  Purpose: "Reconnect daily work to the organization's mission, values, customers, and community impact.",
  Belonging: "Strengthen psychological safety, peer connection, and respectful help-seeking across levels.",
  Communication:
    "Reduce information bottlenecks and establish predictable feedback and cross-team communication.",
  Workload: "Examine staffing, competing priorities, employee control, and the recurring sources of overload.",
  Environment: "Improve the physical and procedural environment so focused, healthy work becomes easier.",
}

export const STORAGE_KEY = "tohisaneAssessmentResult"
