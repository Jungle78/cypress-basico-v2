/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
       cy.visit('./src/index.html')
   })

   it('verifica o título da aplicação', function(){
       cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')    
   })

   it('Preenche os campos obrigatórios e envia o formulário', function() {
    const longText='Teste, teste, teste, teste, teste, teste Teste, teste, teste, teste, teste, teste Teste, teste, teste, teste, teste, testeTeste, teste, teste, teste, teste, teste.'
       cy.get('#firstName').type('João')
       cy.get('#lastName').type('Silva')
       cy.get('#email').type('joao.silva@example.com')
       cy.get('#open-text-area').type(longText,{delay: 0} )
       cy.contains('button', 'Enviar').click()

       cy.get('.success').should('be.visible')
  })
   it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
       cy.get('#firstName').type('João') 
       cy.get('#lastName').type('Silva')
       cy.get('#email').type('joao.silva@example,com')
       cy.get('#open-text-area').type('teste') 
       cy.contains('button', 'Enviar').click()

       cy.get('.error').should('be.visible')
   })
   it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
       cy.get('#phone') 
       .type('abcdefghij')
       .should('have.value', '')
   })
   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
       cy.get('#firstName').type('João') 
       cy.get('#lastName').type('Silva')
       cy.get('#email').type('joao.silva@example.com')
       cy.get('#phone-checkbox').check()
       cy.get('#open-text-area').type('teste') 
       cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')
   })
   it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
      cy.get('#firstName')
       .type('João')
       .should('have.value', 'João')
       .clear()
       .should('have.value', '')
      cy.get('#lastName')
       .type('Silva')
       .should('have.value', 'Silva')
       .clear()
       .should('have.value', '')
      cy.get('#email')
       .type('joao.silva@example.com')
       .should('have.value', 'joao.silva@example.com')
       .clear()
       .should('have.value', '')
      cy.get('#phone')
       .type('1234567890')
       .should('have.value', '1234567890')
       .clear()
       .should('have.value', '')
   })
   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
      cy.get('button[type="submit"]').click()
      cy.get('.error').should('be.visible')
   })
   it('envia o formuário com sucesso usando um comando customizado', function() {
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
   })
   it('seleciona um produto (YouTube) por seu texto', function() {
      cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
   })
   it('seleciona um produto (Mentoria) por seu valor (value)', function() {
    // Seleciona a opção com o valor "mentoria"
    cy.get('#product')
    .select('mentoria')
    .should('have.value','mentoria')// Verifica que o valor selecionado é "mentoria"
   })
   it('seleciona um produto (Blog) por seu índice', function() {
     // Seleciona o segundo item no dropdown (índice 1)
    cy.get('#product')
    .select(1)
    // Verifica que o valor selecionado é "blog"
    .should('have.value','blog')
   })
   it('marca o tipo de atendimento "Feedback"', function() {
    cy.get('input[type="radio"][value="feedback"]')// Marca o botão de rádio com o valor "feedback"
    .check()
    .should('have.value','feedback')// Verifica se está marcado
   })
   it('marca cada tipo de atendimento', function() {
    // Verifica que existem exatamente 3 opções de rádio
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio){
        cy.wrap($radio).check()
         // Marca o rádio atual e verifica se está marcado
        cy.wrap($radio).should('be.checked')
       })
   })
   it('marca ambos checkboxes, depois desmarca o último', function() {
    // Marca todos os checkboxes e verifica se estão marcados
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    // Desmarca o último checkbox e verifica se ele está desmarcado
    cy.get('input[type="checkbox"]')
    .last()
    .uncheck()
    .should('not.be.checked')
   })
   
   it('seleciona um arquivo da pasta fixtures', function() {
    cy.get('input[type="file"]')
     .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json')
      })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function() {
    cy.get('input[type="file"]')
     .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })
   it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
    .selectFile('@sampleFile')
    .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })
    it('navega para uma página que normalmente abre em outra aba', function() {
        
        cy.get('#privacy a').should('have.attr', 'target', '_blank')    
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target') 
        .click()
        cy.contains('Talking About Testing').should('be.visible')
    })
    it.only('testa a página da política de privacidade de forma independente', function(){
     cy.visit('./src/privacy.html')
     cy.contains('Talking About Testing').should('be.visible')
    })
})
