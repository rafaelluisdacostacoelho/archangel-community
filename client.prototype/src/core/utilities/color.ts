/**
 * @ngdoc module
 * @name material.core.colorUtil
 * @description
 * Color Util 
 */
export class MdColorUtility {

    /**
     * Converts hex value to RGBA string
     * @param color {string}
     * @param opacity {number} default to 0.1
     * @returns {string}
     */
    static hexToRgba(hex: string, opacity: number = 0.1): string {
        // source: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        // Expand shorthand form (e.g."03F") to full form (e.g."0033FF")

        var shorthandRegex: RegExp = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

        hex = hex.replace(shorthandRegex, (m, r, g, b) => {
            return r + r + g + g + b + b;
        });

        var result: RegExpExecArray = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})`;
    }

    /**
     * Converts rgba value to hex string
     * @param color {string}
     * @returns {string}
     */
    static rgbaToHex(rgba: any): string {
        rgba = rgba.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgba && rgba.length === 4) ? "#" +
            ("0" + parseInt(rgba[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgba[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgba[3], 10).toString(16)).slice(-2) : '';
    }

    static hexToRgb(color: string): string {
        let hex = color[0] === "#" ? color.substr(1) : color,
            dig = hex.length / 3,
            red = hex.substr(0, dig),
            green = hex.substr(dig, dig),
            blue = hex.substr(dig * 2);

        if (dig === 1) {
            red += red;
            green += green;
            blue += blue;
        }

        return `rgb(${parseInt(red, 16)}, ${parseInt(green, 16)}, ${parseInt(blue, 16)})`;
    }

    static rgbToHex(rgb: any): string {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    }

    /**
     * Converts an RGB color to RGBA
     * @param color {string}
     * @param opacity {number} default to 0.1
     * @returns {string}
     */
    static rgbToRgba(color: string, opacity: number = 0.1): string {
        return color.replace(')', `, ${opacity})`).replace('(', 'a(');
    }

    /**
     * Converts an RGBA color to RGB
     * @param color {string}
     * @returns {string}
     */
    static rgbaToRgb(color: string): string {
        return color ? color.replace('rgba', 'rgb').replace(/,[^\),]+\)/, ')') : 'rgb(0,0,0)';
    }
} 