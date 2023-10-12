const retry = (operation, maxRetries, delay) => {
  return new Promise((resolve, reject) => {
    let retries = 0;
    function attempt() {
    console.info("Retry", retries);

      operation()
        .then(resolve)
        .catch((error) => {
          if (retries < maxRetries) {
            retries++;
            console.info(`Retry ${retries} after delay`);
            setTimeout(attempt, delay);
          } else {
            reject(error);
          }
        });
    }

    attempt();
  });
};

export { retry };