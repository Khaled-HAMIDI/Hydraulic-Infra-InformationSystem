package dz.ade.pfe.print;

import org.springframework.core.io.Resource;

import java.net.MalformedURLException;

public interface PrintFileStorageComponent {

    Resource loadFileAsResource(String fileName) throws MalformedURLException;
}

