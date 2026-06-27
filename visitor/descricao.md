# Descrição do Trabalho: Estudo de Padrões de Projeto (GoF)

## Objetivo Geral
O presente trabalho tem como finalidade o estudo aprofundado dos Padrões de Projeto estabelecidos pela literatura do "Gang of Four" (GoF). Através deste estudo, visa-se compreender as mecânicas operacionais de soluções consagradas na engenharia de software, avaliar os cenários ideais para as suas aplicações práticas e desenvolver um senso crítico apurado quanto ao trade-off entre flexibilidade de código e complexidade arquitetural.

## Atividades Realizadas
Para atingir os objetivos propostos, as seguintes tarefas foram executadas com rigor técnico:

1. **Escolha do Padrão GoF:** Seleção do padrão de projeto comportamental **Visitor**, baseando-se nas referências oficiais e documentações especializadas de arquitetura de software (Refactoring Guru).
2. **Preparação de Material Explicativo:** Elaboração de documentação detalhada no formato Markdown (`visitor.md`), abordando conceitualmente o problema da rigidez estrutural, a solução proposta pelo padrão através do mecanismo de duplo despacho, a taxonomia dos seus componentes, além do levantamento analítico dos seus pontos fortes e fracos.
3. **Desenvolvimento Prático Comparativo:** Codificação de cenários práticos na linguagem TypeScript, divididos em:
    * Uma abordagem convencional e acoplada (**Sem o Padrão**) em `semPadrao.ts`.
    * Uma abordagem refatorada, extensível e elegante (**Com o Padrão**) em `comPadrao.ts`.
4. **Análise de Engenharia:** Identificação e mapeamento de vantagens de manutenibilidade face às desvantagens de perda de encapsulamento inerentes à adoção do padrão.

## Estrutura do Repositório
* `descricao.md`: Contextualização, escopo do projeto, objetivos e roteiro das entregas.
* `visitor.md`: Documentação teórica, análise detalhada de prós/contras e conclusões sobre o padrão Visitor.
* `semPadrao.ts`: Demonstração prática do problema de acoplamento e violação de princípios SOLID.
* `comPadrao.ts`: Demonstração da solução de engenharia utilizando a mecânica do padrão Visitor com Duplo Despacho.
