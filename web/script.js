$('document').ready(function () {
    var
        canv = $('canvas')[0],
        ctx = canv.getContext('2d');

    var xValues = [],
        yValues = [];
    var i = 0;

    $('.previousX').each(function() {
        xValues[i++] = parseFloat($(this).html());
    });

    i = 0;

    $('.previousY').each(function() {
        yValues[i++] = parseFloat($(this).html());
    });

    clearChart(ctx, canv);
    drawPreviousShoots(xValues, yValues, ctx);

    $('input:button').click(function(){
        if ($('input:button').not(this).prop('disabled') == true) {
            $('input:button').not(this).prop('disabled', false);
            clearChart(ctx, canv);
        }
        else {
            $('input:button').not(this).prop('disabled', true);
            drawArea(this.value, ctx, canv);
            drawAxis(ctx);
            drawArrows(ctx);
            drawTips(ctx);
            drawXValues(ctx);
            drawYValues(ctx);
        }
        drawPreviousShoots(xValues, yValues, ctx);
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
            document.getElementsByName("hidden_field_X")[0].value = (x1-150)/20;
            $("#y_value").val((75-y1)/20);
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

function drawAxis(ctx){
    ctx.beginPath();
    ctx.moveTo(150.5, 0);
    ctx.lineTo(150.5, 150);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 75-0.5);
    ctx.lineTo(300, 75-0.5);
    ctx.stroke();
}

function drawArrows(ctx){
    ctx.beginPath();
    ctx.moveTo(150 + 0.5, 0);
    ctx.lineTo(145 + 0.5, 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(150 + 0.5, 0);
    ctx.lineTo(155 + 0.5, 5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(300, 74.5);
    ctx.lineTo(293, 71.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(300, 74.5);
    ctx.lineTo(293, 77.5);
    ctx.stroke();
}

function drawTips(ctx) {
    for (i = 10; i <= 290; i+=20){
        ctx.beginPath();
        ctx.moveTo(i+0.5, 72);
        ctx.lineTo(i+0.5, 77);
        ctx.stroke();
    }
    for(i = 15; i <= 135; i+=20) {
        ctx.beginPath();
        ctx.moveTo(148, i-0.5);
        ctx.lineTo(153, i-0.5);
        ctx.stroke();
    }
}

function drawXValues(ctx) {
    ctx.font = "9px Arial";
    var x = -13;
    for(i = -7; i<= 7; ++i) {
        if (i != 0) {
            ctx.fillText(i, x += 20, 72);
        } else x+=20;
    }
}

function drawYValues(ctx) {
    ctx.font = "9px Arial";
    var y = -3;
    for(i = 3; i >= -3; --i) {
        if (i != 0) {
            ctx.fillText(i, 154, y+=20);
        } else y+=20;
    }
}

function drawArea(R, ctx, canv){
    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.fillStyle = "#3399FF";
    ctx.save();
    ctx.translate(canv.width / 2, canv.height / 2);
    ctx.arc(0, 0, R * 20, 0, Math.PI * 2);
    ctx.restore();
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.fillRect(150, 0 , 150, 150);
    ctx.fillRect(0, 75, 150, 75);
    ctx.fillStyle = "#000";
    ctx.strokeRect(0, 0, 300, 150);
    ctx.fillStyle = "#3399FF";
    ctx.fillRect(150-(R/2)*20, 75, (R/2)*20, R*20);
    ctx.beginPath();
    ctx.moveTo(150, 75);
    ctx.lineTo(150, 75+(R/2)*20);
    ctx.lineTo(150+(R/2)*20, 75);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#000";
}

function clearChart(ctx, canv) {
    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.fillStyle = "#000";
    ctx.strokeRect(0, 0, 300, 150);
    drawAxis(ctx);
    drawArrows(ctx);
    drawTips(ctx);
    drawXValues(ctx);
    drawYValues(ctx);
}

function drawPreviousShoots(xValues, yValues, ctx) {
    ctx.fillStyle = "red";
    for (i = 0; i< xValues.length; ++i){
        ctx.beginPath();
        ctx.arc(xValues[i] * 20 + 150+0.5, 75 - yValues[i] * 20 - 0.5, 1, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.fillStyle = "#000";
}