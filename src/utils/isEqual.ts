function isEqual(a: any, b: any): boolean {
    let flag: boolean = true;
    if (!a || !b) {
        return false;
    }
	const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    let keys: string[] = [];
    if (aKeys.length >= bKeys.length) {
        keys = aKeys;
    } else {
        keys = bKeys;
    }
    for (const key of keys) {
        if (!b[key] && b[key] != null) {
            flag =false;
            break;
        }
        if(typeof(a[key]) != 'object' || a[key] === null) {
            if (a[key] === b[key]) {
                flag = true;
            } else {
                flag = false;
            }
        } else {
            flag = isEqual(a[key], b[key]);
        };
        if (!flag) {
            break;
        }
    };
    return flag;
}

export default isEqual