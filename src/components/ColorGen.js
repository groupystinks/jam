import ColorGen from 'tinytinycolor';

export default class Color {
  constructor(stringOrColor) {
    this._color = new ColorGen(stringOrColor);
  }

  toString() {
    return this._color.toHexString();
  }

  lighten(amount) {
    return new Color(colorGen.lighten(this._color, amount));
  }

  darken(amount) {
    return new Color(colorGen.darken(this._color, amount));
  }

  saturate(amount) {
    return new Color(colorGen.saturate(this._color, amount));
  }
}
