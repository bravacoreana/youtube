[ENG](README.md) / [KOR](README.ko-KR.md) / [ITA](README.it-IT.md)

# Cloning YouTube with Vanilla and NodeJS - Updated

You can have a look at: https://immense-fortress-16208.herokuapp.com/

```
- Fully responsive web app
- CRUD (video/comment)
- Dark theme / Light theme / Device theme
- ES6 / Vanilla JS / NodeJs / Pug / SCSS / Mongo DB
```

---

## 0. Header

- Country Code API
- Search videos available
- Speech API (microphone icon)
- Available to shooting a video (camera icon)
- User profile picture

## 1. Dropdown

- Two different options(before/after sign in)
  - Non signed in user: sign up / sign in / theme / country
  - Signed in user: user information / upload(video) / profile / theme / sign out

## 2. Sidebar

- Responsive sidebar(None/Small/Large)
- Currently accessible at Home/Subscriptions/Your Videos/Liked Videos (Sign in needed)

## 3. Video

- CRUD
- Thumbnail preview
- subscribe / like / dislike / share
  - subscription is not available if it's same user.
- Count up views when viewer finishes watching video til the end

## 4. comments

- CRUD
- Edit button(ellipsis icon) available only if it's same user
- Like / dislike
- If comment is ever edited, 'Edited' mark appears.

#### This project was created based on a course in NomadCoders(nomadcoders.co).
