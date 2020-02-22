package dz.ade.pfe.domain.exceptions;

public class ActionNotAllowedException extends RuntimeException {

    public ActionNotAllowedException() {
        super();
    }

    public ActionNotAllowedException(String message, Throwable cause) {
        super(message, cause);
    }

    public ActionNotAllowedException(String message) {
        super(message);
    }

    public ActionNotAllowedException(Throwable cause) {
        super(cause);
    }
}
