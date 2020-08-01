
//-------Клонирует шаблон и наполняет-----------------------------------------------
function creatCard (src, user, gender, phone, email, location, age, regEd) {
	let template = document.querySelector('.card');
	let cardsContaner = document.querySelector('.flex-container');
	let newCard = template.cloneNode(true);
	cardsContaner.append(newCard);
	document.querySelector('.js-image').setAttribute('src', src)
	document.querySelector('.js-name b').innerHTML = `${user}<br>( ${gender} )` ;
	document.querySelector('.js-phone').innerHTML = `phone: ${phone}`;
	document.querySelector('.js-email').innerHTML = email;
	document.querySelector('.js-location').innerHTML = location;
	//--------------Форматирование даты--------------------------------------------
	age = new Date(age);
	age = `${age.toDateString()}`;
	document.querySelector('.js-age').innerHTML = age;

	regEd = new Date(regEd);
	regEd = `${regEd.toDateString()} ${regEd.toLocaleTimeString()}`;
	document.querySelector('.js-registery').innerHTML = `${regEd}`;
}

function statistics (results, male, female, out) {
	let div = document.querySelector('.statistics');
	div.classList.add('stat-active');
	div.innerHTML = `Количество пользователей= ${results}<br>Мужчин= ${male}<br>Женщин= ${female}<br>${out}<br>`;
}

//-------Количество человек по странам--------
function countryPeople (country) {
	let out = '';
	for (let key in country) {
		out += `${key} - ${country[key]} чел. `;
	}
	document.querySelector('.statistics').innerHTML += `Количество пользователей по странам :<br>${out}`;
}

function myFetch () {
	document.querySelector('.btn').innerHTML = 'loaded';
	document.querySelector('.flex-container').innerHTML = '';
	let random = Math.ceil(Math.random() * 100);

	fetch(`https://randomuser.me/api/?results=${random}`)
	.then(data => {
        return data.json();
    })
    .then(data => {
    	//console.log(data);
    	document.querySelector('.btn').innerHTML = 'push me';
    	document.querySelector('.wrapper').classList.add('wrap-active')
    	document.querySelector('.title').innerHTML = 'Users';
    	let datRes = data.results;
         //-------Статистика-----------
       let results = data.info.results;
       let male = 0;
       let female = 0;
       let country = {};
       
        for (let i = 0; i < datRes.length; i++) {
        		let picture = datRes[i].picture.large;
        		let userName = '';
        		let gender = datRes[i].gender;
        		let phone = datRes[i].phone;
        		let email = datRes[i].email;
        		let location = `${datRes[i].location.country} ${datRes[i].location.city}<br>
        							${datRes[i].location.street.name} ${datRes[i].location.street.number}`;
        		let age = datRes[i].dob.date;
        		let regEd = datRes[i].registered.date;

        		for (let key in datRes[i].name) {
        			userName += datRes[i].name[key] + ' ';
				}
				creatCard (picture, userName, gender, phone, email, location, age, regEd);

				if (datRes[i].gender == 'male') male++;
				if (datRes[i].gender == 'female') female++;
				let out = '';
				if (male > female) {
					out = 'Мужчин больше .';
				} else if (male < female) {
					out = 'Женщин больше .';
				} else {
					out = 'Мужчин и Женщин равное количество';
				}

				if (typeof country[datRes[i].nat] == 'undefined') {
					country[datRes[i].nat] = 1;
				} else {
					country[datRes[i].nat]++;
				}
				statistics(results, male, female, out);
        }
        countryPeople(country);
    })
}

document.querySelector('.btn').onclick = myFetch;
