package com.example.Hotel_management.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.HashMap;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;
    @Async
    public void sendEmail(String token, String to, String username, EmailTemplate emailTemplate ,String subject , String confirmationUrl) throws MessagingException {
        String templateName;

        if (emailTemplate == null) {
            templateName = "confirm-email";
        } else {
            templateName = emailTemplate.getName();
        }

        MimeMessage mimeMessage= javaMailSender.createMimeMessage();
        MimeMessageHelper helper= new MimeMessageHelper(
                mimeMessage,MimeMessageHelper.MULTIPART_MODE_MIXED,UTF_8.name()
        );
        helper.setSubject(subject);
        helper.setFrom("contact@bennacer.com");
        helper.setTo(to);
        Map<String,Object> properties= new HashMap<>();
        properties.put("username",username);
        properties.put("confirmationUrl",confirmationUrl);
        properties.put("activation_code",token);
        Context context= new Context();
        context.setVariables(properties);
        String template= templateEngine.process(templateName,context);
        helper.setText(template,true);
        javaMailSender.send(mimeMessage);

    }
}
