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

## Commandes et interface
- **Ajouter une équipe** / **Ajouter un joueur** : permettent de préparer la partie sur l’écran de configuration.
- **Commencer la partie** : passe à l’écran de jeu avec le tableau des scores.
- **Nouvelle manche** : tire un mot aléatoire, remet le chronomètre à zéro et active le bouton de validation.
- **Mot trouvé** : après avoir sélectionné le joueur gagnant, arrête le chronomètre et ajoute un point au joueur et à son équipe.
- L’équipe actuellement active est indiquée sous le tableau de scores et la case de cette équipe est encadrée d’une bordure colorée.
- **Réinitialiser les scores** : remet les scores de tous les joueurs et équipes à zéro.
