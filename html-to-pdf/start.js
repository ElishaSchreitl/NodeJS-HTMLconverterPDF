const puppeteer = require('puppeteer');

(async () => {
  //Create a browser instance
  const browser = await puppeteer.launch({headless: true}); //false -> no warning | true -> opens browser
  const page = await browser.newPage();
  const website_url = 'file:///D:/GithubRepositories/NodeJS-HTMLconverterPDF/html-to-pdf/Template.html'

  //Open URL in current page
  await page.goto(website_url, { waitUntil: 'domcontentloaded' });
  //To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

  //Downlaod the PDF
  const pdf = await page.pdf({
    path: 'pdf/result.pdf',
    //Add Margin to the PDF
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    printBackground: true,
    format: 'A4',
  });

  //Close the browser instance
  await browser.close();
})();