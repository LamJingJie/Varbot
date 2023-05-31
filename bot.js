
var puppeteer = require('puppeteer');
const chromeOptions = {
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: false,
    args: ['--start-maximized']
}


async function bot(data_array){
    //eval();
    //console.log(data_array);
    //console.log(data_array.length);
    try {
        const browser = await puppeteer.launch(chromeOptions);
        const page = await browser.newPage();
    
        //console.log("Facebook javascript file!");
    
        /*await page.goto('https://touch.facebook.com/?_rdr', {
            waitUntil: 'networkidle0',
        });*/
        /*for(let i = 0; i < data_array.length; i++){
            console.log("hi");
            console.log(i);
            console.log(data_array[i]);
        }*/
        let script = data_array.join("");
        console.log(script);
        await eval("(async () => {" + script + "})()");
        console.log("Bot finished! Now closing...");
        //await page.close();
        return 'DONE';
    } catch (error) {
        console.log(error);
        return error;
    }
   

}

module.exports = bot;