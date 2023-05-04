const puppeteer = require('puppeteer');

(async () => {
  //Create a browser instance
  const browser = await puppeteer.launch({headless: true}); //false -> no warning | true -> opens browser
  const page = await browser.newPage();
  //Dynamic URL, changes depending on path of the directory
  const website_url = require('path').dirname(require.main.filename).toString().split(/\\/).join('/') + '/Template.html';

  //Open URL in current page
  await page.goto(website_url, { waitUntil: 'domcontentloaded' });
  //To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

  //Downlaod the PDF
  const pdf = await page.pdf({
    path: 'files/result.pdf',
    //Add Margin to the PDF
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    printBackground: true,
    format: 'A4',
  });

  //Close the browser instance
  await browser.close();
})();