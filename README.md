
# Projeto Integrador Transdisciplinar em Ciência da Computação II
Gabriel Silva de Castro
RGM: 41151445
## Requisitos

Antes de começar, certifique-se de que você tem os seguintes requisitos instalados:

- Python 3.8 ou superior
- pip (gerenciador de pacotes do Python)

## Tecnologias utilizadas

- Fast API
- SQLite
- HTML
- CSS
- Javascript

## Instalação em seu ambiente local

Crie e ative um ambiente virtual (opcional, mas altamente recomendado):

```bash
python3 -m venv venv
source venv/bin/activate
```

4. Instale as dependências do projeto:

```bash
pip install -r src/requirements.txt
```

## Executando o projeto

Após a instalação, você pode iniciar o servidor de desenvolvimento executando o seguinte comando:

```bash
uvicorn src.server:app --reload
```

Isso iniciará o servidor de desenvolvimento em `http://localhost:8000`. Você pode acessar a documentação interativa da API em `http://localhost:8000/docs`.


