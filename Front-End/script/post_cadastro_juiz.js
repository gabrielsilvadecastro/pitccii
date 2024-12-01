document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const categoriaArbitragem = document.getElementById('categoriaArbitragem').value;
    const pais = document.getElementById('pais').value;
    const nivelCertificacao = document.getElementById('certification-select').value;
  
    const judgeData = {
      name: nome,
      surname: sobrenome,
      email: email,
      password: senha,
      country: pais,
      certification_level: nivelCertificacao,
      arbitration_category: categoriaArbitragem,
      associated_matches: "" // Ajuste conforme necessário
    };
  
    fetch('http://127.0.0.1:8000/judge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(judgeData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        document.getElementById('error-message').innerText = data.error;
      } else {
        alert('Juiz cadastrado com sucesso!');
        // Redirecionar ou limpar o formulário conforme necessário
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      document.getElementById('error-message').innerText = 'Ocorreu um erro ao cadastrar o juiz.';
    });
  });
  