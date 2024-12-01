document.addEventListener('DOMContentLoaded', async function() {
    const idAtletaInput = document.getElementById('idAtleta');
    const urlParams = new URLSearchParams(window.location.search);
    const idAtletaFromURL = urlParams.get('id');

    if (idAtletaFromURL) {
        idAtletaInput.value = idAtletaFromURL;
        await preencherCamposComDadosDoAtleta(idAtletaFromURL);
    }

    async function preencherCamposComDadosDoAtleta(idAtleta) {
        const dadosAtuais = await buscarAtleta(idAtleta);
        if (dadosAtuais) {
            preencherCamposFormulario(dadosAtuais);
        } else {
            console.error('Erro ao obter dados do atleta');
        }
    }

    async function buscarAtleta(idAtleta) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/athlete/${idAtleta}`);
            if (!response.ok) {
                throw new Error('Atleta não encontrado');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Erro ao buscar atleta: ${error.message}`);
            return null;
        }
    }

    function preencherCamposFormulario(dadosAtuais) {
        document.getElementById('nomeAtleta').value = dadosAtuais.name;
        document.getElementById('idadeAtleta').value = dadosAtuais.birth_date;
        document.getElementById('alturaAtleta').value = dadosAtuais.height;
        document.getElementById('pesoAtleta').value = dadosAtuais.weight;
        document.getElementById('bestTimes').value = dadosAtuais.best_times;
        document.getElementById('medalHistory').value = dadosAtuais.medal_history;
        document.getElementById('paisAtleta').value = dadosAtuais.country;
        document.getElementById('equipeAtleta').value = dadosAtuais.team;
        document.getElementById('esporteAtleta').value = dadosAtuais.modality;

        const specializations = dadosAtuais.specializations.split(', ');
        document.querySelectorAll('input[name="especializacoes"]').forEach(checkbox => {
            checkbox.checked = specializations.includes(checkbox.value);
        });
    }

    idAtletaInput.addEventListener('change', async function() {
        const idAtleta = idAtletaInput.value.trim();
        if (idAtleta) {
            await preencherCamposComDadosDoAtleta(idAtleta);
        }
    });

    document.getElementById('atletaForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obter valores dos campos do formulário
        const idAtleta = idAtletaInput.value.trim();
        const nomeAtleta = document.getElementById('nomeAtleta').value;
        const idadeAtletaInput = document.getElementById('idadeAtleta'); // Input de data de nascimento
        // Obter apenas a data da string e adicionar 'T00:00' para formatar como date-time
        const idadeAtleta = idadeAtletaInput.value.split('T')[0] + 'T00:00';
        const alturaAtleta = parseFloat(document.getElementById('alturaAtleta').value);
        const pesoAtleta = parseFloat(document.getElementById('pesoAtleta').value);
        const bestTimes = document.getElementById('bestTimes').value;
        const medalHistory = document.getElementById('medalHistory').value;
        const paisAtleta = document.getElementById('paisAtleta').value;
        const equipeAtleta = document.getElementById('equipeAtleta').value;
        const esporteAtleta = document.getElementById('esporteAtleta').value;

        // Coletar especializações selecionadas
        const specializationsElements = document.querySelectorAll('input[name="especializacoes"]:checked');
        const specializations = Array.from(specializationsElements).map(el => el.value).join(', ');

        // Criar objeto atletaData
        const atletaData = {
            id: idAtleta,
            name: nomeAtleta,
            birth_date: idadeAtleta,
            height: alturaAtleta,
            weight: pesoAtleta,
            best_times: bestTimes,
            medal_history: medalHistory,
            country: paisAtleta,
            team: equipeAtleta,
            modality: esporteAtleta,
            specializations: specializations
        };

        console.log('Atleta atualizado:', atletaData);
        // Chamar a função para atualizar o atleta
        await atualizarAtleta(atletaData);
    });

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    async function atualizarAtleta(atletaData) {
        const token = getCookie('access_token');
        try {
            const response = await fetch(`http://ec2-44-201-200-110.compute-1.amazonaws.com/athlete/${atletaData.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(atletaData)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar atleta');
            }

            const data = await response.json();
            console.log('Atleta atualizado:', data);
            alert('Atleta atualizado com sucesso!');
        } catch (error) {
            console.error(`Erro ao atualizar atleta: ${error.message}`);
        }
    }
});
