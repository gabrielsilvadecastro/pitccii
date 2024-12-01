document.addEventListener('DOMContentLoaded', function() {
    // Aguarde o carregamento completo da página

    // Obtendo o campo de ID da Partida
    const idPartidaInput = document.getElementById('idPartida');

    // Obter o ID da partida da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idPartidaFromURL = urlParams.get('id');

    // Preencher o campo "ID" com o valor da URL, se disponível
    if (idPartidaFromURL) {
        idPartidaInput.value = idPartidaFromURL;
    }

    // Adicionar evento de submissão ao formulário
    document.getElementById('partidaForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obter o ID da partida a ser excluído do campo de texto
        const idPartidaParaExcluir = parseInt(idPartidaFromURL);

        // Chamar a função para excluir a partida
        await excluirAtleta(idPartidaParaExcluir);
    });

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
      }
      
      // pegar o token jwt que foi salvo nos cookies
      
      async function excluirAtleta(match_id) {
        const token = getCookie('access_token');

        try {
            const response = await fetch(`http://127.0.0.1:8000/match/${match_id}`, {
                method: 'DELETE',
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  }
            });
            if (response.ok) {
                console.log('Partida excluída com sucesso!');
                alert('Partida excluída com sucesso!');
                // Faça algo após a exclusão, se necessário
            } else {
                console.error('Erro ao excluir Partida:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao excluir Partida:', error);
        }
    }
});
