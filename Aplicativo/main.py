
# importes do kivy, app
from kivy.app import App
from kivy.lang import Builder
import requests

# define "rotas para carregar páginas"
GUI = Builder.load_file("tela.kv")

#  todo aplicativo é criado dentro de uma classe, orientação a objeto,
#  configura as funções, cada função define a função do aplicativo
class MeuAplicativo(App):
    # define função de Build, de criação def = function
    def build(self): # quando ele cria o app
    # retorna a rota da tela
        return GUI
 # mudança
    def on_start(self):
        # siginifica a tela.kv, ids todos
        self.root.ids["moeda1"].text = f"Dólar: R${self.pegar_meme('USD')}"
        self.root.ids["moeda2"].text = f"Euro: R${self.pegar_meme('EUR')}"
        self.root.ids["moeda3"].text = f"Bitcoin: R${self.pegar_meme('BTC')}"
    def pegar_meme(self, moeda):
        link = f"https://economia.awesomeapi.com.br/last/{moeda}-BRL"
        requisicao = requests.get(link)
        dic_requisicao = requisicao.json()
        cotacao = dic_requisicao[f"{moeda}BRL"]["bid"]
        return cotacao

MeuAplicativo().run()
# permite o aplicativo ficar rodando