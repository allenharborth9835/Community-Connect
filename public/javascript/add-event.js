async function newFormHandler(event){
  event.preventDefault();

  const event_name = document.querySelector('input[name="event_name"]').value;
  const location = document.querySelector('input[name="location"]').value;
  const zip = document.querySelector('input[name="zip"]').value;
  const event_category = document.querySelector('input[name="event_category"]').value;


  const response = await fetch(`/api/events`, {
    method: 'POST',
    body: JSON.stringify({
      event_name,
      location,
      zip,
      event_category
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);