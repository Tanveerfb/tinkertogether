import fs from 'fs';
import path from 'path';

export interface Character {
  id: string;
  description: string;
  weapon: string;
  rarity: string;
  hp: number[];
  atk: number[];
  def: number[];
  [key: string]: any;
}

export interface CharacterPreview {
  id: string;
  name: string;
  image: string;
}

const CHARACTER_DATA_DIR = path.join(process.cwd(), 'app', 'static', 'characterData');

/**
 * Convert a character ID (filename) to a display name
 * Example: "kaedehara_kazuha" -> "Kaedehara Kazuha"
 */
export function formatCharacterName(id: string): string {
  return id
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get all character IDs from the character data directory
 */
export function getAllCharacterIds(): string[] {
  const files = fs.readdirSync(CHARACTER_DATA_DIR);
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''))
    .sort();
}

/**
 * Get all character previews (id, name, image)
 */
export function getAllCharacters(): CharacterPreview[] {
  const ids = getAllCharacterIds();
  return ids.map(id => ({
    id,
    name: formatCharacterName(id),
    image: `/media/images/characters/${id}.png`
  }));
}

/**
 * Get a single character's full data by ID
 */
export function getCharacterById(id: string): Character | null {
  try {
    const filePath = path.join(CHARACTER_DATA_DIR, `${id}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error loading character ${id}:`, error);
    return null;
  }
}
