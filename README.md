# Note: 
### Screenshots and demo-video of the project are included in the folder 'Screenshots_and_demo-video' of the repository.

# About This Project
This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

This project is an "social learning" android application.

### App Features
This application has 4 main modules.
1) Quiz Module: Allows user to take a quiz and test their knowledge. The App also maintains the history of all the quiz attmepts.
2) Chat Module: Allows all the users on the platform to send text messages to each other and enhance the social learning experience. The "seen" and "unseen" status of the messages is also tracked. 
3) Task Module: Allows users to create, edit, delte tasks and maintain their to-do list. Users can mark task as "done" or "pending". The App also has filtering options (All, pending, done) for tasks. The total cound of pending, all and done tasks is also tracked in the profile tab.
4) Profile Module: Allows users to upload their profile-picture/avatar, see their quiz-history and also their tasks count. Users can log out of the application through the profile tab.

### Other Details
In this project: 
1) The authorization is implemented using 'Firebase Authentication'.
2) Real-time chat is implemented using 'Firebase Real-time database'.
3) To-do list or tasks are implemented using 'Firebase Real-time database'
4) Banner-Ads and Interstitial-Ads are implemented through 'Google AdMob'.
5) Quiz history-tracking is implemented throught 'Firebase Real-time database'

### Tech Stack
1) React Native CLI
2) Firebase Authentication 
3) Firebase Real-time Database

### Firebase Setup
1) Create a new Firebase project from the Firebase Console.
2) Add/Register this app in the project. The "Android package name" is "com.task6".
3) Download the 'goolge-services.json' file from the Firebase project and put it in this directory of the project "android/app/goolge-services.json".

### AdMob Setup
1) Add this app in your Google AdMob account.
2) Copy the "App ID".
3) In the root directory, in the file: "app.json", replace the value of "android_app_id" with your own Google AdMob App-ID.

# How To Run This Project
## Step 1: Setup the enviromnet
Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 2: Setup Firebase
Setup 'firebase' files in the project, according to your google account. Such as including the 'goolge-services.json' file in the directory: "android/app/goolge-services.json".

## Step 3: Replace the Ad-Ids
In the directory: "src/Ad-Ids.js", replace the Google TestAd-Ids with your own Ad-Ids (to show Ads of your choice).

## Step 4: Add your App-Id
In the root directory, in the file: "app.json", replace the value of "android_app_id" with your own Google AdMob App-ID.

## Step 5: Build and run your app
Make sure that the 'Android Studio' Emulator is running.
Navigate to the root directory of the project in 'command prompt' and run the following commands:

```sh
npm i
```

wait for packages to finish getting installed. Then run the command:

```sh
npm run android
```
The app will get installed in the 'Android Studio' Emulator and start running.

# Screenshots:
![App Screenshot](Screenshots_and_demo-video/Screenshots/01.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/02.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/03.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/04.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/05.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/06.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/07.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/08.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/09.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/10.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/01.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/02.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/03.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/04.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/05.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/06.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/07.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/08.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/09.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/10.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/01.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/02.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/03.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/04.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/05.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/06.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/07.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/08.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/09.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/10.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/01.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/02.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/03.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/04.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/05.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/06.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/07.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/08.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/09.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/10.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/01.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/02.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/03.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/04.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/05.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/06.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/07.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/08.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/09.png)
![App Screenshot](Screenshots_and_demo-video/Screenshots/10.png)
