require("dotenv").config()
const express = require('express')
const path = require('path');
const app = express();
const csvtojson = require('csvtojson');

app.listen(3000);

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3');


aws.config.update({
    secretAccessKey: process.env.ACCESS_SECRET,
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION,

});
const BUCKET = process.env.BUCKET
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname)
        }
    })
})

app.post('/upload', upload.single('file'), async function (req, res, next) {

    res.send('Sucesso no uploaded ' + req.file.location + ' location!')

})

app.get("/list", async (req, res) => {

    let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
    let x = r.Contents.map(item => item.Key);
    res.send(x)
})


// É necessario colocar o nome correto do arquivo que está em S3

app.get("/download/:filename", async (req, res) => {
    const filename = req.params.filename
    let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
    var fs = require('fs');
    const { parse } = require("csv-parse");
    const directory = path.join('/home/weriston/Documentos', filename)
    csvtojson().fromFile(directory).then(source => {

        // Fetching the data from each row 
        // and inserting to the table "sample"
        for (var i = 0; i < source.length; i++) {
            const cpf = require('node-cpf');
            const format = cpf.unMask(source[i]['Doc Originador']);
            const formatCPF_CNPJ = cpf.unMask(source[i]['Doc Originador']);

            // console.log(format);
            // console.log(source[i]['Doc Originador']);

            var Originador = source[i]["Originador"],
                Doc_Originador = parseInt(format),
                Cedente = source[i]["Cedente"],
                Doc_Cedente = parseInt(source[i]["Doc Cedente"]),
                CCB = parseInt(source[i]["CCB"]),
                Id_externo = parseInt(source[i]["Id"]),
                Cliente = source[i]["Cliente"],
                cpf_cnpj = parseInt(formatCPF_CNPJ),
                Endereco = source[i]["Endereco"],
                CEP = source[i]["CEP"],
                Cidade = source[i]["Cidade"],
                UF = source[i]["UF"],
                Valor_emprestimo = parseInt(source[i]["Valor_emprestimo"]),
                Taxa_juros = source[i]["Taxa de Juros"],
                Parcelas = source[i]["Parcela R$"],
                Principal = source[i]["Principal R$"],
                Juros = source[i]["Juros R$"],
                IOF = source[i]["IOF R$"],
                Comissao = source[i]["Comissao R$"],
                Total_Parcelas = source[i]["Total Parcelas"],
                Parcela = source[i]["Parcela #"],
                Multa = source[i]["Multa"],
                Mora = source[i]["Mora"],
                Data_Emissao = source[i]["Data de Emissao"],
                Data_Vencimento = source[i]["Data de Vencimento"],
                Data_Cobra_CBB = source[i]["Data de Compra CCB"],
                Preco_Aquisicao = source[i]["Preco Aquisicao"]

            // var insertStatement =
            //     `INSERT INTO enterpriseF values(?, ?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?, ?)`;
            var items = [Originador, Doc_Originador, Cedente, Doc_Cedente, CCB, Id_externo, Cliente, cpf_cnpj, Endereco, CEP, Cidade, UF, Valor_emprestimo, Taxa_juros, Parcelas, Principal, Juros, IOF, Comissao, Total_Parcelas, Parcela, Multa, Mora, Data_Emissao, Data_Vencimento, Data_Cobra_CBB, Preco_Aquisicao];

            // Inserting data of current row
            // into database
            (async () => {
                try {
                    const database = require('./db');
                    const Enterprise = require('./enterprise');
                    await database.sync()
                    const newEnterprise = await Enterprise.create({
                        Originador: Originador,
                        Doc_Originador: Doc_Originador,
                        Cedente: Cedente,
                        // Doc_Cedente: Doc_Cedente,
                        CCB: CCB,
                        Id_externo: Id_externo,
                        Cliente: Cliente,
                        cpf_cnpj: cpf_cnpj,
                        Endereco: Endereco,
                        CEP: CEP,
                        Cidade: Cidade,
                        UF: UF,
                        Valor_emprestimo: Valor_emprestimo,
                        Taxa_juros: Taxa_juros,
                        Parcelas: Parcelas,
                        Principal: Principal,
                        Juros: Juros,
                        IOF: IOF,
                        Comissao: Comissao,
                        Total_Parcelas: Total_Parcelas,
                        Parcela: Parcela,
                        Multa: Multa,
                        Mora: Mora,
                        Data_Emissao: Data_Emissao,
                        Data_Vencimento: Data_Vencimento,
                        Data_Cobra_CBB: Data_Cobra_CBB,
                        Preco_Aquisicao: Preco_Aquisicao,


                    });
                    console.log(newEnterprise)
                }
                catch (err) {
                    console.error('======>' + err)
                }

            })();

        }


    });

    // fs.createReadStream(directory)
    //     .pipe(parse({ delimiter: "," }))
    //     .on("data", function (value) {
    //         console.log(value);
    //     })
    //     .on("end", function () {
    //         // console.log("finished");
    //     })
    //     .on("error", function (error) {
    //         console.log(error.message);
    //     });

    res.send()

})

// app.delete("/delete/:filename", async (req, res) => {
//     const filename = req.params.filename
//     await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
//     res.send("File Deleted Successfully")

// })

