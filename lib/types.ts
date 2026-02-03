export type Mode = 'pizza' | 'cafe';
export type HungerLevel = 'snack' | 'normal' | 'starving';
export type Mood = 'comfort' | 'light' | 'spicy';
export type Style = 'classic' | 'adventurous';

export interface UserChoices {
  mode: Mode | null;
  hungerLevel: HungerLevel | null;
  mood: Mood | null;
  style: Style | null;
  dietaryFilter: ('vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free')[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  mode: Mode;
  searchUrl: string;
  calories?: string;
  dietary: ('vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free')[];
  popular?: boolean;
  tags: {
    hunger: HungerLevel[];
    mood: Mood[];
    style: Style[];
  };
}

export interface Recommendation {
  primary: MenuItem;
  alternatives: [MenuItem, MenuItem];
  reason: string;
}
