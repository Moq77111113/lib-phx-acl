# lib-phx-acl

```sh
npm install lib-phx-acl
```

Managing rights in CGM clinical is really complicated, especially since the software is quite old at the time of writing this.

The groups are very large and it is often difficult and long to navigate.

This Library exposes some tools to deal with CGM Clincal ACL's.

## Summary 

- [Introduction](#intro)
- [Models](#models)
- [Acl](#acl)
- [Decode]([#decode])
- [encode]([#encode])
- [utils](#utils)

## <a name="intro"> Introduction</a>
In order to understand how the rights works in the software, here are some explanations.

The rights are stored in a table `APPACLS`,  this table is composed of some fileds but we will be interested in the `ACLDEF` field.

It is an textual field (VC2), with hexadecimal values. The position of each character is the id of the group to which the right is assigned.

 - For example we have an ACL with the value : `1A49D`
--`1` will be the right for the group with id : 1
--`A` will be the right for the group with id : 2
--`4` will be the right for the group with id: 3
--etc...

Now that we known this, let's talk about the meaning of the codes.
The codes are always "incremental", generally the rights are simple tables with 2 to 4 checkboxes.
For example, for the nodes (case/ form structure) we have a table with cb : `Add`, `Edit`, `Duplicate` and `Delete`

`Add` is the checkbox most to the left, and `Delete` the most to the right.
The first checkbox will always take the value `1`
The second checkbox will always take the value `2`
Then if checkbox `Add` and checkbox `Edit` are checked, it takes the value `3`
The the third checkbox `Duplicate` takes the value `4`
If `Add`and `Duplicate`are both checked, it takes the value `1+4=5`,  if `Edit`and `Duplicate` are both checked it takes the value `2+4=6`, if the three values are checked, it takes the value `1+2+4=7`
etc...
When the value goes above `9`its converted to hexadecimal values `10=A`, `11=B` etc etc..

The right are never the same, for the moment these rights are managed : 
- Nodes : The rights of the forms
- HospDef : The rights of the Hosptal's structure
- VirtualEntryPoint : The rights of the Virtual Entrypoints
- Reports : The rights of the reports
- Report Progress : The rights of the process of report
- Visa : The rights for the Visa 1 to 3
- VisaSupp : The rights for the Visa 1 to 6


Todo: 
- All things with agendas, resources, meetings etc...
- Form fields
- ...

## <a name="models"> Models</a>

The models exposes enums, interfaces, types usefull for the lib usage

### Enums
- `HospDefRights`
- `VirtualEntryPointRights`
- `NodeRights`
- `ReportRights`
- `ReportProgress`
- `ReportVisa`
- `ReportVisaSupp`


These enums define all the rights foreach kind of right for example :
```typescript
console.log(HospDefRights._Add) // output : 2
```

- `RightKind`

This one is just an enum for typing, you will use it in some functions.


### Types 
- `RightsEnums`

It is used in the functions to define some functions parameter, it is just an union typeof each Rights Enum.

- `RightList`

Union type of all Rights Enums.

- `Humanizableobject`

It will be usefull to render the rights with an humanizable value.

Example of usage  (more in [utils](#utils)):
```typescript
// use it as Partial, you will have to define all humanization else :D
const humanizableValues = Partial<HumanizableObject> = {
	HospDef: {
		[HospDefRights._Add]:  'add',
		[HospDefRights._SelectAndAdd]:  'select - add',
	}
};
``` 

## <a name="acl"> Acl</a>

This is the main tool, it exposes 3 functions with multiple override 

### aclToRights 

It convert a Phoenix Acl to an object of readable values

We can call it two ways :

```typescript
aclToRights(rights: string, kind: RightKind): { [gid: string]: string };
aclToRights(rights: string, kind: RightKind, mappedValues?: Map<RightList, string>): { [gid: string]: string };
```

Example : 

```typescript 
ACL.aclToRights('102255', RightKind._HospDef) 
/* output :
{
	"1":"_Select",
	"2":"_None",
	"3":"_Add",
	"4":"_Add",
	"5":"_SelectAndAccessPoint",
	"6":"_SelectAndAccessPoint"
}
*/
```
The keys of the object are group ids.

Second way :
```typescript
const  humanizationMap = new  Map<HospDefRights, string>();
humanizationMap.set(HospDefRights._None, 'none');
humanizationMap.set(HospDefRights._Add, 'add');
ACL.aclToRights('102255', RightKind._HospDef, humanizationMap);
/* output :
{
	"1":"_Select",
	"2":"none",
	"3":"add",
	"4":"add",
	"5":"_SelectAndAccessPoint",
	"6":"_SelectAndAccessPoint"
}
*/

```


### rightsToAcl

It convert codes rights to hexadecimal string (like an acl).

We call it one way : 

```typescript
rightsToAcl(codes: RightList[], kind: RightKind): string;
```

Example : 
```typescript
const  rights: HospDefRights[] = [
HospDefRights._Add,
HospDefRights._AddAndWorkList,
HospDefRights._SelectAndAdd
]

 ACL.rightsToAcl(rights, RightKind._HospDef)
 // output : '2A3'
```


Be careful, it only convert a list of rights to acl, you have to control if it matches with all the groups.

### replaceInAcl

It replace the right for one group in an ACL.

definition : 
```typescript
replaceInAcl(acl: string, groupid: number, right: RightList, kind: RightKind): string;

```
Example :
```typescript 
ACL.replaceInAcl('2A3', 2, HospDefRights._Select, RightKind._HospDef);
// output : '213' 
```


## <a name="decode"> Decode</a>

It exposes currently the function `humanize`

Two way to call it :

```typescript
humanize(code: string | number, kind: RightKind): string;
humanize(code: string | number, kind: RightKind, mappedValue?: Map<RightList, string>): string;
 ```

It simply "translate" the hexaDecimal code to humanized value.

Example : 

```typescript
Decode.humanize('A', RightKind._HospDef)
// output : '_AddAndWorkList'
```
With mappedValues :
```typescript
const  humanizationMap = new  Map<HospDefRights, string>();

humanizationMap.set(HospDefRights._AddAndWorklist, 'add - worklist');
Decode.humanize('A', RightKind._HospDef)
// output : 'add - worklist'
```
## <a name="encode"> Encode</a>

It exposes currently the function `endodeRight`


 One way to call it :

```typescript
encodeRight(right: RightList): string;
 ```

It simply convert a code to his HexaDecimal Value

Example : 

```typescript
Encode.encodeRight(HospDefRights._AddAndWorkList)
// output : 'A'
Encode.encodeRight(NodeRights._Full)
// output: 'F'
```

##<a name="utils"> Utilities</a>

### isCodeValid

It returns if a code is valid for a RightKind.

Definition : 
```typescript
isCodeValid(code: string | number, kind: RightKind): boolean
```

Example : 
```
Utils.isCodeValid('F', RightKind._ReportProgress); // false
Utils.isCodeValid(1, RightKind._ReportProgress); // true
Utils.isCodeValid(HospDefRights._Full, RightKind._Reports); //false
```

### getEnumByKind

I think it will not be usefull in your case, it just returns the enum according to a RightKind :
```typescript
getEnumByKind(kind: RightKind): RightsEnums;
```

Example : 
```typescript
const enum = Utils.getEnumByKind(RightKind._Reports)
console.log(enum._CreateAndDelete) // output : 10
```

### HexaToDecimal
It returns the decimal value of a hexadecimal code : 
```typescript
HexaToDecimal(code: string | number): number;
```
```typescript
Utils.HexaToDecimal('A') // 10
```

### DecimalToHexa
It returns the hexadecimal value of a decimal number : 
```typescript
DecimalToHexa(code: number): string;
```

```typescript
DecimalToHexa(10) // 'A'
```

### objectToMaps

We have seen previously that we can provide custom humanization to our functions.
It helps to convert an object to maps for each rightkind.

Definition :
```typescript
objectToMaps(object: Partial<HumanizableObject>): { [x  in  RightKind]?: Map<RightList, string> };
```


```typescript
const  obj: Partial<HumanizableObject> = {
	[RightKind._HospDef]: {
		[HospDefRights._None]:  'none',
		[HospDefRights._Add]:  'add',
		[HospDefRights._SelectAndAdd]:  'select - add',
		[HospDefRights._AccessPoint]:  'accesspoint'
	},
	[RightKind._Visa]: {
		[ReportVisa._Visa1]:  'Vis1',
		[ReportVisa._Visa1And3]:  'Visa 1 - 3'
	},
}

console.log(ACL.aclToRights('02546', RightKind._HospDef, Utils.objectToMaps(obj).HospDef))
/*
{
	"1":"none",
	"2":"add",
	"3":"_SelectAndAccessPoint",
	"4":"accesspoint",
	"5":"_AddAndAccessPoint"
}
*/
```

You can build this from a json object like in `i18n` for example.