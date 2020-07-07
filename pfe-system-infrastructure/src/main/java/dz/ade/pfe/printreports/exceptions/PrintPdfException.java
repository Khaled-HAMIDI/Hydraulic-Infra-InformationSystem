package dz.ade.pfe.printreports.exceptions;

public class PrintPdfException extends RuntimeException {

    public PrintPdfException() {
        super();
    }

    public PrintPdfException(String message, Throwable cause) {
        super(message, cause);
    }

    public PrintPdfException(String message) {
        super(message);
    }

    public PrintPdfException(Throwable cause) {
        super(cause);
    }
}
