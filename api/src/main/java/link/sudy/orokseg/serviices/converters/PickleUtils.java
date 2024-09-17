package link.sudy.orokseg.serviices.converters;

import java.io.IOException;
import net.razorvine.pickle.Unpickler;

public final class PickleUtils {

  public static Object unpickle(byte[] blob) {
    var pickle = new Unpickler();
    try {
      return (Object) pickle.loads(blob);
    } catch (IOException e) {
      throw new RuntimeException(e);
    } finally {
      pickle.close();
    }
  }

  private PickleUtils() {}
}
