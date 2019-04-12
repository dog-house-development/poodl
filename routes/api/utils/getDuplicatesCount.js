module.export = {
    getMatch(a, b) {
        const duplicated = [];
        const nonDuplicated = [];

        a = removeDuplicate(a);
        b = removeDuplicate(b);

        //can probably be switched to index of methods to make it faster
        //but they were not working for some reason so this is how it is
        for (const i = 0; i < a.length; i++) {
            for (const e = 0; e < b.length; e++) {
                if (a[i] === b[e] && !duplicated.includes(a[i])) {
                    duplicated.push(a[i]);
                    continue;
                }
            }
            if (!nonDuplicated.includes(a[i]) && !duplicated.includes(a[i])) {
                nonDuplicated.push(a[i]);
            }
        }
        return [duplicated.length, nonDuplicated.length];
    }
};

function removeDuplicate(arr) {
    temp = new Set(arr);
    return Array.from(temp);
}
