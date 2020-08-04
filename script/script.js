

//-------Шаблон карточек-----------------------------------------------
function template (src, user, gender, phone, email, location, age, regEd) {
	age = new Date(age);
	age = `${age.toDateString()}`;

	regEd = new Date(regEd);
	regEd = `${regEd.toDateString()} ${regEd.toLocaleTimeString()}`;

	let card = `
	<div class="card">
		<img src="${src}" alt="" class="card__image js-image">
		<ul class="card__description">
			<li class="js-name"><b>${user}<br>( ${gender} )</b></li>
			<li class="js-phone">phone: ${phone}</li>
			<li class="js-email"><a href="mailto:${email}">${email}</a></li>
			<li class="js-location">${location}</li>
			<li class="js-age">${age}</li>
			<li class="js-registery">${regEd}</li>
		</ul>
	</div>`;
	return card;
}
//---------Статистика-----------------------------------------------------
function statistics (results, male, female, country) {
	let whoIsMore = '';

	if (male > female) {
		whoIsMore = 'Мужчин больше .';
	} else if (male < female) {
		whoIsMore = 'Женщин больше .';
	} else {
		whoIsMore = 'Мужчин и Женщин равное количество';
	}

	let out = '';
	for (let key in country) {
		out += `${key} - ${country[key]} чел. `;
	}
	let stat = `
	<p>Количество пользователей= ${results}</p>
	<p>Мужчин= ${male}</p>
	<p>Женщин= ${female}</p>
	<p>${whoIsMore}</p>
	<p>Количество пользователей по странам :<br>${out}</p>`;
	return stat;
}

function myFetch () {
	document.querySelector('.btn').innerHTML = 'loading';
	let random = Math.ceil(Math.random() * 100);

	fetch(`https://randomuser.me/api/?results=${random}`)
	.then(data => {
        return data.json();
    })
    .then(data => {
    	//console.log(data);
    	document.querySelector('.btn').innerHTML = 'push me';
    	document.querySelector('.wrapper').classList.add('js-wrap-active')
    	document.querySelector('.title').innerHTML = 'Users';
    	let datRes = data.results;
    	let cards = '';
      let results = data.info.results;
      let male = 0;
      let female = 0;
      let country = {};
       
		for (let i = 0; i < datRes.length; i++) {
				let picture = datRes[i].picture.large;

				let userName = '';
				for (let key in datRes[i].name) {
					userName += datRes[i].name[key] + ' ';
			}
				let gender = datRes[i].gender;
				let phone = datRes[i].phone;
				let email = datRes[i].email;
				let location = `${datRes[i].location.country} ${datRes[i].location.city}<br>
									${datRes[i].location.street.name} ${datRes[i].location.street.number}`;
				let age = datRes[i].dob.date;
				let regEd = datRes[i].registered.date;

			cards += template (picture, userName, gender, phone, email, location, age, regEd);

			if (datRes[i].gender == 'male') male++;
			if (datRes[i].gender == 'female') female++;

			if (typeof country[datRes[i].nat] == 'undefined') {
				country[datRes[i].nat] = 1;
			} else {
				country[datRes[i].nat]++;
			}
		}
		document.querySelector('.flex-container').innerHTML = cards;
		let div = document.querySelector('.statistics');
		div.classList.add('js-stat-active');
		div.innerHTML = statistics(results, male, female, country);
    })
}
document.querySelector('.btn').addEventListener('click', myFetch);
