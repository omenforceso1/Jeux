# Jeux de la Complicité

## But du projet
Ce dépôt contient une petite application web permettant de jouer au *Jeu de la Complicité*. Deux équipes s’affrontent en essayant de deviner un mot le plus rapidement possible. Un chronomètre affiche le temps écoulé pour chaque manche et des boutons permettent d’ajouter un point à l’équipe ayant trouvé le mot, qu’elle soit ou non l’équipe active. Cette dernière change automatiquement à la fin de la manche et reste indiquée visuellement sur le tableau de score.

## Règles du jeu
1. Cliquez sur **Nouvelle manche** pour afficher un mot aléatoire et démarrer le chronomètre à 0.
2. L’équipe active tente de faire deviner le mot à ses coéquipiers sans le prononcer.
3. Lorsque le mot est trouvé, appuyez sur **Équipe 1 a trouvé** ou **Équipe 2 a trouvé**. Le chronomètre s’arrête et le point est attribué à l’équipe correspondante.
4. L’équipe active change alors pour la manche suivante, même si l’autre équipe a marqué. Le temps réalisé reste affiché jusqu’à la prochaine manche.

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
- **Nouvelle manche** : tire un mot aléatoire, remet le chronomètre à zéro et active les boutons de résolution.
- **Équipe 1 a trouvé** / **Équipe 2 a trouvé** : arrêtent le chronomètre et ajoutent un point à l’équipe correspondante.
- L’équipe actuellement active est indiquée sous le tableau de scores et la case de cette équipe est encadrée d’une bordure colorée.
