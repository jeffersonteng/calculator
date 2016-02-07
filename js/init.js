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

    $(document).ready(function() {
        for (var key=0; key < keyArr.length; key++) {
            var keyDiv = document.createElement("div");
            keyDiv.className = "key";
            var textNode = document.createTextNode(keyArr[key]);
            keyDiv.appendChild(textNode);
            $(".keyboard").append(keyDiv);
        }
    });

})();
