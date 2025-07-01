from flask import request, jsonify

# Valor padrão
peso_maximo_configurado = {"peso_maximo": 100}

def register_caminhoes_routes(app):

    # Endpoint para configurar o peso máximo
    @app.route('/caminhoes', methods=['POST'])
    def configurar_peso_maximo():
        try:
            data = request.get_json()
            if not data or 'peso_maximo' not in data:
                return jsonify({'erro': 'O campo "peso_maximo" é obrigatório.'}), 400

            peso = data['peso_maximo']
            if not isinstance(peso, (int, float)) or peso <= 0:
                return jsonify({'erro': 'O peso máximo deve ser um número positivo.'}), 400

            peso_maximo_configurado['peso_maximo'] = peso
            return jsonify({
                'mensagem': 'Peso máximo atualizado com sucesso!',
                'peso_maximo': peso
            }), 200

        except Exception as e:
            return jsonify({'erro': 'Erro ao atualizar peso máximo', 'detalhes': str(e)}), 500

    # Endpoint para consultar o peso atual configurado
    @app.route('/caminhoes', methods=['GET'])
    def consultar_peso_maximo():
        return jsonify(peso_maximo_configurado), 200
