async function editFormHandler(event) {
  event.preventDefault();

  const event_name = document.querySelector('input[name="event_name"]').value;
  const location = document.querySelector('input[name="location"]').value;
  const zip = document.querySelector('input[name="zip"]').value;
  const event_category = document.querySelector('input[name="event_category"]').value;
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);