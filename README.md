# Crypto OrderBook Data Display App

A web application used to visualize the real time prices of order book data of popular cryptocurrency pairs i.e. BTC-USD, ETH-USD, LTC-USD, BCH-USD.\

Other functionalities are as follows:\
- User can toggle between the ladder and chart view in order to visual data. 
- Dropdown is provided at the top right corner to select any currencypair to visualize. The current best bid and ask is also displayed on the top.
## Technologies used

React, Typescript, Vite, Web Sockets
## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

For building the app

## Important Packages Used and their explanation

### MUI
Easy to use UI components & icons with customization possible.

### React chart js 2
Widely used library for charts in React. Displayed data for bids and asks on a Line Graph


### react-loading-dot
For indication of loading while the real time data is being fetched.


## Assumptions & Information
- The real-time current best bids and ask value is displayed adjusted to 8 decimal places. 

- Bid and ask data displayed is for past 1 hour with 15 seconds intervals.

- The UI is divided into logical components and the folder is made as such that the relavant files are grouped so it is easy to understand.

- Have added basic theme colors in _variables.scss so that if the theme colors have to be changed, we can change it at one place only. Similarly for use of colors in tsx components the theme colors are added as enum in the common folder.

- scss files are used & container class for the specific component is wrapped for that component's scss so that the components styling are not mixed.

- Favicon and title are updated according to the app as well.

### Folder Structure
- `common` folder consists of the common information i.e. the data, interfaces, constants & enums.
- `components` folder contains all the components.
- `assets` folder consists of all the images used. In this case, app logo.
- `src` folder has all the global files & configs.

## APIs used

[Coinbase api](https://docs.cloud.coinbase.com/exchange/docs/websocket-channels#level2-channel) is used as it didn't require API Keys or secret to fetch data as well. API used:
- **Level2 Batch API:** To get real time bids and asks updates for crypto. The initial response of the api id snapshot which consists of the price and size pairs. Whereas after that, level2update type of data is returned includeing the bids and asks data each second.

## Other References
### Icons
The icons used in this project are downloaded from [https://logowik.com/](https://logowik.com/)