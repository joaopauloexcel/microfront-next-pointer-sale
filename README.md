# 🛒 Store Frontends — Next.js E-commerce Template

Um **template profissional de frontend para lojas online**, construído com **Next.js 16**, focado em **arquitetura escalável, reutilização entre MFEs e alta qualidade de código**.

Este projeto foi pensado para servir como **base de produto real**, podendo ser utilizado tanto em ambientes corporativos quanto em projetos SaaS ou white-label.

---

## ✨ Principais Características

- ⚡ **Next.js 16 (App Router)**
- 🧩 **Monorepo com Turborepo**
- 🏗️ **Arquitetura SOLID (Domain / Data / Infra / Main)**
- 🎨 **Design System reutilizável (`@repo/ui`)**
- 🔐 **Autenticação JWT com refresh automático**
- ⏳ **Controle de tempo de inatividade (auto logout)**
- 🔄 **CRUD completo de produtos (API real DummyJSON)**
- 📦 **React Query (TanStack Query)**
- 🧪 **Testes unitários com Vitest + Testing Library**
- 🧹 **Husky + Lint Staged**
- 💅 **Styled Components (MUI + Emotion)**
- 📊 **Feedbacks visuais para o usuário**
- 🔌 **Gateway de autenticação pré-implementado**
- 🧠 **Preparado para Micro Frontends (MFEs)**

---

## 🧱 Arquitetura

O projeto segue uma arquitetura inspirada nos princípios do **SOLID** e **Clean Architecture**:

```text
src/
├── domain/        # Regras de negócio, entidades e contratos
├── data/          # Casos de uso e implementação de repositórios
├── infra/         # Comunicação externa (HTTP, gateways, storage)
├── main/          # Composição, providers e bootstrap da aplicação
```

### 📦 Monorepo

apps/
└── ... # Aplicação Next.js
packages/
├── ui # Componentes visuais reutilizáveis
└── app-shell # Provider global

````

> Os packages podem ser reutilizados em outros MFEs sem acoplamento ao domínio.

---

## 🔐 Autenticação

- Login via **Bearer Token**
- Refresh automático de token
- Controle de sessão por tempo de inatividade
- Logout automático e manual
- Pré configuração de gateway centralizado para autenticação

---

## 🛍️ Produtos (CRUD)

- API real: **https://dummyjson.com**
- Implementado com **React Query**
- Cache, refetch automático e estados de loading/error
- Separação clara entre domínio e infraestrutura

---

## 🎨 UI & Estilo

- **Material UI v7**
- **Styled Components com Emotion**
- Tema centralizado
- Componentes desacoplados do domínio
- Sidebar, Header, Layout e Feedbacks reutilizáveis

---

## 🧪 Testes

- **Vitest**
- **Testing Library**
- **Happy DOM**
- Boa cobertura de testes
- Testes focados em comportamento

```bash
npm run test
npm run test:watch
npm run test:coverage
````

---

## 🧹 Qualidade de Código

- **Husky**
- **Lint Staged**
- Pre-commit e pre-push configurados
- Testes e lint antes do push

```json
"scripts": {
  "prepare": "husky",
  "pre:commit": "lint-staged",
  "pre:push": "npm run test:coverage && npm run lint"
}
```

---

## 📜 Scripts Disponíveis

```bash
npm run dev           # Desenvolvimento paralelo (Turbo)
npm run build         # Build do monorepo
npm run lint          # Lint em todos os pacotes
npm run format        # Prettier
npm run test          # Testes unitários
npm run test:watch    # Testes em watch
npm run test:coverage # Cobertura de testes
```

---

## 📦 Principais Dependências

- `next`
- `@mui/material`
- `@emotion/react`
- `@tanstack/react-query`
- `axios`
- `zustand`
- `react-hook-form`
- `vitest`
- `turbo`
- `husky`
- `lint-staged`

---

## 🚀 Requisitos

- Node.js **>= 18**
- npm **>= 10.7.0**

---

## 📌 Objetivo do Projeto

Este projeto serve como:

- Template profissional de e-commerce
- Base para múltiplos MFEs
- Boilerplate corporativo
- Portfólio técnico avançado
- Base para produtos SaaS

---

## 👨‍💻 Autor

**João Paulo Seixas da Silva**  
Frontend Engineer  
Especialista em React, Next.js e Arquitetura Frontend

---

## 📝 Licença

Este projeto é privado e destinado para fins educacionais, comerciais ou internos.
