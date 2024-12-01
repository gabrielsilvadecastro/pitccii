document.addEventListener('DOMContentLoaded', function () {
    // Adiciona eventos de clique para cada botão de filtro
    document.querySelectorAll('.option-container').forEach(button => {
      button.addEventListener('click', async function(event) {
        const tipoPartida = event.target.textContent.trim();
        await buscarPartidasPorTipo(tipoPartida);
      });
    });
  });
  
  async function buscarPartidasPorTipo(tipoPartida) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/match/type/${tipoPartida}`
      );
      if (!response.ok) {
        throw new Error('Erro ao buscar as partidas!');
      }
      const partidas = await response.json();
      console.log(`Partidas do tipo ${tipoPartida}:`, partidas);
      exibirResultados(partidas);
    } catch (error) {
      console.error(error.message);
    }
  }

function exibirResultados(partidas) {
    const matchFilter = document.getElementById('matchmaking-container')
    matchFilter.innerHTML = ''

    if (partidas.length === 0) {
      matchFilter.textContent = 'Nenhuma partida encontrada.'
      matchFilter.classList.add('no-matches-found');
      return
    }

    partidas.forEach(partida => { console.log(partida);console.log(partida.athletes_involved);
    const matchContainer = document.createElement('div')
    matchContainer.classList.add('match-container') // Adicionando uma classe para estilização opcional
     // match day -> match container
        const matchDay = document.createElement('p')
        matchDay.textContent = `${partida.datetime}`
        matchDay.classList.add('match-day')

        const  swimmersGlobalContainer = document.createElement('div')
        swimmersGlobalContainer.classList.add('swimmers-global-container')

            const  leftSwimmerSideContainer = document.createElement('div')
            leftSwimmerSideContainer.classList.add('left-swimmer-side-container')

                const  swimmerContainer1 = document.createElement('div')
                swimmerContainer1.classList.add('swimmer-container')

                    const  iconFlag1 = document.createElement('img')
                    iconFlag1.src = `../assets/flag-icons-main/flags/4x3/${partida.athletes_involved[0].country.toLowerCase()}.svg`
                    iconFlag1.classList.add('icon-flag')

                    const swimmerText1 = document.createElement('p')
                    swimmerText1.textContent = `${partida.athletes_involved[0].name}`
                    swimmerText1.classList.add('swimmer-text')
                
                const  swimmerContainer2 = document.createElement('div')
                swimmerContainer2.classList.add('swimmer-container')

                    const  iconFlag2 = document.createElement('img')
                    iconFlag2.src = `../assets/flag-icons-main/flags/4x3/${partida.athletes_involved[1].country.toLowerCase()}.svg`
                    iconFlag2.classList.add('icon-flag')

                    const swimmerText2 = document.createElement('p')
                    swimmerText2.textContent = `${partida.athletes_involved[1].name}`
                    swimmerText2.classList.add('swimmer-text')

                const  swimmerContainer3 = document.createElement('div')
                swimmerContainer3.classList.add('swimmer-container')

                    const  iconFlag3 = document.createElement('img')
                    iconFlag3.src = `../assets/flag-icons-main/flags/4x3/${partida.athletes_involved[2].country.toLowerCase()}.svg`
                    iconFlag3.classList.add('icon-flag')

                    const swimmerText3 = document.createElement('p')
                    swimmerText3.textContent = `${partida.athletes_involved[2].name}`
                    swimmerText3.classList.add('swimmer-text')   
                    
                const  swimmerContainer4 = document.createElement('div')
                swimmerContainer4.classList.add('swimmer-container')

                    const  iconFlag4 = document.createElement('img')
                    iconFlag4.src = `../assets/flag-icons-main/flags/4x3/${partida.athletes_involved[3].country.toLowerCase()}.svg`
                    iconFlag4.classList.add('icon-flag')

                    const swimmerText4 = document.createElement('p')
                    swimmerText4.textContent = `${partida.athletes_involved[3].name}`
                    swimmerText4.classList.add('swimmer-text')

            const  rightSwimmerSideContainer = document.createElement('div')
            rightSwimmerSideContainer.classList.add('right-swimmer-side-container')

                const  swimmerContainer5 = document.createElement('div')
                swimmerContainer5.classList.add('swimmer-container')

                    const  iconFlag5 = document.createElement('img')
                    iconFlag5.src = `../assets/flag-icons-main/flags/4x3/${partida.athletes_involved[4].country.toLowerCase()}.svg`
                    iconFlag5.classList.add('icon-flag')

                    const swimmerText5 = document.createElement('p')
                    swimmerText5.textContent = `${partida.athletes_involved[4].name}`
                    swimmerText5.classList.add('swimmer-text')
                
                const  swimmerContainer6 = document.createElement('div')
                swimmerContainer6.classList.add('swimmer-container')

                    const  iconFlag6 = document.createElement('img')
                    iconFlag6.src = `../assets/flag-icons-main/flags/4x3/${partida.athletes_involved[5].country.toLowerCase()}.svg`
                    iconFlag6.classList.add('icon-flag')

                    const swimmerText6 = document.createElement('p')
                    swimmerText6.textContent = `${partida.athletes_involved[5].name}`
                    swimmerText6.classList.add('swimmer-text')

                const  swimmerContainer7 = document.createElement('div')
                swimmerContainer7.classList.add('swimmer-container')

                    const  iconFlag7 = document.createElement('img')
                    iconFlag7.src = `../assets/flag-icons-main/flags/4x3/${partida.athletes_involved[6].country.toLowerCase()}.svg`
                    iconFlag7.classList.add('icon-flag')

                    const swimmerText7 = document.createElement('p')
                    swimmerText7.textContent = `${partida.athletes_involved[6].name}`
                    swimmerText7.classList.add('swimmer-text')   
                    
                const  swimmerContainer8 = document.createElement('div')
                swimmerContainer8.classList.add('swimmer-container')

                    const  iconFlag8 = document.createElement('img')
                    iconFlag8.src = `../assets/flag-icons-main/flags/4x3/${partida.athletes_involved[7].country.toLowerCase()}.svg`
                    iconFlag8.classList.add('icon-flag')

                    const swimmerText8 = document.createElement('p')
                    swimmerText8.textContent = `${partida.athletes_involved[7].name}`
                    swimmerText8.classList.add('swimmer-text')
        
        const matchType = document.createElement('div')
        matchType.classList.add('match-type')

            const type = document.createElement('p')
            type.textContent = `${partida.match_type}`
            type.classList.add('type')

            const matchDistance = document.createElement('p')
            matchDistance.textContent = `${partida.distance}`
            matchDistance.classList.add('distance')

        const horizontalLine = document.createElement('div')
        horizontalLine.classList.add('horizontal-match-line')

    swimmerContainer1.appendChild(iconFlag1)
    swimmerContainer1.appendChild(swimmerText1)
    swimmerContainer2.appendChild(iconFlag2)
    swimmerContainer2.appendChild(swimmerText2)
    swimmerContainer3.appendChild(iconFlag3)
    swimmerContainer3.appendChild(swimmerText3)
    swimmerContainer4.appendChild(iconFlag4)
    swimmerContainer4.appendChild(swimmerText4)
    swimmerContainer5.appendChild(iconFlag5)
    swimmerContainer5.appendChild(swimmerText5)
    swimmerContainer6.appendChild(iconFlag6)
    swimmerContainer6.appendChild(swimmerText6)
    swimmerContainer7.appendChild(iconFlag7)
    swimmerContainer7.appendChild(swimmerText7)
    swimmerContainer8.appendChild(iconFlag8)
    swimmerContainer8.appendChild(swimmerText8)
    leftSwimmerSideContainer.appendChild(swimmerContainer1)
    leftSwimmerSideContainer.appendChild(swimmerContainer2)
    leftSwimmerSideContainer.appendChild(swimmerContainer3)
    leftSwimmerSideContainer.appendChild(swimmerContainer4)
    rightSwimmerSideContainer.appendChild(swimmerContainer5)
    rightSwimmerSideContainer.appendChild(swimmerContainer6)
    rightSwimmerSideContainer.appendChild(swimmerContainer7)
    rightSwimmerSideContainer.appendChild(swimmerContainer8)
    matchType.appendChild(type)
    matchType.appendChild(matchDistance)
    swimmersGlobalContainer.appendChild(leftSwimmerSideContainer)
    swimmersGlobalContainer.appendChild(rightSwimmerSideContainer)
    matchContainer.appendChild(matchDay)
    matchContainer.appendChild(swimmersGlobalContainer)
    matchContainer.appendChild(matchType)
    
    matchFilter.appendChild(matchContainer)
    matchFilter.appendChild(horizontalLine)
})

  }