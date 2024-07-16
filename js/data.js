export async function fetchData() {
    const response = await fetch('https://ahmedbadara.github.io/jobfair-api/db.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  