function status(request, response) {
  response.status(200).json({ mensagem: "São acima da média!" });
}

export default status;
