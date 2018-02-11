//Validation function
function validation(value) {
    if (isNaN(value) || value > 1000 || value % 1 !== 0 || !value ) {
        return false
    }
    return true;
}


/*Matrix builder function. Takes value "X" and creates matrix with (X * X) size filled with zeros.
Spiraly fills matrix from X-max (X^2) in the top left conner, to X-min (1) in the middle of matrix.
Skips all elements that include number six (6). Returns filled matrix*/
function matrixNumbers(value) {
    let numbers = new Array(value).fill(0).map(() => new Array(value).fill(0));

    //Calculating next point's position in matrix. Returns position [vertical, horizontal].
    function getNexPoint(vertical, horizontal, direction) {
        switch (direction) {
            case 1:
                vertical++;
                break;
            case 2:
                horizontal++;
                break;
            case 3:
                vertical--;
                break;
            case 4:
                horizontal--;
                break;
        }
        return [vertical, horizontal];
    }
    //Checking for empty/filled element.
    function isAllowed(vertical, horizontal, arr) {
        if (arr.length <= vertical || arr.length === vertical || arr.length === horizontal
            || 0 > vertical || 0 > horizontal || arr[vertical][horizontal] !== 0) {
            return false;
        }
        return true;
    }
    //Checking for number six (6).
    function isSix(num) {
        return ((num + "").indexOf("6") !== -1)
    }

    //Filling matrix in "while" loop, stops after counter becomes 1.
    let [vertical, horizontal, direction, iterations, currNum] = [-1, 0, 1, Math.pow(value, 2), Math.pow(value, 2)];
    while (iterations > 0) {
        const [nextVertical, nextHorizontal] = getNexPoint(vertical, horizontal, direction);
        if (isAllowed(nextVertical, nextHorizontal, numbers)) {
            vertical = nextVertical;
            horizontal = nextHorizontal;
            // if(isSix(currNum)){
            //     iterations++;
            //     currNum--;
            // }
            numbers[vertical][horizontal] = currNum;
            currNum--;
            iterations--;
        } else {
            if (direction === 5) {
                direction = 1;
                continue;
            }
            direction++;
        }
    }
    return numbers;

}
function isSix(num) {
    return ((num + "").indexOf("6") !== -1)
}
console.log(isSix(16))
/*Creating table from our matrix, returned in function "matrixNumbers".
 Function takes value, and creates an array by calling "matrixNumbers" function.
 In a loop through array, appends cells and row to the table*/
function matrixBuilder(value) {
    let table = $("#table");
    let arr = matrixNumbers(value);
    for (let i = 0; i < arr.length; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < arr[i].length; j++) {
            let cell = document.createElement("td");
            cell.textContent = arr[i][j];
            row.append(cell);
            setTimeout(function () {
                $("td").css("display", "block");
            }, 300);
        }
        table.append(row);
    }
}

//"Start" button's event listener function
$("#start").on("click", function () {
    let value = parseInt($("#user_value").val());
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
        matrixBuilder(value);
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