const RESTBASE = "https://nicolesedillo.com/portfolio/wp-json/wp/v2"

function getPages() {
    return fetch(`${RESTBASE}/pages`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  }

  export { getPages }