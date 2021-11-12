const requestSymbol = () => {};

const displayInfo = (infoList) => {
  if (document.querySelectorAll(".info")) {
    let infoElements = document.querySelectorAll(".info");
    infoElements.forEach((element) => {
      element.remove();
    });
  }

  infoList.forEach((infoItem) => {
    console.log("ITEM = " + infoItem);
    let info = document.createElement("p");
    info.className = "info";
    info.innerText = infoItem;
    stockContainer = document.querySelector(".stock-info-container");
    stockContainer.appendChild(info);
  });
};

const fetchAPIData = async () => {
  symbol = document.querySelector(".symbol-search").value;
  console.log("SYMBOL " + symbol);
  // API Key goes here
  apiKey = "";

  // Fetch response from API
  let response = await fetch(
    `https://api.tdameritrade.com/v1/marketdata/${symbol}/pricehistory?apikey=${apiKey}`
  );

  // If response is OK--send data through
  if (response.status === 200) {
    console.log(response);
    let data = await response.json();
    console.log(data);

    displayInfo([
      "Symbol: " + symbol,
      "Day Open Price: " + data.candles[0].open,
      "Day Closing Price: " + data.candles[0].close,
    ]);
  } else {
    console.log("Error: Unable to retrieve data.");
  }
};
