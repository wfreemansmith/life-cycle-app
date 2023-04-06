# LifeCycle
LifeCycle is an interactive, animated CV builder that allows users to document their life milestones and events in a novel and visually engaging format for future employers. Users can create an account, log in, add milestones and attach different types of information to each milestone, such as text, images, qualifications, skills, and location. When the CV is complete, users can share a view-only link with whomever they wish.

This project uses [Svelte](https://svelte.dev/) as the frontend framework, [Firebase](https://firebase.google.com/) for authentication and real-time database, along with various other libraries such as [Tailwind CSS](https://tailwindcss.com/) for design and [Leaflet](https://leafletjs.com/) for interactive maps.

The project is hosted online here: [lifecycle-app.netlify.app](https://lifecycle-app.netlify.app/)

## Features

- User authentication (Sign up and Log in)
- Create, edit, and delete life milestones
- Add sub-events to each milestone
- Location
- Text
- Photos
- Qualifications
- Skills

## Using The Website

When navigating the website, you will be prompted to login or create user account. You will be asked to provide your date of birth, email address and a password, which will be stored securely using Firebase Authentication.

Once logged in or an account is created, you will be taken to the account page where you can edit your details. There's also an option to upload an avatar or select one of a number of preset profile pics -- this is just for fun, and won't be visible to anyone viewing your CV.

Clicking on "Create Tree" will give you your timeline, starting at birth. From here you can add a new milestone -- a significant event such as school, or starting a job, or any other personal events you feel have contributed to your professional development. Click the "+" button to add, edit, or delete milestones, or begin adding additional info such as photos, more text, qualifications etc.

In the top right corner you can enter "View Mode", previewing what anyone else will see.

Once you're ready you can click "Share" and retrieve your unique URL for sharing with employers. This URL is `/users/:username` -- generated from your sign in email.


# Running The Project Locally

## Prerequisites

Before you can run this project locally, you must have node version 19.5.0 or higher installed on your machine. To check your Node version, run node --version in your terminal.

## Installation

1. Clone the repository:

   `git clone https://github.com/wfreemansmith/life-cycle-app.git`


2. Install dependencies:
   
   `cd LifeCycle`

    `npm install`

#

3. Replace the Firebase configuration in the `src/firebase.js` file with your project's configuration

#
4. Run locally:

   `npm run dev`
   
# Credits

- Josh Foster: [LinkedIn](https://www.linkedin.com/in/) / [Github](https://github.com/JoshFost)
- Wesley Freeman-Smith: [LinkedIn](https://www.linkedin.com/in/wfreemansmith) / [Github](https://www.github.com/wfreemansmith)
- Aaron Kelly: [LinkedIn](https://www.linkedin.com/in/aaron-k-a508a6108/) / [Github](https://github.com/munist1010)
- Zahed Miah: [LinkedIn](https://www.linkedin.com/in/zahed-miah/) / [Github](https://github.com/zahedmiah)
