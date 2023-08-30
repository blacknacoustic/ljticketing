// Replace with your Notion integration token and database ID
const integrationToken = 'secret_VYeXbNustecGqLs9dZp1P5xiT49xmJxztjnaFtBABPa';
const databaseId = '92fe5b00e63c43ccbbf6a795dd6542ff';

// Function to submit the form data to Notion
function submitToNotion(data) {
    const requestBody = {
        parent: { database_id: databaseId },
        properties: {
            Name: { title: [{ text: { content: data.name } }] },
            Date: { date: { start: data.date } },
            Phone: { rich_text: [{ text: { content: data.number } }] },
            ModelNumber: { rich_text: [{ text: { content: data.modelnum } }] },
            SerialNumber: { rich_text: [{ text: { content: data.serialnum } }] },
            ProblemDescription: { rich_text: [{ text: { content: data.description } }] },
            ItemsIncluded: { rich_text: [{ text: { content: data.items } }] }
        }
    };

    const headers = {
        'Authorization': `Bearer ${integrationToken}`,
        'Content-Type': 'application/json'
    };

    axios.post('https://api.notion.com/v1/pages', requestBody, { headers })
        .then(response => {
            console.log('Data added to Notion:', response.data);
        })
        .catch(error => {
            console.error('Error adding data to Notion:', error.response.data);
        });
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const form = document.getElementById('myForm');
    const formData = new FormData(form);

    const formValues = {};
    for (const [key, value] of formData.entries()) {
        formValues[key] = value;
    }

    submitToNotion(formValues);
}

// Attach the form submission handler
document.getElementById('newsubmit').addEventListener('click', handleFormSubmit);
