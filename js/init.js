/**
 * Created by jteng on 2/7/16.
 */

(function init() {
    var keyArr = [
        "AC", "CE", "%", "/",
        "7", "8", "9", "*",
        "4", "5", "6", "-",
        "1", "2", "3", "+",
        ".", "0", "Ans", "="
    ];

    var keyTypes = {
        "AC": "unary",
        "CE": "unary",
        "%": "unary",

        "/": "binary",
        "*": "binary",
        "-": "binary",
        "+": "binary",

        "7": "entry",
        "8": "entry",
        "9": "entry",
        "4": "entry",
        "5": "entry",
        "6": "entry",
        "1": "entry",
        "2": "entry",
        "3": "entry",
        ".": "entry",
        "0": "entry",

        "Ans": "result",
        "=": "result"
    };

    var entryReg = null;
    var opReg = null;
    var shouldClear = false;
    var screen = $('.screen');

    function getResultUnaryOp(screenText, unaryOp) {
        var arg1 = parseFloat(screenText);

        switch(unaryOp) {
            case "AC":
                return "0";
            case "CE":
                return screenText.slice(0, -1) || 0;
            case "%":
                return arg1 / 100;
        }
    }

    function getResultBinaryOp(entry1, op, entry2) {
        var arg1 = parseFloat(entry1);
        var arg2 = parseFloat(entry2);

        switch(op) {
            case "/":
                return arg1 / arg2;
            case "*":
                return arg1 * arg2;
            case "+":
                return arg1 + arg2;
            case "-":
                return arg1 - arg2;
            default:
                alert("error not a binary");
        }

    }

    var btnHandler = function() {
        var $this = $(this);
        var btnText = $this.text();

        if (keyTypes[btnText] === "entry") {
            if (shouldClear) {
                screen.empty();
                shouldClear = false;
            }
            if (screen.text() === "0") {
                screen.text(btnText);
            } else {
                screen.append(btnText);
            }
        } else if (keyTypes[btnText] === "binary") {
            if (entryReg === null && opReg === null) {
                opReg = btnText;
            } else {
                // set screen = entryReg (opReg) screen
                screen.text(getResultBinaryOp(entryReg, opReg, screen.text()));
            }
            entryReg = screen.text();
            shouldClear = true;
        } else if (keyTypes[btnText] === "unary") {
            screen.text(getResultUnaryOp(screen.text(), btnText));
        } else if (keyTypes[btnText] === "result") {
            if (entryReg === null || opReg === null || screen === null) {
                return;
            }
            // set screen = entryReg (opReg) screen
            screen.text(getResultBinaryOp(entryReg, opReg, screen.text()));
            entryReg = null;
            opReg = null;
        }
    };

    $(document).ready(function() {
        for (var idx=0; idx < keyArr.length; idx++) {
            var btn = document.createElement("button");
            btn.className = "key";
            var textNode = document.createTextNode(keyArr[idx]);
            btn.appendChild(textNode);
            $(".keyboard").append(btn);
            $(btn).on("click", btnHandler);
        }
    });
})();
