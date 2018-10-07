<%@ page import="Bean.Hits" %>
<%@ page import="Bean.Hit" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>

  <head>
    <meta charset="utf-8">
    <title>Lab_IAD_2</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="script.js"></script>
  </head>

  <header>
    <p>Масалкин Савелий Евгеньевич</p>
    <p>Луговских Савелий Михайлович</p>
    <div>P3218</div>
    <div>Вариант: 1804</div>
  </header>

  <body>
      <canvas id="canv">Ooops something is going wrong :(</canvas>
      <form id="XYR_input" action="ControllerServlet" method="GET">
        <table cellpadding="10px" border="4px" bordercolor="#030708">
          <tr>
            <td>
              <div >X:</div>
              <div style="width: 300px;">
                <div style="width: 100%">
                  <div class="buttonAndValue" style="text-align: center;">-3</div>
                  <div class="buttonAndValue" style="text-align: center;">-2</div>
                  <div class="buttonAndValue" style="text-align: center;">-1</div>
                  <div class="buttonAndValue" style="text-align: center;">0</div>
                  <div class="buttonAndValue" style="text-align: center;">1</div>
                  <div class="buttonAndValue" style="text-align: center;">2</div>
                  <div class="buttonAndValue" style="text-align: center;">3</div>
                  <div class="buttonAndValue" style="text-align: center;">4</div>
                  <div class="buttonAndValue" style="text-align: center;">5</div>
                </div>

                <div>
                  <div class="buttonAndValue" style="text-align: center;">
                    <input type="checkbox" name="X" value="-3">
                  </div>
                  <div class="buttonAndValue" style="text-align: center;">
                    <input type="checkbox" name="X" value="-2">
                  </div>
                  <div class="buttonAndValue" style="text-align: center;">
                    <input type="checkbox" name="X" value="-1">
                  </div>
                  <div class="buttonAndValue" style="text-align: center;">
                    <input type="checkbox" name="X" value="0">
                  </div>
                  <div class="buttonAndValue" style="text-align: center;">
                    <input type="checkbox" name="X" value="1">
                  </div>
                  <div class="buttonAndValue" style="text-align: center;">
                    <input type="checkbox" name="X" value="2">
                  </div>
                  <div class="buttonAndValue" style="text-align: center;">
                    <input type="checkbox" name="X" value="3">
                  </div>
                  <div class="buttonAndValue" style="text-align: center;">
                    <input type="checkbox" name="X" value="4">
                  </div>
                  <div class="buttonAndValue" style="text-align: center;">
                    <input type="checkbox" name="X" value="5">
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>Y:</div>
              <input type="text" maxlength="8" id="y_value" style="text-align: center;" name="Y">
            </td>
          </tr>
          <tr>
            <td>
              <div>R:</div>
              <input type="button" value="1" name="R">
              <input type="button" value="1.5" name="R">
              <input type="button" value="2" name="R">
              <input type="button" value="2.5" name="R">
              <input type="button" value="3" name="R">
            </td>
          </tr>
        </table>
        <input type="submit" id="submitButton">
        <input type="hidden" name="hidden_field_R" value="">
        <input type="hidden" name="hidden_field_X" value="">
      </form>
      <p>Previous shots:</p>
      <div id="listOfPreviousShots">
        <table id="t1">

          <thead>
             <td><b>X</b></td>
             <td><b>Y</b></td>
             <td><b>R</b></td>
             <td><b>Is in area</b></td>
             <td><b>Now</b></td>
          </thead>

          <tbody id="previousShoots">
            <%
              if (session.getAttribute("listOfHits") != null) {
              Hits listOfHits = (Hits) session.getAttribute("listOfHits");

              for (int i = 0; i < listOfHits.getList().size(); ++i){
                Hit hit = listOfHits.getList().get(i);
              %>
            <tr>
              <td class="previousX"><%=hit.getX()%></td>
              <td class="previousY"><%=hit.getY()%></td>
              <td><%=hit.getR()%></td>
              <td><%=hit.isInArea() ? "Да" : "Нет"%></td>
              <td><%=hit.getShotTime()%></td>
            </tr>
            <%
              }
              }
            %>
          </tbody>

        </table>
      </div>
  </body>

</html>