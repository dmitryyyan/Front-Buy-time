
# BuyTime

This project connects students with experts for services like one-on-one consultations, scheduled review sessions, or the delivery of new course material. Experts set their own fees, and when a student books a session, the payment is transferred from their crypto wallet into a **Solana-based** escrow account managed by a smart contract. Once the consultation is successfully completed, the funds — minus a small commission — are released from escrow to the expert. The entire system will run as a **Telegram Mini App**.
<p align="center">
  <img src="Screen/logo.jpg" alt="Logo" width="300" height="200">
</p>


## Run Locally

To run the frontend part, you need to follow this sequence of steps.

### _To get started, launch the Frontend by following these steps:_


  Navigate to the Frontend folder in this repository.
  
  Running Angular part
  ```bash 
    npm install
  ```
  ```bash 
    npm install @angular/cdk
  ```
  ```bash 
    ng serve
  ```
  ```bash 
    node server.js
  ```
  Next, we create a temporary host using ngrok for further development in Telegram using the bot.
  ```bash 
    ngrok http localhost:4200
  ```
  ![App Screenshot](/Screen/1.png)

 ### _Next, you need to start the backend. It is located in a different repository._

  
  Clone the project for BackEnd
  ```bash 
  git clone https://github.com/zhukovskyy/BuyTime.git
  ```
  Commands to run
  ```bash 
  cd BuyTime_Api
  ```
  ```bash 
  dotnet run  
  ```
  After these commands, the BackEnd part will be deployed. To check its operation
you can use [Swagger](http://localhost:5258/swagger/index.html) (optional)

### _Final step launch in Telegram_
#### To deploy in Telegram you need to create a bot in [BotFather](https://t.me/BotFather)
  
 Commands for creation
  ```bash
  /newbot
  ```
  Next, we enter a name, for example:
  ```bash
  test01_bot
  ```
  After that, we will get the API key:
  ```bash
  7719003108:AAEedzjfYRwozyQSphOvUlgYafd6A-qma
  ```
  The HTTP API key must be inserted into the server.js code in line 13
  ![App Screenshot](/Screen/3.png)
#### Once the bot is created, we can proceed to create a button that launches our application within the bot — this is also done via [BotFather](https://t.me/BotFather)

  ```bash 
  /setmenubutton
  ```
  We select our bot
  ```bash
  test01_bot
  ```
  We need to insert a link to our application that was deployed using ngrok
  ```bash
  https://e657-45-151-237-169.ngrok-free.app
  ```
  Set the name for the button that will appear in the bot interface
  ```bash
  my_app
  ```
  To check, we go to the bot and we can see the login button in the application
  ![App Screenshot](/Screen/2.png)

#### To make the button work, follow the final instruction:
Go to the FrontEnd project and find the file **angular.json** and replace the link in line 58 with yours from ngrok but in the format `e657-45-151-237-169.ngrok-free.app`

Then restart the command
```bash
ng serve
```
Now you can open the project in Telegram using the button you created.

  
  

## Solana Integration

This project uses the Solana cryptocurrency to pay for services. To make and receive payments, users need to have a wallet—such as Phantom wallet and connect it on their profile page within the application. Once connected, they can successfully create transactions.

For the Solana integration, we developed a smart contract in Rust and deployed it on the Devnet network for testing purposes. The smart contract handles booking an expert’s available time slot. When a student books a session, the fee is charged and held in escrow PDA until the expert confirms the meeting. If confirmed, the expert receives the funds; if not, the payment is refunded to the student’s wallet. Both the student and the expert have the ability to cancel the meeting, with a partial refund to the student depending on how much time remains before the meeting.

The business logic of the smart contract is described in this [repository](https://github.com/OlexandrNikolaiev/BuyTime-SmartContract/tree/3fcd8caf9cb4b3957c91302490c745322bdaf106).

## Demo

You can view the application interface in this video:

[🎥 application interface ](https://drive.google.com/file/d/1k-m1KD-DYdT4yMiVaNrZ-5GBRA9KGdck/view?usp=sharing)

Working with payments in the app:

[🎥 payments](https://drive.google.com/file/d/16KxatXZR0o-bMmQBjSQQtYoHyaW7LcnM/view?usp=sharingw)

## Screenshots


| ![](/Screen/11.png) | ![](/Screen/12.png) | ![](/Screen/13.png) |
|:-------------:|:-------------:|:-------------:|



## Tech Stack

**Client:** Angular, TypeScript

**Server:** C# (.NET)

**Smart Contract:** Rust (using the **solana_program** library)


## Authors

- [@Vanyk](https://github.com/vanuk)
- [@Jeweler228](https://github.com/OlexandrNikolaiev) 
- [@Macsym](https://github.com/maxf2)
