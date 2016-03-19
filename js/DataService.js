angular.module ('loudApp.services')

.service('DataService', [
	function() {
		var data = {},

		users = [
			//rol 1 = admin
			{
				'id'			: 1,
				'email' 		: 'Harry@loud.com',
				'password' 		: 'Hedwig',
				'name'			: 'Harry',
				'lastName'		: 'Potter',
				'personalIdType': 1,
				'personalId'	: 111122221,
				'rol'			: 1,
				'rId'			: 'a-1',
				'image'			: '../img/'
			},
			//rol 2 = promotor
			{
				'id'			: 2,
				'email' 		: 'albus@loud.com',
				'password' 		: 'fawkes',
				'name'			: 'Albus',
				'lastName'		: 'Dumbledore',
				'personalIdType': 1,
				'personalId'	: 111133331,
				'rol'			: 2,
				'rId'			: 'p-1',
				'image'			: '../img/'
			},
			{
				'id'			: 3,
				'email' 		: 'severus@loud.com',
				'password' 		: 'doe',
				'name'			: 'Severus',
				'lastName'		: 'Snape',
				'personalIdType': 1,
				'personalId'	: 111144441,
				'rol'			: 2,
				'rId'			: 'p-2',
				'image'			: '../img/'
			},
			//rol 3 = cliente
			{
				'id'			: 4,
				'email' 		: 'ronald@loud.com',
				'password' 		: 'scabbers',
				'name'			: 'Ronald',
				'lastName'		: 'Weasley',
				'personalIdType': 2,
				'personalId'	: 111155551,
				'rol'			: 3,
				'rId'			: 'c-1',
				'creditCard'	: 	[
										{
											ownerName	: 'Ronald Bilius Weasley',
											cardType	: 1,
											number		: 1110000111110001,
											code		: 123
										}
									],
				'imparment'		: '',
				'specialCond'	: '',
				'image'			: '../img/'
			},
			{
				'id'			: 5,
				'email' 		: 'hermione@loud.com',
				'password' 		: 'crookshanks',
				'name'			: 'Hermione',
				'lastName'		: 'Granger',
				'personalIdType': 1,
				'personalId'	: 111166661,
				'rol'			: 3,
				'rId'			: 'c-2',
				'creditCard'	: 	[
										{
											ownerName	: 'Hermione Granger',
											cardType	: 1,
											number		: 1110000111110002,
											code		: 234
										}
									],
				'imparment'		: '',
				'specialCond'	: '',
				'image'			: '../img/'
			},
			{
				'id'			: 6,
				'email' 		: 'ginny@loud.com',
				'password' 		: 'arnold',
				'name'			: 'Ginny',
				'lastName'		: 'Weasley',
				'personalIdType': 2,
				'personalId'	: 111177771,
				'rol'			: 3,
				'rId'			: 'c-3',
				'creditCard'	: 	[
										{
											ownerName	: 'Ginevra Molly Weasley',
											cardType	: 1,
											number		: 1110000111110003,
											code		: 456
										}
									],
				'imparment'		: '',
				'specialCond'	: '',
				'image'			: '../img/'
			},
			//rol 4 = cajero
			{
				'id'			: 7,
				'email' 		: 'neville@loud.com',
				'password' 		: 'trevor',
				'name'			: 'Neville',
				'lastName'		: 'Longbottom',
				'personalIdType': 1,
				'personalId'	: 111188881,
				'rol'			: 4,
				'rId'			: 't-1',
				'image'			: '../img/'
			},
			{
				'id'			: 8,
				'email' 		: 'luna@loud.com',
				'password' 		: 'snorkack',
				'name'			: 'Luna',
				'lastName'		: 'Lovewood',
				'personalIdType': 2,
				'personalId'	: 111199991,
				'rol'			: 4,
				'rId'			: 't-1',
				'image'			: '../img/'
			}
		],

		rol = [
			{
				'id' 			: 1,
				'code'			: 'admin',
				'name'			: 'Administrador'
			},
			{
				'id' 			: 2,
				'code'			: 'promoter',
				'name'			: 'Promotor'
			},
			{
				'id' 			: 3,
				'code'			: 'client',
				'name'			: 'Cliente'
			},
			{
				'id' 			: 4,
				'code'			: 'teller',
				'name'			: 'Cajero'
			}
		],

		events = [
			{
				'id'			: 1,
				'name'			: 'Mark Antony en concierto',
				'date'			: '08/09/2016',
				'startHour'		: '21:00',
				'finishHour'	: '00:00',
				'eventType'		: 1,
				'description'	: 'Mark Antony en Costa Rica',
				'location'		: 1,
				'status'		: 1,
				'price'			: 35000,
				'image'			: '../img/',
				'promoTickets'	: 1
			},
			{
				'id'			: 2,
				'name'			: 'Baile con Tikizia',
				'date'			: '07/10/2016',
				'startHour'		: '18:00',
				'finishHour'	: '23:00',
				'eventType'		: 2,
				'description'	: 'Actividad bailable con música en vivo',
				'location'		: 2,
				'status'		: 1,
				'price'			: 5000,
				'image'			: '../img/',
				'promoTickets'	: 2
			}
		],

		eventType = [
			{
				'id'			: 1,
				'description'	: 'concert'
			},
			{
				'id'			: 2,
				'description'	: 'dance'
			}
		],

		location = [
			{
				'id'			: 1,
				'name'			: 'Estadio Saprissa',
				'phone'			: '2222-0009',
				'capacity'		: 23000,
				'scheme'		: '',
				'geographicLoc'	: '9°57′56″N 84°04′32″O',
				'adress'		: 'San Juan de Tibás',
				'image'			: '../img/'
			},
			{
				'id'			: 1,
				'name'			: 'Peppers Disco Club',
				'phone'			: '2222-0809',
				'capacity'		: 2000,
				'scheme'		: '',
				'geographicLoc'	: '9.918104, -84.048427',
				'adress'		: 'Contiguo al parqueo de Price Smart Zapote, San José',
				'image'			: '../img/'
			}
		],

		cardType = [
			{
				'id'			: 1,
				'name'			: 'Visa'
			},
			{
				'id'			: 2,
				'name'			: 'Master Card'
			},
			{
				'id'			: 3,
				'name'			: 'American Express'
			}
		],

		personalIdType = [
			{
				'id'			: 1,
				'type'			: 'national'
			},
			{
				'id'			: 2,
				'type'			: 'foreign'
			}
		];

		var data 			= {};
		data.users			= users;
		data.rol			= rol;		
		data.events			= events;
		data.eventType		= eventType;
		data.location		= location;
		data.cardType		= cardType;
		data.personalIdType	= personalIdType;

		return {
			getData: function() {
				return data;
			}
		}

	}
])


