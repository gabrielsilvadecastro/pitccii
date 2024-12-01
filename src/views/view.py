
from fastapi.responses import HTMLResponse

# HTML para a página inicial
index_html = """
<!DOCTYPE html>
<html>
<head>
    <title>CRUD Example</title>
</head>
<body>
    <h1>CRUD Example</h1>
    <h2>Create Item</h2>
    <form action="/items/" method="post">
        <label>Name:</label><br>
        <input type="text" name="name"><br>
        <label>Description:</label><br>
        <input type="text" name="description"><br><br>
        <button type="submit">Create</button>
    </form>
    <h2>Items</h2>
    <ul>
        %s
    </ul>
</body>
</html>
"""

# Inicializa o aplicativo FastAPI
app = FastAPI()

# Página inicial
@app.get("/", response_class=HTMLResponse)
async def read_root():
    # Consulta todos os itens do banco de dados
    cursor.execute('SELECT * FROM items')
    items = cursor.fetchall()
    # Renderiza a lista de itens na página inicial
    item_list_html = ""
    for item in items:
        item_list_html += f"<li>{item['id']}: {item['name']} - {item['description']}</li>"
    return index_html % item_list_html
