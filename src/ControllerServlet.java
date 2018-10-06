import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/ControllerServlet")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        IValidatable validator = new XYR_Validator();
        RequestDispatcher requestDispatcher;
        if (validator.Validate(req)) {
            requestDispatcher = req.getRequestDispatcher("AreaCheckServlet");
        }
        else {
            requestDispatcher = req.getRequestDispatcher("index.jsp");
        }
        requestDispatcher.forward(req, resp);
    }
}
