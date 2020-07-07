package dz.ade.pfe.printreports.exceptions;

public class FileStorageException extends RuntimeException {

    public FileStorageException() {
        super();
    }

    public FileStorageException(String message, Throwable cause) {
        super(message, cause);
    }

    public FileStorageException(String message) {
        super(message);
    }

    public FileStorageException(Throwable cause) {
        super(cause);
    }
}
