import { HumanizableObject, HospDefRights, NodeRights, ReportProgress, ReportRights, ReportVisa, ReportVisaSupp, VirtualEntryPointRights, RightKind, RightList, RightsEnums } from '../models/index';

export namespace Utils {

    /**
     * 
     * Returns if the hexadecimal value is allowed in the RightKind
     * @param code 
     * @param kind 
     * @returns boolean
     */
    export function isCodeValid(code: string | number, kind: RightKind): boolean {
        return HexaToDecimal(code) <= Object.keys(getEnumByKind(kind)).filter(n => !isNaN(Number(n))).length;
    }

    /**
     * 
     * Returns the enum according to the kind
     * @param kind 
     * @returns 
     */
    export function getEnumByKind(kind: RightKind): RightsEnums {
        switch (kind) {
            case RightKind._HospDef: {
                return HospDefRights;
            };
            case RightKind._VirtualEntryPoint: {
                return VirtualEntryPointRights;
            };
            case RightKind._Nodes: {
                return NodeRights;
            };
            case RightKind._Reports: {
                return ReportRights;
            };
            case RightKind._ReportProgress: {
                return ReportProgress;
            };
            case RightKind._Visa: {
                return ReportVisa;
            };
            case RightKind._VisaSupp: {
                return ReportVisaSupp;
            };
            default: {
                throw new Error(`Not implemented kind ${kind}`);
            }
        }
    }

    /**
     * 
     *  Convert code base 16 to code base 10
     * 
     * @param code 
     * @returns number
     */
    export function HexaToDecimal(code: string | number): number {
        if (isNaN(parseInt(code.toString(), 16))) {
            throw new Error(`"${code}" is not a hexadecimal value`)
        }
        return parseInt(code.toString(), 16);
    }

    /**
    * 
    *  Convert code base 10 to code base 16
    * 
    * @param code 
    * @returns string
    */
    export function DecimalToHexa(code: number): string {
        return code.toString(16).toUpperCase();
    }


    /**
     *  Convert an object to mapobjects (for humanization)
     * @param object 
     * @returns 
     */
    export function objectToMaps(object: Partial<HumanizableObject>): { [x in RightKind]?: Map<RightList, string> } {
        let maps: { [x in RightKind]?: Map<RightList, string> } = {}
        Object
            .keys(object)
            .forEach(rightkind => {
                const values = object[rightkind as RightKind]
                if (values) {
                    let map = new Map<number, string>()
                    Object.keys(values)
                        .map(right => Number(right))
                        .forEach(right => {
                            map.set(right, values[right])
                        });
                    maps[rightkind as RightKind] = map;
                }
            })
        return maps;
    }
}
