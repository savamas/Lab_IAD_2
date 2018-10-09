import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AccessFilter implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws java.io.IOException, ServletException{
        HttpServletResponse resp = (HttpServletResponse) servletResponse;
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        if (!req.getRequestURL().toString().endsWith("/AreaCheckServlet")){
            filterChain.doFilter(servletRequest, servletResponse);
        }
        resp.sendRedirect("index.jsp");
    }
}
