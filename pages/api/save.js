import { GoogleSpreadsheet } from 'google-spreadsheet';
import moment from 'moment';

// import  credentials from '../../credentials.json';

// spreadsheet key is the long id in the sheets URL
// const doc = new GoogleSpreadsheet('1D6OlZb-b0D-9ZV6SzQjAgNHPBa1muzUdV9nNgiztUrU');
const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID);

const gerarCodigo = () => {
    const codigo = parseInt(moment().format('YYMMDDHHmmssSSS')).toString(16).toUpperCase();
    return codigo.substr(0,4)+'-'+codigo.substr(4,4)+'-'+codigo.substr(8,4);
}

export default async (req, res)=>{
    try {
        // await doc.useServiceAccountAuth(credentials);
        await doc.useServiceAccountAuth({
            client_email: process.env.SHEET_CLIENTE_EMAIL,
            private_key: process.env.SHEET_PRIVATE_KEY
        });

        await doc.loadInfo();
        console.log(doc.title);
    
        const data = JSON.parse(req.body);
        const sheet = doc.sheetsByIndex[1];


        const sheetConfig = doc.sheetsByIndex[2];
        await sheetConfig.loadCells('A3:B3');
        // console.log(sheetConfig.title);

        const mostrarPromocaoCell = sheetConfig.getCell(2,0);
        console.log(mostrarPromocaoCell.value);

        const mostrarMensagemCell = sheetConfig.getCell(2,1);
        console.log(mostrarMensagemCell.value);

        let Cupom = '';
        let Promo = '';

        if(mostrarPromocaoCell.value == true) {
         Cupom = gerarCodigo(); // moment().format('DD/MM/YYYY, HH:mm:ss SSS');
         Promo = mostrarMensagemCell.value;
        }

        await sheet.addRow({
            Nome: data.Nome,
            Email: data.Email,
            Whatsapp: data.Whatsapp,
            Nota: parseInt(data.Nota),
            'Data Preenchimento': moment().format('DD/MM/YYYY, HH:mm:ss'),
            Cupom: Cupom,
            Promo: Promo
        });

     res.end(JSON.stringify({
      showCupom: Cupom !=='',
      Cupom: Cupom,
      Promo: Promo
     }));

    } catch (error) {
        console.log(error);
        res.end('error');
    }
};