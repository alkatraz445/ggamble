# GGamble

## Opis projektu

GGamble to aplikacja edukacyjna mająca na celu zwiększenie świadomości na temat mechanizmów hazardu oraz potencjalnych zagrożeń z nim związanych. Aplikacja symuluje różne gry hazardowe, umożliwiając użytkownikom zrozumienie, jak działają i jakie ryzyko niosą.

## Funkcje

- **Symulacja gier hazardowych**: Użytkownicy mogą grać w różne gry, takie jak jednoręki bandyta, ruletka czy blackjack, w bezpiecznym środowisku edukacyjnym.
- **Statystyki i analiza**: Aplikacja dostarcza szczegółowych statystyk dotyczących wyników gier, pomagając użytkownikom zrozumieć prawdopodobieństwa i ryzyko związane z hazardem.
- **Materiały edukacyjne**: Wbudowane artykuły i poradniki na temat uzależnienia od hazardu oraz sposobów jego unikania.

## Technologie

Projekt wykorzystuje następujące technologie:

- **Frontend**: Next.js, TypeScript, CSS
- **Backend**: Node.js, Express.js
- **Baza danych**: SQLite

## Dokumentacja

W każdym podfolderze znajduje się dokumentacja do danej części programu.

- **Frontend**:[README.md](https://github.com/alkatraz445/ggamble/blob/main/frontend/README.md)
- **Backend**: [README.md](https://github.com/alkatraz445/ggamble/blob/main/backend/README.md)
- **SlotMachine**: [README.md](https://github.com/alkatraz445/ggamble/blob/main/Slots/README.md)

## Instalacja

Aby uruchomić projekt lokalnie:

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/alkatraz445/ggamble.git
   cd ggamble
   ```

2. Zainstaluj zależności dla części frontendowej i backendowej:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Uruchom aplikację:

   - Backend:

     ```bash
     cd backend
     npm start
     ```

   - Frontend:

     ```bash
     cd frontend
     npm start
     ```

Aplikacja powinna być teraz dostępna pod adresem `http://localhost:8000`.

## Wkład

Jeśli chcesz przyczynić się do rozwoju projektu:

1. Forknij repozytorium.
2. Utwórz nową gałąź (`git checkout -b feature/nazwa-funkcji`).
3. Wprowadź zmiany i zatwierdź je (`git commit -m 'Dodano nową funkcję'`).
4. Wypchnij gałąź (`git push origin feature/nazwa-funkcji`).
5. Otwórz Pull Request.

## Licencja

Projekt jest dostępny na licencji APACHE 2.0. Szczegóły znajdują się w pliku `LICENSE`.

---

Jeśli masz pytania lub potrzebujesz pomocy, skontaktuj się z nami poprzez otwarcie nowego issue w repozytorium.
