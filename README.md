# Boas vindas ao repositório do projeto Stock System!

  - O foco do projeto foi desenvolver uma REST API para controle de estoque utilizando Nest.js e Typescript;
  - O sistema armazena todos os registros utilizando MongoDB.

## Antes de começar o desenvolvimento:

1. Clone o repositório:
  * `git@github.com:vitor-m-cardoso/stock-system.git`
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd stock-system`

2. Instalar as dependências [**Se houver**]:
  * `npm install`
  * ou
  * `yarn install`

---

## Estrutura de pastas e arquivos:

<details>
  <summary><strong>O projeto está organizado no seguinte formato:</strong></summary>

```bash
├── README.md
├── src
│   ├── auth
│       ├── strategy
│       │   └── constants.ts
│       │   └── jwt-auth.guard.ts
│       │   └── jwt.strategy.ts
│       │   └── local-auth.guard.ts
│       │   └── local.strategy.ts
│       ├── auth.module.ts
│       ├── auth.service.ts
│   ├── ingredients
│       ├── dto
│       │   └── create-ingredient.dto.ts
│       │   └── update-user-dto.ts
│       ├── middlewares
│       │   └── ingredients.middleware.ts
│       ├── schemas
│       │   └── ingredient.schema.ts
│       ├── ingredients.controller.ts
│       ├── ingredients.module.ts
│       ├── ingredients.service.ts
│   ├── login
│       ├── dto
│       │   └── login.dto.ts
│       ├── middlewares
│       │   └── login.middleware.ts
│       ├── schemas
│       │   └── login.schema.ts
│       ├── login.controller.ts
│       ├── login.module.ts
│   ├── products
│       ├── dto
│       │   └── create-product.dto.ts
│       │   └── update-product.dto.ts
│       ├── schemas
│       │   └── product.schema.ts
│       ├── validations
│       │   └── imageFileFilter.validation.ts
│       │   └── isRegisterValid.validation.ts
│       │   └── isValidId.validation.ts
│       │   └── quantity.validation.ts
│       ├── products.controller.ts
│       ├── products.module.ts
│       ├── products.service.ts
│   ├── users
│       ├── dto
│       │   └── user.dto.ts
│       ├── middlewares
│       │   └── user.middleware.ts
│       ├── schemas
│       │   └── user.schema.ts
│       ├── users.controller.ts
│       ├── users.module.ts
│       ├── users.service.ts
│   ├── utils
│       ├── roles
│       │   └── roles.decorator.ts
│       │   └── roles.enum.ts
│       │   └── roles.guard.ts
│       ├── bcrypt.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```
</details>

## Endpoints que a aplicação possui:

### Usuários:

<details>

  <summary><strong>A aplicação contém o endpoint POST `/users`:</strong></summary>

  - Este endpoint deve ser capaz de adicionar um novo usuário no banco de dados;

- O corpo da requisição deve ter o seguinte formato:

  ```json
  {
    "name": "Primeiro user",
    "password": "mypassword",
    "email": "primeiroemail@test.com",
    "roles": "admin"
  }
  ```

- O campo de e-mail será considerado válido se tiver o formato `<prefixo>@<domínio>.com` e se for único. Ele é obrigatório.

- Se houver uma pessoa com o mesmo endereço de e-mail no banco de dados, o seguinte erro deve ser retornado:

  ```json
  {
    "status": 409,
    "error": "Email já cadastrado no sistema."
  }
  ```

- Caso contrário, deverá retornar a resposta no seguinte formato:

  ```json
  {
    "roles": [
      "admin"
    ],
    "password": "$2b$10$/MDbFamyCDcxgNGn.mM2AO1BZZ83E4R0U.IsGCGSvv18PIBFjBII2",
    "email": "primeiroemail@test.com",
    "name": "Primeiro user",
    "_id": "6213cd9a5718200872a8327c",
    "__v": 0
  }
  ```

</details>

<details>

  <summary><strong>A aplicação contém o endpoint GET `/users`:</strong></summary>

 - Este endpoint retorna todos os usuários cadastrados no banco de dados;

</details>

<details>

  <summary><strong>A aplicação contém o endpoint DELETE `/users/:id`:</strong></summary>

- Deleta um usuário com o ID especificado na URL;

- Exemplo de requisição:
    - `http://localhost:3000/users/61aaf5d3f74fe61c2bbe087c`

