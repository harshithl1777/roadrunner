<img width="600" alt="Screen Shot 2022-10-11 at 9 06 48 PM" src="https://user-images.githubusercontent.com/44104695/195225721-1a5017b9-3c25-4621-aed1-e4cc0f62ff25.png">


# Roadrunner

### Description

Roadrunner allows for the transfer of data from Trello to Google Sheets with automatic formatting in realtime. This eliminates the need for manual formatting of raw data taken from Trello. This project was primarily developed as an internal tool for a company.

### How it works

Roadrunner's data transfer and formatting process works as follows:
1. A user creates a webhook pointing from a Trello board to a Google Sheets file.
2. Each time the user creates a change on the Trello board, Roadrunner receives a webhook POST request documenting the changes.
3. Roadrunner formats the updated data and sends it over to Google Sheets to be pasted in the file.
4. This whole process happens in realtime and with almost no latency for each change.

### Tech Stack
- `React`, `Firebase`, `Heroku`
- `Node.js`, `Express`, `PostgreSQL`

### Gallery

| | |
|:-------------------------:|:-------------------------:|
|<img width="1502" alt="Sign Up Page" src="https://user-images.githubusercontent.com/44104695/195224873-b8027108-6025-42d8-8c1e-c31033f5b3d3.png"> Sign Up Page | <img alt="Webhooks Page" src="https://user-images.githubusercontent.com/44104695/195224298-587eb73f-ad54-4145-89fb-09d972260a5f.png" /> Active Webhooks|

<p align="center"><img align="center" width="600" alt="New Webhook Modal" src="https://user-images.githubusercontent.com/44104695/195225161-bb951e0e-fb4d-45c6-b189-efd0a6af4c80.png"></p>
<p align="center">New Webhook Modal</p>
