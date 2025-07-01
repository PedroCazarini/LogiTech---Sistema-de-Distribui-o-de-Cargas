from flask import request, jsonify, Blueprint

# Lista onde os pedidos serão salvos temporariamente
pedidos = []

def register_pedidos_routes(app):
    @app.route('/pedidos', methods=['POST'])
    def adicionar_pedido():
        try:
            data = request.get_json()
            if not data or 'pedidos' not in data:
                return jsonify({'erro': 'Formato inválido. Esperado: {"pedidos": [...] }'}), 400
            
            pedidos.clear()

            pedidos.extend(data['pedidos'])
            return jsonify({'mensagem': 'Pedidos adicionados com sucesso!', 'quantidade': len(data['pedidos'])}), 201
        
        except Exception as e:
            return jsonify({'erro': 'Erro ao adicionar pedidos', 'detalhes': str(e)}), 500

    @app.route('/pedidos', methods=['GET'])
    def listar_pedidos():
        return jsonify({'pedidos': pedidos}), 200
