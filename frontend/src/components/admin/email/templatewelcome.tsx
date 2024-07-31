import Handlebars from 'handlebars';

export const template = `
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

export const compileTemplate = (data : any) => {
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate(data);
};