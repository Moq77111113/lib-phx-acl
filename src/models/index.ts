/**
 * Rights for the hospital structure
 * 
 */
enum HospDefRights {
    _Select = 1,
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
    _View = 1,
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
    _Add = 1,
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
    _View = 1,
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
    _Send = 1,
    _Close,
    _Full
}

/**
 * Rights for Visa 1 to 3
 */
enum ReportVisa {
    _Visa1 = 1,
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
    _Visa4 = 1,
    _Visa5,
    _Visa4And5,
    _Visa6,
    _Visa4And6,
    _Visa5And6
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