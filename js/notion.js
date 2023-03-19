const notion = new NotionAPI({ auth: 'secret_CCbb7H6t0SItTBroCIeNDQQQ9Du8TDSn3MKVxRrfyVh' });
const databaseId = '92fe5b00e63c43ccbbf6a795dd6542ff';

const searchInput = document.querySelector('#phone');
const searchInput2 = document.querySelector('#repairid');
const resultsList = document.querySelector('#results');

searchInput.addEventListener('input', async (e) => {
  const query = e.target.value;

  if (query) {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Phone Number',
        title: {
          contains: query,
        },
      },
    });

    renderResults(response.results);
  } else {
    resultsList.innerHTML = '';
  }
});

searchInput2.addEventListener('input', async (e) => {
  const query = e.target.value;

  if (query) {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Repair ID',
        title: {
          contains: query,
        },
      },
    });

    renderResults(response.results);
  } else {
    resultsList.innerHTML = '';
  }
});

function renderResults(results) {
  resultsList.innerHTML = '';

  results.forEach((result) => {
    const title = result.properties['title'].title[0].plain_text;
    const url = `https://www.notion.so/${result.id.replace(/-/g, '')}`;

    const li = document.createElement('li');
    const titleLink = document.createElement('a');
    const urlLink = document.createElement('a');

    titleLink.href = url;
    titleLink.textContent = title;

    urlLink.href = url;
    urlLink.textContent = url;

    li.appendChild(titleLink);
    li.appendChild(document.createTextNode(' ('));
    li.appendChild(urlLink);
    li.appendChild(document.createTextNode(')'));

    resultsList.appendChild(li);
  });
}
