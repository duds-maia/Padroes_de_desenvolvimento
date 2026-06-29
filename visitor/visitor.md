# Padrão de Projeto - Visitor (GoF)

Este repositório apresenta o estudo e a implementação do padrão comportamental **Visitor**, demonstrando sua importância na adição de novas operações a estruturas de objetos existentes sem a necessidade de modificar as classes dessas estruturas.

🧭 O que é o Visitor?
O **Visitor** é um padrão de projeto comportamental que permite separar algoritmos dos objetos sobre os quais eles operam. Ele possibilita a inserção de novas funcionalidades em uma hierarquia de classes sem alterar o código existente dessas classes.

## Problema
Imagine que a sua equipa desenvolveu uma aplicação que trabalha com uma infraestrutura de informação representada por um grafo geográfico complexo. Cada nó do grafo pode representar uma entidade distinta, como cidades, indústrias, distritos comerciais e pontos turísticos. Cada tipo de nó possui comportamentos específicos e está interligado com outros nós da rede.

Surgiu a necessidade de implementar uma nova funcionalidade: exportar o grafo completo para o formato XML. A abordagem inicial e mais ingénua seria adicionar um método `exportarParaXML()` em cada classe de nó da hierarquia. Contudo, esta solução traz sérios problemas:

1. **Violação da Responsabilidade Única:** As classes dos nós, que deveriam focar-se apenas em lógica geográfica e de negócio core, agora passam a conter detalhes de infraestrutura e formatação XML.
2. **Risco de Instabilidade:** Alterar classes críticas e consolidadas num sistema de produção para incluir uma operação secundária pode introduzir novos bugs em funcionalidades já testadas.
3. **Falta de Extensibilidade:** Se na semana seguinte o cliente solicitar a exportação para JSON, ou a renderização gráfica dos nós, será necessário modificar novamente todas as classes da hierarquia, tornando a manutenção insustentável.

## Solução
O padrão Visitor resolve este dilema sugerindo que coloque o novo comportamento numa classe separada, chamada *visitor* (visitante), em vez de tentar integrá-lo em classes já existentes. O objeto original que precisa de realizar a operação é passado como argumento para um dos métodos do visitor, permitindo que este aceda a todos os dados necessários contidos no objeto.

No entanto, surge um problema de execução dinâmica: como o visitor saberá o método exato a executar para cada tipo de objeto da hierarquia (por exemplo, diferenciar o tratamento de uma `Cidade` de uma `Industria`)? A tipagem estática e o polimorfismo tradicional não resolvem isto de forma limpa.

Para contornar esta limitação, o Visitor utiliza uma técnica chamada **Duplo Despacho (Double Dispatch)**. Em vez de o cliente selecionar o método correto, delega-se essa escolha ao próprio objeto da hierarquia que está a ser visitado. As classes da hierarquia implementam um método genérico chamado `aceitar(Visitor v)`. Quando este método é executado numa instância de `Cidade`, por exemplo, ele faz o redirecionamento imediato invocando o método específico do visitor: `v.visitarCidade(this)`.

Desta forma, o programa avalia dinamicamente tanto o tipo do elemento que está a ser visitado quanto o tipo do visitor que está a executar a ação, garantindo total flexibilidade.

🧱 Estrutura do Padrão
O padrão é composto pelos seguintes elementos principais:

1. **Visitor (Interface):** Declara um conjunto de métodos de visita que podem receber como argumento qualquer elemento da classe concreta correspondente da hierarquia.
2. **Concrete Visitor:** Implementa diferentes versões do mesmo comportamento para todas as classes de elementos concretos (ex: `ExportarXMLVisitor`, `CalcularEstatisticaVisitor`).
3. **Element (Interface):** Declara o método `aceitar(Visitor v)` que recebe a interface do visitante como parâmetro.
4. **Concrete Element:** Implementa o método `aceitar(Visitor v)`. A única responsabilidade deste método é redirecionar a chamada para o método do visitante correspondente à classe do elemento atual (`v.visitarElementoConcreto(this)`).

📌 Prós e contras
✅ **Princípio de Responsabilidade Única:** Permite agrupar várias versões de um comportamento ou algoritmo numa única classe separada.
✅ **Princípio Aberto/Fechado:** Facilita a introdução de novos comportamentos operando sobre estruturas de objetos complexos sem modificar as classes desses objetos.
✅ **Acumulação de Estado:** À medida que o visitante percorre os diversos elementos da estrutura, ele pode acumular informações úteis e estados internos, o que é ideal para relatórios ou auditorias.

❌ **Dificuldade de Manutenção na Expansão:** Se uma nova classe de elemento for adicionada à hierarquia (ex: criar um nó `Aeroporto`), será obrigatório atualizar todas as interfaces e classes concretas de visitantes existentes para incluir o novo método de visita.
❌ **Violação de Encapsulamento:** Para conseguir realizar as suas tarefas externas, os visitantes precisam frequentemente de acesso a atributos e métodos internos dos elementos que idealmente deveriam ser privados ou protegidos.

Padrões relacionados
* **Composite:** O Visitor pode ser utilizado para aplicar operações complexas e centralizadas de forma recursiva sobre toda a árvore estrutural gerada pelo padrão Composite.
* **Iterator:** O padrão Iterator pode ser usado em conjunto com o Visitor para navegar através de uma coleção ou estrutura de dados complexa enquanto o Visitor executa ações específicas sobre cada elemento encontrado.

Conclusões sobre o Visitor
O padrão Visitor demonstra ser uma ferramenta sofisticada e altamente eficaz para o desenvolvimento de software quando o objetivo principal é a flexibilidade algorítmica sobre modelos de dados estáveis. Ele transfere com sucesso o foco do desenvolvimento de uma arquitetura rígida para um ecossistema dinâmico onde novos relatórios, exportadores e análises podem ser acoplados a qualquer momento. Embora exija uma disciplina rigorosa no encapsulamento de dados e seja sensível a alterações estruturais na hierarquia de classes, o Visitor mitiga com mestria a proliferação de métodos dispersos e desconexos dentro do núcleo das regras de negócio do sistema.

Fontes
* https://refactoring.guru/pt-br/design-patterns/visitor
* Livro Gof - Design Patterns: Elements of Reusable Object-Oriented Software
* Livro Código Limpo (Clean Code) - Robert C. Martin

Autoria: Rafael Pereira
