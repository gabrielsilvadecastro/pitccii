document.addEventListener('DOMContentLoaded', async function () {
    // Obter o campo de ID da partida
    const idPartidaInput = document.getElementById('idPartida');

    // Obter o ID da partida da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idPartidaFromURL = urlParams.get('id');

    // Preencher o campo "ID" com o valor da URL, se disponível
    if (idPartidaFromURL) {
        idPartidaInput.value = idPartidaFromURL;
        // Chamada para preencher os campos do formulário imediatamente
        await preencherCamposComDadosDaPartida(idPartidaFromURL);
    }

    // Função para buscar os dados da partida e preencher os campos do formulário
    async function preencherCamposComDadosDaPartida(idPartida) {
        const dadosAtuais = await buscarPartida(idPartida);

        if (dadosAtuais) {
            preencherCamposFormulario(dadosAtuais);
        } else {
            console.error('Erro ao obter dados da partida');
        }
    }

    // Função para buscar os dados da partida
    async function buscarPartida(idPartida) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/match/${idPartida}`);
            if (!response.ok) {
                throw new Error('Partida não encontrada');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Erro ao buscar partida: ${error.message}`);
            return null;
        }
    }

    // Função para preencher os campos do formulário com os dados da partida
    function preencherCamposFormulario(dadosAtuais) {
        document.getElementById('dataHoraPartida').value = dadosAtuais.datetime;
        document.getElementById('match_type').value = dadosAtuais.match_type;
        document.getElementById('distanciaProva').value = dadosAtuais.distance;
        document.getElementById('localPartida').value = dadosAtuais.location;
        document.getElementById('match_status').value = dadosAtuais.match_status;
        document.getElementById('judges').value = dadosAtuais.judges;
        document.getElementById('result').value = dadosAtuais.result;

        var nomesAtletas = dadosAtuais.athletes_involved;

        // Separando os nomes em um array
        var nomesArray = nomesAtletas.split(", ");

        // Atualizando os campos de input com os nomes dos atletas
        for (var i = 0; i < nomesArray.length; i++) {
            var inputId = "atleta" + (i + 1) + "Nome";
            document.getElementById(inputId).value = nomesArray[i];
        }
    }

    // Event listener para quando o campo de ID da partida mudar
    idPartidaInput.addEventListener('change', async function () {
        const idPartida = idPartidaInput.value.trim();
        const dadosAtuais = await buscarPartida(idPartida);

        if (dadosAtuais) {
            preencherCamposFormulario(dadosAtuais);
        } else {
            console.error('Erro ao obter dados da partida');
        }
    });

    // Event listener para o envio do formulário
    document.getElementById('partidaForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obter ID da partida a ser atualizada
        const idPartida = idPartidaInput.value.trim();

        // Obter os dados atuais da partida
        const dadosAtuais = await buscarPartida(idPartida);

        // Obter valores dos campos do formulário
        const datetime = document.getElementById('dataHoraPartida').value.trim();
        const match_type_input = document.getElementById('match_type');
        const match_type_ = match_type_input.value.trim();
        const match_type = match_type_.charAt(0).toUpperCase() + match_type_.slice(1).toLowerCase();

        const distance = parseFloat(document.getElementById('distanciaProva').value.trim());
        const match_status = document.getElementById('match_status').value.trim();
        const judges = document.getElementById('judges').value.trim();
        const location = document.getElementById('localPartida').value.trim();
        const result = "";
        let atletas = '';
        for (let i = 1; i <= 8; i++) {
            const atletaNome = document.getElementById('atleta' + i + 'Nome').value.trim();
            if (atletaNome.trim() !== '') {
                atletas += atletaNome + ', ';
            }
        }
        // Remove a vírgula extra no final
        atletas = atletas.slice(0, -2);

        // Verificar se todos os nomes de atletas estão na lista da API
        const nomesAtletasAPI = await obterNomesAtletasAPI(); // Função para obter os nomes de atletas da API
        const nomesAtletasFormulario = atletas.split(', ');
        const todosNomesValidos = nomesAtletasFormulario.every(nome => nomesAtletasAPI.includes(nome));

        if (!todosNomesValidos) {
            alert('Um ou mais nomes de atletas inseridos não são válidos. Por favor, verifique os nomes.');
            return; // Impede o envio do formulário se houver nomes inválidos
        }

        // Montar objeto com os dados atualizados da Partida
        const dadosAtualizados = {
            datetime: datetime,
            match_type: match_type,
            distance: distance,
            match_status: match_status,
            judges: judges,
            location: location,
            athletes_involved: atletas,
            result: result,
        };

        // Chamar a função para atualizar a Partida
        await atualizarPartida(idPartida, dadosAtualizados);
    });

    // Função para obter os nomes de atletas da API
    async function obterNomesAtletasAPI() {
        try {
            const response = await fetch('http://ec2-44-201-200-110.compute-1.amazonaws.com/athletes');
            if (!response.ok) {
                throw new Error('Erro ao obter atletas da API');
            }
            const data = await response.json();
            const nomesAtletas = data.map(athlete => athlete.name);
            return nomesAtletas;
        } catch (error) {
            console.error('Erro ao obter nomes de atletas da API:', error);
            return []; // Retorna uma lista vazia em caso de erro
        }
    }

    // Função para verificar se os nomes dos atletas estão na API
    async function verificarNomesNaAPI(nomes) {
        const token = getCookie('access_token');
        try {
            for (const nome of nomes) {
                const response = await fetch(`http://ec2-44-201-200-110.compute-1.amazonaws.com/athletes?name=${nome}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`Erro ao verificar o atleta "${nome}" na API`);
                }
                const data = await response.json();
                if (data.length === 0) {
                    return false; // Nome não encontrado na API
                }
            }
            return true; // Todos os nomes encontrados na API
        } catch (error) {
            console.error('Erro ao verificar nomes na API:', error.message);
            return false;
        }
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    // Função para atualizar os dados
    async function atualizarPartida(idPartida, dadosAtualizados) {
        const token = getCookie('access_token');
        try {
            const response = await fetch(`http://ec2-44-201-200-110.compute-1.amazonaws.com/match/${idPartida}`, {
                method: 'PUT', // Método PUT para atualizar
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosAtualizados)
            });
            const data = await response.json();
            console.log('Partida atualizada:', data);
            alert('Partida atualizada com sucesso!');
            // Faça algo com a resposta, se necessário
        } catch (error) {
            console.error('Erro ao atualizar partida:', error);
        }
    }
});

