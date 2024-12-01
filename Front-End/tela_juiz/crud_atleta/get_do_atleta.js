document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('buscarAtletaForm')
    .addEventListener('submit', async function (event) {
      event.preventDefault() // Evita o envio padrão do formulário

      const nomeAtleta = document.getElementById('nomeAtleta').value.trim();
      if (nomeAtleta.trim() !== '') {
        // Se o campo de nome não estiver vazio, busca o atleta pelo nome
        await buscarAtletaPorNome(nomeAtleta)
      }
    })

  document
    .getElementById('buscarTodosAtletasForm')
    .addEventListener('submit', async function (event) {
      event.preventDefault() // Evita o envio padrão do formulário

      console.log('Buscando todos os atletas...')
      await buscarTodosAtletas()
    })

  async function buscarAtletaPorNome(nomeAtleta) {
    try {
      const response = await fetch(
        'http://127.0.0.1:8000/athletes'
      )
      if (!response.ok) {
        throw new Error('Erro ao buscar os atletas')
      }
      const data = await response.json()
      console.log('Todos os atletas:', data)

      const atletasFiltrados = data.filter(atleta =>
        atleta.name.toLowerCase().includes(nomeAtleta.toLowerCase())
      )
      console.log('Atletas filtrados:', atletasFiltrados)

      exibirResultados(atletasFiltrados)
    } catch (error) {
      console.error(error.message)
    }
  }

  async function buscarTodosAtletas() {
    try {
      const response = await fetch(
        'http://ec2-44-201-200-110.compute-1.amazonaws.com/athletes'
      )
      if (!response.ok) {
        throw new Error('Erro ao buscar todos os atletas')
      }
      const data = await response.json()
      console.log('Todos os atletas:', data)
      exibirResultados(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  function formatarData(data) {
    const dataObj = new Date(data)
    const dia = dataObj.getDate().toString().padStart(2, '0')
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0')
    const ano = dataObj.getFullYear().toString()
    return `${dia}/${mes}/${ano}`
  }

  function exibirResultados(atletas) {
    const resultadoBusca = document.getElementById('resultadoBusca')
    resultadoBusca.innerHTML = '' // Limpa os resultados anteriores

    if (atletas.length === 0) {
      resultadoBusca.textContent = 'Nenhum atleta encontrado.'
      return
    }

    const listaAtletas = document.createElement('div')
    listaAtletas.classList.add('lista-atletas') // Adicionando uma classe para estilização opcional
    atletas.forEach(atleta => {
      const atletaDiv = document.createElement('div')
      atletaDiv.classList.add('atleta')

      const elements_athlete = document.createElement('div')
      elements_athlete.classList.add('elements_athlete')

      const nomeAtleta = document.createElement('p')
      nomeAtleta.textContent = atleta.name
      nomeAtleta.classList.add('paragraph-title')

      const idadeAtleta = document.createElement('p')
      idadeAtleta.textContent = `Data de Nascimento: ${formatarData(
        atleta.birth_date
      )}`
      idadeAtleta.setAttribute('data-label', 'Data de Nascimento')
      idadeAtleta.classList.add('paragraph')

      const paisAtleta = document.createElement('p')
      paisAtleta.textContent = `País: ${atleta.country}`
      paisAtleta.setAttribute('data-label', 'País')
      paisAtleta.classList.add('paragraph')

      const alturaAtleta = document.createElement('p')
      alturaAtleta.textContent = `Altura: ${atleta.height}`
      alturaAtleta.setAttribute('data-label', 'Altura')
      alturaAtleta.classList.add('paragraph')

      const pesoAtleta = document.createElement('p')
      pesoAtleta.textContent = `Peso(Kg): ${atleta.weight}`
      pesoAtleta.setAttribute('data-label', 'Peso')
      pesoAtleta.classList.add('paragraph')

      const bestTimes = document.createElement('p')
      bestTimes.textContent = `Melhores Tempos: ${atleta.best_times}`
      bestTimes.setAttribute('data-label', 'Melhores tempos')
      bestTimes.classList.add('paragraph')

      const medalHistory = document.createElement('p')
      medalHistory.textContent = `Histórico de Medalhas: ${atleta.medal_history}`
      medalHistory.setAttribute('data-label', 'Histórico de Medalhas')
      medalHistory.classList.add('paragraph')

      const equipeAtleta = document.createElement('p')
      equipeAtleta.textContent = `Equipe: ${atleta.team}`
      equipeAtleta.setAttribute('data-label', 'Equipe')
      equipeAtleta.classList.add('paragraph')

      const esporteAtleta = document.createElement('p')
      esporteAtleta.textContent = `Modalidade: ${atleta.modality}`
      esporteAtleta.setAttribute('data-label', 'Modalidade')
      esporteAtleta.classList.add('paragraph')

      const specializations = document.createElement('p')
      specializations.textContent = `Especializações: ${atleta.specializations}`
      specializations.setAttribute('data-label', 'Especializações')
      specializations.classList.add('paragraph')

      // Adicionando imagens da caneta e da lixeira como links
      const linkEditar = document.createElement('a')
      linkEditar.href = `../tela_juiz/atualizar_atleta.html?id=${atleta.id}` // Defina o URL de edição aqui
      linkEditar.classList.add('link-editar')
      const imgCaneta = document.createElement('img')
      imgCaneta.src = 'https://cdn-icons-png.flaticon.com/512/1159/1159725.png' // URL da imagem da caneta
      imgCaneta.alt = 'Editar'
      linkEditar.appendChild(imgCaneta)

      const linkExcluir = document.createElement('a')
      linkExcluir.href = `../tela_juiz/excluir_atleta.html?id=${atleta.id}` // Defina o URL de exclusão aqui
      linkExcluir.classList.add('link-excluir')
      const imgLixeira = document.createElement('img')
      imgLixeira.src = 'https://cdn-icons-png.flaticon.com/512/1214/1214428.png' // URL da imagem da lixeira
      imgLixeira.alt = 'Excluir'
      linkExcluir.appendChild(imgLixeira)

      // Adicionando os links de edição e exclusão ao bloco de atleta
      const iconsDiv = document.createElement('div')
      iconsDiv.classList.add('icons-container')
      iconsDiv.appendChild(linkEditar)
      iconsDiv.appendChild(linkExcluir)

      elements_athlete.appendChild(nomeAtleta)
      elements_athlete.appendChild(idadeAtleta)
      elements_athlete.appendChild(paisAtleta)
      elements_athlete.appendChild(alturaAtleta)
      elements_athlete.appendChild(pesoAtleta)
      elements_athlete.appendChild(bestTimes)
      elements_athlete.appendChild(medalHistory)
      elements_athlete.appendChild(equipeAtleta)
      elements_athlete.appendChild(specializations)
      atletaDiv.appendChild(elements_athlete)
      atletaDiv.appendChild(iconsDiv)

      listaAtletas.appendChild(atletaDiv)
    })
    resultadoBusca.appendChild(listaAtletas)
  }
})
