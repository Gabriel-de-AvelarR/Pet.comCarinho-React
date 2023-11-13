# Pet.comCarinho

Configurações iniciais:

Certifique-se de que o node.js está instalado.
Para instalar as dependências do projeto, digite *yarn* no terminal de comando 

Execute o projeto digitando *yarn.dev* no terminal de comando e apertando, em seguida, a tecla "o" para abrir o navegador

------------------------------------------------------------------------------------------------------------------------
Descrição:
Site de vendas para produtos de animais de estimação. Nós enviamos o produto direto para sua casa. Frete não incluso

Requisitos: o sistema deve possuir uma etapa de cadastro e verificação de credenciais para entrar na loja. Haverão duas categorias de usuários, administrador e usuário. Os administradores deverão ter seus emails e senhas cadastrados por outros administradores, não podendo utilizar o campo de registro de dados comum aos outros usuários. 
Os administradores poderão alterar a disponibilidade de produtos, gerenciar estoque, acessar o registro de compras de um usuário e excluí-lo. 
Os usuários poderão acessar seus perfis, além de realizar compras, que ficam guardadas em um carrinho, e pedir a entrega no seu domicílio, ou optar pela retirada em uma loja. No primeiro caso, o sistema irá calcular o frete baseado no endereço fornecido. Por fim, a compra é finalizada mediante o fornecimento de um número de um cartão de crédito.

Código: Utilizamos Typescript, SCSS para a parte gráfica e React que nos permite criar diversos componentes e facilita o gerenciamento do projeto a medida que cresce o escolpo dele. Buscou-se fazer um código bem modularizado e fácil de se entender.

Nossa estrutura e funcionalidades:
O programa começa na área de login e registro. Ali o usuário irá fazer seu cadastro e acessar o sistema caso seus dados estejam gravados. Em seguida ele é direcionado para a pagina de compras, onde serão exibidas as opçoes de compra. Ao escolhe-las ele pode se direcionar para o carrinho, onde ele pode mudar a quantidade de cada item e finalizar a compra, mediante o preenchimento dos dados bancários. Seu histórico de compras ficará guardado e poderá ser acessado na área do usuário. 
