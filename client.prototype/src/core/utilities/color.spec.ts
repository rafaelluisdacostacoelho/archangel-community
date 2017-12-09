import { MdColorUtility } from './color';

describe('MdColorUtility', () => {

    let mdColorUtility: MdColorUtility;

    beforeEach(() => {
        mdColorUtility = new MdColorUtility();
    });

    let color: string[] = ['', '', ''];

    const HEXADECIMAL_INDEX: number = 0;
    const RGBA_INDEX: number = 1;
    const RGB_INDEX: number = 2;

    let opacity = 1;

    color[HEXADECIMAL_INDEX] = '#65f6c3';
    color[RGBA_INDEX] = `rgba(101, 246, 195, ${opacity})`;
    color[RGB_INDEX] = 'rgb(101, 246, 195)';

    it(`hexadecimal ${color[HEXADECIMAL_INDEX]} is equal to rgba ${color[RGBA_INDEX]}`, () => {
        expect(MdColorUtility.hexToRgba(color[HEXADECIMAL_INDEX], opacity)).toEqual(color[RGBA_INDEX]);
    });

    it(`hexadecimal ${color[HEXADECIMAL_INDEX]} is equal to rgb ${color[RGB_INDEX]}`, () => {
        expect(MdColorUtility.hexToRgb(color[HEXADECIMAL_INDEX])).toEqual(color[RGB_INDEX]);
    });

    it(`rgba ${color[RGBA_INDEX]} is equal to rgb ${color[RGB_INDEX]}`, () => {
        expect(MdColorUtility.rgbaToRgb(color[RGBA_INDEX])).toEqual(color[RGB_INDEX]);
    });

    it(`rgba ${color[RGBA_INDEX]} is equal to hexadecimal ${color[HEXADECIMAL_INDEX]}`, () => {
        expect(MdColorUtility.rgbaToHex(color[RGBA_INDEX])).toEqual(color[HEXADECIMAL_INDEX]);
    });

    it(`rgb ${color[RGB_INDEX]} is equal to rgba ${color[RGBA_INDEX]}`, () => {
        expect(MdColorUtility.rgbToRgba(color[RGB_INDEX], opacity)).toEqual(color[RGBA_INDEX]);
    });

    it(`rgb ${color[RGB_INDEX]} is equal to hexadecimal ${color[HEXADECIMAL_INDEX]}`, () => {
        expect(MdColorUtility.rgbToHex(color[RGB_INDEX])).toEqual(color[HEXADECIMAL_INDEX]);
    });
});