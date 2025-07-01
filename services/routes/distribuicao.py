from flask import jsonify, Blueprint
from flask_cors import CORS
from services.distribuidor import distribuir_pedidos

from pedidos import pedidos 
from caminhoes import peso_maximo_configurado

distribuicao_bp = Blueprint('distribuicao', __name__)
CORS(distribuicao_bp, origins=["http://localhost:3000"])

# Variáveis para guardar resultado

caminhoes_distribuidos = []
nao_alocados = []

@distribuicao_bp.route('/distribuir', methods=['POST'])
def distribuir():
    global caminhoes_distribuidos, nao_alocados

    #Limpar distribuições anteriores
    caminhoes_distribuidos.clear()
    nao_alocados.clear()

    #distribuir os pedidos atuais com o peso configurado
    peso_max = peso_maximo_configurado['peso_maximo']
    caminhoes_distribuidos, nao_alocados = distribuir_pedidos(pedidos, peso_max)
    pedidos.clear()


    return jsonify({'mensagem': 'Distribuição feita com sucesso!'})


@distribuicao_bp.route('/distribuicao', methods=['GET'])
def ver_distribuicao():
    return jsonify([
        { 
            "id": c.id,
            "peso_total": c.peso_total,
            "pedidos": c.pedidos
        } for c in caminhoes_distribuidos
    ])

@distribuicao_bp.route('/nao_alocados', methods=['GET'])
def ver_nao_alocados():
    return jsonify(nao_alocados)