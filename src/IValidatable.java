import javax.servlet.http.HttpServletRequest;

public interface IValidatable {
    boolean Validate(HttpServletRequest req);
}