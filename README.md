# Jeux de la Complicité

## But du projet
Ce dépôt contient une petite application web permettant de jouer au *Jeu de la Complicité*. Deux équipes s’affrontent en essayant de deviner un mot le plus rapidement possible. Chaque mot trouvé rapporte un point à l’équipe active et le chronomètre indique le temps mis.

## Règles du jeu
1. Au début d’une manche, cliquez sur **Nouvelle manche** pour afficher un mot aléatoire et lancer le minuteur.
2. L’équipe active tente de faire deviner le mot à ses coéquipiers sans le prononcer directement.
3. Quand le mot est trouvé, cliquez sur **Mot trouvé** pour ajouter un point à cette équipe et passer la main à l’équipe suivante.
4. La manche se termine quand le mot est deviné et le temps réalisé reste affiché.

## Ouvrir l’application
Aucune installation n’est nécessaire. Pour jouer :
1. Téléchargez ou clonez ce dépôt sur votre ordinateur ou appareil mobile.
2. Dans l’explorateur de fichiers, ouvrez le fichier `index.html` avec votre navigateur web favori (Chrome, Firefox, Safari…). Sur mobile, utilisez un gestionnaire de fichiers ou un serveur local pour accéder au fichier puis ouvrez-le de la même manière.

Le jeu s’affiche alors directement dans le navigateur et peut être utilisé hors connexion.

## Fichiers du projet
- **index.html** : structure de la page et des éléments du jeu (scores, boutons, etc.).
- **style.css** : mise en forme de l’interface (positionnement, couleurs et typographie).
- **script.js** : logique du jeu : tirage des mots aléatoires, gestion du minuteur, des scores et de l’équipe active.
