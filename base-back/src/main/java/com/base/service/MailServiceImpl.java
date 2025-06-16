package com.base.service;

import com.base.entity.User;
import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailServiceImpl implements MailService {

    @Value("${sendgrid.api-key}")
    private String sendGridApiKey;

    @Value("${sendgrid.from-email}")
    private String fromEmail;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Override
    public void sendActivationEmail(User user, String token) {
        String activationLink = frontendUrl + "/auth/confirm-email?token=" + token;

        Email from = new Email(fromEmail);
        String subject = "Activation de votre compte EasyGroup";
        Email to = new Email(user.getEmail());
        String htmlContent = """
                <!DOCTYPE html>
                <html lang="fr">
                  <head><meta charset="UTF-8"><title>Activation</title></head>
                  <body style="font-family: Arial, sans-serif; background: #f8f9fa; padding: 20px;">
                    <div style="max-width: 600px; background: white; padding: 30px; margin: auto; border-radius: 8px;">
                      <h2>Bienvenue sur EasyGroup 👋</h2>
                      <p>Bonjour,</p>
                      <p>Pour activer votre compte, cliquez ci-dessous :</p>
                      <div style="text-align: center; margin: 20px 0;">
                        <a href="%s" style="background-color: #0d6efd; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Activer mon compte</a>
                      </div>
                      <p>Ou copiez-collez ce lien dans votre navigateur :</p>
                      <p style="word-break: break-word;">%s</p>
                    </div>
                  </body>
                </html>
                """
                .formatted(activationLink, activationLink);

        Content content = new Content("text/html", htmlContent);

        Mail mail = new Mail(from, subject, to, content);
        SendGrid sg = new SendGrid(sendGridApiKey);
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sg.api(request);
            log.info("✅ Email envoyé à {} - Status: {}", user.getEmail(), response.getStatusCode());
        } catch (IOException e) {
            log.error("❌ Erreur lors de l'envoi de l'email à {}", user.getEmail(), e);
        }
    }
}
