
//Клонирует шаблон и наполняет
function creatCard (src, user, gender, phone, email, location, age, registered) {
	let template = document.querySelector('.card');
	let cardsContaner = document.querySelector('.flex-container');
	let newCard = template.cloneNode(true);
	cardsContaner.append(newCard);
	document.querySelector('.js-image').setAttribute('src', src)
	document.querySelector('.js-name').innerHTML = `${user} (${gender})` ;
	document.querySelector('.js-phone').innerHTML = `phone: ${phone}`;
	document.querySelector('.js-email').innerHTML = email;
	document.querySelector('.js-location').innerHTML = location;
	document.querySelector('.js-age').innerHTML = age;
	document.querySelector('.js-registery').innerHTML = registered;
}

function statistics (results, male, female, out) {
	let div = document.querySelector('.statistics');
	div.classList.add('stat-active');
	div.innerHTML = `Количество пользователей = ${results}<br>
	Мужчин = ${male}<br>
	Женщин = ${female}<br>${out}<br>`;
}

//-------Количество человек по странам--------
function countryPeople (country) {
	let out = '';
	for (let key in country) {
		out += `${key} - ${country[key]} чел. `;
	}
	document.querySelector('.statistics').innerHTML += `Количество пользователей по странам :<br>${out}`;
}

//-----Очищает flex-container от карточек
function clearCard () {
	let blockCards = document.querySelector('.flex-container');
	blockCards.innerHTML = [];
}

function myFetch () {
	clearCard ();
	let random = Math.ceil(Math.random() * 100);

	fetch(`https://randomuser.me/api/?results=${random}`)
	.then(data => {
        return data.json();
    })
    .then(data => {
    	//console.log(data);
         //-------Статистика-----------
       let results = data.info.results;
       let male = 0;
       let female = 0;
       let country = {};
        
        for (let i = 0; i < data.results.length; i++) {
        		let picture = data.results[i].picture.large;
        		let userName = '';
        		let gender = data.results[i].gender;
        		let phone = data.results[i].phone;
        		let email = data.results[i].email;
        		let location = `${data.results[i].location.country} ${data.results[i].location.city}<br>
        							${data.results[i].location.street.name} ${data.results[i].location.street.number}`;
        		let age = data.results[i].dob.date;
        		let registered = data.results[i].registered.date;

        		for (let key in data.results[i].name) {
        			userName += data.results[i].name[key] + ' ';
				}
				creatCard (picture, userName, gender, phone, email, location, age,registered);

				if (data.results[i].gender == 'male') male++;
				if (data.results[i].gender == 'female') female++;
				let out = '';
				if (male > female) {
					out = 'Мужчин больше .';
				} else if (male < female) {
					out = 'Женщин больше .';
				} else {
					out = 'Мужчин и Женщин равное количество';
				}

				if (typeof country[data.results[i].nat] == 'undefined') {
					country[data.results[i].nat] = 1;
				} else {
					country[data.results[i].nat]++;
				}

				statistics(results, male, female, out);
        }
        countryPeople(country);
    })
}

document.querySelector('.btn').onclick = myFetch;
