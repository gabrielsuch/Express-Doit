# **Propósito da Aplicação:**
- Proporcionar uma melhor organização para o usuário no seu dia-a-dia.

#

# **Funcionamento da Aplicação:**
- Criação de uma Conta.
- Realizar seu Login.
- Usuário logado pode criar tarefas.
- Usuário logado pode excluir tarefas.
- Usuário logado pode marcar como concluído, porém ao pressionar este botão, irá acrescentar ao "progress", o valor de 5, podendo chegar ao limite que é igual a 100.
- Usuário logado só pode interagir com a tarefa que o próprio usuário criou.
- Usuário logado pode realizar seu Logout.
- Somente usuários logados podem interagir com as tarefas.

#

## Este projeto foi desenvolvido como um Full-Stack, esta é a parte do Back-end, o código do Front-end, você pode conferir no link abaixo.

## Link da Aplicação Front-end: https://github.com/gabrielsuch/React-Doit

#

## Link para o uso da API: https://doit-backend.herokuapp.com

# ***User***

## `POST /user/register - Formato da Requisição: `

```json
{
    "name": "teste",
    "email": "teste@mail.com",
    "password": "123456"
}
```

### `Status 201 - Created: `

```json
{
	"name": "teste",
	"email": "teste@mail.com",
	"id": "376a204b-8013-4e24-ae33-cd884d1386d8"
}
```

#

## `Possíveis erros durante a Requisição:`

### `Status 400 - Bad Request:`

```json
{
	"error": [
		"name is a required field",
		"email is a required field",
		"password is a required field"
	]
}
```

### `Status 409 - Conflict: `

```json
{
	"error": "Email already exists."
}
```

#

## `POST /user/login - Formato da Requisição: `

```json
{
	"email": "teste@mail.com",
	"password": "123456"
}
```

### `Status 200 - OK: `

```json
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1bHVAbWFpbC5jb20iLCJpYXQiOjE2NjE0NzQzMTUsImV4cCI6MTY2MTQ4NTExNX0.nP3MCbv9tVGm0HpPmYPy7kyDeG4IgAfABu-kZNjRw0U"
}
```

#

## `Possíveis errors durante a Requisição: `

### `Status 400 - Bad Request: `

```json
{
	"error": [
		"email is a required field",
		"password is a required field"
	]
}
```

```json
{
	"error": "Password doesn't matches."
}
```

### `Status 404 - Not Found: `

```json
{
	"error": "Email not found."
}
```

#

# ***Task***

## `GET /task/:task_id - Formato da Requisição - Token de usuário inválido: `

	No Body

### `Status 400 - Bad Request: `

```json
{
	"error": "Missing Authorization Token"
}
```

```json
{
	"error": "Invalid Token"
}
```

#

## `GET /task/:task_id - Formato da Requisição - Token de usuário válido: `

	No Body

### `Status 200 - OK: `

```json
{
	"id": "d1353470-55d4-4a0d-ac73-e34886a812db",
	"title": "Estudos",
	"description": "Card destinado aos estudos",
	"date": "2022-08-24T15:43:47.024Z",
	"progress": 0
}
```

#

## `Possíveis erros durante a Requisição: `

### `Status 400 - Bad Request: `

```json
{
	"error": "Invalid UUID type."
}
```

### `Status 404 - Not Found: `

```json
{
	"error": "Task not found."
}
```

### `Status 422 - Unprocessable Entity: `

```json
{
	"error": "This Task doesn't belong for this user."
}
```

#

## `GET /task - Formato da Requisição - Token de usuário inválido: `

	No Body

### `Status 400 - Bad Request: `

```json
{
	"error": "Missing Authorization Token"
}
```

```json
{
	"error": "Invalid Token"
}
```

#

## `GET /task - Formato da Requisição - Token de usuário válido: `

	No Body

### `Status 200 - OK: `

```json
[
	{
		"id": "d1353470-55d4-4a0d-ac73-e34886a812db",
        "title": "Estudos",
        "description": "Card destinado aos estudos",
        "date": "2022-08-24T15:43:47.024Z",
        "progress": 0
	},
	{
		"id": "4f420b5a-94f9-46ef-9a77-4f175323f88f",
		"title": "Lazer",
		"description": "Card referente ao lazer pessoal",
		"date": "2022-08-24T15:55:10.732Z",
		"progress": 0
	},
]
```

#

## `POST /task - Formato da Requisição - Token de usuário inválido: `

### `Status 400 - Bad Request: `

```json
{
	"error": "Missing Authorization Token"
}
```

```json
{
	"error": "Invalid Token"
}
```

#

## `POST /task - Formato da Requisição - Token de usuário válido: `

```json
{
	"title": "Lazer",
	"description": "Card referente ao lazer pessoal"
}
```

### `Status 201 - Created: `

```json
{
	"title": "Lazer",
	"description": "Card referente ao lazer pessoal",
	"id": "92282d4c-c775-40cd-b04c-51ce673094f5",
	"date": "2022-08-25T22:51:56.940Z",
	"progress": 0
}
```

#

## `Possíveis erros durante a Requisição: `

### `Status 400 - Bad Request: `

```json
{
	"error": [
		"title is a required field",
		"description is a required field"
	]
}
```

#

## `PATCH /task/progress/:task_id - Formato da Requisição - Token de usuário inválido: `

<br>

### `Status 400 - Bad Request: `

```json
{
	"error": "Missing Authorization Token"
}
```

```json
{
	"error": "Invalid Token"
}
```

#

## `PATCH /task/progress/:task_id - Formato da Requisição - Token de usuário válido: `

	No Body

### `Status 200 - OK: `

```json
{
    "title": "Lazer",
	"description": "Card referente ao lazer pessoal",
	"id": "92282d4c-c775-40cd-b04c-51ce673094f5",
	"date": "2022-08-25T22:51:56.940Z",
	"progress": 5
}
```

#

## `Possíveis erros durante a Requisição: `

### `Status 400 - Bad Request: `

```json
{
	"error": "Invalid UUID type."
}
```


### `Status 404 - Not Found: `

```json
{
	"error": "Task not found."
}
```

### `Status 422 - Unprocessable Entity: `

```json
{
	"error": "This Task doesn't belong for this user."
}
```

#

## `DELETE /task/:task_id - Formato da Requisição - Token de usuário inválido: `

	No Body

### `Status 400 - Bad Request: `

```json
{
	"error": "Missing Authorization Token"
}
```

```json
{
	"error": "Invalid Token"
}
```

#

## `DELETE /task/:task_id - Formato da Requisição - Token de usuário válido: `

	No Body

### `Status 204 - No Content: `

	No body returned for response

#

## `Possíveis erros durante a Requisição: `

### `Status 400 - Bad Request: `

```json
{
	"error": "Invalid UUID type."
}
```

### `Status 404 - Not Found: ` 

```json
{
	"error": "Task not found."
}
```

### `Status 422 - Unprocessable Entity: `

```json
{
	"error": "This Task doesn't belong for this user."
}
```