const puppeteer = require("puppeteer");
const readLineSync = require("readline-sync");

(async () => {
  const moedaRaiz =
    readLineSync.question("Informe uma moeda base para converter: ") || "dolar";
  const moedaFinal =
    readLineSync.question("Informe a moeda final a ser convertida: ") || "real";
  const valorAserConvertido = readLineSync.question(
    "Informe o valor a ser convertido: " || 1
  );
  const url = `https://www.google.com/search?q=${moedaRaiz}+para+${moedaFinal}&oq=google&gs_lcrp=EgZjaHJvbWUqEAgAEAAYgwEY4wIYsQMYgAQyEAgAEAAYgwEY4wIYsQMYgAQyEwgBEC4YgwEYxwEYsQMY0QMYgAQyDQgCEAAYgwEYsQMYgAQyBggDEEUYOzIGCAQQRRhBMgYIBRBFGDwyBggGEEUYPDIGCAcQRRhB0gEIMjEwMmowajmoAgCwAgA&sourceid=chrome&ie=UTF-8`;

  //carregar o browser
  const browser = await puppeteer.launch({ headless: true });
  //abrir a pagina
  const page = await browser.newPage();
  //ir para a url da pagina
  await page.goto(url);
  // esperar carregar a tag do elemento para extração
  await page.waitForSelector("input.lWzCpb.a61j6");

  //limpar o campo antes de inserir o valor da moeda raiz
  await page.evaluate(() => {
    const element = document.querySelector("input.lWzCpb.ZEB7Fb");
    if (element) {
      element.value = "";
    }
  });

  //inserir um valor na moeda Raiz para ser convertido
  await page.type("input.lWzCpb.ZEB7Fb", valorAserConvertido.toString());
  //extrair o valor do input da moeda destino
  const outputValue = await page.evaluate(() => {
    const inputElement = document.querySelector("input.lWzCpb.a61j6");

    return inputElement ? inputElement.value : null;
  });
  //formata a string de '.' para ','
  const outputValueFormated = outputValue
    ? outputValue.replace(".", ",")
    : null;
  console.log(
    `${valorAserConvertido} em ${moedaRaiz} é igual a ${outputValueFormated} em ${moedaFinal}.`
  );

  await browser.close();
})();
