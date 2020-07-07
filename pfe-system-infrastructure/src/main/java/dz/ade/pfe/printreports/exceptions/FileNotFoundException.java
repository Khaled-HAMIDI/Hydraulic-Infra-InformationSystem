package dz.ade.pfe.printreports.exceptions;

public class FileNotFoundException extends RuntimeException {

    public FileNotFoundException() {
        super();
    }

    public FileNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public FileNotFoundException(String message) {
        super(message);
    }

    public FileNotFoundException(Throwable cause) {
        super(cause);
    }
}
