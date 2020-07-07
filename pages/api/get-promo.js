import { GoogleSpreadsheet } from 'google-spreadsheet';

// import  credentials from '../../credentials.json';

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID);

export default async (req, res)=>{

    try {
        // await doc.useServiceAccountAuth(credentials);

        await doc.useServiceAccountAuth({
            client_email: process.env.SHEET_CLIENTE_EMAIL,
            private_key: process.env.SHEET_PRIVATE_KEY
        });

        

        await doc.loadInfo();
        // console.log(doc.title);

        const sheet = doc.sheetsByIndex[2];
        await sheet.loadCells('A3:B3');
        // console.log(sheet.title);

        const mostrarPromocaoCell = sheet.getCell(2,0);
        console.log(mostrarPromocaoCell.value);

        const mostrarMensagemCell = sheet.getCell(2,1);
        console.log(mostrarMensagemCell.value);

        res.end(JSON.stringify({
            showCumpom: mostrarPromocaoCell.value == true,
            message: mostrarMensagemCell.value
        }));

    } catch (error) {
        // console.log(error);
        res.end(JSON.stringify({
            showCumpom: false,
            message: ''
        }));
    }

};