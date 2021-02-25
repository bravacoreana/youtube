[ENG](README.en-GB.md) / [KOR](README.ko-KR.md) / [ITA](README.it-IT.md)

# Clonazione di YouTube con Vanilla e NodeJS - Aggiornato

## Astratto

Puoi dare un'occhiata a: https://immense-fortress-16208.herokuapp.com/

```
- App web completamente reattiva
- YouTube clonato il più vicino possibile (ad eccezione dei moduli)
- CRUD (video / commento)
- Tema scuro / tema chiaro / tema del dispositivo
- ES6 / Vanilla JS / NodeJs / Pug / SCSS / Mongo DB
```

---

## 0. Intestazione

- API codice paese
- Ricerca video disponibili: espressione regolare applicata
- Speech API (icona del microfono)
- Disponibile per la ripresa di un video (icona della fotocamera)
- Immagine del profilo dell'utente

## 1. Menu a discesa

- Due diverse opzioni (prima / dopo l'accesso)
  - Utente non registrato: iscriviti / accedi / tema
  - Utente registrato: informazioni utente / caricamento (video) / profilo / tema / disconnessione

## 2. Barra laterale

- Barra laterale reattiva (Nessuno / Piccolo / Grande)
- Attualmente accessibile da Home / Iscrizioni / I tuoi video / Video piaciuti (accesso necessario)

## 3. Video

- CRUD
- Anteprima in miniatura
- iscriviti / mi piace / non mi piace / condividi
  - l'abbonamento non è disponibile se è lo stesso utente.
- Conta le visualizzazioni quando lo spettatore finisce di guardare il video fino alla fine

## 4. commenti

- CRUD
- Pulsante Modifica (icona con i puntini di sospensione) disponibile solo se è lo stesso utente
- Piace non piace
- Se il commento viene mai modificato, il segno "Modificato" viene lasciato.

#### Questo progetto è stato creato sulla base di un corso in NomadCoders (nomadcoders.co).
