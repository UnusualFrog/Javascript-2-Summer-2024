const validation =  {
    isEmpty(val) {
        if (val === "") {
            return true;
        }
        return false;
    },

    hasNoSlashses(val) {
        if (val.indexOf("/") === -1) {
            return true;
        }
        return false;
    },

    isInvalidYear(val) {
        if (isNaN(val)) {
            return true;
        }
        return false;
    },

    isInvalidDate(val) {
        if (val === "Invalid Date") {
            return true;
        }
        return false;
    }
}