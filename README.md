# Investement calculator

Pliz, nie bierzcie tego projektu poważnie w celu podjęcia decyzji finansowej, ja to robię dla siebie dla nauki mechanizmów inwestowania. Na pewno będzie tutaj ogromna ilość błędów wynikająca z tego że nie do końca wszystko rozumiem i interpretuję poprawnie xD

## Setup

1. Trzeba mieć zainstalowany bun
2. Trzeba mieć konto na firebase.google.com
3. Zainstaluj firebase cli - https://firebase.google.com/docs/cli
3. Uruchom `firebase login`
3. Uruchom `firebase deploy`
4. Uzupełnij zmienne w pliku `.env` zgodnie z listą w pliku `src/shared/env.ts`
5. W Firebase, w Authentication > Settings > Authorized Domain trzeba dodać do listy "localhost"
6. Uruchom `cp db.example.json example.json`
7. Uruchom `bun backend` w pierwszym terminalu
8. Uruchom `bun dev` w drugim terminalu

## Notes informacji jak działają instrumenty finansowe

Nie fakt checkowałem patrząc na różne źródła :p

### Jak liczyć okres trwania lokaty

Załóżmy że inwestujemy 1000 zł.

- https://moneteo.com/narzedzia/kalkulator-lokat
  - Jeśli nie ma roku przestępnego i założysz lokatę na 3 miesiące 1 lutego, to skończy się ona 1 maja. I będzie ona trwała 89 dni
    - zysk brutto to 1000 zł * 89 / 365
  - Jeśli jest rok przestępny i założysz lokatę na 3 miesiące 1 lutego, to skończy się ona 1 maja. I będzie ona trwała 90 dni
    - zysk brutto to 1000 zł * 90 / 365
  - Jeśli założysz lokatę na 3 miesiące 15 maja, to skończy się ona 15 sierpnia, to będzie trwała 92 dni
    - zysk brutto to 1000 zł * 92 / 365

Różne banki mają inaczej, niektóre liczą lokatę, zakłądają że każdy miesiąc ma 30 dni, niektóre dzielą zawsze przez 365, niektóre dzielą przez 366 jeśli jest przestępny.
Bezpieczniej założyć że zawsze dzielimy przez 365

### Zaokrąglanie podatku od zysków kapitałowych (AKA podatek belki)

https://pl.wikipedia.org/wiki/Podatek_od_dochod%C3%B3w_kapita%C5%82owych_w_Polsce#Zaokr%C4%85glanie_kwot_podatku

W Polsce jest 19% podatku z zysków kapitałowych
1. Biorę lokatę 1000 zł i zarobiam brutto 10.08 zł.
2. Podatek belki to 19% tego, czyli 1.9152.
3. Zaokrąglamy w górę do drugiego miejsca po przecinku, czyli 1.92
4. Więc zysk netto to 10.08-1.92=8.16

### Obligacje

Pod tym linkiem są tabele odsetkowe:
https://www.obligacjeskarbowe.pl/tabela-odsetkowa/?table_id=21471
Nazwa obligacji EDO0135/1 mówi nam, że to jest obligacja dziesięcioletnia (bo "EDO"), która zostanie wykupiona przez Skarb Państwa 1 stycznia 2035 roku. Więc obligacja została kupiona 1 stycznia 2025 roku.
EDO0135/1 - EDOmmyy/d 

## Todosy

- Kapitalizacja odsetek w lokacie