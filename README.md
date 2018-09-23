# Overview
This repo contains a basic structure for [Electron](https://electron.atom.io/) apps which use [React](https://facebook.github.io/react/)

## Setup
Run the following commands in your terminal (you need [Node.js](https://nodejs.org/en/)):

1. Navigate to a folder you want the app to be in and then clone the repo:  
    ```sh
    git clone https://github.com/AllPawsInn/AllPawsInn.git
    ```
2. Navigate into your newly created folder 'AllPawsInn':  
    ```sh
    cd AllPawsInn
    ```

3. Install all requirements:  
    ```sh
    npm install
    ```
4. Make sure you have SQL Server and SQL Server Management Tool (SSMS) is setup on your system.

5. In order to restore database from a backup [this guide](https://www.howtogeek.com/50354/restoring-a-sql-database-backup-using-sql-server-management-studio)  can be followed.

5. Run the following queries on SQL Server Mgmt Studio (SSMS), after restoring the database:
   ```sh
   ALTER TABLE dbo.BookingObjects ADD Days VARCHAR (255)
   ```

   ```sh
   UPDATE dbo.BookingObjects SET Days = 'm' WHERE BookingID < 18000
   ```
   
   ```sh
   UPDATE dbo.BookingObjects SET Status= 'CO' WHERE Booking ID < 18000
   ```
   
   ```sh
   CREATE TABLE KennelOccupancy (
        ID int NOT NULL primary key,
        Occupancy bit
   );
   ```
     
   ```sh
   DECLARE @i int = 0
   WHILE @i < 100 
   BEGIN
       INSERT INTO KennelOccupancy VALUES(@i, 0)
       SET @i = @i + 1
   END
   ```
5. Modify the sqlConfig.js file on the path "src/js/sqlConfig.js" with YOUR sql server configuration.
    ```sh
   let sqlConfig = {
        user: 'sa', // your mssql account
        password: 'xxxxx',
        server: 'DESKTOP-9BJOBVM\\SQLEXPRESS', // your server name
        database: 'KMDB'
    }
    ```

6. To launch your app in development mode
    ```sh
    npm start

7. Publish Versions for a specific platform

    Mac
    ```sh
    npm run package-mac
    ```

    Windows
    ```sh
    npm run package-win
    ```

    Linux
    ```sh
    npm run package-linux
    ```
## TO-DO List   
List of things to be fixed, or implemented on the application:
   * Making the booking bars in the grid view of the boarding screen, interactable (e.g. "right click should open a dropdown which
     lets the user to select an action like check-in/out, or edit") (an example can be found in the Screenshots/Prototypes folder)
      
   * Adding a dropdown to the payment page which lets the user to select extra items to add to the cost (e.g. "nails, grooming,              etc.")
    
   * Adding a basic stats page (an example can be found in the Screenshots/Old Software folder)
    
   * Adding Alert/Notification boxes to the main screen (an example can be found in the Screenshots/Prototypes folder)
    
   * Making a better design for pages like booking, new booking, and payment
    
   * Adding an admin panel where user can change default values like DaycareRate, BoardingRate, Discount, etc.
   
   * Adding a component for printing multiple pages of scheduling info (kennel id, food, medical cond., kennel size, etc.) with one click (the user shouldn't have to select each dog seperately)
   
   * Data cleansing (detecting and correcting corrupt or inaccurate records in the database)
  
   * Solving the click glitch that occurs on the grid view of the daycare screen (the user has to click twice to make a reservation for a new day)
   
   * Adding finance management pages (this topic should be discussed with All Paws Inn and requirements should be clarified)
   
   * Migrating the data recorded by All Paws Inn between November 2017 - May 2018, to the database (their system was down between those months, so they recorded everything on paper, or Excel files)
   
   * Adding 'mail to' component which they've asked for notifying customers
   
   * Talking about the signature pad issue (whether they still want it)
   
   * Changing the design of the printed pages (should be talked with All Paws Inn)
   
   * Adding the ability to make recurring bookings (e.g. "make a booking for Max Deus which occurs every Wednesday")
   
   * Adding new features to the payment page like take no tax, or take down payment (should be talked with All Paws Inn)
   
   * Input fields should be validated, and sanitized in order to prevent attacks like SQL Injection, and XSS (Cross-Site Scripting)
   
   * Boarding and Daycare bookings should be managed in different database tables. Seperate the dbo.BookingObjects table, and create a table for each of them.
   
   * Adding a booking removal feature
   
   * Adding note boxes for animal and food components (where user can enter specific notes for each dog and it's food) on New Client page
   
   * Making the Animal Details (called "Full Profile" in the program) editable (should be talked with All Paws Inn first)
   
   * Adding 'Town' input field to New Client, and 'Age' to Animal Details and Add Dog pages
   
   * Making the boarding reservations printable
   
   * Adding Alerts/Notifications side screens to the home page (screenshots can be found in the Screenshots/Prototypes folder)

   * Help page should be updated after each resolved issue
