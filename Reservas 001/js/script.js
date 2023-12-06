const searchForm = document.querySelector('#search-form');
const searchResultsDiv = document.querySelector('#search-results');
const reservationForm = document.querySelector('#reservation-form');
const roomSelect = document.querySelector('#room');

// Popula o select de quartos disponíveis com os quartos recebidos do servidor
function populateRooms(rooms) {
  for (let i = 0; i < rooms.length; i++) {
    const roomOption = document.createElement('option');
    roomOption.value = rooms[i].id;
    roomOption.textContent = rooms[i].name;
    roomSelect.appendChild(roomOption);
  }
}

// Realiza a busca por quartos disponíveis no servidor
async function searchRooms(checkinDate, checkoutDate, numPeople) {
  const response = await fetch(`/search?checkin=${checkinDate}&checkout=${checkoutDate}&numPeople=${numPeople}`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar quartos: ${response.statusText}`);
  }
  const rooms = await response.json();
  searchResultsDiv.innerHTML = '';
  if (rooms.length > 0) {
    const roomsList = document.createElement('ul');
    for (let i = 0; i < rooms.length; i++) {
      const roomListItem = document.createElement('li');
      roomListItem.textContent = `${rooms[i].name} - ${rooms[i].price}/noite`;
      roomsList.appendChild(roomListItem);
    }
    searchResultsDiv.appendChild(roomsList);
    populateRooms(rooms);
  } else {
    searchResultsDiv.textContent = 'Não foram encontrados quartos disponíveis.';
  }
}

// Realiza a reserva no servidor
async function makeReservation(name, email, phone, roomId, checkinDate, checkoutDate, numPeople) {
  const response = await fetch('/reservation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      roomId,
      checkinDate,
      checkoutDate,
      numPeople
    })
  });
  if (!response.ok) {
    throw new Error(`Erro ao fazer reserva: ${response.statusText}`);
  }
  const reservation = await response.json();
  alert(`Reserva realizada com sucesso! Número da reserva: ${reservation.id}`);
}

// Handler do submit do form de busca
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const checkinDate = searchForm.elements['checkin-date'].value;
  const checkoutDate = searchForm.elements['checkout-date'].value;
  const numPeople = searchForm.elements['num-people'].value;
  searchRooms(checkinDate, checkoutDate, numPeople)
    .catch(error => {
      alert(error.message);
    });
});

// Handler do submit do form de reserva
reservationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = reservationForm.elements['name'].value;
  const email = reservationForm.elements['email'].value;
  const phone = reservationForm.elements['phone'].value;
  const roomId = reservationForm.elements['room'].value;
  const checkinDate = reservationForm.elements['checkin-date'].value;
  const checkoutDate = reservationForm.elements['checkout-date'].value;
  const numPeople = reservationForm.elements['num-people'].value;
  makeReservation(name, email, phone, roomId, checkinDate, checkoutDate, numPeople)
    .catch(error => {
      alert(error.message);
    });
});
