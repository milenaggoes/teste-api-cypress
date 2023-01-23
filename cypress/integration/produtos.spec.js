///<reference types = "cypress" />

describe('Testes da Funcionalidade Produtos', () => {
    it('Listar produtos', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/produtos'
        }).then((response)=>{
            expect(response.body.produtos[0].nome).to.equal('Logitech MX Vertical')
            expect(response.status).to.equal(200)
        })
    });
});