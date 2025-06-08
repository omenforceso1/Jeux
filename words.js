export const wordCategories = {
  "Animaux": [
    "Chat", "Chien", "Cheval", "Licorne", "Dragon"
  ],
  "Objets": [
    "Voiture", "Bateau", "Ordinateur", "Livre", "Valise"
  ],
  "Lieux": [
    "Maison", "Montagne", "Désert", "Plage", "Forêt"
  ],
  "Actions": [
    "Danse", "Voyage", "Musique", "Cuisine", "Robotique"
  ]
};

export const wordList = Object.values(wordCategories).flat();
