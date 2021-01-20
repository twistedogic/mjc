export class memStore {
  constructor(state = {}) {
    this.state = state;
  }
  getItem = (key) => this.state[key];
  setItem = (key, value) => {
    this.state[key] = value;
  };
  removeItem = (key) => {
    this.state[key] = null;
  };
}

export const storage = window.localStorage ?? new memStore();
