import javax.servlet.http.HttpServletRequest;

public interface Validatable {
    boolean validate(HttpServletRequest req);
}