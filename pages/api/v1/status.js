function status(request, response) {
  response.status(200).json({ message: "Bem-vindo ao endpoint de Status" });
}

export default status;
