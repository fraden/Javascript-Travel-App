import { exportAllDeclaration } from '@babel/types';
import { deltaBetweenDates } from './deltaBetweenDates'

test('checks delta time', () => {
    let date_1 = new Date("2021-10-30");
    let date_2 = new Date("2021-10-25");
    expect(deltaBetweenDates(date_1, date_2)).toBe(5);
});