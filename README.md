
# M3P-BackEnd-Squad2 - BemLab 
## _Seu bem-estar, nossa prioridade_

> Sabemos que o tempo é essesncial quand se rata da saúde.
> Muitas vezes,p acientes enfrentam obstáculos para agendar consultas,
> acompanhar e receber resultados de exames, dietas e etc.,
> o que pode causar ansiedade e atrasar tratamentos.
> A plataforma "BemLab" oferece um sistema de gerenciamento e automação nos atendimentos do setor clínico.

<a href="https://app.swaggerhub.com/apis/UrsulaBabeto/SFMT-BemLab/1.0.0" target="_blank"><img src="https://img.shields.io/badge/{···}-Swagger-<white>" target="_blank"></a>

## Tecnologias

|     | Dependências   | Descrição                                                                                                                   |
| --- | -------------- | -------------------------------------------------------------------------------------------------------------------------   |
| 1   | [Dotenv]       | Cria e armazena vaiáveis de ambiente tornando a aplicação mais segura e dinâmica                                            |
| 2   | [Node]         | Biblioteca que "interpreta" o Javasccript para p back-end                                                                   |
| 3   | [Express]      | Framework robusto que, atrelado ao node, fornece recursos para a criação de rotas HTTP e middlewares                        |
| 4   | [Yup]          | Elaborador de estrutura de validações que simplifica a lógica da criação das validações do projeto                          |
| 5   | [Sequelize]    | ORM que conecta e abstrai os comandos de operações do SQL possibilitando a utilização em outras linguagens de programação   |
| 6   | [pg/pg-hstore] | Interpretadores do PostgresSQL que faz a comunicação entre banco de dados e aplicação                                       |
| 6   | [Bcrypt]       | Encriptar a senha informada e comparar com o a senha encriptada                                                             |
| 6   | [Cors]         | Mecanismo usado para permitir que uma aplicação Web seja executada em uma origem e acesse recursos de outra origem diferente|
| 6   | [Moment.js]    | Oferece métodos para a manipulação de datas                                                                                 |

|     | Dependências-DEV | Descrição                                                                                                                 |
| --- | ---------------- | -----------------------------------------------------------------------------------------------------------------------   |
| 1   | [Nodemon]        | Monitora o sistema de arquivos e reinicia o processo automaticamente                                                      |

## Técnicas

## Rodando o projeto

Abra o seu terminal de preferência e digite:

```sh
-git clone
```

-settar variáveis de ambiente

```sh
-npm install
-npm start - sem nodemon ou
-npm run dev - com nodemon
```

\*caso necessário, acesse a documentação disponibilizada para cada tecnologia utilizada no projeto e faça a sua instalação manualmente.
Verifique o arquivo package.json,.O projeto deve conter todas as tecnologias citadas acima

## Rotas e funcionalidades

### **Usuario**

####  Login de usuário

```http
  POST /api/usuarios/login
```
Parâmetro email e senha devem ser passados no body da requisição.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório** Email do usuario|
| `senha` | `string` | **Obrigatório** Senha do usuario|


Request JSON exemplo
```http
/api/usuarios/login

{
	"email": "andre@bemlab.com.br",
	"senha": "andre123"
}
```

Exemplo de resposta:

```http

{
	"message": "Usuario andre@bemlab.com.br logado com sucesso",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjEsIm5vbWVDb21wbGV0byI6IkFkbWluaXN0cmFkb3IiLCJlbWFpbCI6ImFkbWluQGJlbWxhYi5jb20uYnIiLCJ0aXBvIjoiQURNSU5JU1RSQURPUiIsImlhdCI6MTY5OTIwNzMzMSwiZXhwIjoxNjk5MjkzNzMxfQ.mhjLhSjFWMfYcFeV1UuGH3cGpkCLV37SxErnk_oXNQA"
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | (Ok) em caso de sucesso.|
|  `403` | (Forbidden) em caso de tentar cadastrar sem ser usuario do tipo administrador|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

#### Resetar senha de usuário

```http
  PATCH /api/usuarios/resetarsenha
```
Parâmetro email, novaSenha e codigo devem ser passados no body da requisição.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório** Email do usuario|
| `senha` | `string` | **Obrigatório** Senha do usuario|
| `codigo` | `string` | **Obrigatório** Codigo de verificação disponibilizado ao usuario para reset de senha|


Request JSON exemplo
```http
/api/usuarios/resetarsenha

{
	"email": "andre@bemlab.com.br",
	"novaSenha": "andre123456",
	"codigo": "BEMLAB@3577"
}
```

Exemplo de resposta:

```http

