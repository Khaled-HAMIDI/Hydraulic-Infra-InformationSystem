package dz.ade.pfe.domain.exceptions;

public class NotAllowedAffectationException extends RuntimeException {

    public NotAllowedAffectationException() {
        super();
    }

    public NotAllowedAffectationException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotAllowedAffectationException(String message) {
        super(message);
    }

    public NotAllowedAffectationException(Throwable cause) {
        super(cause);
    }
}
