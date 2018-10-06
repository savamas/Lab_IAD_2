$('document').ready(function () {
    var
        canv = $('canvas')[0],
        ctx = canv.getContext('2d'),
        R = "R";

// draw a figure

    ctx.fillStyle = "#3399FF";
    ctx.save();
    ctx.translate(canv.width / 2, canv.height / 2);
    ctx.scale(2, 1);
    ctx.arc(0, 0, 60, 0, Math.PI * 2);
    ctx.restore();
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.fillRect(150, 0 , 150, 150);
    ctx.fillRect(0, 75, 150, 75);
    ctx.fillStyle = "#3399FF";
    ctx.fillRect(90, 75, 60, 60);
    ctx.beginPath();
    ctx.moveTo(150, 75);
    ctx.lineTo(150, 105);
    ctx.lineTo(210, 75);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#000";
    ctx.strokeRect(0, 0, 300, 150);

//  Axis

    ctx.beginPath();
    ctx.moveTo(150, 0);
    ctx.lineTo(150, 150);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 75);
    ctx.lineTo(300, 75);
    ctx.stroke();

//  Arrows

    ctx.beginPath();
    ctx.moveTo(150, 0);
    ctx.lineTo(145, 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(150, 0);
    ctx.lineTo(155, 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(300, 75);
    ctx.lineTo(293, 72);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(300, 75);
    ctx.lineTo(293, 78);
    ctx.stroke();

//  Tips

    for (i = 30; i <= 270; i+=60){
        ctx.beginPath();
        ctx.moveTo(i, 72);
        ctx.lineTo(i, 78);
        ctx.stroke();
    }
    ctx.font = "9px Arial";
    ctx.fillText(R + "/2", 203, 72);
    ctx.fillText(R, 267, 72);
    ctx.fillText("-" + R + "/2", 81,72);
    ctx.fillText("-" + R, 25, 72);

    for(i = 15; i <= 135; i+=30) {
        ctx.beginPath();
        ctx.moveTo(147, i);
        ctx.lineTo(153, i);
        ctx.stroke();
    }
    ctx.fillText(R,154, 18);
    ctx.fillText(R + "/2",154, 48);
    ctx.fillText("-" + R + "/2",154, 108);
    ctx.fillText("-" + R,154, 138);

//  form validation

    $('input:button').click(function(){
        if ($('input:button').not(this).prop('disabled') == true) {
            $('input:button').not(this).prop('disabled', false);

        }
        else $('input:button').not(this).prop('disabled', true);
        document.getElementsByName("hidden_field_R")[0].value = this.value;
    });

    $('input:checkbox').click(function(){
        $('input:checkbox').not(this).prop('checked', false);
        document.getElementsByName("hidden_field_X")[0].value = this.value;
    });

    function IsYValid(strY) {
        if (strY == "") {
            return false;
        }
        if (isNaN(strY)) {
            return false;
        }
        if (strY < - 5 || strY > 3) {
            return false;
        }
        return true;
    }

    $('#y_value').blur(function(){
        var strValue = $('#y_value').val();
        if (!IsYValid(strValue)) {
            document.getElementById("y_value").style.borderColor = "red";
        }
        else document.getElementById("y_value").style.borderColor = "lime";
    });

    var x1, y1;

    function getMousePos(canv, e) {
        var rect = canv.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    $('#canv').on('mousedown', function (e) {
        if ($("[name=R]:disabled").length != 0) {
            var pos = getMousePos(canv, e);
            x1 = pos.x;
            y1 = pos.y;
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(x1, y1, 2, 0, Math.PI * 2);
            ctx.fill();
            document.getElementsByName("hidden_field_X")[0].value = (x1-150)/60*(document.getElementsByName("hidden_field_R")[0].value);
            $("#y_value").val((75-y1)/30*document.getElementsByName("hidden_field_R")[0].value);
            var x_value = parseFloat(document.getElementsByName("hidden_field_X")[0].value);
            x_value = x_value.toFixed(5);
            document.getElementsByName("hidden_field_X")[0].value = x_value;
            var y_value = parseFloat($("#y_value").val());
            y_value = y_value.toFixed(5);
            $("#y_value").val(y_value);
            document.getElementById("XYR_input").submit();
        }
        else alert("Unable to define coordinates, please choose R!");
    });

    document.getElementById("XYR_input").onsubmit = function() {
        if ($("[name=X]:checked").length == 0) {
            alert("Choose X please!");
            return false;
        }
        if (!IsYValid($('#y_value').val())){
            alert("Input correct Y please!");
            return false;
        }
        else if ($("[name=R]:disabled").length == 0) {
            alert("Choose R please!");
            return false;
        }
        else return true;
    };
});