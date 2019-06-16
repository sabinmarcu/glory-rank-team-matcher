import { observable, action, decorate, computed, reaction } from "mobx";

class Player {
  index = -1;
  get id() {
    return this.index >= 0 ? `player-${this.index}` : null;
  }

  name;
  glory = 0;
  fixed = 0;

  get serialization() {
    return JSON.stringify({
      name: this.name,
      glory: this.glory,
      fixed: this.fixed
    });
  }

  constructor(index, name, glory) {
    this.index = index;
    this.hydrate();
    if (!this.name && name) {
      this.name = name;
    }
    if (!this.glory && glory) {
      this.glory = glory;
    }
    reaction(() => this.serialization, this.hybernate);
  }

  updateName = ({ target: { value } }) => (this.name = value);
  updateGlory = ({ target: { value } }) =>
    (this.glory = parseInt(value, 10) || 0);
  updateFixed = which => () => {
    const newVal = (which === "A" && -1) || (which === "B" && 1) || 0;
    this.fixed = newVal === this.fixed ? 0 : newVal;
  };

  hybernate = () => {
    console.log("HYBERNATING", this.id, this.index);
    if (this.id) {
      localStorage.setItem(
        this.id,
        JSON.stringify({
          name: this.name,
          glory: this.glory,
          fixed: this.fixed
        })
      );
    }
  };

  hydrate = () => {
    if (this.id) {
      const data = localStorage.getItem(this.id);
      if (data) {
        const { name, glory, fixed } = JSON.parse(data);
        this.name = name;
        this.glory = glory;
        this.fixed = fixed;
      }
    }
  };
}

decorate(Player, {
  index: observable,
  id: computed,
  serialization: computed,
  name: observable,
  glory: observable,
  fixed: observable,
  updateName: action,
  updateGlory: action
});

export default Player;
