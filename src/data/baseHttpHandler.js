const getToken = () => {
	return (sessionStorage.getItem('token') !== null) ? sessionStorage.getItem('token') : '';
}

const setToken = (token) => {
	sessionStorage.setItem('token', token);
}

const getRol = () => {
	return (sessionStorage.getItem('rol') !== null) ? sessionStorage.getItem('rol') : 0;
}

const setRol = (idRol) => {
	sessionStorage.setItem('rol', idRol);
}

const setBook = (book) => {
	sessionStorage.setItem('book', JSON.stringify(book));
}

const getBook = () => {
	let book = {
		title: '',
		id: 0,
		descriptio: ''
	}

	if(sessionStorage.getItem('book') !== null) {
		book = JSON.parse(sessionStorage.getItem('book'));
	}

	return book;
}

const clearLocalDatabase = () => {
	sessionStorage.clear();
}

const getHeaders = (isAuth = false) => {
	const token = getToken();
	let headers = {
		'Content-Type': 'application/json'
	};

	if (isAuth && token !== '') {
		headers.Authorization = `Bearer ${token}`;
	}
	return headers;
}

const httpPost = async (url = '', data = {}, isToken = true) => {
	const response = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data),
		headers: getHeaders(isToken)
	});
	return response.json();
}

const httpGet = async (url = '', isToken = true) => {
	const response = await fetch(url, {
		method: 'GET',
		mode: 'cors',
		cache: 'default',
		headers: getHeaders(isToken)
	});
	return response.json();
}

async function httpPut(url = '', data = {}, isToken = true) {
	const response = await fetch(url, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data),
		headers: getHeaders(isToken)
	});

	return response.json();
}

const httpDelete = async(url = '', isToken = true) => {
	const response = await fetch(url, {
		method: 'DELETE',
		mode: 'cors',
		cache: 'default',
		headers: getHeaders(isToken)
	});
	return response.json();
}

export { httpPost, httpGet, httpPut, httpDelete, setToken, clearLocalDatabase, getRol, setRol, setBook, getBook}