from flask import Flask
from flask_cors import CORS

from pedidos import register_pedidos_routes
from caminhoes import register_caminhoes_routes
from services.routes.distribuicao import distribuicao_bp

app = Flask(__name__)

# ✅ Habilita CORS para toda a API (incluindo Blueprints)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# ✅ Registra rotas
register_pedidos_routes(app)
register_caminhoes_routes(app)
app.register_blueprint(distribuicao_bp)

# ✅ Rota principal de teste
@app.route('/')
def home():
    return "API da LogiTech funcionando!"

# ✅ Início da aplicação
if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Port 5000 é padrão do Flask
