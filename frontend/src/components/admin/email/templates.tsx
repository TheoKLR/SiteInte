import Handlebars from 'handlebars';

export const TemplateNotebook = `
<!DOCTYPE html>
<html>
<head>
    <title>Integration UTT</title>
    <style>
        body {
            font-family: 'Comic Sans MS', 'Comic Sans', sans-serif;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-sizing: border-box;
        }
        .header, .footer {
            text-align: center;
        }
        .content {
            text-align: center;
            font-size: 15px;
        }
        .content p {
            line-height: 1.4;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 10px 0;
            background-color: #e74160;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
        }
        .social-icons {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px 0;
        }
        .social-icons a {
            margin: 0 10px;
        }
        .social-icons img {
            width: 30px;
            height: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://integration.utt.fr/ressources/logo_original.png" alt="Integration UTT Logo" style="width: 100px;">
            <h1 style="font-size: 21px; font-weight: bold; margin: 10px 0;">INTEGRATION UTT</h1>
        </div>
        <div class="content">
            <p>Hello petit nouveau ! Pour commencer l’intégration dès maintenant, on t’a préparé un petit cahier de vacances !! Rien de sérieux ni d'obligatoire ne t’inquiète pas, mais de quoi t’occuper avant la rentrée. Alors si tu veux y participer, tu peux le télécharger juste ici et le renvoyer à <a href="mailto:integration+cahier@utt.fr">integration+cahier@utt.fr</a> avant le lundi 26 août. Nous te renverrons ensuite ta correction, et si tu as été assez drôle tu pourras même apparaître dans le best of du cahier de vacances !! Bisous et à la rentrée !!</p>
            <a href={{notebook}} target="_blank" class="button">Cahier de vacances !</a>
            <p>Nous serons présents sur les réseaux tout au long de l'été pour te tenir informé(e), te partager des astuces, et plein d'autres trucs trop cools ! Rejoins le site de l'intégration pour bien être informé des actus !</p>
            <a href="https://integration.utt.fr/" target="_blank" class="button">Inscris toi !</a>
            <p>Pense aussi à rejoindre notre Discord, tu pourras y discuter avec des nouveaux, et poser tes questions aux étudiants déjà à l'UTT !</p>
            <a href="https://discord.gg/Ea8XwgX5HS" target="_blank" class="button">Rejoindre Discord</a>
        </div>
        <div class="footer">
            <p style="font-size: 16px; font-weight: bold;">Rejoins nous sur les réseaux !</p>
            <div class="social-icons">
                <a href="https://www.facebook.com/bde.utt" target="_blank" rel="noopener"><img src="https://cdn.tools.unlayer.com/social/icons/rounded/facebook.png" alt="Facebook"></a>
                <a href="https://twitter.com/bdeutt" target="_blank" rel="noopener"><img src="https://cdn.tools.unlayer.com/social/icons/rounded/twitter.png" alt="Twitter"></a>
                <a href="https://www.instagram.com/bdeutt" target="_blank" rel="noopener"><img src="https://cdn.tools.unlayer.com/social/icons/rounded/instagram.png" alt="Instagram"></a>
            </div>
        </div>
    </div>
</body>
</html>

`;

