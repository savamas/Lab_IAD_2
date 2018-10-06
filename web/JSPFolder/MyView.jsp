<%@ page import="java.util.List" %>
<%@ page import="Bean.Hit" %>
<%@ page import="Bean.Hits" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="java.util.Calendar" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <style type="text/css">
        body {
            text-align: center;
        }
        table {
            margin: auto;
            border: 1px solid lime;
        }
        td {
            border: 1px solid lime;
            text-align: center;
        }
        tbody {
            border: 1px solid lime;
        }
        thead {
            border: 1px solid lime;
        }
    </style>
</head>
<body>
    <%
        Hits listOfHits = (Hits) session.getAttribute("listOfHits");
        Hit hit = listOfHits.getList().get(listOfHits.getList().size() - 1);
        String timeStamp = new SimpleDateFormat("yyyy.MM.dd_HH.mm.ss").format(Calendar.getInstance().getTime());
        hit.setShotTime(timeStamp);
    %>

    <table>
        <thead>
            <td>X</td>
            <td>Y</td>
            <td>R</td>
            <td>Is in area</td>
            <td>Now</td>
        </thead>
        <tbody>
            <td><%=hit.getX()%></td>
            <td><%=hit.getY()%></td>
            <td><%=hit.getR()%></td>
            <td><%=hit.isInArea() ? "Да" : "Нет"%></td>
            <td><%=timeStamp%></td>
        </tbody>
    </table>

    <a href="index.jsp">Try again!</a>
</body>
</html>
