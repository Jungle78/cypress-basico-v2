/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')
   })
  it('verifica o título da aplicação', function(){
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
       
   })

  it.only('Preenche os campos obrigatórios e envia o formulário', function() {
    cy.get('#firstName').type('João'); // Preencher o campo Nome
    cy.get('#lastName').type('Silva'); // Preencher o campo Sobrenome
    cy.get('#email').type('joao.silva@example.com'); // Preencher o campo Email
    cy.get('#open-text-area').type('Gostaria de mais informações sobre os seus serviços.'); // Preencher o campo "Como podemos te ajudar?"
    
    cy.get('button[type="submit"]').click();

   })
})