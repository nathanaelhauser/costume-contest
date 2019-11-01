# Costume Contest App

Your task is to build an app that allows people to submit their costumes for a contest, and then vte for other people within the contest.

Technologies Needed:
* NodeJS
* Inquirer NPM
* MySQL2 NPM
* MySQL Database

### Data Needed

- MySQL Database and Table
  - Create a database
  - Create a table for the contestants
  - The table should have a column for the user's name, their costume, and the amount of votes they have, and a boolean for wether they have or have not voted yet

#### The Main Menu

- Start by creating an inquirer prompt to ask the user what they want to do. The choices should be 'Enter The Contest', 'Vote', 'Leaderboard', and 'Exit'. Use `process.exit()` to leave the game if they choose 'Exit'. If the user chooses 'Vote' take them to the Voting Menu (described later). If the user chooses 'Vote' take them to the Leaderboard Menu (described later). If the user chooses 'Enter The Contest', send them to the Enter Contest Menu.

#### The Enter Contest Menu

- Create an inquirer prompt to ask the user what their name is. Then ask the user what their costume is. Send all the data you collected to the MySQL Database (NOTE: when the user first adds their information, vote count should be 0 since nobody has voted for them yet). Finally, send them back to the Main Menu.

#### The Voting Menu

- Creat an inquirer prompt to ask the user for their name. Query the MySQL Database for all the current contestants, sorted by vote count (the sorting can be done within the query). Once you have the data, check to see if their is a current contestant that matches the user's name. In this app, only contestants can vote, and they can only vote for other contestants, not themselves. If there is no match, notify the user that they can't vote until they enter the competition, and then send them back to the Main Menu. If there is a match, make sure that the user's boolean to see whether they have or have not voted yet is set to false. If it is set to false, do the following steps:

  1. Create an inquirer prompt asking them to choose a person to vote for. 
  2. In the prompt, display a list of all the contestants and who they are dressed as (ex: John Doe as Frankenstein, Jane Doe as Dracula). 
  3. Make sure that on this list, you don't include the user themselves as an option. 
  4. Once the user has made a selection, update the selected person on the MySQL database by moving their vote count up by 1. 
  5. Update the user in the database to make sure the boolean for wether they have or have not voted yet is now set to true.
  6. Thank the user for voting and send them back to the Main Menu.

#### The Leaderboard Menu

- Query your MySQL Database for the stored leaderboard data. Make sure that, in this query, you order it by vote count from greatest to least (the ordering of the data can be accomplished within the query itself). Display the final data, then send the user to the Main Menu.
