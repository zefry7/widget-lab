import { FC, ReactElement } from 'react';
import ClearDaySvg from '../ClearDaySvg';
import CloudySvg from '../CloudySvg';

export interface iconType {
  scale: number;
}

type listIconsWeather = Record<number, FC>;

export const LIST_ICONS_WEATHER: listIconsWeather = {
  0: ClearDaySvg,
  1: CloudySvg,
  2: CloudySvg,
  3: CloudySvg,
};
