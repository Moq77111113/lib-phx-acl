import { Decode } from '../decode/index';
import { Encode } from '../encode/index';
import { HospDefRights, NodeRights, ReportProgress, ReportRights, ReportVisa, ReportVisaSupp, RightKind, RightList, VirtualEntryPointRights } from '../models/index';
import { Utils } from '../utils/index';


export namespace ACL {
/**
 * 
 * Returns the "ACL" value of an array of rights
 * @param hexaCode 
 * @param kind 
 * @returns 
 */
    export function rightsToAcl(codes: VirtualEntryPointRights[], kind: RightKind._VirtualEntryPoint): string;
    export function rightsToAcl(codes: HospDefRights[], kind: RightKind._HospDef): string;
    export function rightsToAcl(codes: NodeRights[], kind: RightKind._Nodes): string;
    export function rightsToAcl(codes: ReportRights[], kind: RightKind._Reports): string;
    export function rightsToAcl(codes: ReportProgress[], kind: RightKind._ReportProgress): string;
    export function rightsToAcl(codes: ReportVisa[], kind: RightKind._Visa): string;
    export function rightsToAcl(codes: ReportVisaSupp[], kind: RightKind._VisaSupp): string;
    export function rightsToAcl(codes: RightList[], kind: RightKind) {
        return codes.map((code, i) => {
            if (!Utils.isCodeValid(code, kind)) {
                throw new Error(`Invalid code "${code}" for "${kind}" at position ${i}`)
            }
            return Encode.encodeRight(code);
        }).join('');
    };

    /**
         * 
         * returns an object as { groupid: rights } from a string (phoenix acl)
         * @param rights 
         * @param kind 
         * @returns 
         */
    export function aclToRights(rights: string, kind: RightKind): { [gid: string]: string };
    export function aclToRights(rights: string, kind: RightKind, mappedValues?: Map<RightList, string>): { [gid: string]: string };

    export function aclToRights(rights: string, kind: RightKind, mappedValues?: Map<RightList, string>): { [gid: string]: string } {
        return rights.split('')
            .map((code, gid) => ({ gid: gid + 1, value: mappedValues ? Decode.humanize(code, kind, mappedValues) : Decode.humanize(code, kind) }))
            .reduce((object, item) => Object.assign(object, ({ [item.gid]: item.value })), {})


    }

    /**
     * 
     * Replace the right of the group in an acl
     * @param acl 
     * @param groupid 
     * @param right 
     * @param kind 
     */

    export function replaceInAcl(acl: string, groupid: number, right: VirtualEntryPointRights, kind: RightKind._VirtualEntryPoint): string;
    export function replaceInAcl(acl: string, groupid: number, right: HospDefRights, kind: RightKind._HospDef): string;
    export function replaceInAcl(acl: string, groupid: number, right: NodeRights, kind: RightKind._Nodes): string;
    export function replaceInAcl(acl: string, groupid: number, right: ReportRights, kind: RightKind._Reports): string;
    export function replaceInAcl(acl: string, groupid: number, right: ReportProgress, kind: RightKind._ReportProgress): string;
    export function replaceInAcl(acl: string, groupid: number, right: ReportVisa, kind: RightKind._Visa): string;
    export function replaceInAcl(acl: string, groupid: number, right: ReportVisaSupp, kind: RightKind._VisaSupp): string;
    export function replaceInAcl(acl: string, groupid: number, right: RightList, kind: RightKind): string {
        if (!Utils.isCodeValid(right, kind)) {
            throw new Error(`Invalid code "${right}" for "${kind}"`)
        }
        if(acl.length < groupid) {
            throw new Error(`Unable to replace for group "${groupid}"`)
        }
        return acl.substr(0, groupid - 1) + Encode.encodeRight(right) + acl.substr(groupid);
    }
}