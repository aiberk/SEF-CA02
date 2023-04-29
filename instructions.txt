Your team should create a web app using Express/Mongoose/EJS and the OpenAI API which uses prompt engineering to generate useful responses to specific user queries.

Due date: Thursday 4 May before midnight.

Motivation: 
The Express/Mongodb/EJS framework is a very powerful (and popular) approach to writing web apps. The goal of this assignment is to have you
use the skills you learned in PA04 to create something interesting. Ideally, you should use chatGPT or some similar API.  Also, you need to add authentication
so the user can login with username/password and store information about their API requests in the database.

As we saw in CA01, gpt-based webapps using prompt engineering have already started to appear and this assignment is meant to help you learn how to write such apps as well as gaining experience using git for a team project.   You can do this as an individual project if you want though.

Steps:
1) create a team repository (if you haven't already)
2) create a folder in the repository called ca02
3) copy the firstapp demo from lesson30 https://github.com/tjhickey724/cs103aspr23/tree/main/lesson30/firstapp to your repository
4) each team member should add a route to the app which invokes chatGPT (or some other API) to do something interesting.
5) modify the app to include
   a) an about page which explains what your program does
   b) a "team" page which has a short bio of each member of the team and what their role was
   c) an index page with links to each of the team-members pages
   d) a form page for each team member which ask the user for some input, then calls the appropriate GPT method to get the response, which it sends back to the browser.
6) each team member should create a short movie (1-2 minutes) showing them running the app on their computer and trying out their prompt engineering page
7) each team member uploads a link to the team github and a link to their individual movie (stored in google drive with permisions so anyone with the link can access it),