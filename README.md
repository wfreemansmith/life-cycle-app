# LifeCycle
LifeCycle is a web application that allows users to track and document their life milestones and events. Users can create an account, log in, add milestones, edit them, and attach different types of information to each milestone, such as text, photos, qualifications, skills, and location.

This project uses Svelte as the frontend framework, Firebase for authentication and real-time database, and various components for additional features.

## Features

- User authentication (Sign up and Log in)
- Create, edit, and delete life milestones
- Add sub-events to each milestone
- Location
- Text
- Photos
- Qualifications
- Skills

## prerequisites 

Before you can run this project locally, you must have node version 19.5.0 or higher installed on your machine. To check your Node version, run node --version in your terminal.

## Installation

1. Clone the repository:
git clone https://github.com/wfreemansmith/life-cycle-app.git


2. Install dependencies:
    - cd LifeCycle
    - npm install

#

3. Set up Firebase:
   - Create a new Firebase project
   - Enable authentication and real-time database
   - Replace the Firebase configuration in the `src/firebase.js` file with your project's configuration

#
4. Run locally:
    - npm run dev
    - npm run build

