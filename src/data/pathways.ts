import type { Pathway, Skill } from './types.ts'
import { allProgressions, progressionById } from './progressions/index.ts'
import { skills, skillById } from './skills/index.ts'
import { flexibility, flexibilityById } from './flexibility/index.ts'

export const pathways: Pathway[] = [
  { id: 'pull', name: 'Pull', description: 'Horizontal and vertical pulling.' },
  { id: 'push', name: 'Push', description: 'Pushing strength: pushups, dips, overhead.' },
  { id: 'legs', name: 'Legs', description: 'Squat and hip hinge patterns.' },
  { id: 'core', name: 'Core', description: 'Anti-extension and anti-flexion core work.' },
  { id: 'mobility', name: 'Mobility', description: 'Shoulder and joint mobility prerequisites.' },
  { id: 'skills', name: 'Skills', description: 'Advanced calisthenics skills (locked behind prereqs).' },
  { id: 'flexibility', name: 'Flexibility', description: 'Stretching and active flexibility focuses.' },
]

export const allSkills: Skill[] = [...skills, ...flexibility]
export const allSkillById = new Map(allSkills.map(s => [s.id, s]))

export {
  allProgressions,
  progressionById,
  skills,
  skillById,
  flexibility,
  flexibilityById,
}

export function progressionsByPathway(pathwayId: string) {
  return allProgressions.filter(p => p.pathway === pathwayId)
}

export function skillsByPathway(pathwayId: 'skills' | 'flexibility') {
  return allSkills.filter(s => s.pathway === pathwayId)
}
