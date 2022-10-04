const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // display 12 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 12) {
        phones = phones.slice(0, 12);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // no phone found 
    const noPhone = document.getElementById('no-phone');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDeatil('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show All </button>  
              
        </div>
    </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    // stop loader
    toggleSppiner(false)
}

const processSearch = (dataLimit) => {
    toggleSppiner(true)
    const inputFeild = document.getElementById('search-feild');
    const phoneText = inputFeild.value;
    loadPhones(phoneText, dataLimit);
}
document.getElementById('src-btn').addEventListener('click', function () {
    // start loader
    processSearch(10)
})


// search input field enter key handler
document.getElementById('search-feild').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
})




const toggleSppiner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}


// not the best way to load show All
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch()
})


const loadPhoneDeatil = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDeatil(data.data);
}

const displayPhoneDeatil = phone => {
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    console.log(phone)
    modalTitle.innerText = phone.name;
    const phoneDeatil = document.getElementById('phone-modal-deatil');
    phoneDeatil.innerHTML = `
       <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'no release date found'}</p>
       <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information '}</p>
       <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
       <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
    `
}

loadPhones('apple')