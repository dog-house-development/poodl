module.export = {
    getMatch(a, b) {
        var duplicated = [];
        var nonDuplicated = [];

        //can probably be switched to index of methods to make it faster
        //but they were not working for some reason so this is how it is
        for (var i = 0; i < a.length; i++) {
            for (var e = 0; e < b.length; e++) {
                if (a[i] === b[e] && !duplicated.includes(a[i])) {
                    duplicated.push(a[i]);
                    console.log(a[i]);
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
