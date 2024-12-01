document.addEventListener('DOMContentLoaded', function() {
    // Obter o campo de ID do atleta
    const idAtletaInput = document.getElementById('idAtleta');

    // Obter o ID do atleta da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idAtletaFromURL = urlParams.get('id');

    // Preencher o campo "ID" com o valor da URL, se disponível
    if (idAtletaFromURL) {
        idAtletaInput.value = idAtletaFromURL;
    }

    // Adicionar evento de submissão ao formulário
    document.getElementById('atletaForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obter o ID do atleta a ser excluído do campo de texto
        const idAtletaParaExcluir = parseInt(document.getElementById('idAtleta').value);

        // Chamar a função para excluir o atleta
        await excluirAtleta(idAtletaParaExcluir);
    });

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
      }
    async function excluirAtleta(idAtleta) {
        const token = getCookie('access_token');
        try {
            const response = await fetch(`http://127.0.0.1:8000/athlete/${idAtleta}`, {
                method: 'DELETE',
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  },
            });
            if (response.ok) {
                console.log('Atleta excluído com sucesso');
                alert('Atleta excluído com sucesso!');
                // Faça algo após a exclusão, se necessário
            } else {
                console.error('Erro ao excluir atleta:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao excluir atleta:', error);
        }
    }
});
