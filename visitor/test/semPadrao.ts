// Sem_Padrao.ts

/**
 * CENÁRIO 1: Abordagem Sem o Padrão Visitor
 * * Neste cenário, temos uma hierarquia de elementos geográficos (Cidade e Industria).
 * O sistema precisa de implementar uma funcionalidade de exportação para XML.
 * * Problema: Para implementar a exportação, fomos obrigados a modificar diretamente as classes core,
 * adicionando o método 'exportarParaXML'. Se futuramente precisarmos de exportar para JSON ou
 * calcular estatísticas, teremos de alterar estas classes novamente, violando o princípio Aberto/Fechado (OCP)
 * e o princípio de Responsabilidade Única (SRP).
 */

class Cidade {
    constructor(
        public nome: string,
        public populacao: number
    ) {}

    // Lógica core da cidade
    getDensidadeDemografica(): number {
        return this.populacao / 100; // Exemplo simplificado
    }

    // Código de infraestrutura misturado com a regra de negócio
    exportarParaXML(): string {
        return `<Cidade><Nome>${this.nome}</Nome><Populacao>${this.populacao}</Populacao></Cidade>`;
    }
}

class Industria {
    constructor(
        public nomeEmpresa: string,
        public faturamento: number
    ) {}

    // Lógica core da indústria
    calcularImpostos(): number {
        return this.faturamento * 0.15;
    }

    // Outra violação: alteração da classe para incluir formatação de texto externa
    exportarParaXML(): string {
        return `<Industria><Empresa>${this.nomeEmpresa}</Empresa><Faturamento>${this.faturamento}</Faturamento></Industria>`;
    }
}

// --- CÓDIGO CLIENTE ---
const elementosSemPadrao = [
    new Cidade("Lisboa", 500000),
    new Industria("TechCorp Portugal", 2500000)
];

console.log("--- Executando SEM o Padrão Visitor ---");
elementosSemPadrao.forEach(elemento => {
    // O cliente consegue exportar, mas as classes originais estão poluídas e rígidas
    console.log(elemento.exportarParaXML());
});

// Nota: Se quisermos adicionar 'exportarParaJSON()', teremos de abrir as classes Cidade e Industria novamente.

export {}
