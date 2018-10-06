import javax.servlet.http.HttpServletRequest;
import java.util.stream.DoubleStream;
import java.util.stream.IntStream;

public class XYR_Validator implements IValidatable{
    public boolean Validate(HttpServletRequest req){
        String strX = req.getParameter("hidden_field_X");
        String strY = req.getParameter("Y");
        String strR = req.getParameter("hidden_field_R");

        if(strX == null || strY == null || strR == null) return false;
        if(strX.length() > 8 || strY.length() > 8 || strR.length() > 8) return false;
        double X, Y, R;
        try {
            X = Double.parseDouble(strX);
            Y = Double.parseDouble(strY);
            R = Double.parseDouble(strR);
        }
        catch (NumberFormatException e) {
            return false;
        }

        int[] validXValues = {-3, -2, -1, 0, 1, 2, 3, 4, 5};
        double[] validRValues = {1, 1.5, 2, 2.5, 3};
        if(IntStream.of(validXValues).noneMatch(a -> a == X)) return false;
        if(Y < -5 || Y > 3) return false;
        if(DoubleStream.of(validRValues).noneMatch(a -> a == R)) return false;
        return true;
    }
}
