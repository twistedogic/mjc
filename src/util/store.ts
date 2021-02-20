export class memStore {
  state: { [key: string]: any };
  constructor(state = {}) {
    this.state = state;
  }
  getItem = (key: string) => this.state[key];
  setItem = (key: string, value: string) => {
    this.state[key] = value;
  };
  removeItem = (key: string) => {
    this.state[key] = null;
  };
}

export const storage = window.localStorage ?? new memStore();
