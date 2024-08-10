class PaintTin {
    constructor() {
        this.code = "0000";
        this.color = "gray";
        this.cost = 150;
    }

    get sellingPrice() {
        return this.cost * 2;
    }

    /**
     * @param {string} new_code
     */
    set setCode(new_code) {
        this.code = new_code
    }
}

const processPurchase = (paintCode, colourSelected) => {
    paintTin.setCode = paintCode;
    paintTin.color = colourSelected;

    const message = `Purchase:
    Code: ${paintTin.code}
    Colour: ${paintTin.color}
    Selling Price: ${paintTin.sellingPrice}`;
    $("#message_id").text(message);
}
const readRadioButton = () => {
    const selRadioBtnVal = $(":radio:checked").val();
    return selRadioBtnVal;
}
const validatePaintCode = (testCode) => {
    const itemCodePattern = /^[0-9]{4}$/;
    var testString = testCode.val().trim(); // has to be var !!
    if (testString == "") {
        throw new Error("This field is required");
    } else if (!itemCodePattern.test(testString)) {
        throw new Error("Must be exactly 4 Numbers");
    } else {
        return testString;
    }
}