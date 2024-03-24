const RESTBASE = "https://nicolesedillo.com/portfolio/wp-json/wp/v2";

export async function getPages() {
  try {
    const response = await fetch(`${RESTBASE}/pages`);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchImageUrlById(imageId) {
  try {
    const response = await fetch(`${RESTBASE}/media/${imageId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch image URL');
    }
    const data = await response.json();
    return data.source_url;
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return null;
  }
}
