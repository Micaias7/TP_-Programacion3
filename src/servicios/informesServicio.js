import puppeteer from "puppeteer";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class InformeServicio {
  reporteCompletoTurnos = async (datos) => {
    const plantillaPath = path.join(
      __dirname,
      "../utiles/handlebars/turnosPorEspecialidad.hbs"
    );

    const plantillaHtml = fs.readFileSync(plantillaPath, "utf-8");
    const template = Handlebars.compile(plantillaHtml);

    Handlebars.registerHelper("money", (value) =>
      Number(value).toFixed(2)
    );

    const html = template({
      especialidades: datos.especialidades,
      medicos: datos.medicos,
      fecha_reporte: new Date().toLocaleDateString("es-AR"),
      hora_reporte: new Date().toLocaleTimeString("es-AR"),
    });

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "10mm",
        right: "10mm",
      },
    });

    await browser.close();

    return pdf;
  };
}