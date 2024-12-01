function login(email, password) {
  fetch('http://127.0.0.1:8000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.access_token) {
      // Armazenar o token JWT nos cookies
      document.cookie = `access_token=${data.access_token}; path=/`;
      alert("Login bem sucedido");
      console.log('Login successful and token stored in cookies');
      window.location.href = "home.html";
    } else {
      alert(data.detail);
      console.error('Login failed');
    }
  })
  .catch(error => console.error('Error:', error));
}


function handleLoginFormSubmit(event) {
  event.preventDefault(); // Impedir o envio padrão do formulário

  const email = document.getElementById('email').value;
  const password = document.getElementById('senha').value;

  // Fazer login com as credenciais fornecidas
  var token = login(email, password);
    // .then((data) => {
    //   // Redirecionar o usuário para outra página após o login bem-sucedido
    //   console.log(data);
    //   console.log('Login bem-sucedido!');
    //   console.log(`Token armazenado nos cookies: ${document.cookie}`);
    // });
    console.log(token);
}

function getCookie(name) {
  const value = ` ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Adicionar um ouvinte de eventos para o envio do formulário de login
document.getElementById('loginForm').addEventListener('submit', handleLoginFormSubmit);
