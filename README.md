# Lyric Liker

Hello, and welcome to Lyric Liker!

## GIF Preview
![](https://i.imgur.com/zie1v8K.gifv) (To be linked)

## Introduction

For this project, our requirements were to use create-react-app to create a single page application. We needed to use at least 5 components in a way that keeps things organized, and we also needed to use React Router to create at least 3 client-side routes. A server was also required to use GET and POST requests. APIs were optional for this project, but I decideed to use two. For styling, I went ahead and decided to use Bootstrap due to previous familiarity. Most of the time, I like simplicity in my styling.

Music has always been extremely important to me. I remember when I was growing up, I would record songs from the radio onto a casette tape so I could listen to those songs whenever I wanted. I'd also spend time listening to albums and writing all their lyrics down. This was, of course, before lyric websites were ubiquitous and well-updated. 

Well, I'm not as young as I once was. I find it harder and harder to take the time to sit down, shut everything out, and just listen to a record in its entirety. Records as an idea seem to be less important today than they were when I was younger, potentially due to the shorter attention spans we all have today. I still listen to whole records, but these days I admit I listen to new music a little more passively than I used to.

However, sometimes a lyric will catch my ear, and I'll want to understand the context around the line, and then the whole song. With Lyric Liker, I can quickly save those lyrics into a database to be able to come back to later at a time when I'm less busy and have an opportunity to read and really comprehend the lyrics at my leisure. I hope you will too.

## Installation Instructions
1. Navigate to the project's [GitHub page](https://github.com/trevortx/lyric-liker) and choose your favorite method of downloading the project. I use SSH, so I would click "Code", ensure "SSH" is chosen, and copy the link.
2. Then open your terminal and navigate to a directory in which you'd like to install the app. 
3. Type `git clone` followed by the link you copied from GitHub, and the app should be installed.
4. cd into the project's folder and type the following command in your terminal to install all dependences: `npm install`.
5. Navigate to [developer.spotify.com](https://developer.spotify.com/) and create a login or go ahead and log in if you have an account, then click "create an app." Give the app a name and description (feel free to use Lyric Liker and any description of your choice), and click "create." You should now see the Client ID for your Spotify app. Copy that, open the Login component, and paste it in as the `CLIENT_ID`. You will not need the Client Secret for this application.
6. Navigate to [developer.musixmatch.com](https://developer.musixmatch.com/) and click "Get started." On the next page, click "get started" underneath the free plan and sign up. Once you verify your account, click your username on the top right, then click "Dashboard," then "Applications." Click "View" next to the application that was created for you when you signed up, and copy the API key.
7. In the root directory of the project, create a .env file. in the env file, create one variable called `REACT_APP_MUSIXMATCH_KEY="YOUR-API-KEY-HERE"`
8. Open the .gitignore file and ensure .env is in it - it should be by default. If not, add it in the "# misc" section.
9. In your terminal, go to the json-server folder, then to the db folder. Use the command `json-server --watch db.json --port 3004` to start the server on port 3004.
10. Change directory back up to the root folder and execute the `npm start` command to run the application!
11. Utilize and enjoy the app. :)

## Note
If I were hosting this as a real application on the internet, I would purchase the Musixmatch paid subscription. Unfortunately the free subscription only provides 30% of the lyrics of every song. In the real world we would obvously want 100% of the lyrics of each song. Additionally, the Spotify API pulls in only the first 20 playlists and first 100 songs as well. This can be extended a little further

## Credits
APIs used:
- [Spotify](https://developer.spotify.com/)
- [Musixmatch](https://developer.musixmatch.com/)
