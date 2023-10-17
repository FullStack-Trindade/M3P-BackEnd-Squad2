const yup = require("yup");

//TODO:validação de datas

const schema = yup.object().shape({
  nomeExame: yup.string().required("Campo obrigatório"),
  dataExame: yup
    .string(),
  /*   .matches(/^\d{2}-\d{2}-\d{4}$/, "Formato de data inválido"), */
  horaExame: yup
    .string()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido"),
  tipoExame: yup.string().required("Campo obrigatório"),
  laboratorio: yup.string().required("Campo obrigatório"),
  statusSistema: yup.boolean().required("").oneOf([true]),
});

const validacoesExame = (req, res, next) => {
  try {
    schema.validateSync(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = validacoesExame;
