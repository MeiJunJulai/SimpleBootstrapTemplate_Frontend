
function removeElement(toRemoveID) {
    var element = document.getElementById(toRemoveID);
    element.parentNode.removeChild(element);
}


function switchTagInside(toAddID, filePath) {
    $(document).ready(function () {
        $(toAddID).load(filePath);
        currentFilePath = filePath;
        currentToAddID = toAddID;
    });
}

let currentLeft;
let currentRight;

function switchContent(contentHtml) {
    let leftPath = contentHtml + "Left.html";
    let rightPath = contentHtml + ".html";
    console.log("Switched left content:" + leftPath);
    console.log("Switched right content:" + rightPath);
    switchTagInside('#list-example', leftPath);
    switchTagInside('#contentRightInside', rightPath);

    let contentRight = document.querySelector("#contentRightInside");

    contentRight.scrollTo(0, 0);

    currentLeft = leftPath;
    currentRight = rightPath;
}

function changeF5(e) {
    if ((e.which || e.keyCode) == 116) {
        e.preventDefault();
        if (currentLeft != undefined && currentRight != undefined) {
            switchContent(currentLeft, currentRight);
        }
    }
}

$(document).ready(function () {
    $(document).on("keydown", changeF5);
});

$(window).on('load', function () {
    $('#staticBackdrop').modal('show');
    switchContent("../menu/original");
});

let modalShowElements = document.getElementsByClassName("crewImg");
// modalShowElements.forEach(function (elem) {
//     elem.addEventListener("onclick", function () {
//         console.log("test");
//     });
// });
for (let elems of modalShowElements) {
    // elem.addEventListener("onclick", function () {
    //     console.log("test");
    // });
    elems.onclick = console.log("test");
};