/* eslint-disable jest/valid-expect-in-promise */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable jest/valid-expect */
describe('General tests', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
  });

  describe('Logging in', function () {
    it('front page can be opened', function () {
      cy.contains('log in');
    });

    it('shoule not login with the wrong credentials', function () {
      cy.get('#usernameInput').type('hacker');
      cy.get('#passwordInput').type('DaBestHackerEVERRR123');
      cy.contains('login').click();
      cy.contains('log in');
    });

    it('shoule login with the right credentials', function () {
      cy.get('#usernameInput').type('test');
      cy.get('#passwordInput').type('test test');
      cy.contains('login').click();
      cy.contains('test is logged in');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#usernameInput').type('test');
      cy.get('#passwordInput').type('test test');
      cy.contains('login').click();
    });

    it('a new blog can be created', function () {
      cy.contains('Create New Blog').click();
      cy.get('#title').type('Cypress - is the best!');
      cy.get('#author').type('Ido the king');
      cy.get('#url').type('http://ShakedErinberg.com');
      cy.contains('Submit').click();
      cy.contains('Blog posted');
    });

    it('a blog can be liked', function () {
      cy.contains('View').click();
      cy.contains('😍').click();
      cy.contains('Liked Successfully');
    });

    // it('a blog can be deleted', function () {
    //   cy.contains('View').click();
    //   cy.contains('Delete Post').click();
    //   cy.contains('Deleted Successfully!');
    // });

    describe('like sorting', () => {
      let sortedLikes = [];
      let likeArray = [];

      beforeEach(() => {
        cy.get('.likes').then(($selectedElement) => {
          likeArray = $selectedElement
            .get()
            .map((element) => element.innerText);
          const arrToSort = [...likeArray];
          sortedLikes = arrToSort.sort((likeA, likeB) => likeB - likeA);
        });
      });

      it('blogs are sorted by likes', function () {
        expect(likeArray).to.deep.eq(sortedLikes);
      });

      it('blogs are sorted by likes even after a new like was made', function () {
        expect(likeArray).to.deep.eq(sortedLikes);

        cy.get('.toggle-btn').then(($selectedElement) =>
          $selectedElement.get()[$selectedElement.get().length - 2].click()
        );
        cy.get('.like-btn').then(($selectedElement) =>
          $selectedElement.get()[$selectedElement.get().length - 1].click()
        );

        cy.get('.likes').then(($selectedElement) => {
          likeArray = $selectedElement
            .get()
            .map((element) => element.innerText);
          const arrToSort = [...likeArray];
          sortedLikes = arrToSort.sort((likeA, likeB) => likeB - likeA);
          expect(likeArray).to.deep.eq(sortedLikes);
        });
      });
    });
  });
});
