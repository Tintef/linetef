import { modes } from '../mixins/configs';

export const prettyDistance = (dist, mode, divFactor) => {
  if (mode === modes.px) return `${Math.round(dist)} ${mode}`;

  return `${(dist / divFactor * 100).toFixed(1)} ${mode}`
  ;
}
