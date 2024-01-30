describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('https://weed.th')
  })

  it('displays two todo items by default', async () => {

    // cy.get('.leaflet-container ')
    //   .trigger('click', { which: 1, pageX: 200, pageY: 100 })
    //   .trigger('mouseover', { which: 1, pageX: 200, pageY: 100 })
    //   .trigger('mouseover', { which: 1, pageX: 200, pageY: 200 })
    //   .trigger('mouseover', { which: 1, pageX: 200, pageY: 300 });


    // cy.wait(1000);
    // cy.get('input').type('827270276');

    // cy.get('button').click();

    // cy.wait(1000);
    // cy.get(`[aria-label="Back"]`).click()

    // let counter = 0;
    // const links = [];

    // try {
    //   function getHref() {

    //     if (counter >= 1) {
    //       return;
    //     }

    //     counter++;
    //     const elems = Cypress.$('a')
    //     console.log(elems)
    //     elems.each((index, el) => {
    //       // console.log(el.href)
    //       links.push({ title: el.text, href: el.href })
    //       // console.log(el.text)
    //       cy.visit(el.href);
    //     })


    //     console.log(links, counter);
    //     // cy.get('#scroll-container').scrollTo('bottom');
    //     // cy.wait(2000);
    //     getHref();
    //   }

    //   getHref();

    // } catch (error) {
    //   console.error(error);
    //   console.log(links);

    // }







    cy.readFile('/home/moneymindsett/ml/weed-scrapper/weed-link.json').then((jsonData) => {

      // Iterate over each object in the array
      jsonData.forEach((item) => {
        
        // Visit the page
        cy.visit(item.href);
      
        cy.get('*[class^="Shops_review__"] > div:nth-child(3n)').each(($el, index, $list) => {
          
          cy.get('*[class^="Shops_review__"]', $el).as('ReviewElement');
          cy.log($el.text());
          
          cy.get('@ReviewElement').click();
          cy.wait(1000);
          
          cy.get(`*[class^="index_container__"]`).within(() => {
            cy.get('h1').then(($el) => {
              cy.get('a', { withinSubject: $el }).then(($a) => {
                  const href = $a.prop('href');
                  cy.log(href);
                  
                  // Saving data in JSON
                  item.data = item.data || [];
                  item.data.push({ "href": href });
              });
            });
            
            cy.wait(1000);
          });
          
          cy.get(`[aria-label="Back"]`).click();
          
          cy.get(`*[class^="index_container__"] > div > div:nth-child(7n)`).within(() => {
            cy.get('div').each(($el, index, $list) => {
              cy.log($el.text());
              cy.get('svg', { withinSubject: $el }).click();
              cy.wait(1000);
              cy.get('img');
              // Here you can add your image processing. Right now it's not doing anything.
            });
          });
        });
    
      });
    
      // Write the jsonData back
      cy.writeFile('path/to/jsonFile.json', jsonData);
      });
    });
    });
//   });

// });