- A resposta deve retornar no seguinte formato:
  ```json
  {
    "success": "Usuário deletado com sucesso."
  }
  ```

- Caso nenhum usuário seja encontrado no banco de dados, resposta deve retornar no seguinte formato:
  ```json
  {
    "status": 404,
    "error": "Usuário não existe no sistema."
  }
  ```

</details>

### Login:

<details>

  <summary><strong>A aplicação contém o endpoint POST `/login`:</strong></summary>

 - Este endpoint retorna um token de acesso para um usuário cadastrado;

- O corpo da requisição deve ter o seguinte formato:
  ```json
  {
    "email": "primeiroemail@test.com",
    "password": "mypassword"
  }
  ```

- Se os campos estiverem corretos, a resposta deverá ser um token JWT, no seguinte formato:
  ```json
  {
    "access_token": "eyJhbGciOFDSFzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RpbmdlbWFpbEBleGFtcGxlLmNvbSIsInN1YiI6IjYxYWJlYzRkMGUyMGU3Y2FjODZiMWMyMSIsImlhdCI6MTYzODcyMjkzOSwiZXhwIjoxNjM4NzQ4MTM5fQ.zaoUERfXIVMY-8RUv-PosFZIBnjyGPGkoPgKcebEJg0"
  }
  ```

</details>

## Atenção:

### À partir de agora, todas as rotas precisam do token JWT para realizar as requisições, caso o token não seja informado, os endpoints retornarão o seguinte status:
  ```json
  {
    "statusCode": 401,
    "message": "Unauthorized"
  }
  ```

> O token deve ser utilizado como `Bearer token`.

---

### Ingredientes:

<details>

  <summary><strong>A aplicação contém o endpoint POST `/ingredients`:</strong></summary>

- Esse endpoint cadastra um novo ingrediente;

- O corpo da requisição deve ser enviado em um formato parecido com este:
  ```json
  {
    "name": "Leite em pó",
    "measuringUnit": "250 g",
    "unitPrice": 10,
    "quantity": 10,
  }
  ```

- Se os campos estiverem corretos, a resposta retornará em um formato parecido com este:
  ```json
  {
    "quantity": 10,
    "unitPrice": 10,
    "measuringUnit": "250 g",
    "name": "Leite em pó",
    "_id": "6213d22e5718200872a83281",
  }
  ```

</details>

<details>

  <summary><strong>A aplicação contém o endpoint GET `/ingredients`:</strong></summary>

- Este endpoint retorna todos os ingredientes cadastratos no sistema.

</details>

<details>

  <summary><strong>A aplicação contém o endpoint GET `/ingredients/:id`:</strong></summary>

- Busca um ingrediente pelo seu ID cadastrado no sistema;
  - O ID deve ser especificado na URL.

- Exemplo de requisição:
    - `http://localhost:3000/ingredients/6213d22e5718200872a83281`

- A resposta da requisição deve estar em um formato parecido com este:
  ```json
  {
    "_id": "6213d22e5718200872a83281",
    "quantity": 10,
    "unitPrice": 10,
    "measuringUnit": "250 g",
    "name": "Leite em pó",
  }
  ```

</details>

<details>

  <summary><strong>A aplicação contém o endpoint PUT `/ingredients/:id`:</strong></summary>

- Altera as informações de um ingrediente pelo seu ID;
  - O ID deve serespecificado na URL da requisição.

- Exemplo de requisição:
    - `http://localhost:3000/ingredients/6213d22e5718200872a83281`;

- Alterando a seguinte informação:
    ```json
    {
      "measuringUnit": "750 g"
    }
    ```

- A resposta deve retornar em um formato parecido com este:
  ```json
  {
    "_id": "6213d22e5718200872a83281",
    "quantity": 10,
    "unitPrice": 10,
    "measuringUnit": "750 g",
    "name": "Leite em pó",
  }
  ```

</details>

