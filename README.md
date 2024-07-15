# Toy Robot Simulator

Toy Robot Simulator is a game in which user can create a dynamic matrix and move robot in whichever direction he wishes and get coordinates of current position of the robot.

---

## Key Features

- Dynamic Matrix (Default = 5x5)
- Direction and Movement Handler of the robot
- Show Coordinates of current position of the robot

---

## Folder Structure

```jsx
- /public
- /src
   - /assets
   - /components
   - /utils
   - App.css
   - App.tsx
   - index.css
   - main.tsx
- tsconfig.json
- package-lock.json
- package.json
- README.md
```

---

## How to Use

1. Fork and Clone the Project
2. Run `npm install` in the terminal to install dependencies
3. Run `npm run start` to start the server on your local and paste the url given in terminal on your browser to view changes
4. To change the matrix count add `matrix` prop to the `TableTop` component like `<TableTop matrix={7} />`
5. Some of the test data is provided in `testData.md` file. However all the test cases can be tested on UI.
