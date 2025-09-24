# Portal SuperTerminais - Frontend

Este é o repositório do frontend para a aplicação Portal SuperTerminais. Desenvolvido com Vue.js e TypeScript, ele fornece a interface de usuário para interação com a API do backend, permitindo que os usuários se autentiquem e realizem o cadastro de empresas.

## ✨ Features

-   **Interface Responsiva:** Construída com Tailwind CSS para uma experiência consistente em desktops e dispositivos móveis.
-   **Componentes Modernos:** Utiliza a biblioteca `shadcn-vue` para uma UI limpa, acessível e profissional.
-   **Autenticação Baseada em Token:** Fluxo de login seguro que armazena um token JWT para gerenciar a sessão do usuário.
-   **Roteamento Protegido:** Utiliza `vue-router` para proteger rotas, garantindo que apenas usuários autenticados possam acessar páginas restritas.
-   **Navegação Condicional:** A interface se adapta ao tipo de usuário logado, exibindo menus e opções específicas (como o painel de Administração para usuários internos).
-   **Formulário de Cadastro Dinâmico:** Um único formulário que se adapta para o cadastro de Pessoas Jurídicas, Físicas e Estrangeiras.
-   **Feedback Interativo:** Modais de sucesso, erro e aviso que fornecem feedback claro ao usuário em todas as etapas, conforme as regras de negócio.
-   **Upload de Arquivos:** Componente para seleção e envio de documentos para o backend.

## 🛠️ Tecnologias Utilizadas

-   **Vue.js 3** (com Composition API e `<script setup>`)
-   **Vite** (Build Tool)
-   **TypeScript**
-   **Tailwind CSS** (Framework de Estilização)
-   **shadcn-vue** (Biblioteca de Componentes)
-   **Vue Router** (Roteamento)
-   **Axios** (Cliente HTTP para comunicação com a API)
-   **jwt-decode** (Para ler o conteúdo dos tokens JWT)
-   **lucide-vue-next** (Biblioteca de Ícones)

## 🚀 Começando

Siga estas instruções para obter uma cópia do projeto e executá-lo em sua máquina local.

### Pré-requisitos

-   Node.js v18 ou superior.
-   NPM (geralmente instalado com o Node.js).
-   **O backend do Portal SuperTerminais deve estar em execução** para que a API esteja disponível.

### Instalação e Execução

1.  **Clone o repositório:**
    ```sh
    git clone <url-do-seu-repositório>
    ```

2.  **Navegue até a pasta do frontend:**
    ```sh
    cd superterminais-portal/frontend
    ```

3.  **Instale as dependências do projeto:**
    ```sh
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```sh
    npm run dev
    ```

    A aplicação estará disponível em `http://localhost:5173`. O servidor recarregará automaticamente a página sempre que você fizer alterações nos arquivos do projeto.

## 🏛️ Estrutura do Projeto

O projeto é organizado da seguinte forma para manter o código limpo e escalável:

-   `src/api/`: Contém a instância configurada do Axios (`apiClient`), que adiciona automaticamente o token de autenticação a todas as requisições.
-   `src/assets/`: Arquivos estáticos, como o `main.css` onde o Tailwind CSS é injetado.
-   `src/components/`:
    -   `layout/`: Componentes estruturais, como a `Sidebar`.
    -   `ui/`: Componentes da biblioteca `shadcn-vue` e componentes genéricos, como o `GenericModal`.
-   `src/pages/`: Os componentes que representam as telas completas da aplicação (Login, Dashboard, CompanyRegistration, etc.).
-   `src/router/`: Configuração do `vue-router`, onde as rotas e as proteções de navegação (navigation guards) são definidas.
-   `src/store/`: Gerenciamento de estado simplificado. O `auth.ts` é responsável por manter o token e a role do usuário.

## 🖼️ Telas da Aplicação

Para uma melhor visualização do projeto, aqui estão algumas das principais telas:

-   **Tela de Login:** Interface limpa para autenticação do usuário.
      <img width="1914" height="910" alt="image" src="https://github.com/user-attachments/assets/2bc1b5dd-b763-4bc6-b91a-59931b939e86" />


-   **Dashboard do Usuário Externo:** Tela inicial após o login, exibindo o status do cadastro.
    <img width="1916" height="908" alt="image" src="https://github.com/user-attachments/assets/708f5638-30ca-4a92-9b09-202444bfad57" />


-   **Formulário de Cadastro:** Formulário dinâmico e interativo para registro de novas empresas.
    

    https://github.com/user-attachments/assets/ab25c868-8b6f-4c18-93eb-d93f84037354


