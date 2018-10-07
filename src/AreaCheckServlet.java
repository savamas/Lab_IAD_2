import Bean.Hit;
import Bean.Hits;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;


@WebServlet("/AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        double X, Y, R;
        X = Double.parseDouble(req.getParameter("hidden_field_X"));
        Y = Double.parseDouble(req.getParameter("Y"));
        R = Double.parseDouble(req.getParameter("hidden_field_R"));

        boolean isInArea = true;
        if (X > 0 && Y > 0) isInArea = false;
        else if (X <= 0 && Y >= 0 && X*X + Y*Y <= R*R) isInArea = true;
        else if (X <= 0 && Y <= 0 && X >= -R/2 && Y >= -R) isInArea = true;
        else if (X >= 0 && Y <= 0 && Y >= X - R/2) isInArea = true;
        else isInArea = false;

        Hit hit = new Hit(X, Y, R, isInArea);
        HttpSession session = req.getSession();

        if (session.getAttribute("listOfHits") == null) {
            Hits hits = new Hits();
            hits.getList().add(hit);
            session.setAttribute("listOfHits", hits);
        } else {
            Hits hits = (Hits) session.getAttribute("listOfHits");
            hits.getList().add(hit);
            session.setAttribute("listOfHits", hits);
        }

        RequestDispatcher requestDispatcher = req.getRequestDispatcher("/JSPFolder/MyView.jsp");
        requestDispatcher.forward(req, resp);
    }
}