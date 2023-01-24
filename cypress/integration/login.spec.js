///<reference types = "cypress" />

describe("Login - Teste da API ServeRest", () => {

  it("Deve fazer login com sucesso", () => {
    cy.request({
      method: 'POST',
      url: 'login',
      body: {
        email: email,
        password: senha,
    },
    }).then((response) => {
      expect(response.status).to.equal(200);
      return response.body.authorization;
    });

  });

});