<details>

  <summary><strong>A aplicação contém o endpoint DELETE `/ingredients/:id`:</strong></summary>

- Deleta um ingrediente pelo seu ID;
  - O ID deve ser especificado na URL.

- Exemplo de requisição:
    - `http://localhost:3000/ingredients/6213d22e5718200872a83281`;

- A resposta deve retornar em um formato parecido com este:
  ```json
  {
    "success": "Ingrediente deletado com sucesso."
  }
  ```

- Caso o ingrediente não exista no sistema, a resposta retorna em um formato parecido com este:
  ```json
  {
    "status": 404,
    "error": "Ingrediente não existe no sistema."
  }
  ```

</details>

### Produtos:

<details>

  <summary><strong>A aplicação contém o endpoint POST `/products`:</strong></summary>

- Este endpoint é utilizado para o cadastro de um novo produto;

- O corpo da requisição deve estar em um formato parecido com este:
  ```json
  {
    "productName": "Capuccino",
    "productIngredients": "leite em pó, chocolate em pó...",
    "productPrice": 15,
    "productImage": "capuccino.png",
    "quantity": 50
  }
  ```
> _A requisição é feita no formato `Multipart Form` e só serão aceitas imagens no formato `PNG` e `JPG`._

- Caso todos os campos estejam corretos, a resposta deve estar em um formato parecido com este:
  ```json
  {
    "quantity": 50,
    "productIngredients": "leite em pó, chocolate em pó...",
    "productPrice": 15,
    "productImage": "capuccino.png",
    "productName": "Capuccino",
    "_id": "6213d4cf5718200872a8328b",
  }
  ```
 
</details>

<details>

  <summary><strong>A aplicação contém o endpoint GET `/products`:</strong></summary>

- Este endpoint tem a função de retornar todos os produtos cadastratos no sistema.
 
</details>

<details>

  <summary><strong>A aplicação contém o endpoint GET `/products/:id`:</strong></summary>

- Busca um produto pelo seu ID;
  - O ID deverá ser especificado na URL.

- Exemplo de requisição:
    - `http://localhost:3000/products/6213d4cf5718200872a8328b`;

- A resposta deve estar em um formato parecido com este:
  ```json
  {
    "_id": "6213d4cf5718200872a8328b",
    "quantity": 50,
    "productIngredients": "leite em pó, chocolate em pó...",
    "productPrice": 15,
    "productImage": "capuccino.png",
    "productName": "Capuccino",
  }
  ```
 
</details>

<details>

  <summary><strong>A aplicação contém o endpoint PUT `/products/:id`:</strong></summary>

- Altera as informações de um produto pelo seu ID;
  - O ID deverá ser especificado na URL.

- Exemplo de requisição:
    - `http://localhost:3000/ingredients/6213d22e5718200872a83281`;
 
- Alterando as informações do preço do produto: 
  ```json
  {
  "productPrice": 20
  }
  ```

- A resposta deve retornar em um formato parecido com este:
  ```json
  {
    "_id": "6213d4cf5718200872a8328b",
    "quantity": 50,
    "productIngredients": "leite em pó, chocolate em pó...",
    "productPrice": 20,
    "productImage": "githubIcon.png",
    "productName": "Capuccino",
  }
  ```
 
</details>

<details>

  <summary><strong>A aplicação contém o endpoint DELETE `/products/:id`:</strong></summary>

- Deleta um produto com o ID especificado na URL;

- Exemplo de requisição:
    - `http://localhost:3000/products/6213d4cf5718200872a8328b`

- A resposta deve retornar no seguinte formato:
  ```json
  {
    "success": "Produto deletado com sucesso."
  }
  ```

- Caso o ingrediente não exista no sistema, a resposta retorna no seguinte formato:
  ```json
  {
    "status": 404,
    "error": "Produto não existe no sistema."
  }
  ```
 
</details>

### Em desenvolvimento:

<details>

  <summary><strong>Funcionalidades que ainda serão implementadas:</strong></summary>

- Testes unitários com Jest;
- Objeto que faça referência à um ingrediente e a quantidade em que esse ingrediente é utilizado;
- Regra de negócio para validar se o produto pode ou não ser vendido.
 
</details>
