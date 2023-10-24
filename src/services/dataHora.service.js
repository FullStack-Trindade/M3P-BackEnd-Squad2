const moment = require('moment')

const hoje = new Date();
const hora = hoje.getHours();
const minutos = hoje.getMinutes();
const segs = hoje.getSeconds();

const dataHora = `${hora}:${minutos}:${segs}`;
const dataFormatada = moment(hoje).format('YYYY-MM-DD')

module.exports ={
    dataHora, dataFormatada
}