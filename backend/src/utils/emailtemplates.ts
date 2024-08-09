import Handlebars from 'handlebars';

// Template pour l'e-mail de réinitialisation de mot de passe
export const templateResetPassword = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisation de mot de passe</title>
</head>
<body style="font-family: 'Comic Sans MS', 'Comic Sans', sans-serif; font-size: 12pt; margin: 0; padding: 0; background-color: #ffffff; text-align: center;">
    <div class="header">
        <img src="https://integration.utt.fr/ressources/logo_original.png" alt="Integration UTT Logo" style="width: 100px;">
        <h1 style="font-size: 21px; font-weight: bold; margin: 10px 0;">INTEGRATION UTT</h1>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 20px;">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 100%; margin: 0 auto; background-color: #f8f8f8; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td align="center" style="padding: 20px 0;">
                            <h2 style="font-size: 24px; margin: 0;">Réinitialisation de mot de passe</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; text-align: left; font-size: 16px;">
                            <p>Bonjour,</p>
                            <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe :</p>
                            <p style="text-align: center; margin: 30px 0;">
                                <a href="{{resetLink}}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #e74160; text-decoration: none; border-radius: 4px;">Réinitialiser mon mot de passe</a>
                            </p>
                            <p><strong>Attention le lien n'est valide que pendant 1h.</strong></p>
                            <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail.</p>
                            <p>Merci,</p>
                            <p>L'équipe intégration UTT</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 20px 0;">
                            <p style="font-size: 12px; color: #999999;">Si vous avez des questions, n'hésitez pas à <a href="mailto:integration@utt.fr" style="color: #e74160; text-decoration: none;">nous contacter</a>.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

// Fonction pour compiler le template
export const compileTemplateResetPassword = (data: any) => {
  const compiledTemplate = Handlebars.compile(templateResetPassword);
  return compiledTemplate(data);
};
