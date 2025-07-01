class Caminhao:
    def __init__(self, id, peso_maximo):
        self.id = id
        self.peso_maximo = peso_maximo
        self.pedidos = []
        self.peso_total = 0

    def pode_adicionar(self, pedido):
        return self.peso_total + pedido["peso"] <= self.peso_maximo

    def adicionar(self, pedido):
        self.pedidos.append(pedido)
        self.peso_total += pedido["peso"]

def distribuir_pedidos(pedidos, peso_maximo):  
    pedidos = sorted(pedidos, key=lambda x: x["peso"], reverse=True)
    caminhoes = []
    nao_alocados = []

    for pedido in pedidos:
        if pedido["peso"] > peso_maximo:
            nao_alocados.append({**pedido, "motivo": "Excede limite"})
            continue

        for caminhao in caminhoes:
            if caminhao.pode_adicionar(pedido):
                caminhao.adicionar(pedido)
                break
        else:
            novo = Caminhao(len(caminhoes) + 1, peso_maximo)
            novo.adicionar(pedido)
            caminhoes.append(novo)

    return caminhoes, nao_alocados
