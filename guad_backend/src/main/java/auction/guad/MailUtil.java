package auction.guad;

import java.util.Map;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Component
public class MailUtil {

    @Autowired
    private MailProperties mailProperties;

    @Autowired
    private TemplateEngine htmlTemplateEngine;

    public void sendTemplateMail(String toMail, String subject, String fromName, Map<String, Object> variables)
            throws Exception {
        Context context = new Context();
        context.setVariables(variables);

        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost(mailProperties.getHost());
        javaMailSender.setPort(mailProperties.getPort());
        javaMailSender.setUsername(mailProperties.getUsername());
        javaMailSender.setPassword(mailProperties.getPassword());

        InternetAddress from = new InternetAddress(mailProperties.getUsername(), fromName);
        InternetAddress to = new InternetAddress(toMail);

        String htmlTemplate = htmlTemplateEngine.process("html/Email", context);

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");

        messageHelper.setFrom(from);
        messageHelper.setTo(to);
        messageHelper.setSubject(subject);
        messageHelper.setText(htmlTemplate, true);

        javaMailSender.send(mimeMessage);
    }
}
