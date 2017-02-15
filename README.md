# Video on demand app - On MEAN Stack

This is a VOD (video on demand) demo app created on popular MEAN stack technology.
This VOD application keeps a track of a list of videos the user has recently watched.

# Features

1. The home page has two scrollable video lists. a.) All Videos b.) Recently Watched

2. On hover with mouse or during navigating with keyboard it shows video title with animation
   and a translucent effect.
    
3. On clicking on any video the video will play in full screen and when video finishes it
   will come back to the previous page that is home page.

4. Other than mouse user can make use of keyword's left right arrow keys to navigate the Video list and enter to play the
   video in full screen mode. On pressing escape control will return to the previous page.

5. Different users accessing this app will have resently watched list as per their individual
   browsing sessions. So even when they refresh page, the recently watched list will be fetched and
   loaded from the server backed by mongoDB.

6. On closing the app the session ends and opening the app again in browser will load the app with
   empty 'recently watched' list.

7. User anytime during the session can also clear the recently watched video list by clicking on
   'CLEAR HISTORY' button.

8. On changing the desktop browser width the videos tries to adjust themselves for mobile view.

# Setup, install and run on local machine

1. Checkout, download or copy paste the files to a directory on your local machine.

2. Run mongoDB server on your local machine. (if you don't have one you can download as per your OS.
   from link - https://www.mongodb.com/download-center#community)

3. Make sure you have nodejs installed on your machine.
   (if you don't have it, you can install it from link - https://nodejs.org/en/download/ )    

4. Open command prompt/terminal at the same directory location.

   Run command: npm install

   This will install all required dependencied in form of node_modules

5. At the same command prompt/terminal location

   Run command: node server.js
   
   This will start videoServer   

6. Open the index.html in chrome browser. This runs the application.
   (Presently no other browsers supported)
