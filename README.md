# Karat Coding Challenge - Frontend Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). I have simplified the boilerplate documentation to just include the relevant scripts for running the application locally. Setup instructions will appear below the "Design Questions" write-up section.

## Design Questions

- How else might you have improved your solution given more time?

(These responses are numbered based on my perception of their priority.)

1. From the standpoint of a production application where sensitive financial information can be accessed, my first priority would be to explore ways to better protect this information. For example, while I did not take any action to obfuscate the credit card number, I did not feel it would have been appropriate to render the entire number in the dashboard despite having the data to do so. The assignment assumes the interaction is post-authentication, but sensitive information such as credit card numbers usually have another level security. I do not have this kind of experience other than using third-party platforms like Stripe that abstract away this concern, but I would probably start by looking into best practices for encryption of sensitive information at rest and in transit. Actual authentication would be great too!

2. From the standpoint of coding best practices, I believe there is ample room to improve the testing story. While I did set up some basic unit tests, I did run into "gotchas" in the implementation that slowed me down. (See the commit [here](https://github.com/ALIEN-TANG/karat-cc-frontend/commit/4234b6ca1e9f05d95c882473c0be29b76e94c0d5).) The `CardActivity`'s table sorting and filtering functions, which rely heavily on a headless UI library, would be a good candidate for more detailed testing.

3. The `react-query` library exposes error and loading states that can be used to give the user better feedback about their data fetching states. I took advantage of these to give that feedback as basic text messaging in the UI. While I believe I took care of these kinds of errors specifically in the UI, I did not provide a catch-all `ErrorBoundary` component. I know there are simple `ErrorBoundary` components that come stock, but they aren't much added benefit as they still break the UI experience. With more time, I would add a catch-all with a more passable user experience.

4. I chose not to use Typescript for this project, because at my current level of familiarity, it would have added non-neglible development time. In a larger, more collaborative development setting where the upfront work might save others' time and avoid a whole class of bugs, I would have considered using Typescript.

- Feedback and Calibration

  - Approximately how many hours did you spend on this challenge?

    ~ 4 hours

        - mock and model data (40min)
        - init and scaffold frontend (20min)
        - render card overview with data (30min)
        - render card activity table with data (30min)
        - add table sort and filter functionality (40min)
        - minimal UI refinement (20min)
        - debugging and adding basic tests (50min...💀)

  - What did you find most interesting / rewarding about this challenge?

    I really liked having to think through and implement a solution for the data needs. While I have modeled data and built out a backend service before, I had never done so with the requirement of having lots of mocked data points. Glad that Mockeroo came up quickly in the Google search; it worked great! Would love to hear other common solutions!

    I had also never used the `react-table` library extensively before this challenge. When I initially sketched out my action plan, I had slated more time to figure out how to build the filtering and sorting functionality of the table. Luckily, the library has great documentation; I was able to level up my usage of the library without too much added time.

  - What did you find least interesting / rewarding about this challenge?

    Debugging a small implementation detail in my test setup and needing to dig though Stackoverflow to find the polyfill that would unblock me is never fun, but glad I was able to save some time elsewhere by leveraging existing code I had for minutia like UI gridding, etc. ([This app's](https://generic-todo-app.alexting.world/) UI might look familiar! 😁)

## Install

```
$ git clone git@github.com:ALIEN-TANG/karat-cc-frontend.git
$ cd karat-cc-frontend
$ yarn
```

## Configure app

You will need a `.env` to run the application. A basic `.env-sample` is provided for you to fill out.

```
<!-- .env-sample -->
REACT_APP_API_URL=[[ WHEREVER THE MOCK BACKEND IS RUNNING ]]
```

And don't forget to source the variables:

```
$ source .env
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
