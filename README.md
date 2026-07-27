# 💰 Planej.ai - Educador Financeiro com IA

Uma aplicação web moderna desenvolvida para ajudar no planejamento financeiro pessoal, integrando cálculos automáticos e insights personalizados gerados por inteligência artificial.

## 🚀 O que o projeto faz
O Planej.ai permite que o usuário insira seus dados financeiros (renda, custos fixos, dívidas e objetivos) para calcular automaticamente a economia mensal necessária, gerando um relatório detalhado com inteligência artificial e permitindo salvar simulações no histórico do navegador.

## 🛠️ Tecnologias usadas
- **React** com **TypeScript**
- **Vite**
- **Tailwind CSS** para estilização
- **Lucide React** para ícones
- **React to Print** para exportação de relatórios em PDF

## ⚙️ Como executar a aplicação
1. Clone este repositório:
   ```bash
   git clone https://github.com/cdiegooliveira/planejai.git
   
## ✨ Melhorias implementadas
- **Histórico de Simulações Dinâmico:** Listagem salva no LocalStorage com exclusão de registros e exibição de valores de economia calculados em tempo real.
- **Exportação Avançada de Relatório em PDF:** Geração de documento estruturado em páginas separadas (Resumo Financeiro na página 1 e Insights da IA na página 2) utilizando quebras de página inteligentes e classes condicionais de impressão (`print:`).
- **Tratamento de Layout Responsivo:** Ajustes precisos no Tailwind CSS para garantir que os cards se comportem perfeitamente tanto na tela quanto na impressora.

## 💡 O que eu aprendi durante este desafio
- Manipulação de estado e persistência local (`LocalStorage`) no React.
- Tipagem avançada com TypeScript para mitigar erros e unificar estruturas de dados.
- Técnicas avançadas de estilização e quebra de páginas voltadas para impressão web usando o `react-to-print` e classes de controle de fluxo de quebra (`break-inside-avoid`, `break-before-page`).
- Resolução de problemas práticos de layout e alinhamento de grids complexos.
