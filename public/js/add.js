const locationForm = document.getElementById('location-form');
const locationId = document.getElementById('location-id');
const locationAddress = document.getElementById('location-address');

async function addLocation(e) {
  e.preventDefault();
  if (locationId.value === '' || locationAddress.value === '')
    alert('Please provide all fields!');

  const formData = {
    storeID: locationId.value,
    address: locationAddress.value,
  };

  console.log(formData);

  try {
    fetch('/api/stores', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      if (res.status === 400) {
        throw Error('Location already exists!');
      } else if (res.status === 500) {
        throw Error('Server error');
      }
      alert('Location added!');
      window.location.href = '/index.html';
    });
  } catch (error) {
    alert(error);
  }
}

locationForm.addEventListener('submit', addLocation);
