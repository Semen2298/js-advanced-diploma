import Character from '../Character';
import Bowman from '../characters/Bowman';
import Swordsman from '../characters/Swordsman';
import Magician from '../characters/Magician';
import { characterGenerator, generateTeam } from '../generators';

describe('Character class', () => {
    test('should throw an error when trying to instantiate Character directly', () => {
        expect(() => new Character(1)).toThrow();
    });

    test('should not throw an error for inherited classes', () => {
        expect(() => new Bowman(1)).not.toThrow();
        expect(() => new Swordsman(1)).not.toThrow();
        expect(() => new Magician(1)).not.toThrow();
    });
});

describe('Character attributes', () => {
    test('should have correct attributes for level 1 characters', () => {
        const bowman = new Bowman(1);
        expect(bowman.attack).toBe(25);
        expect(bowman.defence).toBe(25);
        expect(bowman.health).toBe(50);
        expect(bowman.type).toBe('bowman');

        const swordsman = new Swordsman(1);
        expect(swordsman.attack).toBe(40);
        expect(swordsman.defence).toBe(10);
        expect(swordsman.health).toBe(50);
        expect(swordsman.type).toBe('swordsman');

        const magician = new Magician(1);
        expect(magician.attack).toBe(10);
        expect(magician.defence).toBe(40);
        expect(magician.health).toBe(50);
        expect(magician.type).toBe('magician');
    });
});

describe('Character generator', () => {
    test('should generate infinite characters from allowedTypes', () => {
        const allowedTypes = [Bowman, Swordsman, Magician];
        const maxLevel = 4;
        const generator = characterGenerator(allowedTypes, maxLevel);

        const generatedTypes = new Set();
        for (let i = 0; i < 100; i++) {
            const character = generator.next().value;
            expect(allowedTypes).toContain(character.constructor);
            expect(character.level).toBeGreaterThanOrEqual(1);
            expect(character.level).toBeLessThanOrEqual(maxLevel);
            generatedTypes.add(character.constructor);
        }

        expect(generatedTypes.size).toBe(allowedTypes.length);
    });
});

describe('Team generation', () => {
    test('should generate a team with correct number and level range', () => {
        const allowedTypes = [Bowman, Swordsman, Magician];
        const maxLevel = 4;
        const characterCount = 5;
        const team = generateTeam(allowedTypes, maxLevel, characterCount);

        expect(team).toHaveLength(characterCount);

        team.forEach((character) => {
            expect(allowedTypes).toContain(character.constructor);
            expect(character.level).toBeGreaterThanOrEqual(1);
            expect(character.level).toBeLessThanOrEqual(maxLevel);
        });
    });
});
