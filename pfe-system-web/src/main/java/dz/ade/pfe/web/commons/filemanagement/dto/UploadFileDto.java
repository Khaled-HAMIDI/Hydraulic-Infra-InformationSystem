package dz.ade.pfe.web.commons.filemanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UploadFileDto {

    private String fileName;
    private String fileDownloadUri;
    private String fileType;
    private long size;
}
