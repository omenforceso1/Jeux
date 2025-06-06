# Jeux de la Complicité

## But du projet
Ce dépôt contient une petite application web permettant de jouer au *Jeu de la Complicité*. Plusieurs équipes peuvent être créées ainsi que des joueurs qui leur sont associés. Un chronomètre affiche le temps écoulé pour chaque manche et un point est attribué au joueur ayant trouvé le mot, ce qui incrémente automatiquement le score de son équipe. L’équipe active change automatiquement à la fin de la manche et reste indiquée visuellement sur le tableau de score.

## Règles du jeu
1. Sur l’écran de configuration, ajoutez les équipes puis les joueurs qui les composent, puis lancez la partie.
2. Cliquez sur **Nouvelle manche** pour afficher un mot aléatoire et démarrer le chronomètre à 0.
3. L’équipe active tente de faire deviner le mot à ses coéquipiers sans le prononcer.
4. Quand le mot est trouvé, sélectionnez le joueur gagnant dans la liste puis cliquez sur **Mot trouvé**. Le joueur et son équipe gagnent un point et le chronomètre s’arrête.
5. L’équipe active change alors pour la manche suivante. Le temps réalisé reste affiché jusqu’à la prochaine manche.

## Ouvrir l’application
Aucune installation n’est nécessaire. Pour jouer :
1. Téléchargez ou clonez ce dépôt sur votre ordinateur ou appareil mobile.
2. Dans l’explorateur de fichiers, ouvrez le fichier `index.html` avec votre navigateur web favori (Chrome, Firefox, Safari…). Sur mobile, utilisez un gestionnaire de fichiers ou un serveur local pour accéder au fichier puis ouvrez-le de la même manière.

Le jeu s’affiche alors directement dans le navigateur et peut être utilisé hors connexion.

## Fichiers du projet
- **index.html** : structure de la page et des éléments du jeu (scores, boutons, etc.).
- **style.css** : mise en forme de l’interface (positionnement, couleurs et typographie).
- **script.js** : logique du jeu : tirage des mots aléatoires, gestion du minuteur, des scores et de l’équipe active.
- **words.js** : liste de mots utilisée pour les manches. Vous pouvez y ajouter facilement des centaines ou milliers de mots supplémentaires.

### Personnaliser la liste de mots
Modifiez le fichier `words.js` pour insérer votre propre liste de mots (plusieurs milliers si nécessaire). Le script chargera automatiquement cette liste au démarrage du jeu.

## Commandes et interface
- **Ajouter une équipe** / **Ajouter un joueur** : permettent de préparer la partie sur l’écran de configuration.
- **Commencer la partie** : passe à l’écran de jeu avec le tableau des scores.
- **Nouvelle manche** : tire un mot aléatoire, remet le chronomètre à zéro et active le bouton de validation.
- **Pause** : suspend ou reprend le chronomètre en cours de manche.
- **Mot trouvé** : après avoir sélectionné le joueur gagnant, arrête le chronomètre et ajoute un point au joueur et à son équipe.
- L’équipe actuellement active est indiquée sous le tableau de scores et la case de cette équipe est encadrée d’une bordure colorée.
- **Réinitialiser les scores** : remet les scores de tous les joueurs et équipes à zéro.
- **Historique** : affiche la liste des parties précédentes et permet de vider cette liste.
- **Exporter / Importer l'historique** : permet de sauvegarder ou charger les parties enregistrées au format JSON.
- **Stats** : affiche pour chaque joueur son score total, le nombre de parties jouées et sa date d'inscription.
- **Règles** : rappelle les principes du jeu à tout moment.

## Historique des parties
L'application mémorise localement chaque partie terminée. Le bouton **Historique** ouvre une fenêtre récapitulative indiquant la date et le score de chaque équipe. Depuis cette fenêtre, vous pouvez également effacer toutes les données enregistrées.
Il est désormais possible d'exporter cet historique au format JSON ou de le réimporter ultérieurement.

## Statistiques des joueurs
Le bouton **Stats** affiche un classement des joueurs enregistrés avec leur date d'inscription, le nombre total de points accumulés et le nombre de parties jouées. Vous pouvez remettre ces statistiques à zéro depuis cette même fenêtre.

Les fenêtres d'historique et de statistiques adoptent désormais un style différent selon qu'elles sont ouvertes depuis le menu ou au cours d'une partie, afin de mieux distinguer les données globales de celles liées à la partie en cours.

## Design amélioré
La feuille de style a été retravaillée afin d'offrir une interface plus claire et plus agréable. Les équipes sont mieux mises en valeur sur le tableau de score et le bouton permettant de changer de thème dispose d'une étiquette d'accessibilité.
Un bouton **Règles** a aussi été ajouté pour rappeler rapidement le principe du jeu.
