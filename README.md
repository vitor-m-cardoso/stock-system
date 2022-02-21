# Boas vindas ao repositório do projeto Stock System!

---

  - REST API para controle de estoque (utilizando Nestjs e Typescript);
  - Armazena os registros utilizando o MongoDB.

---

### Antes de começar o desenvolvimento:

1. Clone o repositório
  * `git@github.com:vitor-m-cardoso/stock-system.git`
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd stock-system`

2. Instalar as dependências [**Se houver**]
  * `npm install`
  * ou
  * `yarn install`

---

### Estrutura

Estrutura de diretórios e arquivos:

```
.
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

---

### A aplicação tem o endpoint POST `/users`

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

---

### A aplicação tem o endpoint GET `/users`

- Este endpoint retorna todos os usuários cadastrados no banco de dados;

---

### A aplicação tem o endpoint DELETE `/users/:id`

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

--- 

### A aplicação tem o endpoint POST `/login`

- Este endpoint retorna um token de acesso para um usuário cadastrado;

- O corpo da requisição deve ter o seguinte formato:
  ```json
  {
    "email": "primeiroemail@test.com",
    "password": "mypassword"
  }
  ```

- Se os campos estiverem corretos, a resposta devera ser um token JWT, no seguinte formato:
  ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RpbmdlbWFpbEBleGFtcGxlLmNvbSIsInN1YiI6IjYxYWJlYzRkMGUyMGU3Y2FjODZiMWMyMSIsImlhdCI6MTYzODcyMjkzOSwiZXhwIjoxNjM4NzQ4MTM5fQ.zaoUERfXIVMY-8RUv-PosFZIBnjyGPGkoPgKcebEJg0"
    }
  ```

---

## A partir de agora, praticamente todas as rotas precisam do token JWT para realizar as requisições, caso o token não seja informado, os endpoints retornarão o seguinte status:
  ```json
  {
    "statusCode": 401,
    "message": "Unauthorized"
  }
  ```

  - O token deve ser utilizado como `Bearer token`

---

### A aplicação tem o endpoint POST `/ingredients`

- Este endpoint cadastra um novo ingrediente;

- O corpo da requisição deve ter o seguinte formato:
  ```json
    {
      	"name": "Leite em pó",
        "measuringUnit": "250 g",
        "unitPrice": 10,
        "quantity": 10
    }
  ```

- Se os campos estiverem corretos, a resposta devera retornar no seguinte formato:
  ```json
  {
    "quantity": 10,
    "unitPrice": 10,
    "measuringUnit": "250 g",
    "name": "Leite em pó",
    "_id": "6213d22e5718200872a83281",
    "__v": 0
  }
  ```

---

### A aplicação tem o endpoint GET `/ingredients`

- Este endpoint retorna todos os ingredientes cadastratos;

---

### A aplicação tem o endpoint GET `/ingredients/:id`

- Retorna um ingrediente com o ID especificado na URL;

- Exemplo de requisição:
    - `http://localhost:3000/ingredients/6213d22e5718200872a83281`

- A resposta deve retornar no seguinte formato:
  ```json
  {
    "_id": "6213d22e5718200872a83281",
    "quantity": 10,
    "unitPrice": 10,
    "measuringUnit": "250 g",
    "name": "Leite em pó",
    "__v": 0
  }
  ```

---

### A aplicação tem o endpoint PUT `/ingredients/:id`

- Altera as informações de um ingrediente com o ID especificado na URL;

- Exemplo de requisição:
    - `http://localhost:3000/ingredients/6213d22e5718200872a83281`
    ```json
    {
      "measuringUnit": "750 g"
    }
    ```

- A resposta deve retornar no seguinte formato:
  ```json
  {
    "_id": "6213d22e5718200872a83281",
    "quantity": 10,
    "unitPrice": 10,
    "measuringUnit": "750 g",
    "name": "Leite em pó",
    "__v": 0
  }
  ```

---

---

### A aplicação tem o endpoint DELETE `/ingredients/:id`

- Deleta um ingrediente com o ID especificado na URL;

- Exemplo de requisição:
    - `http://localhost:3000/ingredients/6213d22e5718200872a83281`

- A resposta deve retornar no seguinte formato:
  ```json
  {
	  "success": "Ingrediente deletado com sucesso."
  }
  ```

- Caso o ingrediente nao exista no sistema, a resposta retorna no seguinte formato:
  ```json
  {
    "status": 404,
    "error": "Ingrediente não existe no sistema."
  }
  ```

---

### A aplicação tem o endpoint POST `/products`

- Este endpoint cadastra um novo produto;

- O corpo da requisição deve ter o seguinte formato:
  ```json
    {
      	"productName": "Capuccino",
        "productIngredients": "leite em pó, chocolate em pó...",
        "productPrice": 15,
        "productImage": "capuccino.png",
        "quantity": 50
    }
  ```
  _A requisição é feita no formato `Multipart Form` e só serão aceitas imagens no formato `PNG` e `JPG`_

- Se os campos estiverem corretos, a resposta devera retornar no seguinte formato:
  ```json
  {
    "quantity": 50,
    "productIngredients": "leite em pó, chocolate em pó...",
    "productPrice": 15,
    "productImage": "capuccino.png",
    "productName": "Capuccino",
    "_id": "6213d4cf5718200872a8328b",
    "__v": 0
  }
  ```

---

### A aplicação tem o endpoint GET `/products`

- Este endpoint retorna todos os produtos cadastratos;

---

### A aplicação tem o endpoint GET `/products/:id`

- Retorna um produto com o ID especificado na URL;

- Exemplo de requisição:
    - `http://localhost:3000/products/6213d4cf5718200872a8328b`

- A resposta deve retornar no seguinte formato:
  ```json
  {
    "_id": "6213d4cf5718200872a8328b",
    "quantity": 50,
    "productIngredients": "leite em pó, chocolate em pó...",
    "productPrice": 15,
    "productImage": "capuccino.png",
    "productName": "Capuccino",
    "__v": 0
  }
  ```

---

### A aplicação tem o endpoint PUT `/products/:id`

- Altera as informações de um produto com o ID especificado na URL;

- Exemplo de requisição:
    - `http://localhost:3000/ingredients/6213d22e5718200872a83281`
    ```json
    {
      "productPrice": 20
    }
    ```

- A resposta deve retornar no seguinte formato:
  ```json
  {
    "_id": "6213d4cf5718200872a8328b",
    "quantity": 50,
    "productIngredients": "leite em pó, chocolate em pó...",
    "productPrice": 20,
    "productImage": "githubIcon.png",
    "productName": "Capuccino",
    "__v": 0
  }
  ```

---

---

### A aplicação tem o endpoint DELETE `/products/:id`

- Deleta um produto com o ID especificado na URL;

- Exemplo de requisição:
    - `http://localhost:3000/products/6213d4cf5718200872a8328b`

- A resposta deve retornar no seguinte formato:
  ```json
  {
	  "success": "Produto deletado com sucesso."
  }
  ```

- Caso o ingrediente nao exista no sistema, a resposta retorna no seguinte formato:
  ```json
  {
    "status": 404,
    "error": "Ingrediente não existe no sistema."
  }
  ```

---