// cypress/e2e/login.cy.js

const VALID_EMAIL = 'test@example.com'
const VALID_PASSWORD = 'Test1234!'
const INVALID_EMAIL = 'gecersiz-email'
const INVALID_PASSWORD = 'zayif'

describe('Login Formu E2E Testleri', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // ─────────────────────────────────────────────────────────────────────────
  // SENARYO 1: Başarılı form doldurulduğunda submit edebiliyorum
  // ─────────────────────────────────────────────────────────────────────────
  describe('Başarılı Senaryo', () => {
    it('Geçerli bilgilerle formu doldurup submit edince Success sayfasına gidebiliyorum', () => {
      // Email gir
      cy.get('[data-cy="email-input"]').type(VALID_EMAIL)

      // Şifre gir
      cy.get('[data-cy="password-input"]').type(VALID_PASSWORD)

      // Şartları kabul et
      cy.get('[data-cy="terms-checkbox"]').check()

      // Buton aktif olmalı
      cy.get('[data-cy="submit-button"]').should('not.be.disabled')

      // Submit et
      cy.get('[data-cy="submit-button"]').click()

      // Success sayfasına yönlendirilmeli
      cy.url().should('include', '/success')
      cy.contains('Giriş Başarılı!').should('be.visible')
    })
  })

  // ─────────────────────────────────────────────────────────────────────────
  // SENARYO 2: Hatalı durumlarda hata mesajları görünüyor ve buton disabled
  // ─────────────────────────────────────────────────────────────────────────
  describe('Hatalı Senaryolar', () => {
    it('Sadece email yanlış girildiğinde: 1 hata mesajı görünür, doğru mesaj var, buton disabled', () => {
      // Yanlış email gir ve blur ile tetikle
      cy.get('[data-cy="email-input"]').type(INVALID_EMAIL).blur()

      // Geçerli şifre gir
      cy.get('[data-cy="password-input"]').type(VALID_PASSWORD).blur()

      // Şartları kabul et
      cy.get('[data-cy="terms-checkbox"]').check()

      // Ekranda tam olarak 1 hata mesajı olmalı
      cy.get('.error-message').should('have.length', 1)

      // Doğru hata mesajı gösterilmeli
      cy.get('[data-cy="email-error"]')
        .should('be.visible')
        .and('contain', 'Geçerli bir e-posta adresi giriniz.')

      // Buton disabled olmalı
      cy.get('[data-cy="submit-button"]').should('be.disabled')
    })

    it('Email ve şifre ikisi de yanlışsa: 2 hata mesajı görünür, şifre hata mesajı var', () => {
      // Yanlış email gir
      cy.get('[data-cy="email-input"]').type(INVALID_EMAIL).blur()

      // Zayıf şifre gir
      cy.get('[data-cy="password-input"]').type(INVALID_PASSWORD).blur()

      // Şartları kabul et
      cy.get('[data-cy="terms-checkbox"]').check()

      // Ekranda 2 hata mesajı olmalı
      cy.get('.error-message').should('have.length', 2)

      // Şifre hata mesajı görünmeli
      cy.get('[data-cy="password-error"]')
        .should('be.visible')
        .and('contain', 'Şifre en az 8 karakter, büyük/küçük harf, rakam ve özel karakter içermelidir.')

      // Buton disabled olmalı
      cy.get('[data-cy="submit-button"]').should('be.disabled')
    })

    it('Email ve şifre doğru ama şartlar kabul edilmemişse buton disabled kalır', () => {
      // Geçerli email gir
      cy.get('[data-cy="email-input"]').type(VALID_EMAIL).blur()

      // Geçerli şifre gir
      cy.get('[data-cy="password-input"]').type(VALID_PASSWORD).blur()

      // Şartları KABUL ETME (checkbox işaretlenmemiş)

      // Buton disabled olmalı
      cy.get('[data-cy="submit-button"]').should('be.disabled')
    })
  })
})