{
	"message": "Senha atualizada com sucesso"
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | (Ok) em caso de sucesso.|
|  `403` | (Forbidden) em caso de tentar cadastrar sem ser usuario do tipo administrador|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

#### Cadastro de Usuários

```http
  POST /api/usuarios
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `usuarioId`      | `int` | **Autoincremental**. Chave primaria |
| `nomeCompleto` | `string` | **Obrigatório**. Nome Completo, máx 64 e mín de 8 caracteres|
| `genero` | `ENUM` | **Obrigatório**  Gênero do usuário com dropdown de opções pré-definidas.|
| `cpf` | `string` | **Obrigatório**. CPF do usuário, único, formato 000.000.000-00|
| `telefone` | `string` |**Obrigatório** Telefone do usuário,  formato (99) 9 9999-99999 |
| `email` | `string` |**Obrigatório** Email do usuário |
| `senha` | `string` |**Obrigatório** Senha do usuário com mín de 6 caracteres |
| `tipo` | `enum` | **Obrigatório**. Tipo de Usuário, opções: "ADMINISTRADOR", "MEDICO", "ENFERMEIRO"|
| `status_sistema` | `boolean` | Status do usuário no sistema, Valores: 'true','false'|

Request JSON exemplo
```http
{
	"nomeCompleto": "André Luiz",
	"genero": "MASCULINO",
	"cpf": "111.222.333-44",
	"telefone": "(48) 9 9844-7838",
	"email": "andre@bemlab.com.br",
	"senha": "andre123",
	"tipo": "MEDICO"
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `201` | (CREATED) em caso de sucesso.|
|  `403` | (Forbidden) em caso de tentar cadastrar sem ser usuario do tipo administrador|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `409` | (Conflict) em caso de tentar cadastrar cpf já existente|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

##
#### Atualização de Usuário

```http
  PUT /api/usuarios/:id
```

Aceita todos parâmetros do cadastro de usuario com excessão do cpf e email que não podem ser atualizados

Parâmetro id (numero inteiro valido) é necessário ser passado como Route Params na rota para atualizar usuário.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `int` | **Obrigatório** número inteiro chave primaria|


Request JSON exemplo
```http
/api/usuarios/2
```
```http
{
	"tipo": "MEDICO"
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | (OK) em caso de sucesso.|
|  `403` | (Forbidden) em caso de tentar atualizar sem ser usuario do tipo administrador|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

Exemplo de resposta:
```http
	{
		"message": "Usuário atualizado com sucesso"
	}	

```

##
#### Listagem de todos usuários

```http
  GET /api/usuarios
```
Request JSON exemplo
```http
/api/usuarios
```

Exemplo de resposta:

```http
{
	"usuarios": [
		{
			"usuarioId": 1,
			"nomeCompleto": "Administrador",
			"genero": "OUTRO",
			"cpf": "222.333.111-44",
			"telefone": "(48) 9 9133-7783",
			"email": "admin@bemlab.com.br",
			"senha": "$2b$10$Mg21TmIuUSDrySKPgIH0dOuPaArYoI3WRqwsWoTQxvisOCpxvkQDq",
			"tipo": "ADMINISTRADOR",
			"statusSistema": true,
			"createdAt": "2023-11-04T00:31:26.224Z",
			"updatedAt": "2023-11-04T00:31:26.224Z",
			"deletedAt": null
		},
		{
			"usuarioId": 4,
			"nomeCompleto": "Mauricio Tester",
			"genero": "MASCULINO",
			"cpf": "111.334.456-66",
			"telefone": "(44) 9 8879-7659",
			"email": "mauricioTester@gmail.com",
			"senha": "$2b$10$yKKeM0aKovWil7UjM94EWO0buwVnucGyR2i9qEEQ4dCN3H92dhLpe",
			"tipo": "ENFERMEIRO",
			"statusSistema": true,
			"createdAt": "2023-11-04T02:35:40.768Z",
			"updatedAt": "2023-11-04T20:58:15.155Z",
			"deletedAt": null
		},
		{
			"usuarioId": 2,
			"nomeCompleto": "André Luiz",
			"genero": "MASCULINO",
			"cpf": "111.222.333-44",
			"telefone": "(48) 9 9844-7838",
			"email": "andre@bemlab.com.br",
			"senha": "$2b$10$C1UIwM.e5lRlXShxEHWpPuUJupyExHhG7dwhrRdeMBPNkkpJnsUW.",
			"tipo": "MEDICO",
			"statusSistema": true,
			"createdAt": "2023-11-04T00:32:58.906Z",
			"updatedAt": "2023-11-05T18:02:56.551Z",
			"deletedAt": null
		}
	]
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | (OK) em caso de sucesso.|
|  `403` | (Forbidden) em caso de tentar listar sem ser usuario do tipo administrador|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

#### Listagem de Usuário por id

```http
  GET /api/usuarios/:id
```
Parâmetro id (numero inteiro valido)  é necessário ser passado como Route Params na rota para listar o usuário especifico por seu id. 

Request JSON exemplo
```http
/api/usuarios/2
```

Exemplo de resposta:

```http

{
	"usuarioId": 2,
	"nomeCompleto": "André Luiz",
	"genero": "MASCULINO",
	"cpf": "111.222.333-44",
	"telefone": "(48) 9 9844-7838",
	"email": "andre@bemlab.com.br",
	"senha": "$2b$10$C1UIwM.e5lRlXShxEHWpPuUJupyExHhG7dwhrRdeMBPNkkpJnsUW.",
	"tipo": "MEDICO",
	"statusSistema": true,
	"createdAt": "2023-11-04T00:32:58.906Z",
	"updatedAt": "2023-11-05T18:02:56.551Z",
	"deletedAt": null
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | (OK) em caso de sucesso.|
|  `403` | (Forbidden) em caso de tentar listar sem ser usuario do tipo administrador|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|


####  Exclusão de usuário

```http
  DELETE /api/usuarios/:id
```
Parâmetro id (numero inteiro valido) é necessário ser passado como Route Params na rota para excluir o usuário.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `int` | **Obrigatório** número inteiro chave primaria|

Request JSON exemplo
```http
/api/usuarios/6
```

Retorna um
```http
	{ 
		message: "Usuário deletado com sucesso" 
	}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | (Ok) em caso de sucesso.|
|  `403` | (Forbidden) em caso de tentar excluir sem ser usuario do tipo administrador|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|


### **Paciente**

#### Cadastro de Paciente

```http
  POST /api/pacientes
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id`      | `int` | **Autoincremental**. Chave primaria |
| `nome_completo` | `string` | **Obrigatório**. Nome do paciente, máx 64 e mín de 8 caracteres|
| `genero` | `string` | **Obrigatório** Genero do paciente|
| `data_nascimento` | `dateonly` | **Obrigatório** Data de nascimento do paciente, formato yyyy-mm-dd|
| `cpf` | `string` | **Obrigatório**. CPF do paciente, único, formato 000.000.000-00|
| `rg` | `string` | **Obrigatório**. RG do paciente, máx de 20 caracteres|
| `estado_civil` | `enum` | **Obrigatório**. Estado civil, opções: "SOLTEIRO", "CASADO", "DIVORCIADO", "VIUVO"
| `telefone` | `string` | **Obrigatório**. Telefone do paciente,  formato (99) 9 9999-99999|
| `email` | `string` | **Obrigatório**. Email do paciente|
| `naturalidade` | `string` | **Obrigatório**. Naturalidade do paciente, máx 64 e mín de 8 caracteres|
| `contato_emergencia` | `string` | **Obrigatório**. Telefone do contato de emergência ,  formato (99) 9 9999-99999|
| `lista_alergias` | `string` | Alergias do paciente|
| `lista_cuidados` | `string` | Cuidados especiais do paciente|
| `nome_convenio` | `string` | Convênio do paciente|
| `numero_convenio` | `string` | Convênio do paciente|
| `valdiade_convenio` | `string` | Data de validade do convênio, formato yyyy-mm-dd|
| `status` | `boolean` | Status do paciente, Valores: 'true','false'|
| `cep` | `string` | **Obrigatório**. CEP|
| `cidade` | `string` | **Obrigatório**. Cidade|
| `estado` | `string` | **Obrigatório**. Estado|
| `logradouro` | `string` | **Obrigatório**. Logradouro|
| `numero` | `string` | **Obrigatório**. Numero|
| `complemento` | `string` | Complemento do endereço|
| `bairro` | `string` | **Obrigatório**. Bairro|
| `ponto_referencia` | `string` | **Obrigatório**. Ponto de referência|


Request JSON exemplo
```http
{
  "nome_completo": "Alberto Roberto",
  "genero": "MASCULINO",
  "data_nascimento": "1990-05-15",
  "cpf": "567.543.120-27",
  "rg": "56789089SP",
  "estado_civil": "CASADO",
  "telefone": "(99) 9 9999-9999",
  "email": "alberto.roberto@log27.com.br",
  "naturalidade": "São Paulo",
  "contato_emergencia": "(99) 9 9999-9999",
  "lista_alergias": "Nenhuma",
  "lista_cuidados": "Todos",
  "nome_convenio": "Plano de Saúde ABC",
  "numero_convenio": "12345",
  "validade_convenio": "2025-12-31",
  "status": true,
  "endereco": {
    "cep": "12345-678",
    "cidade": "São Paulo",
    "estado": "SP",
    "logradouro": "Rua das Flores",
    "numero": "123",
    "complemento": "Apto 4",
    "bairro": "Jardim das Rosas",
    "ponto_referencia": "Próximo à escola"
  }
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `201` | (CREATED) em caso de sucesso.|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `409` | (Conflict) em caso de CPF e/ou E-mail já cadastrado|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

##

####  Atualização dos dados de Pacientes

```http
  PUT /api/pacientes/:id
```
Aceita todos parâmetros do cadastro com excessão de CPF e RG que não podem ser atualizados

Parâmetro id (numero inteiro valido) é necessário ser passado como Route Params na rota para atualizar o paciente.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `int` | **Obrigatório** número inteiro chave primaria|


Request JSON exemplo
```http
/api/pacientes/1
```
```http
  {
	"telefone":"'1 9245698115",
	"nome_convenio":"Unimed"
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `201` | (OK) em caso de sucesso.|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

##
#### Listagem de Pacientes

```http
  GET /api/pacientes
```

Exemplo de resposta:

```http
[
	{
		"id": 1,
		"nome_completo": "João da Silva",
		"genero": "MASCULINO",
		"data_nascimento": "1990-05-15",
		"cpf": "123.456.789-01",
		"rg": "567890",
		"estado_civil": "CASADO",
		"telefone": "(11) 1234-5678",
		"email": "joao.silva@example.com",
		"naturalidade": "São Paulo",
		"contato_emergencia": "(11) 9876-5432",
		"lista_alergias": "Nenhuma",
		"lista_cuidados": "Nenhum",
		"nome_convenio": "Plano de Saúde ABC",
		"numero_convenio": "12345",
		"validade_convenio": "2025-12-31",
		"status": true,
		"endereco_id": 1,
		"endereco": {
			"id": 1,
			"cep": "12345-678",
			"cidade": "São Paulo",
			"estado": "SP",
			"logradouro": "Rua das Flores",
			"numero": "123",
			"complemento": "Apto 4",
			"bairro": "Jardim das Rosas",
			"ponto_referencia": "Próximo à escola"
		}
	},
	{
		"id": 3,
		"nome_completo": "Carlos Silva",
		"genero": "MASCULINO",
		"data_nascimento": "1980-08-10",
		"cpf": "789.123.456-01",
		"rg": "987654",
		"estado_civil": "SOLTEIRO",
		"telefone": "(33) 8765-4321",
		"email": "carlos.silva@example.com",
		"naturalidade": "Belo Horizonte",
		"contato_emergencia": "(33) 9876-5432",
		"lista_alergias": "Nenhuma",
		"lista_cuidados": "Nenhum",
		"nome_convenio": "Sem convênio",
		"numero_convenio": "",
		"validade_convenio": null,
		"status": true,
		"endereco_id": 3,
		"endereco": {
			"id": 3,
			"cep": "98765-432",
			"cidade": "Belo Horizonte",
			"estado": "MG",
			"logradouro": "Rua das Árvores",
			"numero": "789",
			"complemento": "Apartamento 1A",
			"bairro": "Jardim das Águas",
			"ponto_referencia": "Próximo à praça"
		}
	}
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `201` | (OK) em caso de sucesso.|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

##
#### Listagem de Paciente pelo identificador

```http
  GET /api/pacientes/:id
```
Parâmetro id (numero inteiro valido) é necessário ser passado como Route Params na rota para listar o paciente.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `int` | **Obrigatório** número inteiro chave primaria|

Request JSON exemplo
```http
/api/pacientes/3
```

Exemplo de resposta:

```http
{
	"id": 3,
	"nome_completo": "Carlos Silva",
	"genero": "MASCULINO",
	"data_nascimento": "1980-08-10",
	"cpf": "789.123.456-01",
	"rg": "987654",
	"estado_civil": "SOLTEIRO",
	"telefone": "(33) 8765-4321",
	"email": "carlos.silva@example.com",
	"naturalidade": "Belo Horizonte",
	"contato_emergencia": "(33) 9876-5432",
	"lista_alergias": "Nenhuma",
	"lista_cuidados": "Nenhum",
	"nome_convenio": "Sem convênio",
	"numero_convenio": "",
	"validade_convenio": null,
	"status": true,
	"endereco_id": 3,
	"endereco": {
		"id": 3,
		"cep": "98765-432",
		"cidade": "Belo Horizonte",
		"estado": "MG",
		"logradouro": "Rua das Árvores",
		"numero": "789",
		"complemento": "Apartamento 1A",
		"bairro": "Jardim das Águas",
		"ponto_referencia": "Próximo à praça"
	}
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `201` | (OK) em caso de sucesso.|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

##
####  Exclusão de Paciente

```http
  DELETE /api/pacientes/:id
```
Parâmetro id (numero inteiro valido) é necessário ser passado como Route Params na rota para excluir o paciente.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `int` | **Obrigatório** número inteiro chave primaria|

Request JSON exemplo
```http
/api/pacientes/3
```

Não há response no body em caso de sucesso

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `202` | (ACCEPTED) em caso de sucesso.|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|


### **Endereco**
### **Exame**
### **Consulta**
### **Dieta**

#### Cadastro de Dieta

```http
  POST /api/dietas
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id`      | `int` | **Autoincremental**. Chave primaria |
| `nome_dieta` | `string` | **Obrigatório**. Nome da dieta, máx 100 e mín de 5 caracteres|
| `data` | `dateonly` | **Obrigatório** Data da dieta, formato yyyy-mm-dd|
| `horario` | `time` | **Obrigatório**. Horario da dieta, formato hh:mm:ss|
| `tipo` | `enum` | **Obrigatório**. Tio da dieta, opções: "Low Carb", "Dash", "Paleolítica", "Cetogênica", "Dukan", "Mediterrânea", "Outra" |
| `descricao` | `string` | Descrição da dieta |
| `status_sistema` | `boolean` | Status da dieta no sistema, Valores: 'true','false'|
| `paciente_id` | `int` | **Obrigatório**. Chave estrangeira |


Request JSON exemplo
```http
{
  "nome_dieta": "Dieta",
  "data": "2022-09-14",
  "horario": "17:02:50",
    
  "descricao": "Descrição da dieta executada pelo paciente",
  "status_sistema": true,
  "paciente_id": 4
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `201` | (CREATED) em caso de sucesso.|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

##
#### Atualização da Dieta

```http
  PUT /api/dietas/:id
```

Aceita todos parâmetros do cadastro da dieta com excessão do paciente_id

Parâmetro id (numero inteiro valido) é necessário ser passado como Route Params na rota para atualizar dieta.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `int` | **Obrigatório** número inteiro chave primaria|


Request JSON exemplo
```http
/api/dietas/1
```
```http
{
  "nome_dieta": "Dieta 24h",
  "horario": "11:02:50",
  "tipo": "Dash",
  "descricao": "Descrição da dieta executada pelo paciente",
  "status_sistema": true
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `201` | (OK) em caso de sucesso.|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|


Request JSON exemplo
```http
{
  "nome_dieta": "Dieta",
  "data": "2022-09-14",
  "horario": "17:02:50",
  "tipo": "Low Carb",
  "descricao": "Descrição da dieta executada pelo paciente",
  "status_sistema": true,
  "paciente_id": 4
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `201` | (CREATED) em caso de sucesso.|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

##
#### Listagem de Dietas por paciente

```http
  GET /api/dietas/:nome
```
Parâmetro nome do paciente (string) é necessário ser passado como Route Params na rota para listar as dietas associadas ao nome do paciente. 

Request JSON exemplo
```http
/api/dietas/João Carlos
```

Exemplo de resposta:

```http
[
	{
		"id": 38,
		"nome_dieta": "Nome da Dieta",
		"data": "2022-09-14",
		"horario": "17:02:50",
		"tipo": "Low Carb",
		"descricao": "Descrição da dieta executada pelo paciente",
		"status_sistema": true,
		"paciente_id": 3,
		"createdAt": "2023-10-24T22:05:54.059Z",
		"updatedAt": "2023-10-24T22:05:54.059Z"
	},
	{
		"id": 28,
		"nome_dieta": "Nome da Dieta atual 28",
		"data": "2022-09-14",
		"horario": "11:02:50",
		"tipo": "Dash",
		"descricao": "Descrição da dieta executada pelo paciente",
		"status_sistema": true,
		"paciente_id": 3,
		"createdAt": "2023-10-24T21:30:32.438Z",
		"updatedAt": "2023-10-24T22:06:03.180Z"
	}
]
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | (OK) em caso de sucesso.|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

#### Listagem de Dietas por id da dieta

```http
  GET /api/dietas/:id
```
Parâmetro id (numero inteiro valido)  é necessário ser passado como Route Params na rota para listar a dieta especifica por seu id. 

Request JSON exemplo
```http
/api/dietas/1
```

Exemplo de resposta:

```http

{
	"id": 1,
	"nome_dieta": "Nome da Dieta",
	"data": "2022-09-14",
	"horario": "17:02:50",
	"tipo": "Low Carb",
	"descricao": "Descrição da dieta executada pelo paciente",
	"status_sistema": true,
	"paciente_id": 3,
	"createdAt": "2023-10-24T22:05:54.059Z",
	"updatedAt": "2023-10-24T22:05:54.059Z"
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | (OK) em caso de sucesso.|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

#### Listagem de todas Dietas 

```http
  GET /api/dietas/
```

Request JSON exemplo
```http
/api/dietas/
```

Exemplo de resposta:

```http
[
	{
		"id": 1,
		"nome_dieta": "dieta perda",
		"data": "2022-09-14",
		"horario": "17:02:50",
		"tipo": "Low Carb",
		"descricao": "Descrição da dieta executada pelo paciente",
		"status_sistema": true,
		"paciente_id": 3,
		"createdAt": "2023-10-24T22:05:54.059Z",
		"updatedAt": "2023-10-24T22:05:54.059Z"
	},
	{
		"id": 2,
		"nome_dieta": "Dieta para ganho",
		"data": "2022-09-14",
		"horario": "11:02:50",
		"tipo": "Dash",
		"descricao": "Descrição da dieta executada pelo paciente",
		"status_sistema": true,
		"paciente_id": 2,
		"createdAt": "2023-10-24T21:30:32.438Z",
		"updatedAt": "2023-10-24T22:06:03.180Z"
	}
    ,
	{
		"id": 2,
		"nome_dieta": "Dieta saude",
		"data": "2022-09-14",
		"horario": "11:02:50",
		"tipo": "Dash",
		"descricao": "Descrição da dieta executada pelo paciente",
		"status_sistema": true,
		"paciente_id": 1,
		"createdAt": "2023-10-24T21:30:32.438Z",
		"updatedAt": "2023-10-24T22:06:03.180Z"
	}
]
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | (OK) em caso de sucesso.|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

##
####  Exclusão da Dieta

```http
  DELETE /api/dietas/:id
```
Parâmetro id (numero inteiro valido) é necessário ser passado como Route Params na rota para excluir a dieta.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `int` | **Obrigatório** número inteiro chave primaria|

Request JSON exemplo
```http
/api/dietas/3
```

Não há response no body em caso de sucesso

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `202` | (ACCEPTED) em caso de sucesso.|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

### **Exercicio**
### **Medicamento**
### **Prontuario**

#### Listagem de todos Prontuarios

```http
  GET /api/prontuarios
```
Request JSON exemplo
```http
/api/prontuarios
```

Exemplo de resposta:

```http
[
	{
		"id": 1,
		"nome_completo": "João da Silva",
		"genero": "MASCULINO",
		"data_nascimento": "1990-05-15",
		"cpf": "123.456.789-01",
		"rg": "567890",
		"estado_civil": "CASADO",
		"telefone": "(11) 1234-5678",
		"email": "joao.silva@example.com",
		"naturalidade": "São Paulo",
		"contato_emergencia": "(11) 9876-5432",
		"lista_alergias": "Nenhuma",
		"lista_cuidados": "Nenhum",
		"nome_convenio": "Plano de Saúde ABC",
		"numero_convenio": "12345",
		"validade_convenio": "2025-12-31",
		"status": true,
		"endereco_id": 1,
		"createdAt": "2023-11-04T00:31:26.244Z",
		"updatedAt": "2023-11-04T00:31:26.244Z"
	},
	{
		"id": 2,
		"nome_completo": "Maria Santos",
		"genero": "FEMININO",
		"data_nascimento": "1985-03-20",
		"cpf": "987.654.321-09",
		"rg": "432156",
		"estado_civil": "CASADO",
		"telefone": "(22) 9876-5432",
		"email": "maria.santos@example.com",
		"naturalidade": "Rio de Janeiro",
		"contato_emergencia": "(22) 1234-5678",
		"lista_alergias": "Pólen",
		"lista_cuidados": "Alérgica a frutos do mar",
		"nome_convenio": "Plano de Saúde XYZ",
		"numero_convenio": "54321",
		"validade_convenio": "2026-12-31",
		"status": true,
		"endereco_id": 2,
		"createdAt": "2023-11-04T00:31:26.244Z",
		"updatedAt": "2023-11-04T00:31:26.244Z"
	},
	{
		"id": 3,
		"nome_completo": "Carlos Silva",
		"genero": "MASCULINO",
		"data_nascimento": "1980-08-10",
		"cpf": "789.123.456-01",
		"rg": "987654",
		"estado_civil": "SOLTEIRO",
		"telefone": "(33) 8765-4321",
		"email": "carlos.silva@example.com",
		"naturalidade": "Belo Horizonte",
		"contato_emergencia": "(33) 9876-5432",
		"lista_alergias": "Nenhuma",
		"lista_cuidados": "Nenhum",
		"nome_convenio": "Sem convênio",
		"numero_convenio": "",
		"validade_convenio": null,
		"status": true,
		"endereco_id": 3,
		"createdAt": "2023-11-04T00:31:26.244Z",
		"updatedAt": "2023-11-04T00:31:26.244Z"
	}
]
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | (OK) em caso de sucesso.|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

#### Listagem de Prontuario por id

```http
  GET /api/prontuarios/:id
```
Parâmetro id (numero inteiro valido)  é necessário ser passado como Route Params na rota para listar o prontuario especifico por seu id. 

Request JSON exemplo
```http
/api/prontuarios/1
```

Exemplo de resposta:

```http

{
	"id": 1,
	"nome_completo": "João da Silva",
	"genero": "MASCULINO",
	"data_nascimento": "1990-05-15",
	"cpf": "123.456.789-01",
	"rg": "567890",
	"estado_civil": "CASADO",
	"telefone": "(11) 1234-5678",
	"email": "joao.silva@example.com",
	"naturalidade": "São Paulo",
	"contato_emergencia": "(11) 9876-5432",
	"lista_alergias": "Nenhuma",
	"lista_cuidados": "Nenhum",
	"nome_convenio": "Plano de Saúde ABC",
	"numero_convenio": "12345",
	"validade_convenio": "2025-12-31",
	"status": true,
	"endereco_id": 1,
	"consultas": [],
	"exames": [],
	"medicamentos": []
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | (OK) em caso de sucesso.|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

### **Configuracoes**

#### Cadastro de Configurações

```http
  POST /api/configuracoes
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id`      | `int` | **Autoincremental**. Chave primaria |
| `nomeEmpresa` | `string` | **Obrigatório**. Nome Empresa|
| `slogan` | `string` | **Opcional**  Slogan da empresa.|
| `corPrimaria` | `string` | **Obrigatório**. Cor primaria|
| `corSecundaria` | `string` |**Obrigatório** Cor secundaria |
| `imagemLogo` | `string` |**Obrigatório** URL da imagem de logo da empresa |

Request JSON exemplo
```http
{
	"nomeEmpresa": "LabTestMedical",
	"slogan": "Testando a configuração",
	"corPrimaria": "#6734eb",
	"corSecundaria": "#9234eb",
	"imagemLogo": "https://upload.wikimedia.org/wikipedia/commons/8/85/Logo-Test.png"
}
```

Exemplo de Resposta
```http
{
	"message": "Configuração cadastrada com sucesso",
	"data": {
		"id": 1,
		"nomeEmpresa": "LabTestMedical",
		"slogan": "Testando a configuração",
		"corPrimaria": "#6734eb",
		"corSecundaria": "#9234eb",
		"imagemLogo": "https://upload.wikimedia.org/wikipedia/commons/8/85/Logo-Test.png",
		"updatedAt": "2023-11-04T00:36:21.007Z",
		"createdAt": "2023-11-04T00:36:21.007Z",
		"deletedAt": null
	}
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `201` | (CREATED) em caso de sucesso.|
|  `403` | (Forbidden) em caso de tentar cadastrar sem ser usuario do tipo administrador|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

##
#### Atualização de Configurações

```http
  PUT /api/configuracoes/:id
```

Aceita todos parâmetros do cadastro de configurações

Parâmetro id (numero inteiro valido) é necessário ser passado como Route Params na rota para atualizar configuracoes.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `int` | **Obrigatório** número inteiro chave primaria|


Request JSON exemplo
```http
/api/configuracoes/1
```
```http
{
	"nomeEmpresa": "TestLabMedical"
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | (OK) em caso de sucesso.|
|  `403` | (Forbidden) em caso de tentar atualizar sem ser usuario do tipo administrador|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

Exemplo de resposta:
```http
	{
	"message": "Configuração atualizada com sucesso",
	"data": {
		"nomeEmpresa": "TestLabMedical",
		"slogan": "Testando a configuração",
		"corPrimaria": "#6734eb",
		"corSecundaria": "#9234eb",
		"imagemLogo": "https://upload.wikimedia.org/wikipedia/commons/8/85/Logo-Test.png"
	}
}

```

##
#### Listagem de todas Configurações

```http
  GET /api/configuracoes
```
Request JSON exemplo
```http
/api/configuracoes
```

Exemplo de resposta:

```http
[
	{
		"id": 1,
		"nomeEmpresa": "LabTestMedical",
		"slogan": "Testando a configuração",
		"corPrimaria": "#6734eb",
		"corSecundaria": "#9234eb",
		"imagemLogo": "https://upload.wikimedia.org/wikipedia/commons/8/85/Logo-Test.png",
		"createdAt": "2023-10-26T23:37:37.579Z",
		"updatedAt": "2023-10-26T23:37:37.579Z",
		"deletedAt": null
	}
]
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | (OK) em caso de sucesso.|
|  `403` | (Forbidden) em caso de tentar listar sem ser usuario do tipo administrador|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

#### Listagem de Configurações por id

```http
  GET /api/configuracoes/:id
```
Parâmetro id (numero inteiro valido)  é necessário ser passado como Route Params na rota para listar a configuração especifica por seu id. 

Request JSON exemplo
```http
/api/configuracoes/1
```

Exemplo de resposta:

```http

{
	"id": 1,
	"nomeEmpresa": "LabTestMedical",
	"slogan": "Testando a configuração",
	"corPrimaria": "#6734eb",
	"corSecundaria": "#9234eb",
	"imagemLogo": "https://upload.wikimedia.org/wikipedia/commons/8/85/Logo-Test.png",
	"createdAt": "2023-10-26T23:37:37.579Z",
	"updatedAt": "2023-10-26T23:37:37.579Z",
	"deletedAt": null
}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | (OK) em caso de sucesso.|
|  `403` | (Forbidden) em caso de tentar listar sem ser usuario do tipo administrador|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|


####  Exclusão de Configurações

```http
  DELETE /api/configuracoes/:id
```
Parâmetro id (numero inteiro valido) é necessário ser passado como Route Params na rota para excluir a configuração.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `int` | **Obrigatório** número inteiro chave primaria|

Request JSON exemplo
```http
/api/configuracoes/1
```

Retorna um
```http
	{
		"message": "Configuração deletada com sucesso"
	}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | (Ok) em caso de sucesso.|
|  `403` | (Forbidden) em caso de tentar excluir sem ser usuario do tipo administrador|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

####  Restaurar Configurações

```http
  POST /api/configuracoes/:id
```
Parâmetro id (numero inteiro valido) é necessário ser passado como Route Params na rota para restaurar a configuração deletada.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `int` | **Obrigatório** número inteiro chave primaria|

Request JSON exemplo
```http
/api/configuracoes/1
```

Retorna um
```http
	{
		"message": "Configuração restaurada com sucesso"
	}
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | (Ok) em caso de sucesso.|
|  `403` | (Forbidden) em caso de tentar restaurar sem ser usuario do tipo administrador|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

### **Log**

#### Listagem de Registros(logs do sistema)

```http
  GET /api/logs
```

Request JSON exemplo
```http
/api/logs
```

Exemplo de resposta:

```http
[
	{
		"id": 3,
		"registro": "O usuário Administrador excluiu o exercício de serie 2 do paciente Maria Santos",
		"dataHora": "2023-11-03T18:30:46.925Z"
	},
	{
		"id": 2,
		"registro": "O usuário Administrador atualizou o exercício de serie 2 do paciente Maria Santos ",
		"dataHora": "2023-11-03T18:28:39.871Z"
	},
	{
		"id": 1,
		"registro": "O usuário Administrador criou um exercício de serie para o paciente Maria Santos",
		"dataHora": "2023-11-03T18:28:25.085Z"
	}
]
```

| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | (OK) em caso de sucesso.|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

### **Exame**

####  Cadastra exame

```http
  POST /api/exames
```
Parâmetro id de paciente é vinculado a criação do exame.


Request JSON exemplo
```http
/api/exames

{
  "nomeExame": "Ultrassongrafia",
  "dataExame": "2023-11-05",
  "horaExame": "07:43:37",
  "tipoExame": "exame de imagem",
  "laboratorio": "BemLab Laboratorio",
  "docurl": "",
  "resultados": "algum resultado enviado ",
  "paciente_id": 1,
  "statusSistema": true
}
```
Exemplo de resposta:

```http

{
	"id": 1,
  "nomeExame": "Ultrassongrafia",
  "dataExame": "2023-11-05",
  "horaExame": "07:43:37",
  "tipoExame": "exame de imagem",
  "laboratorio": "BemLab Laboratorio",
  "docurl": "",
  "resultados": "algum resultado enviado ",
  "paciente_id": 1,
  "statusSistema": true
}
```
| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | exame|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

####  Busca exame

```http
  GET /api/exames
```

Exemplo de resposta:

```http

{
	"id": 1,
  "nomeExame": "Ultrassongrafia",
  "dataExame": "2023-11-05",
  "horaExame": "07:43:37",
  "tipoExame": "exame de imagem",
  "laboratorio": "BemLab Laboratorio",
  "docurl": "",
  "resultados": "algum resultado enviado ",
  "paciente_id": 1,
  "statusSistema": true
},
{
	"id": 2,
  "nomeExame": "Ultrassongrafia",
  "dataExame": "2023-11-05",
  "horaExame": "07:43:37",
  "tipoExame": "exame de imagem",
  "laboratorio": "BemLab Laboratorio",
  "docurl": "",
  "resultados": "algum resultado enviado ",
  "paciente_id": 1,
  "statusSistema": true
},
{
	"id": 3,
  "nomeExame": "Ultrassongrafia",
  "dataExame": "2023-11-05",
  "horaExame": "07:43:37",
  "tipoExame": "exame de imagem",
  "laboratorio": "BemLab Laboratorio",
  "docurl": "",
  "resultados": "algum resultado enviado ",
  "paciente_id": 1,
  "statusSistema": true
}
```
| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | exames|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

####  Busca exame por nome

```http
  GET /api/exames/:nome
```
Request JSON exemplo
```http
/api/exames/João%20Leite

```
Exemplo de resposta:

```http

{
	"id": 4,
  "nomeExame": "Ultrassongrafia",
  "dataExame": "2023-11-05",
  "horaExame": "07:43:37",
  "tipoExame": "exame de imagem",
  "laboratorio": "BemLab Laboratorio",
  "docurl": "",
  "resultados": "algum resultado enviado ",
  "paciente_id": 1,
  "statusSistema": true
}
```
| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | exames|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

####  Atualiza um exame

```http
  PUT /api/exames/:id
```
Request JSON exemplo
```http
/api/exames/1

{
	"id": 1,
  "nomeExame": "Ultrassongrafia",
  "dataExame": "2023-11-05",
  "horaExame": "07:43:37",
  "tipoExame": "exame de imagem",
  "laboratorio": "BemLab Laboratorio",
  "docurl": "",
  "resultados": "outro resultado enviado ",
  "paciente_id": 1,
  "statusSistema": true
}
```

Exemplo de resposta:

```http

{
	"message": "Exame atualizado com sucesso"
}

```
| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | "Exame atualizado com sucesso"|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|
####  Deleta um exame

```http
  DELETE /api/exames/:id
```
Request JSON exemplo
```http
/api/exames/1

```

Exemplo de resposta:

```http

{
	"message": "	
Dados excluídos com sucesso"
}

```
| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` |"Dados excluídos com sucesso"|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|
### **COnsulta**

####  Cadastra consulta

```http
  POST /api/consultas
```
Parâmetro id de paciente é vinculado a criação do consulta.


Request JSON exemplo
```http
/api/consultas

{
  "motivoConsulta": "Dor de cabeça",
  "dataConsulta": "2023-11-05",
  "horaConsulta": "11:52:30",
  "descricaoProblema": "Cansaço, estresse e dor de cabeça",
  "medicacao": "Rivotril",
  "dosagem": "2 cp ao dia por 5 dias",
  "paciente_id": 0,
  "statusSistema": true
}
```
Exemplo de resposta:

```http

{
  "id": 2,
  "motivoConsulta": "Dor de cabeça",
  "dataConsulta": "2023-11-05",
  "horaConsulta": "11:52:30",
  "descricaoProblema": "Cansaço, estresse e dor de cabeça",
  "medicacao": "Rivotril",
  "dosagem": "2 cp ao dia por 5 dias",
  "paciente_id": 1,
  "statusSistema": true
}
```
| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | consulta|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

####  Busca consulta

```http
  GET /api/consultas
```

Exemplo de resposta:

```http

{
  "id": 1,
  "motivoConsulta": "Dor de cabeça",
  "dataConsulta": "2023-11-05",
  "horaConsulta": "11:52:30",
  "descricaoProblema": "Cansaço, estresse e dor de cabeça",
  "medicacao": "Rivotril",
  "dosagem": "2 cp ao dia por 5 dias",
  "paciente_id": 0,
  "statusSistema": true
},{
  "id": 2,
  "motivoConsulta": "Dor de cabeça",
  "dataConsulta": "2023-11-05",
  "horaConsulta": "11:52:30",
  "descricaoProblema": "Cansaço, estresse e dor de cabeça",
  "medicacao": "Rivotril",
  "dosagem": "2 cp ao dia por 5 dias",
  "paciente_id": 0,
  "statusSistema": true
},{
  "id": 3,
  "motivoConsulta": "Dor de cabeça",
  "dataConsulta": "2023-11-05",
  "horaConsulta": "11:52:30",
  "descricaoProblema": "Cansaço, estresse e dor de cabeça",
  "medicacao": "Rivotril",
  "dosagem": "2 cp ao dia por 5 dias",
  "paciente_id": 0,
  "statusSistema": true
}
```
| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | consultas|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

####  Busca consulta por id

```http
  GET /api/consultas/:id
```
Request JSON exemplo
```http
/api/consultas/1

```

Exemplo de resposta:

```http

{
  "id": 2,
  "motivoConsulta": "Dor de cabeça",
  "dataConsulta": "2023-11-05",
  "horaConsulta": "11:52:30",
  "descricaoProblema": "Cansaço, estresse e dor de cabeça",
  "medicacao": "Rivotril",
  "dosagem": "2 cp ao dia por 5 dias",
  "paciente_id": 0,
  "statusSistema": true
}
```
| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | consulta|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|

####  Atualiza um consulta

```http
  PUT /api/consultas/:id
```
Request JSON exemplo
```http
/api/consultas/1

{
  "nomeconsulta": "Ultrassongrafia",
  "dataconsulta": "2023-11-05",
  "horaconsulta": "07:43:37",
  "tipoconsulta": "consulta de imagem",
  "laboratorio": "BemLab Laboratorio",
  "docurl": "",
  "resultados": "outro resultado enviado ",
  "paciente_id": 1,
  "statusSistema": true
}
```

Exemplo de resposta:

```http

{
	"message": "Dados de consulta atualizados com sucesso"
}

```
| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` | "Dados de consulta atualizados com sucesso"|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|
####  Deleta um consulta

```http
  DELETE /api/consultas/:id
```
Request JSON exemplo
```http
/api/consultas/1

```

Exemplo de resposta:

```http

{
	"message": "	
Dados excluídos com sucesso"
}

```
| Response Status       | Descrição                           |
|  :--------- | :---------------------------------- |
|  `200` |"Dados excluídos com sucesso"|
|  `400` | (Bad Request) em caso de dados inválidos informando mensagem de erro|
|  `500` | (Bad Request) em caso de erro ao gerar a resposta|


## Melhorias

> Como ponto de melhoria eu André tenho como sugestão a inserção de um sistema de envio de emails para que ao resetar senha, envie um link personalizado para a rota de resetar senha onde o usuário possa inserir uma nova senha, com esse processo acredito que traria um pouco mais de segurança ao sistema.

## Contatos:


 <div> <a href="LINKEDIN ALEXANDRE" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> ALEXANDRE  </div>
<div> <a href="https://www.linkedin.com/in/andr%C3%A9-luiz-amorim-de-souza-435679218/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> ANDRÉ</div>   
<div> <a href="LINKEDIN DEISE" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> DEISE</div>   
<div> <a href="LINKEDIN MICHELE" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> MICHELE</div>   
<div> <a href="LINKEDIN RODOLFO" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> RODOLFO</div>   
<div> <a href="https://www.linkedin.com/in/ursula-babeto/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> URSULA</div>   
</ul>

[dotenv]: https://www.dotenv.org/docs/
[node]: https://nodejs.org/en/docs
[express]: https://expressjs.com/
[yup]: https://www.jsdocs.io/package/yup
[sequelize]: https://sequelize.org/docs/v6/getting-started/
[pg/pg-hstore]: https://sequelize.org/docs/v6/getting-started/
[nodemon]: https://nodemon.io
[Bcrypt]: https://www.npmjs.com/package/bcrypt
[Cors]: https://expressjs.com/en/resources/middleware/cors.html
[Moment.js]: https://momentjs.com/
