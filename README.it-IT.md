[ENG](README.md) / [KOR](README.ko-KR.md) / [ITA](README.it-IT.md)

# Clonazione di YouTube con Vanilla e NodeJS - Aggiornato

Puoi dare un'occhiata a: https://immense-fortress-16208.herokuapp.com/

```
- App web completamente reattiva
- CRUD (video / commento)
- Dark theme / Light theme / tema del dispositivo
- ES6 / Vanilla JS / NodeJs / Pug / SCSS / Mongo DB
```

---

## 0. Intestazione

- API codice paese
- Ricerca video disponibili
- Speech API (icona del microfono)
- Disponibile per la ripresa di un video (icona della fotocamera)
- Immagine del profilo dell'utente

## 1. Menu a discesa

- Due diverse opzioni (prima / dopo l'accesso)
  - Utente non registrato: iscriviti / accedi / tema / paese
  - Utente registrato: informazioni utente / caricamento (video) / profilo / tema / disconnessione

## 2. Barra laterale

- Barra laterale reattiva (Nessuna / Piccola / Grande)
- Attualmente accessibile da Home /I tuoi video / Video piaciuti (accesso necessario)

## 3. Video

- CRUD
- Anteprima in miniatura
- iscriviti / mi piace / non mi piace / condividi
  - l'iscrizione non è disponibile se è lo stesso utente.
- Conta le visualizzazioni quando lo spettatore finisce di guardare il video fino alla fine

## 4. commenti

- CRUD
- Pulsante Modifica (icona con i puntini di sospensione) disponibile solo se è lo stesso utente
- Piace / non mi piace
- Se il commento viene modificato, compare il segno "Modificato".

#### Questo progetto è stato creato sulla base di un corso di [NomadCoders](http://www.en.nomadcoders.co).
