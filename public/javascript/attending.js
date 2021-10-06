async function attendingClickHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch('/api/posts/attending',{
    method: 'PUT',
    body: JSON.stringify({
      event_id: id
    }),
    headers:{
      'Content-Type': 'application/json'
    }
  });

  if(response.ok){
    document.location.reload();
  }else{
    alert(response.statusText);
  }
}
document.querySelector('.attend-btn').addEventListener('click', attendingClickHandler);