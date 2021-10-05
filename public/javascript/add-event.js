async function newFormHandler(event){
  console.log(event)
  event.preventDefault();

  const event_name = document.querySelector('input[name="event-name"]').value;
  const event_date = document.querySelector('input[name="event-date"]').value;
  const location = document.querySelector('input[name="event-location"]').value;
  const zip = document.querySelector('input[name="event-zip"]').value;
  let event_category = document.querySelector('input[name="event-category"]:checked').value;

  if (document.querySelector('input[name="event-category"]:checked').value == "Environmental") {
    event_category = 1
  } else if (document.querySelector('input[name="event-category"]:checked').value == "Fundraising/Charity") {
    event_category = 2
  } else if (document.querySelector('input[name="event-category"]:checked').value == "Education") {
    event_category = 3
  } else if (document.querySelector('input[name="event-category"]:checked').value == "Animals") {
    event_category = 4
  } else if (document.querySelector('input[name="event-category"]:checked').value == "Social Work") {
    event_category = 5 }



  const response = await fetch(`/api/events`, {
    method: 'POST',
    body: JSON.stringify({
      event_name,
      event_date,
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

document.querySelector('.new-event-form').addEventListener('submit', newFormHandler);
