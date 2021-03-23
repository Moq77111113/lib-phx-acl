import { RightList } from '../models/index';
import { Utils } from '../utils/index';

export namespace Encode {

    /**
     * 
     * returns the hexadecimal value of the right
     * @param right 
     * @returns string
     */
    export function encodeRight(right: RightList): string {
        return Utils.DecimalToHexa(right);
    };
}