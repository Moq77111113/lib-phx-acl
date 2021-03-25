/**
 * Rights for the hospital structure
 * 
 */
enum HospDefRights {
    _None,
    _Select,
    _Add,
    _SelectAndAdd,
    _AccessPoint,
    _SelectAndAccessPoint,
    _AddAndAccessPoint,
    _SelectAddAndAccessPoint,
    _Worklist,
    _SelectAndWorkList,
    _AddAndWorkList,
    _SelectAddAndWorkList,
    _AccessPointAndWorkList,
    _SelectAccessPointAndWorkList,
    _AddAccessPointAndWorkList,
    _Full
}

/**
 * Rights for the Virtual Entry points
 */
enum VirtualEntryPointRights {
    _None,
    _View,
    _Station,
    _ViewAndStation,
    _Worklist,
    _ViewAndWorkList,
    _StationAndWorList,
    _Full
}

/**
 * Rights for the case structure (nodes)
 */
enum NodeRights {
    _None,
    _Add,
    _Edit,
    _AddAndEdit,
    _Duplicate,
    _AddAndDuplicate,
    _EditAndDuplicate,
    _AddEditAndDuplicate,
    _Delete,
    _AddAndDelete,
    _EditAndDelete,
    _AddEditAndDelete,
    _DuplicateAndDelete,
    _AddDuplicateAndDelete,
    _EditDuplicateAndDelete,
    _Full

}

/**
 * Rights for the reports
 */
enum ReportRights {
    _None,
    _View,
    _Create,
    _ViewAndCreate,
    _Edit,
    _ViewAndEdit,
    _CreateAndEdit,
    _ViewCreateAndEdit,
    _Delete,
    _ViewAndDelete,
    _CreateAndDelete,
    _ViewCreateAndDelete,
    _EditAndDelete,
    _ViewEditAndDelete,
    _CreateEditAndDelete,
    _Full,
}

/**
 * Rights for the Progress of reports
 */
enum ReportProgress {
    _None,
    _Send,
    _Close,
    _Full
}

/**
 * Rights for Visa 1 to 3
 */
enum ReportVisa {
    _None,
    _Visa1,
    _Visa2,
    _Visa1And2,
    _Visa3,
    _Visa1And3,
    _Visa2And3,
    _Visa123
}

/**
 * Rights for Visa 4 to 6
 */
enum ReportVisaSupp {
    _None,
    _Visa4,
    _Visa5,
    _Visa4And5,
    _Visa6,
    _Visa4And6,
    _Visa5And6,
    _Visa456
}
export {
    HospDefRights,
    NodeRights,
    VirtualEntryPointRights,
    ReportRights,
    ReportProgress,
    ReportVisa,
    ReportVisaSupp
}


export type RightsEnums =
    typeof HospDefRights |
    typeof VirtualEntryPointRights |
    typeof NodeRights |
    typeof ReportRights |
    typeof ReportProgress |
    typeof ReportVisa |
    typeof ReportVisaSupp


/**
 * Uninon type of all rights enums
 */
export type RightList =
    HospDefRights |
    VirtualEntryPointRights |
    NodeRights |
    ReportRights |
    ReportProgress |
    ReportVisa |
    ReportVisaSupp


/**
 * Enum for the right kind
 */
export enum RightKind {
    _HospDef = 'HospDef',
    _VirtualEntryPoint = 'VirtualEntryPoint',
    _Nodes = 'Nodes',
    _Reports = 'Reports',
    _ReportProgress = 'ReportProgress',
    _Visa = 'Visa',
    _VisaSupp = 'VisaSupp'
};

/**
 * type of the entry object for humanization
 */
export type HumanizableObject = {
    [kind in RightKind]:
    {
        [x: number]: string
    }
}
export type HumanizableObject2 = {
    [RightKind._HospDef]: {[x in HospDefRights]: string},
    [RightKind._Nodes]: {    [x in NodeRights] : string},
    [RightKind._VirtualEntryPoint]: { [x in VirtualEntryPointRights]: string},
    [RightKind._Reports]: {[x in ReportRights]: string},
    [RightKind._ReportProgress]: {[x in ReportProgress]: string},
    [RightKind._Visa]: {[x in ReportVisa]: string},
    [RightKind._VisaSupp]: {[x in ReportVisaSupp]: string},
}