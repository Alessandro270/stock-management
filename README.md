# Stock Management API

API REST para gestão de estoque desenvolvida com NestJS e TypeScript. O sistema centraliza o cadastro de usuários, fornecedores, categorias, produtos, armazéns, estoques, pedidos de compra e entregas a clientes.

## Funcionalidades

- Autenticação com JWT, refresh token e redefinição de senha
- Controle de usuários com perfis `admin` e `user`
- Cadastro e consulta de produtos, categorias, fornecedores e clientes
- Controle de produtos por armazém, com quantidade atual e limites mínimo/máximo
- Gestão de pedidos de compra e entregas
- Consulta por UUID ou pelo identificador curto `_id`
- Importação de dados a partir de planilhas Excel/XLSX
- Exportação de dados em arquivos `.xlsx`
- Validação global de payloads com `class-validator`
- Persistência relacionacional com TypeORM e MySQL
- Cabeçalhos de segurança com Helmet e CORS habilitado

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Runtime | Node.js |
| Framework | NestJS 11 |
| Linguagem | TypeScript 5 |
| Banco de dados | MySQL |
| ORM | TypeORM 0.3 |
| Autenticação | JWT (`@nestjs/jwt`) |
| Senhas | bcrypt |
| Validação | class-validator e class-transformer |
| Upload e planilhas | Multer, XLSX e ExcelJS |
| Segurança HTTP | Helmet |
| Testes | Jest e Supertest |
| Qualidade | ESLint e Prettier |

## Arquitetura

O projeto segue uma organização modular do NestJS. Cada domínio possui controller, service, módulo, DTOs e, quando aplicável, entity:

```text
src/
├── auth/             # login, cadastro, refresh, validação e troca de senha
├── category/         # categorias de produtos
├── common/           # DTOs, enums, decorators e guards compartilhados
├── customer/         # clientes
├── database/         # conexão configurável com MySQL
├── delivery/         # entregas
├── file-upload/      # conversão entre XLSX e objetos JavaScript
├── generic/          # entidades e serviços CRUD reutilizáveis
├── location/         # locais
├── order/            # pedidos de compra
├── product/          # catálogo de produtos
├── stock/            # estoque por produto e armazém
├── supplier/         # fornecedores
├── user/             # usuários e perfis
└── warehouse/        # armazéns
```

A API registra globalmente o `JwtAuthGuard`; rotas marcadas com `@Public()` não exigem token. O módulo de usuários usa também `RolesGuard` com metadados do decorator `@Roles(...)`.

## Como executar

### Pré-requisitos

- Node.js 18 ou superior
- npm
- MySQL

### Instalação

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
JWT_SECRET=uma-chave-secreta-forte

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=sua-senha
DB_NAME=stock_management
```

Crie o banco no MySQL antes de iniciar a aplicação:

```sql
CREATE DATABASE stock_management;
```

### Desenvolvimento

```bash
npm run start:dev
```

### Produção local

```bash
npm run build
npm run start:prod
```

A aplicação fica disponível em `http://localhost:3000` por padrão. Todas as rotas são prefixadas por:

```text
/v1/api
```

## Autenticação

Envie o access token no header das rotas protegidas:

```http
Authorization: Bearer <token>
```

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/v1/api/auth/login` | Autentica usuário e retorna access/refresh tokens |
| `POST` | `/v1/api/auth/signup` | Cria usuário; rota marcada para perfil administrativo |
| `POST` | `/v1/api/auth/reset-password` | Redefine a senha usando a senha atual |
| `POST` | `/v1/api/auth/validate-token` | Valida um access token |
| `POST` | `/v1/api/auth/refresh` | Gera um novo access token com refresh token |

O access token expira em 1 hora por padrão. O refresh token expira em 7 dias e é associado ao usuário no banco.

## Endpoints

Todos os endpoints abaixo estão sob `/v1/api`.

### Usuários

| Método | Rota | Acesso |
|---|---|---|
| `GET` | `/user` | Administrador |
| `GET` | `/user/me` | Usuário autenticado |
| `PATCH` | `/user/me` | Usuário autenticado |
| `GET` | `/user/:id` | Administrador |
| `PATCH` | `/user/:id` | Administrador |
| `DELETE` | `/user/:id` | Administrador |

### Domínios de estoque

| Recurso | Rotas CRUD | Recursos adicionais |
|---|---|---|
| Categorias | `/category` | `POST /category/upload`, `GET /category/export` |
| Clientes | `/customer` | — |
| Entregas | `/delivery` | — |
| Locais | `/location` | — |
| Pedidos | `/order` | `GET /order/export` |
| Produtos | `/product` | `POST /product/upload`, `GET /product/export` |
| Estoque | `/stock` | `POST /stock/upload`, `GET /stock/export` |
| Fornecedores | `/supplier` | `POST /supplier/upload`, `GET /supplier/export` |
| Armazéns | `/warehouse` | `POST /warehouse/upload`, `GET /warehouse/export` |

Os recursos CRUD seguem o padrão:

```text
POST   /<recurso>
GET    /<recurso>
GET    /<recurso>/:id
PATCH  /<recurso>/:id
DELETE /<recurso>/:id
```

Para a listagem, o parâmetro opcional `_id` permite filtro pelo identificador curto:

```text
GET /v1/api/product?_id=AB12CD34
```

O campo `:id` aceito pelas operações UUID é o UUID primário gerado pelo banco.

## Importação e exportação

Os endpoints `upload` recebem um arquivo multipart usando o campo `file`:

```bash
curl -X POST http://localhost:3000/v1/api/category/upload \
  -H "Authorization: Bearer <token>" \
  -F "file=@dados.xlsx"
