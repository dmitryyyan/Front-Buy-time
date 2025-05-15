
# BuyTime

This project is designed for students and experts who will provide relevant services to students, such as consultations, conducting scheduled lessons for clarification, or providing new material. Experts will receive funds from the services provided using the **Solana** integration, this will happen in the format when booking a time by a student, the student pays from a crypto wallet the amount determined by the expert for the meeting, then the expert will receive these funds after conducting a consultation, taking into account the commission. The project is planned to be deployed in Telegram using the **API telegram**
<p align="center">
  <img src="Screen/logo.jpg" alt="Logo" width="300" height="200">
</p>


## Run Locally

To run the project, you need to perform a certain sequence of actions after it is not deployed on the host services.

### _The first step will be to start the FrontEnd part, below is the sequence of steps Environment used to run VS Code_


  Clone the project for FrontEnd
  ```bash 
    git clone 
  ```
  Running Angular part
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

 ### _The next step of deploying BackEnd parts is now performed in other projects after FrontEnd and BackEnd, created in different repositories for more flexibility_

  
  Clone the project for BackEnd
  ```bash 
  git clone 
  ```
  Commands to run
  ```bash 
  cd BuyTime_Api
  ```
  ```bash 
  dotnet run  
  ```
  After these commands, the BackEnd part will be deployed to check its operation
you can use [Swagger](http://localhost:5258/swagger/index.html) (optional)

### _Final step launch in Telegram_
#### To deploy in Telegram you need to create a bot in [BotFather](https://t.me/BotFather)
  
 Commands for creation
    ```bash
    /newbot
    ```
    Next, we write the name example:
    ```bash
    test01_bot
    ```
    After that, we will get the HTTP API example:
    ```bash
    7719003108:AAEedzjfYRwozyQSphOvUlgYafd6A-qma
    ```
    The HTTP API must be inserted into the server.js code in line 13
    ![App Screenshot](/Screen/3.png)
#### When the bot is created, we can proceed to creating a button that will launch our application in the bot, this is also done in [BotFather](https://t.me/BotFather)

  ```bash 
  /setmenubutton
  ```
  We select our bot example
    ```bash
    test01_bot
    ```
    We need to insert a link to our application that was deployed using ngrok
    ```bash
    https://e657-45-151-237-169.ngrok-free.app
    ```
    We write the name for the button to display
    ```bash
    my_app
    ```
    To check, we go to the bot and we can see the login button in the application
    ![App Screenshot](/Screen/2.png)

#### For the button to work, you need to follow the last instruction
Go to the FrontEnd project and find the file **angular.json** and replace the link in line 58 with yours from ngrok but in the format `e657-45-151-237-169.ngrok-free.app`

Then restart the command
```bash
ng serve
```
Now the project can open in Telegram using the created button.


  
  

## Solana Integration

In this project, the Solana cryptocurrency is used to pay for services. In order for the user to be able to pay and receive funds, he must have a wallet, for example Phantom, and connect it in the application on the profile page, after which he will be able to successfully create transactions.

Regarding the Solana integration, we created a smart contract on Rust and deployed it to the devnet test network to be able to test the work. Regarding the smart contract, it created a functionality for booking an expert's free time, after which the fee is charged to the student and held until confirmed by the expert. If the expert confirms the meeting, he receives the funds or if he does not confirm, the funds are returned to the student's wallet. There is also an opportunity for the student to cancel and part of the funds will be returned to him depending on how much time before the meeting he canceled.


## Demo

Insert gif or link to demo


## Related

Here are some related projects

[Awesome README](https://github.com/matiassingers/awesome-readme)


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express


## Authors

- [@octokatherine](https://www.github.com/octokatherine)

