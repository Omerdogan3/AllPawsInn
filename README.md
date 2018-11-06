## TO-DO List   
List of things to be fixed, or implemented on the application:
   * Making the booking bars in the grid view of the boarding screen, interactable (e.g. "right click should open a dropdown which
     lets the user to select an action like check-in/out, or edit") (an example can be found in the Screenshots/Prototypes folder)

   * Adding a basic stats page (an example can be found in the Screenshots/Old Software folder)
    
   * Adding Alert/Notification boxes to the main screen (an example can be found in the Screenshots/Prototypes folder)
    
   * Adding an admin panel where user can change default values like DaycareRate, BoardingRate, Discount, etc.
   
   * Adding a component for printing multiple pages of scheduling info (kennel id, food, medical cond., kennel size, etc.) with one click (the user shouldn't have to select each dog seperately)
     
   * Solving the click glitch that occurs on the grid view of the daycare screen (the user has to click twice to make a reservation for a new day)
   
   * Adding finance management pages (this topic should be discussed with All Paws Inn and requirements should be clarified)
   
   * Migrating the data recorded by All Paws Inn between November 2017 - May 2018, to the database (their system was down between those months, so they recorded everything on paper, or Excel files)
   
   * Adding 'mail to' component which they've asked for notifying customers
   
   * Talking about the signature pad issue (whether they still want it)
   
   * Changing the design of the printed pages (should be talked with All Paws Inn)
   
   * Adding the ability to make recurring bookings (e.g. "make a booking for Max Deus which occurs every Wednesday")
   
   * Adding new features to the payment page like take no tax, or take down payment (should be talked with All Paws Inn)
      
   * Boarding and Daycare bookings should be managed in different database tables. Seperate the dbo.BookingObjects table, and create a table for each of them.
   
   * Adding note boxes for animal and food components (where user can enter specific notes for each dog and it's food) on New Client page
   
   * Making the Animal Details (called "Full Profile" in the program) editable (should be talked with All Paws Inn first)
   
   * Adding Alerts/Notifications side screens to the home page (screenshots can be found in the Screenshots/Prototypes folder)


## Done

  * Adding 'Town' input field to New Client, and 'Age' to Animal Details and Add Dog pages
  
  * Adding a booking removal feature
  
  * Making the boarding reservations printable
  
  * Help page should be updated after each resolved issue
  
  * Making a better design for pages like booking, new booking, and payment
  
  * Adding a dropdown to the payment page which lets the user to select extra items to add to the cost (e.g. "nails, grooming,              etc.")
    
  * Data cleansing (detecting and correcting corrupt or inaccurate records in the database)
  
  * Input fields should be validated, and sanitized in order to prevent attacks like SQL Injection, and XSS (Cross-Site Scripting)



