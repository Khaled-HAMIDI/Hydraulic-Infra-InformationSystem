package dz.ade.pfe.commons.email;

import dz.ade.pfe.domain.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.internet.MimeMessage;

/**
 * @author ms
 * @version 1.0
 * @created 8/13/2018
 */
@Component
@RequiredArgsConstructor
class EmailComponentImpl implements EmailComponent {

    private final JavaMailSender emailSender;
    private final TemplateEngine templateEngine;

    public void sendPlainText(String to, String subject, String text) {
        sendMessage(to, subject, text, false);
    }

    public void sendHtmlInline(String to, String subject, String htmlBody) {
        sendMessage(to, subject, htmlBody, true);
    }

    public void sendHtmlTemplate(String to, String subject, String templateName, Context context) {
        String body = templateEngine.process(templateName, context);
        this.sendHtmlInline(to, subject, body);
    }

    private void sendMessage(String to, String subject, String text, Boolean isHtml) {
        try {
            MimeMessage mail = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mail, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, isHtml);
            emailSender.send(mail);
        } catch (Exception e) {
            new ResourceNotFoundException("ERREUR EMAIL");//TODO:
        }
    }
}
