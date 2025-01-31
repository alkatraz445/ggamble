# Frontend Projektu ggamble

## Opis

Frontend aplikacji **ggamble** to część wizualna i interakcyjna platformy do zarządzania grami losowymi online. Aplikacja została zbudowana przy użyciu **React.js** i integruje się z backendem za pomocą **REST API**.

## Wymagania

Przed rozpoczęciem instalacji upewnij się, że masz zainstalowane:

- **Node.js** (wersja 14.x lub nowsza)
- **npm** (wersja 6.x lub nowsza) lub **yarn**

## Instalacja

1. **Sklonuj repozytorium:**

   ```sh
   git clone https://github.com/alkatraz445/ggamble.git
   cd ggamble/frontend
   ```

2. **Zainstaluj zależności:**

   ```sh
   npm install
   ```

   lub jeśli używasz yarn:

   ```sh
   yarn install
   ```

## Uruchamianie aplikacji

Aby uruchomić aplikację w trybie deweloperskim, użyj polecenia:

```sh
npm start
```

Lub w przypadku użycia yarn:

```sh
yarn start
```

Aplikacja będzie dostępna pod adresem **[http://localhost:3000](http://localhost:3000)**.

## Budowanie aplikacji

Aby wygenerować zoptymalizowaną wersję produkcyjną:

```sh
npm run build
```

Lub:

```sh
yarn build
```

Wynikowe pliki zostaną umieszczone w katalogu `build/`.

## Testowanie

Uruchamianie testów jednostkowych:

```sh
npm test
```

Lub:

```sh
yarn test
```

## Konfiguracja

Aplikacja pobiera dane z backendu, więc upewnij się, że endpointy API są poprawnie skonfigurowane. Plik konfiguracyjny znajduje się w `src/config.js` i może wymagać edycji, np. ustawienia adresu URL backendu.

## Struktura projektu

```
frontend/
│── src/
│   ├── components/    # Komponenty UI
│   ├── pages/         # Widoki aplikacji
│   ├── services/      # Obsługa API
│   ├── assets/        # Zasoby (grafiki, style)
│   ├── config.js      # Konfiguracja
│   ├── App.js         # Główna aplikacja
│   └── index.js       # Punkt wejściowy
│── public/
│── package.json
│── README.md
```

## Wkład w projekt

Jeśli chcesz przyczynić się do rozwoju projektu:

1. Forkuj repozytorium
2. Utwórz nową gałąź (`git checkout -b nowa-funkcjonalnosc`)
3. Wprowadź zmiany i dodaj je (`git commit -m 'Dodano nową funkcjonalność'`)
4. Wypchnij zmiany (`git push origin nowa-funkcjonalnosc`)
5. Otwórz **Pull Request** w głównym repozytorium

## Licencja

Projekt jest objęty licencją **MIT**. Szczegóły znajdują się w pliku `LICENSE`.

## Autor

Projekt został stworzony i rozwijany przez [alkatraz445](https://github.com/alkatraz445).

