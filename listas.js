const STORAGE_KEY = "listaAlunos";

function getAlunos() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function setAlunos(alunos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alunos));
}

function limparInputs(nomeInput, idadeInput) {
  nomeInput.value = "";
  idadeInput.value = "";
}

if (document.body.classList.contains("cadastro-body")) {
  const nomeInput = document.getElementById("nome");
  const idadeInput = document.getElementById("idade");
  const saveBtn = document.getElementById("saveBtn");

  saveBtn.addEventListener("click", () => {
    const nome = nomeInput.value.trim();
    const idade = idadeInput.value.trim();

    if (!nome || !idade) {
      alert("Preencha o nome e a idade antes de salvar.");
      return;
    }

    const alunos = getAlunos();
    if (alunos.length >= 2) {
      alert("Já existem dois alunos salvos. Abra a lista para ver os cards.");
      return;
    }

    alunos.push({ nome, idade });
    setAlunos(alunos);
    limparInputs(nomeInput, idadeInput);
    alert("Dados salvos! O próximo acesso à lista mostrará o próximo card.");
  });
}

if (document.body.classList.contains("lista")) {
  const cards = document.querySelectorAll(".lista-card");
  const alunos = getAlunos();

  cards.forEach((card, index) => {
    const aluno = alunos[index];
    if (aluno) {
      card.innerHTML = `
        <h3>Nome: ${aluno.nome}</h3>
        <h3>Idade: ${aluno.idade}</h3>
      `;
    } else {
      card.innerHTML = `
        <h3>Nome:</h3>
        <h3>Idade:</h3>
      `;
    }
  });
}