```

Os endpoints `export` retornam o conteúdo de uma planilha Excel:

```bash
curl -L http://localhost:3000/v1/api/product/export \
  -H "Authorization: Bearer <token>" \
  -o produtos.xlsx
```

O serviço de upload utiliza a primeira planilha do arquivo. Os nomes usados em relações, como categoria e fornecedor de produto, devem corresponder aos registros existentes no banco.

## Schemas principais

### Entidades comuns

Todas as entidades estendem `GenericEntity`, que possui:

- `id`: UUID gerado pelo banco
- `_id`: código curto de 8 caracteres gerado com nanoid
- `createdAt`: data de criação
- `updatedAt`: data da última atualização

### Relacionamentos

- `Category 1:N Product`
- `Supplier 1:N Product`
- `Supplier 1:N Order`
- `Product 1:N Order`
- `Product 1:N Stock`
- `Warehouse 1:N Stock`
- `Customer 1:N Delivery`
- `Product 1:N Delivery`

### Campos dos principais registros

| Entidade | Campos relevantes |
|---|---|
| User | firstname, lastname, email, password, role, refreshToken |
| Category | name, description |
| Supplier | name, email, phone, address |
| Customer | name, email, phone, address |
| Product | name, dimensions, weight, expiresAt, purchasePrice, salePrice, description, refrigerated, category, supplier |
| Stock | quantity, minimumStock, maximumStock, product, warehouse |
| Warehouse | name, email, phone, refrigerated, address, capacity |
| Order | supplier, product, expectedDate, actualDate, status, price, quantity, total, nomes desnormalizados |
| Delivery | customer, product, datas previstas/reais, status, price, quantity, total, dados do cliente e endereço |
| Location | name, address |

### Enumerações

#### Role

- `admin`
- `user`

#### OrderStatus

- `approved`
- `pending`
- `completed`
- `cancelled`

#### DeliveryStatus

- `pending`
- `approved`
- `completed`
- `cancelled`

## Validação

A aplicação habilita `ValidationPipe` globalmente. Os DTOs utilizam validadores como `@IsEmail`, `@IsString`, `@IsUUID`, `@IsNumber`, `@IsEnum`, `@IsDateString`, `@IsPhoneNumber`, `@IsOptional` e `@MinLength`.

Por exemplo, senhas de criação de usuário precisam ter pelo menos 8 caracteres. Campos de atualização são, em geral, opcionais por meio de `PartialType`.

## Scripts

| Comando | Descrição |
|---|---|
| `npm run start` | Inicia a aplicação |
| `npm run start:dev` | Inicia em modo watch |
| `npm run start:debug` | Inicia em modo debug/watch |
| `npm run build` | Compila a aplicação para `dist/` |
| `npm run start:prod` | Executa o build de produção |
| `npm run lint` | Executa ESLint e corrige problemas quando possível |
| `npm run format` | Formata arquivos TypeScript com Prettier |
| `npm test` | Executa testes unitários |
| `npm run test:e2e` | Executa testes end-to-end |
| `npm run test:cov` | Gera relatório de cobertura |

## Testes

```bash
npm test
npm run test:e2e
npm run test:cov
```

O teste E2E existente verifica a inicialização da aplicação em `test/app.e2e-spec.ts`.

## Observações de execução

- `TypeORM` está configurado com `autoLoadEntities: true` e `synchronize: true`. Em produção, recomenda-se usar migrations e desativar a sincronização automática.
- A configuração exige as variáveis `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME` e `JWT_SECRET`.
- A API usa CORS aberto por padrão (`app.enableCors()`), portanto pode ser necessário restringir origens em ambiente de produção.
- O prefixo global é configurado em `src/main.ts` e todas as rotas públicas são explicitadas pelo decorator `@Public()`.

## Estrutura de pasta

```text
stock-management/
├── src/
│   ├── */dto/           # contratos de entrada
│   ├── */entities/      # entidades TypeORM
│   ├── */*.controller.ts
│   ├── */*.service.ts
│   ├── */*.module.ts
│   └── main.ts
├── test/                # testes E2E
├── package.json
├── nest-cli.json
└── tsconfig.json
```
