//Validation function
function validation(value) {
    return !(isNaN(value) || value > 1000 || value % 1 !== 0 || !value);

}

function isSix(num) {
    return ((num + "").indexOf("6") !== -1)
}

function buildArray(size) {
    let nums = [];
    let value = 1;
    for (let i = 0; i < Math.pow(size, 2); i++) {
        while (isSix(value)) {
            value++;
        }
        nums.push(value);
        value++;
    }
    return nums;
}

function buildTable(size) {
    let table = document.getElementById("table");
    for (let i = 0; i < size; i++) {
        const row = table.insertRow(i);
        for (let j = 0; j < size; j++) {
            row.insertCell(j);
        }
    }
}

function fillTable(arr) {
    let table = document.getElementById("table");
    let ind = arr.length - 1;
    let x = 0;
    let y = 0;
    let dirrection = 0;
    const size = Math.sqrt(arr.length);

    for (let i = 0; i < arr.length; i++) {
        setTimeout(() => {
            table.rows[x].cells[y].innerHTML = arr[ind];
            table.rows[x].cells[y].style.opacity = 1;
            ind--;

            switch (dirrection % 4) {
                case 0:
                    x++;
                    if (x === size - y - 1) {
                        dirrection++;
                    }
                    break;
                case 1:
                    y++;
                    if (x === y) {
                        dirrection++;
                    }
                    break;
                case 2:
                    x--;
                    if (y === size - x - 1) {
                        dirrection++;
                    }
                    break;
                case 3:
                    y--;
                    if (y === x + 1) {
                        dirrection++;
                    }
                    break;
            }

        }, 100 * (i + 1));
    }
}

$("#start").on("click", function () {
    let value = parseInt($("#user_value").val());
    const matrixNumbers = buildArray(value);
    if (!validation(value)) {
        $("#user_value").css({
            "borderBottom": "2px solid red",
            "color": "red",
        });
        $("#start").css({
            "color": "red",
            "border": "2px solid red",
            "background-color": "bisque"
        });
        $("#start").hover(function () {
            $(this).css({
                "color": "bisque",
                "background-color": "red"
            });
        }, function () {
            $(this).css({
                "color": "red",
                "background-color": "bisque"
            });
        });

        $("#user_value").val("Input correct number please!");
    } else {
        $("#data").css("display", "none");
        $("#reset").css("display", "block");
        $("#content").css("display", "block");
        buildTable(value);
        fillTable(matrixNumbers);
    }

});

//input's event listener function
$("#user_value").on("focus", function () {
    if ($("#user_value").val() === "Input correct number please!" || $("#user_value").val() === "Enter table's size please") {
        $("#user_value").val("");
        $("#user_value").css("color", "black");
    }
});
$("#user_value").on("focusout", function () {
    if ($("#user_value").val() === "" || $("#user_value").val() === " ") {
        $("#user_value").css("color", "dimgray");
        $("#user_value").val("Enter table's size please");

    }
});

//"Reset" button's event listener function
$("#reset").on("click",function () {
    $("#reset").css("display", "none");
    $("#content").css("display", "none");
    $("#table").empty();
    $("#data").css("display", "block");
    $("#start").css({
        "color" : "black",
        "border-color" : "black"
    });
    $("#start").hover(function () {
        $(this).css({
            "color" : "bisque",
            "background-color" : "black"
        });
    }, function () {
        $(this).css({
            "color" : "black",
            "background-color" : "bisque"
        })
    });
    $("#user_value").css("color", "dimgray");
    $("#user_value").css("border-color", "black");
    $("#user_value").val("Enter table's size please");
});