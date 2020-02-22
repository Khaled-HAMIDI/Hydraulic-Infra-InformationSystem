package dz.ade.pfe.domain.exceptions;

public class TokenNotRefreshableException extends RuntimeException {

    public TokenNotRefreshableException() {
        super();
    }

    public TokenNotRefreshableException(String message) {
        super(message);
    }

    public TokenNotRefreshableException(String message, Throwable cause) {
        super(message, cause);
    }

    public TokenNotRefreshableException(Throwable cause) {
        super(cause);
    }

    protected TokenNotRefreshableException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
