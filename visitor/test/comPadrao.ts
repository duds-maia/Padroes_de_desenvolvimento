// Com_Padrao.ts

/**
 * CENÁRIO 2: Abordagem Com o Padrão Visitor
 * * Nesta abordagem, extraímos todas as operações externas de exportação/análise das classes de negócio.
 * As classes originais agora apenas implementam a interface 'ElementoGeografico' com o método 'aceitar'.
 * * Usando o mecanismo de Duplo Despacho (Double Dispatch), conseguimos criar novos visitantes (XML, JSON, etc.)
 * sem nunca alterar as classes Cidade e Industria.
 */

// 1. Interface do Visitante (Visitor)
interface Visitor {
    visitarCidade(cidade: Cidade): void;
    visitarIndustria(industria: Industria): void;
}

// 2. Interface do Elemento (Componente Base da Estrutura)
interface ElementoGeografico {
    aceitar(visitor: Visitor): void;
}

// 3. Elementos Concretos limpos de lógicas de formatação de terceiros
class Cidade implements ElementoGeografico {
    constructor(
        public nome: string,
        public populacao: number
    ) {}

    getDensidadeDemografica(): number {
        return this.populacao / 100;
    }

    // O método aceitar realiza o duplo despacho dinâmico
    public aceitar(visitor: Visitor): void {
        visitor.visitarCidade(this);
    }
}

class Industria implements ElementoGeografico {
    constructor(
        public nomeEmpresa: string,
        public faturamento: number
    ) {}

    calcularImpostos(): number {
        return this.faturamento * 0.15;
    }

    // O elemento sabe exatamente qual método do visitante deve invocar
    public aceitar(visitor: Visitor): void {
        visitor.visitarIndustria(this);
    }
}

// 4. Visitante Concreto 1: Responsável estritamente pela exportação XML
class ExportarXMLVisitor implements Visitor {
    private resultado: string = "";

    public visitarCidade(cidade: Cidade): void {
        this.resultado += `<Cidade><Nome>${cidade.nome}</Nome><Populacao>${cidade.populacao}</Populacao></Cidade>\n`;
    }

    public visitarIndustria(industria: Industria): void {
        this.resultado += `<Industria><Empresa>${industria.nomeEmpresa}</Empresa><Faturamento>${industria.faturamento}</Faturamento></Industria>\n`;
    }

    public getResultado(): string {
        return `<Grafo>\n${this.resultado}</Grafo>`;
    }
}

// 5. Visitante Concreto 2: Criado facilmente sem alterar uma única linha das classes de cima!
class ExportarJSONVisitor implements Visitor {
    private itens: string[] = [];

    public visitarCidade(cidade: Cidade): void {
        this.itens.push(`{ "tipo": "Cidade", "nome": "${cidade.nome}", "populacao": ${cidade.populacao} }`);
    }

    public visitarIndustria(industria: Industria): void {
        this.itens.push(`{ "tipo": "Industria", "empresa": "${industria.nomeEmpresa}", "faturamento": ${industria.faturamento} }`);
    }

    public getResultado(): string {
        return `[\n  ${this.itens.join(",\n  ")}\n]`;
    }
}

// --- CÓDIGO CLIENTE ---
const estruturaDoGrafo: ElementoGeografico[] = [
    new Cidade("Pelotas", 250000),
    new Industria("AutoFabrica Sul", 8000000)
];

console.log("--- Executando COM o Padrão Visitor (XML) ---");
const xmlVisitor = new ExportarXMLVisitor();
estruturaDoGrafo.forEach(elemento => elemento.aceitar(xmlVisitor));
console.log(xmlVisitor.getResultado());

console.log("\n--- Executando COM o Padrão Visitor (JSON - Nova Funcionalidade OCP) ---");
const jsonVisitor = new ExportarJSONVisitor();
estruturaDoGrafo.forEach(elemento => elemento.aceitar(jsonVisitor));
console.log(jsonVisitor.getResultado());

export {}
