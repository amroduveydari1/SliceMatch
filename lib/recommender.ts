import { UserChoices, MenuItem, Recommendation, HungerLevel, Mood, Style } from './types';
import { getItemsByMode } from './data';

function calculateScore(item: MenuItem, choices: UserChoices): number {
  let score = 0;
  
  if (choices.hungerLevel && item.tags.hunger.includes(choices.hungerLevel)) {
    score += 3;
  }
  
  if (choices.mood && item.tags.mood.includes(choices.mood)) {
    score += 3;
  }
  
  if (choices.style && item.tags.style.includes(choices.style)) {
    score += 2;
  }
  
  return score;
}

function generateReason(choices: UserChoices, item: MenuItem): string {
  const reasons: string[] = [];
  
  if (choices.hungerLevel === 'snack') {
    reasons.push('light portion');
  } else if (choices.hungerLevel === 'starving') {
    reasons.push('hearty size');
  }
  
  if (choices.mood === 'comfort') {
    reasons.push('satisfying flavors');
  } else if (choices.mood === 'light') {
    reasons.push('fresh and light');
  } else if (choices.mood === 'spicy') {
    reasons.push('bold heat');
  }
  
  if (choices.style === 'classic') {
    reasons.push('timeless choice');
  } else if (choices.style === 'adventurous') {
    reasons.push('unique twist');
  }
  
  const reasonText = reasons.slice(0, 2).join(', ');
  return `Best for ${reasonText}`;
}

export function getRecommendation(choices: UserChoices): Recommendation {
  if (!choices.mode || !choices.hungerLevel || !choices.mood || !choices.style) {
    throw new Error('Incomplete choices');
  }
  
  let items = getItemsByMode(choices.mode);
  
  // Filter by dietary preferences if any selected
  if (choices.dietaryFilter && choices.dietaryFilter.length > 0) {
    items = items.filter(item => 
      choices.dietaryFilter.every(filter => item.dietary.includes(filter))
    );
  }
  
  // Score all items
  const scoredItems = items.map(item => ({
    item,
    score: calculateScore(item, choices),
  }));
  
  // Sort by score (highest first)
  scoredItems.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // If scores are equal, randomize order for variety
    return Math.random() - 0.5;
  });
  
  // Get primary recommendation
  const primary = scoredItems[0].item;
  
  // Get alternatives that are different from primary
  const alternativeOptions = scoredItems
    .slice(1)
    .filter(scored => scored.item.id !== primary.id);
  
  const alternatives: [MenuItem, MenuItem] = [
    alternativeOptions[0]?.item || items[1],
    alternativeOptions[1]?.item || items[2],
  ];
  
  const reason = generateReason(choices, primary);
  
  return {
    primary,
    alternatives,
    reason,
  };
}
