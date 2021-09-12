var getToken = (localStorage.getItem('token') === null) ? '' : localStorage.getItem('token');
var Authorization = `Bearer ${getToken}`;

async function httpPost(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization,
      'custom': 'my header'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json();
}

async function httpPut(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });

  return response.json();
}

async function httpGet(url = '') {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
      Authorization,
      'custom': 'my header'
    }
  });
  return response.json();
}

async function httpDelete(url = '') {

  const response = await fetch(url, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
      Authorization,
    }
  });
  return response.json();
}

export { httpPost, httpGet, httpPut, httpDelete }