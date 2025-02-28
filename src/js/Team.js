/**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */
export default class Team {
  // TODO: write your logic here
  constructor() {
    this.characters = [];
  }

  add(character) {
      this.characters.push(character);
  }
  
  *[Symbol.iterator]() {
      const characters = this.characters;
      for (let index = 0; index < characters.length; index++) {
          yield characters[index];
      }
  }
}
