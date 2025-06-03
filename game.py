import json
import random
import time


def load_words(filename: str) -> list:
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)


def main() -> None:
    words = load_words('words.json')
    used_words = set()
    print("Jeu de la Complicité")

    while True:
        try:
            teams = int(input("Nombre d'équipes (2 ou plus) : "))
            if teams >= 2:
                break
        except ValueError:
            pass
        print("Veuillez entrer un nombre valide (2 ou plus).")

    scores = [0 for _ in range(teams)]
    round_duration = 30  # durée en secondes
    round_index = 0

    while True:
        team = round_index % teams
        print(f"\n--- Manche {round_index + 1} - Équipe {team + 1} ---")
        available = [w for w in words if w not in used_words]
        if not available:
            print("Plus de mots disponibles. Fin de la partie!")
            break
        word = random.choice(available)
        used_words.add(word)
        print(f"Mot à faire deviner (cachez-le au partenaire): {word}")

        start = time.time()
        guess = input(f"Entrez le mot deviné avant {round_duration} secondes: ")
        elapsed = time.time() - start

        if guess.strip().lower() == word.lower() and elapsed <= round_duration:
            print("Bravo, bonne réponse!")
            scores[team] += 1
        else:
            print(f"Raté ou temps écoulé ({elapsed:.1f}s). Le mot était: {word}")

        score_line = ", ".join(
            [f"Équipe {i + 1}: {score}" for i, score in enumerate(scores)]
        )
        print(f"Scores -> {score_line}")

        cont = input("Appuyez sur Entrée pour continuer, ou tapez 'q' pour quitter: ")
        if cont.lower().startswith('q'):
            break

        round_index += 1


if __name__ == '__main__':
    main()
