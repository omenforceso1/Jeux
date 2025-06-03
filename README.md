# Jeu de la Complicité

Ce projet décrit les règles et le prototype d'une application mobile permettant de jouer au "Jeu de la Complicité". Le jeu se joue par équipes et consiste à faire deviner un mot à son partenaire.

## 1. Règles et scénarios du jeu
- **Nombre de joueurs** : minimum deux équipes de deux joueurs.
- **Déroulement d’une manche** :
  - Le téléphone affiche un mot au joueur A de l’équipe (film, personnage, objet, etc.).
  - Le joueur A fait deviner ce mot à son partenaire (joueur B) en parlant à haute voix.
  - Les autres équipes écoutent pour deviner plus vite que l’équipe active.
  - Fin de manche : lorsqu’un joueur devine le mot correctement ou qu’un temps limite est atteint.
- **Système de points** : par exemple, 1 point pour l’équipe qui trouve le mot en premier.

## 2. Conception technique
- **Plateforme** : application mobile simple (React Native, Flutter ou similaire).
- **Écran principal** :
  - Bouton *Démarrer une partie*.
  - Paramètres du nombre d’équipes et de joueurs.
- **Écran de jeu** :
  - Affichage d’un mot aléatoire tiré d’une liste.
  - Compte à rebours pour la durée de la manche.
- **Base de données de mots** : liste simple (fichier JSON) contenant films, personnages, lieux, etc.

## 3. Fonctions clés à implémenter
- Génération aléatoire de mots en évitant les doublons.
- Gestion du temps pour chaque tour.
- Système de score par équipe.
- Navigation entre écrans (liste des équipes, jeu, scores).

## 4. Étapes de développement
1. **Prototype basique**
   - Écran de démarrage.
   - Écran qui affiche un mot et un compte à rebours.
   - Fin de manche avec affichage du gagnant (ou du mot s’il n’a pas été trouvé).
2. **Améliorations progressives**
   - Ajout d’animations et de transitions visuelles.
   - Paramétrage des listes de mots et du temps par manche.
   - Système d’historique ou de statistiques par équipe.

## 5. Tests et itérations
- Tester en conditions réelles pour repérer les points à améliorer.
- Recueillir les retours des joueurs sur la simplicité d’utilisation et l’intérêt des mots proposés.
- Mettre à jour l’application en fonction des retours (ergonomie, ajout de catégories, etc.).


## Prototype en ligne de commande

Un petit script Python (`game.py`) permet de tester les principes du jeu directement dans un terminal. Les mots à deviner se trouvent dans `words.json`.

### Exécution

```bash
python3 game.py
```

Le programme demande le nombre d'équipes, affiche un mot à faire deviner et gère un compte à rebours de 30&nbsp;secondes. Les scores sont affichés après chaque manche.
