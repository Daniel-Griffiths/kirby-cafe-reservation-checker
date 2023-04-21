# Kirby Cafe Reservation Checker

A quick app to check if the there are any reservations available at the Kirby Cafe in Tokyo. It runs every couple of minutes and sends me an Discord message if it's in stock.

![Example Image](example.png)

## Getting Started

Install the dependencies:

```bash
yarn install
```

Copy the .env.example file to .env and fill in the values:

```bash
cp .env.example .env
```

| Variable  | Details |
| ------------- | ------------- |
| DISCORD_BOT_TOKEN  | The pirvate key for your Discord bot  |
| DISCORD_CHANNEL_ID  | The id of the channel the bot should send the message to  |
| RESERVATION_MONTH  | The year/month you wish to search for a reservation  |
| RESERVATION_QUANTITY  | The number of people you wish to make a reservation for  |

Then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. 

> **Note**
> 
> Only the api endpoint will send a notification to discord, this can be accessed at  [http://localhost:3000/api/check](http://localhost:3000/api/check).
