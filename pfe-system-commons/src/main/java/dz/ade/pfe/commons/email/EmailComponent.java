package dz.ade.pfe.commons.email;

import org.thymeleaf.context.Context;

/**
 * @author ms
 * @version 1.0
 * @created 8/13/2018
 */
public interface EmailComponent {

    void sendPlainText(String to, String subject, String text);

    void sendHtmlInline(String to, String subject, String htmlBody);

    void sendHtmlTemplate(String to, String subject, String templateName, Context context);
}
