# Oblique-Occasions

Vídeo do youtube https://youtu.be/RY-fAU5a7j8

slides:  https://www.canva.com/design/DAGREGp2es0/UyBENpgp52AqVUthE5jfzg/edit

Desenvolido por Gustavo lima - 211062928 e Daniel ferreira - 211061565

Projeto desenvolvido para a disciplina de Orientação a Objetos, ministrada pelo professor Henrique Gomes de Moura.

Oblique-Occasions é um website construído com Django REST e Next.js, utilizando PostgreSQL como banco de dados. A autenticação é feita via token JWT e a infraestrutura é gerenciada com Docker. Para rodar o projeto, basta executar o seguinte comando:

```sh
docker-compose up --build
```

Este comando irá configurar todas as dependências necessárias para rodar o projeto. Para acessar a página de administração do site, acesse a porta 8000 do localhost e utilize as credenciais de administrador (usuário: admin, senha: admin).

### Funcionalidades
**Oblique-Occasions é um site para visualização das músicas do seu artista favorito, onde você também tem acesso a matérias publicadas no site. Suas principais funcionalidades incluem:**

Login com token JWT e criptografia de senha
Funções de seguir e deixar de seguir (follow e unfollow)
Visualização de quem você segue e de quem te segue
Alteração de perfil (foto, nome de usuário e email)
Acesso administrativo para gerenciar usuários, adicionar novos artistas e novos gêneros


sendo estes seus diagramas 

![uml](/uml.png)
![drf](/DRF.png)
![drf](/Diagrama-de-fluxo-de-dados.png)
