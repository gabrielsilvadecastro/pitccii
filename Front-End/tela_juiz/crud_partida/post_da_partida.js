document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('partidaForm');

  // Função para obter o token do cookie
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  // Função para preencher as opções do seletor de atleta com os nomes dos atletas da API
  function populateAthleteSelectOptions() {
    const token = getCookie('access_token');

    fetch('http://127.0.0.1:8000/athletes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const athleteSelects = document.querySelectorAll('[id^=atleta][name$=Nome]');
      
      athleteSelects.forEach(select => {
        select.innerHTML = '';
        const defaultOption = document.createElement('option');
        defaultOption.text = 'Selecione';
        defaultOption.value = '';
        select.appendChild(defaultOption);

        data.forEach(athlete => {
          const option = document.createElement('option');
          option.text = athlete.name;
          option.value = athlete.id; // Alterado para usar o ID do atleta
          option.setAttribute('data-info', athlete.name);
          select.appendChild(option);
        });
      });
    })
    .catch(error => {
      console.error('Erro ao obter atletas:', error);
    });
  }

  populateAthleteSelectOptions();

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const dataHoraPartida = document.getElementById('dataHoraPartida').value;
    const match_type = document.getElementById('match_type').value;
    const distanciaProva = parseInt(document.getElementById('distanciaProva').value);
    const localPartida = document.getElementById('localPartida').value.trim();
    const match_status = 'Partida agendada';
    const judges = document.getElementById('judges').value.trim();
    const result = '';

    let atletasArray = [];
    let atletasNames = [];
    for (let i = 1; i <= 8; i++) {
      const select = document.getElementById('atleta' + i + 'Nome');
      const atletaId = select.value; // Alterado para usar o ID do atleta
      console.log(atletaId);

      Array.from(select.options).forEach(option => {
        if(option.value == atletaId){
          const atletaName = option.getAttribute('data-info'); 
          if(atletaName !== null){
            if (atletaName.trim() !== '') {
              atletasNames.push(atletaName);
              console.log(atletaName);
            }
          }
        }
      });
      
      if(atletaId !== null){
        if (atletaId.trim() !== '') {
          atletasArray.push(atletaId);
        }
      }

      
    }


    const token = getCookie('access_token');

    if (!token) {
      alert('Token não encontrado. Por favor, faça login novamente.');
      return;
    }

    function checkAthleteExists(id, token) {
      return fetch(`http://127.0.0.1:8000/athlete/${id}`, { // Alterado para verificar se o atleta existe usando seu ID
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao verificar o atleta. Por favor, tente novamente.');
        }
        return response.json();
      })
      .then(data => {
        return data !== null; // Verifica se o atleta foi encontrado
      });
    }

    function arrayParaString(array) {
      return array.join(', ');
    }

    Promise.all(atletasArray.map(id => checkAthleteExists(id, token)))
      .then(results => {
        if (results.every(exists => exists)) {
          const partidaData = {
            datetime: dataHoraPartida,
            match_type: match_type,
            distance: distanciaProva,
            match_status: match_status,
            judges: judges,
            location: localPartida,
            athletes_involved: arrayParaString(atletasNames),
            result: result
          };

      

          console.log(partidaData);
          fetch('http://127.0.0.1:8000/match', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(partidaData)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erro ao criar a partida. Por favor, tente novamente.');
            }
            return response.json();
          })
          .then(data => {
            console.log('Partida criada com sucesso:', data);
            alert('Partida criada com Sucesso!');
          })
          .catch(error => {
            console.error('Erro:', error.message);
            if (error.response) {
              error.response.text().then(errorMessage => {
                console.error('Corpo da resposta do servidor:', errorMessage);
              });
            }
          });          
        } else {
          alert('Um ou mais atletas inseridos não existem. Por favor, verifique os nomes.');
        }
      })
      .catch(error => {
        console.error('Erro ao verificar atletas:', error.message);
      });
  });
});
