# Pet.comCarinho
Instruções para executar:
>Executar comando yarn dev no terminal. Em seguida digitar "o", isso irá abrir o navegador com o programa 


Descrição:
Site de vendas para produtos de animais de estimação. Nós enviamos o produto direto para sua casa. Frete não incluso

Requisitos: o sistema deve possuir uma etapa de cadastro e verificação de credenciais para entrar na loja. Haverão duas categorias de usuários, administrador e usuário. Os administradores deverão ter seus emails e senhas cadastrados por outros administradores, não podendo utilizar o campo de registro de dados comum aos outros usuários. 
Os administradores poderão alterar a disponibilidade de produtos, gerenciar estoque, acessar o registro de compras de um usuário e excluí-lo. 
Os usuários poderão acessar seus perfis, além de realizar compras, que ficam guardadas em um carrinho, e pedir a entrega no seu domicílio, ou optar pela retirada em uma loja. No primeiro caso, o sistema irá calcular o frete baseado no endereço fornecido. Por fim, a compra é finalizada mediante o fornecimento de um número de um cartão de crédito.

Nossa estrutura e funcionalidades:
O programa começa na home, aonde você pode se direcionar para a área de login. Na área de login você pode se cadastrar, ou se já tiver as credenciais, basta inseri-las. Você será levado à loja, onde serão amostrados todos os produtos contidos no catálogo. Haverão 3 abas:
"Home", ou seja, para retorna-lo à página principal;
"Ofertas" irá filtrar os produtos amostrados, exibindo apenas aqueles com menor preço;
"Fale conosco" irá direcionar o usuário ao SAC 
