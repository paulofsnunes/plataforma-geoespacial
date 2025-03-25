# 🌍 Plataforma Geoespacial

[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel)](https://plataforma-geoespacial.vercel.app/)
[![Vue](https://img.shields.io/badge/Vue-3.3-4FC08D?logo=vue.js)](https://vuejs.org/)
[![ArcGIS](https://img.shields.io/badge/ArcGIS_API-4.28-2C7AB5?logo=esri)](https://developers.arcgis.com/javascript/)

Aplicação web para visualização e análise de dados geoespaciais com integração do ArcGIS JS API.

🔗 **Acesso Online**: [plataforma-geoespacial.vercel.app](https://plataforma-geoespacial.vercel.app/)

## 🌐 Visão Geral

- **Mapa interativo** usando ArcGIS JS API  
- **Busca de bairros** e features geográficas  
- **Interface moderna** com Vue 3 e Vuetify  

## 🛠️ Tecnologias Principais

| Tecnologia       | Função                                | Versão   |
|------------------|---------------------------------------|----------|
| Vue 3            | Framework frontend                    | 3.5.13   |
| Vite             | Build tool                            | 6.2.1    |
| ArcGIS JS API    | Mapeamento geoespacial                | 4.32.9   |
| Pinia            | Gerenciamento de estado               | 3.0.1    |
| Vuetify          | Componentes UI                        | 3.8.0    |

## 🚀 Começando

### Pré-requisitos
- Node.js 18+
- npm 9+

### Instalação Local

# Clone o repositório
git clone [https://github.com/seu-usuario/plataforma-geoespacial.git](https://github.com/paulofsnunes/plataforma-geoespacial)

cd plataforma-geoespacial

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

## ⚙️ Configuração
Variáveis de Ambiente (.env)

### URLs das Camadas ArcGIS
#### 🔧 Variáveis de Ambiente
Configure no arquivo `.env` as seguintes variáveis para conexão com os serviços ArcGIS:
```ini
VITE_BAIRROS_LAYER_URL=https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/4
VITE_EIXOS_LAYER_URL=https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/2
VITE_REGIOES_LAYER_URL=https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/3
VITE_PONTOS_LAYER_URL=https://arcgis-ope.codexremote.com.br/server/rest/services/Hosted/Camadas_Teste/FeatureServer/1
```

## ⚙️ Como Configurar

1. **Crie um arquivo** `.env` na raiz do projeto.  
2. **Copie o conteúdo acima** para o arquivo.  
3. Para desenvolvimento local, use **`.env.local`** (já incluído no `.gitignore`).  


## 🏗️ Estrutura do Projeto
```plaintext
plataforma-geoespacial/
├── src/
│   ├── assets/               # Recursos estáticos (imagens, estilos)
│   ├── components/           # Componentes Vue
│   │   ├── MainHeader.vue    # Cabeçalho da aplicação
│   │   ├── MapView.vue       # Mapa interativo (ArcGIS)
│   │   └── SideMenu.vue      # Painel lateral de informações
│   ├── plugins/              # Plugins do Vue
│   │   └── vuetify.js        # Configuração do Vuetify
│   ├── router/               # Gerenciamento de rotas
│   │   └── index.js          # Definição das rotas
│   ├── stores/               # Gerenciamento de estado (Pinia)
│   │   └── mapStore.js       # Configurações do mapa e camadas
│   ├── views/                # Páginas/views principais
│   │   ├── App.vue           # Componente raiz
│   │   └── main.js           # Inicialização da aplicação
│   └── .env                  # Variáveis de ambiente (gitignorado)
├── public/                   # Arquivos públicos
│   └── index.html            # Template HTML principal
├── .gitattributes            # Configurações do Git
├── .gitignore                # Arquivos ignorados pelo Git
├── package.json              # Dependências e scripts
├── vite.config.js            # Configuração do Vite
├── jsconfig.json             # Configuração do JavaScript
├── README.md                 # Documentação do projeto
└── (arquivos de configuração)/
    ├── .editorconfig         # Padrões de edição
    ├── .prettierrc.json     # Configuração do Prettier
    └── eslint.config.js      # Regras do ESLint
```

## 🛠️ Comandos Úteis

| Comando           | Descrição                          | Ambiente        |
|-------------------|------------------------------------|-----------------|
| `npm run dev`     | Inicia servidor local (porta 3000) | Desenvolvimento |
| `npm run build`   | Gera versão para produção          | Produção        |
| `npm run preview` | Testa o build localmente           | Teste           |
| `npm run lint`    | Verifica qualidade do código       | QA              |