export const templateWelcome = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Intégration UTT</title>
</head>
<body style="font-family: 'Comic Sans MS', 'Comic Sans', sans-serif; font-size: 11pt; margin: 0; padding: 0; background-color: #ffffff; text-align: center;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 20px;">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 100%; margin: 0 auto;">
                    <tr>
                        <td align="center" style="padding: 10px;">
                            <img src="https://integration.utt.fr/ressources/logo_original.png" alt="Logo Comic" style="width: 18%; max-width: 104.4px; height: auto;">
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 21px; font-weight: bold; line-height: 240%; margin: 20px 0; text-align: center;">
                            INTEGRATION UTT
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 15px; line-height: 140%; margin: 20px 0; text-align: center;">
                            <p>Salut à toi jeune nouveau !</p>
                            <p>Bravo pour ton acceptation à l'UTT ! Nous sommes l'équipe d'intégration, des étudiants bénévoles qui préparent minutieusement ton arrivée pour que celle-ci reste inoubliable.</p>
                            <p>Un tas d'événements incroyables, tous basés sur la base du volontariat, t'attendent dès le <strong><u>Lundi 2 Septembre</u></strong> si tu arrives en première année et dès le <strong><u>Mardi 3 Septembre</u></strong> si tu arrives en 3ème année ou en master.</p>
                            <p>Tout est fait pour que tu t'éclates et que tu rencontres les personnes qui feront de ton passage à l'UTT un moment inoubliable. Mais avant toutes choses il faut te préparer.</p>
                            <p>Assure toi de réaliser les tâches suivantes avant ton arrivée :</p>
                            <ul style="list-style-type: disc; padding: 0; margin: 0; text-align: left; display: inline-block; padding-left: 20px;">
                                <li style="margin-bottom: 10px;">Connecte toi et crée ton compte sur le site de l'intégration pour qu'on puisse avoir ton moyen de contact !</li>
                                <li style="margin-bottom: 10px;">Tu vas avoir besoin d'une clé unique pour t'enregistrer : <strong>{{uuid}}</strong></li>
                            </ul>
                            <p style="color: red; font-weight: bold;">Attention cette dernière n'est valable qu'une seule fois. En cas de problème, n'hésitez pas à nous contacter !</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <a href="https://integration.utt.fr/" style="display: inline-block; padding: 10px 20px; font-weight: bold; color: #ffffff; background-color: #e74160; border-radius: 4px; text-decoration: none;" target="_blank">Inscris toi !</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="margin-top: 20px; text-align: center;">
                            <p style="font-size: 11pt; margin: 0;">Lorsque tu arrives à l'UTT, un.e étudiant.e plus ancien.ne devient ton parrain ou ta marraine. Il ou elle sera ton contact privilégié pour découvrir l'école mais aussi la vie étudiante troyenne et répondre à toutes tes questions que ce soit sur l'UTT, les logements, les cours, la vie à Troyes,...</p>
                            <p style="font-size: 11pt; margin: 10px 0;">Pour t'attribuer quelqu'un qui te correspond au mieux on t'invite à remplir ce questionnaire :</p>
                            <p style="margin: 0;"><a href="https://docs.google.com/forms/d/e/1FAIpQLScRSe2IMVGRA9jMhifQTJiGWbyPJIh6f5g-Spzel9dwhGmMFA/viewform?usp=sf_link" style="color: #657c7f; text-decoration: none;" target="_blank">https://docs.google.com/forms/d/e/1FAIpQLScRSe2IMVGRA9jMhifQTJiGWbyPJIh6f5g-Spzel9dwhGmMFA/viewform?usp=sf_link</a></p>
                            <p style="font-size: 15px; font-weight: bold; margin: 20px 0;">Pense à nous rejoindre sur les réseaux sociaux !</p>
                            <p style="margin: 0;">
                                <a href="https://www.facebook.com/bde.utt" target="_blank">
                                    <img src="https://cdn.tools.unlayer.com/social/icons/rounded/facebook.png" alt="Facebook" style="width: 33%; max-width: 30.37px; height: auto; margin: 5px;">
                                </a>
                                <a href="https://www.instagram.com/bde.utt" target="_blank">
                                    <img src="https://cdn.tools.unlayer.com/social/icons/rounded/instagram.png" alt="Instagram" style="width: 33%; max-width: 30.37px; height: auto; margin: 5px;">
                                </a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

`;

export const compileTemplateWelcome = (data : any) => {
  const compiledTemplate = Handlebars.compile(templateWelcome);
  return compiledTemplate(data);
};

export const compileTemplateNotebook = (data : any) => {
  const compiledTemplate = Handlebars.compile(TemplateNotebook);
  return compiledTemplate(data);
};