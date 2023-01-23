///<reference types = "cypress" />

describe('Testes da Funcionalidade Produtos', () => {
    it('Listar produtos', () => {
        cy.request({
            method: 'GET',
            url: 'produtos'
        }).then((response)=>{
            expect(response.body.produtos[0].nome).to.equal('Logitech MX Vertical')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
            expect(response.duration).to.be.lessThan(20)
        })
    });

    it('Cadastrar produto', () => {
        cy.request({
            method: 'POST',
            url: 'produtos',
            body: {
                "nome": "Produto EBAC NOVO",
                "preco": 200,
                "descricao": "Produto novo",
                "quantidade": 100
            }
        }).then((response)=>{
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });
});