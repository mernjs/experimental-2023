const puppeteer = require('puppeteer');

const scrapper = async (url)  => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(500);
    const result = await page.evaluate(() => {
        const htitle = document.querySelector('.lead').innerText;
        const htitle1 = document.querySelector('.intro-title').innerText;
        const hdescription = document.querySelector('.fw-normal').innerText;
        const hbtn = document.querySelector('.btn').innerText;
        const homeSection = {
            htitle,
            htitle1,
            hdescription,
            hbtn
        }

        const atitle = document.querySelector('.h4').innerText;
        const atitle1 = document.querySelector('.intro-title').innerText;
        const adescription = document.querySelector('.col-sm-4').innerText;
        const abtn = document.querySelector('.pb-1').innerText;

        console.log("adescription", adescription)
        const aboutSection = {
            atitle,
            atitle1,
            adescription,
            abtn
        }

        return {
            homeSection,
            aboutSection
        }
    });
    await browser.close();
    return result;
}

scrapper("https://vijay-pratap-singh.netlify.app").then(response => {
    console.log("response ===>>>", response)
}).catch((err) => { 
    console.log("response error ===>>>", err)
})