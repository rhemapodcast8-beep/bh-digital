import { CHALLENGE_CATEGORIES, type ChallengeCategory } from './types';

export function toggleCategorySelection(
  selected: readonly ChallengeCategory[],
  category: ChallengeCategory,
): ChallengeCategory[] {
  return selected.includes(category)
    ? selected.filter((item) => item !== category)
    : [...selected, category];
}

export function selectAllCategories(): ChallengeCategory[] {
  return [...CHALLENGE_CATEGORIES];
}

export function clearCategorySelection(): ChallengeCategory[] {
  return [];
}
