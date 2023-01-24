///<reference types = "cypress" />

describe('Testes da Funcionalidade Produtos', () => {
    let token
    before(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn => {token = tkn})
    });

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
        let produto = `produto EBAC ${Math.floor(Math.random() * 1000000000)}`
        cy.request({
            method: 'POST',
            url: 'produtos',
            body: {
                "nome": produto,
                "preco": 200,
                "descricao": "Produto novo",
                "quantidade": 100
            },
            headers: {authorization: token}

        }).then((response)=>{
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });

    it('Deve validar mensagem de erro ao cadastrar produto repetido', () => {
        cy.cadastrarProduto(token, 'produto EBAC novo 5', 250, 'descricao produto novo', 180)
        .then((response)=>{
            expect(response.status).to.equal(400)
            expect(response.body.message).to.equal('Já existe produto com esse nome')
        })
    });
});