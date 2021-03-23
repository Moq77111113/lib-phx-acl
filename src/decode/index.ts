import { RightKind, RightList } from '../models/index';
import { Utils } from '../utils/index';

export namespace Decode {

    /**
     * 
     * returns the "humanized" value of the right 
     * @param code 
     * @param kind 
     * @returns 
     */
    export function humanize(code: string | number, kind: RightKind): string;
    export function humanize(code: string | number, kind: RightKind, mappedValue?: Map<RightList, string>): string;
    export function humanize(code: string | number, kind: RightKind, mappedValue?: Map<RightList, string>): string {
        if (!Utils.isCodeValid(code, kind)) {
            throw new Error(`Unable to decode code : ${code} in ${kind} rights`);
        }
        const humanized = Utils.getEnumByKind(kind)[Utils.HexaToDecimal(code)];
        if (mappedValue && mappedValue.get(Utils.HexaToDecimal(code))) {
            return mappedValue.get(Utils.HexaToDecimal(code))!;
        }
        return humanized;
    }
}

