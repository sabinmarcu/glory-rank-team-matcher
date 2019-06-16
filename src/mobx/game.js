import { observable, decorate, reaction, computed } from "mobx";
import Player from "./player";

const arr = [1, 2, 3, 4, 5, 6, 7, 8];
const n = 4;
const entries = [];
const generate = (existing = []) => {
  if (existing.length === n) {
    entries.push(existing.sort());
  } else {
    for (let idx = 0; idx < arr.length; idx += 1) {
      if (!existing.includes(arr[idx])) {
        generate([...existing, arr[idx]]);
      }
    }
  }
};
const sort = a =>
  a
    .sort()
    .map(it => it.join(","))
    .filter((it, idx, arr) => arr.indexOf(it) === idx)
    .map(it => it.split(",").map(it => parseInt(it, 10)));

const teamValid = (a, f) => f.filter(it => a.includes(it)).length === f.length;
const diff = (a, b) => a.filter(it => b.includes(it)).length === 0;

generate();
const sorted = sort(entries);

console.clear();
class Game {
  players = [];
  get serialization() {
    return JSON.stringify(this.players);
  }

  matchA;
  matchAverageA;
  matchB;
  matchAverageB;
  matchDelta;

  constructor() {
    for (let index = 0; index < 8; index += 1) {
      this.players[index] = new Player(index, `Player ${index}`);
    }
    reaction(() => this.serialization, this.makeTeams);
    this.makeTeams();
  }

  makeTeams = () => {
    const a = [...sorted];

    const team1 = [];
    const team2 = [];

    const force1 = this.players
      .map((it, index) => [it.fixed, index])
      .filter(([fixed]) => fixed < 0)
      .map(([_, index]) => index + 1);

    const force2 = this.players
      .map((it, index) => [it.fixed, index])
      .filter(([fixed]) => fixed > 0)
      .map(([_, index]) => index + 1);

    for (let i = 0; i < a.length - 1; i += 1) {
      for (let j = i + 1; j < a.length; j += 1) {
        if (
          diff(a[i], a[j]) &&
          teamValid(a[i], force1) &&
          teamValid(a[j], force2)
        ) {
          team1.push([
            a[i].map(it => this.players[it - 1]),
            a[i].reduce((prev, it) => prev + this.players[it - 1].glory, 0)
          ]);
          team2.push([
            a[j].map(it => this.players[it - 1]),
            a[j].reduce((prev, it) => prev + this.players[it - 1].glory, 0)
          ]);
        }
      }
    }

    this.matchDelta = Infinity;
    for (let i = 0; i < team1.length; i++) {
      const diff = Math.abs(team1[i][1] - team2[i][1]);
      if (diff < this.matchDelta) {
        this.matchDelta = diff;
        this.matchA = team1[i][0];
        this.matchAverageA = team1[i][1];
        this.matchB = team2[i][0];
        this.matchAverageB = team2[i][1];
        this.matchDelta = diff;
      }
    }
  };
}

decorate(Game, {
  players: observable,
  serialization: computed,
  matchA: observable,
  matchB: observable,
  matchAverageA: observable,
  matchAverageB: observable,
  matchDelta: observable
});

export default Game;
