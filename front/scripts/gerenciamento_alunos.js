let alunos_todos = {}

async function getInfoAlunos() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/alunos/listar");
        alunos_todos = await response.json();
        mostraAlunos(alunos_todos);
    } catch (error) {
        console.error("Erro ao buscar dados da API -> ", error);
        return null;
    }
}

const nome = document.getElementById('nomeNovoALuno').value;


getInfoAlunos();  // Agora a função getInfoAlunos é chamada para buscar os dados.

	
let databrasil = moment().format("DD/MM/YYYY");
console.log(databrasil)

const renderizarAluno = (aluno) => {
  const quadrado = document.createElement("div");
  quadrado.className = "quadrado";
  
  const labelRa = document.createElement("p");
  labelRa.textContent = `RA: ${aluno.RA}`;
  
  quadrado.appendChild(labelRa);
  
  const labelNome = document.createElement("p");
  labelNome.textContent = aluno.nome;
  quadrado.appendChild(labelNome);
  
  const labelGenero = document.createElement("p");
  labelGenero.textContent = aluno.genero;
  quadrado.appendChild(labelGenero);

  const labelIdade = document.createElement("p");
  labelIdade.textContent = aluno.data_nascimento;
  quadrado.appendChild(labelIdade);
  
  alunos = document.getElementById("aluno-container")
  const imagemIconEdit = document.createElement("img")
      imagemIconEdit.src = "../front/icon/edit-icon.svg"
      imagemIconEdit.alt ="Icone"
      imagemIconEdit.className = "edit-icon"
      imagemIconEdit.id = `${aluno.RA}`;
      imagemIconEdit.addEventListener("click", () => editarAluno(`${aluno.RA}`))
      quadrado.appendChild(imagemIconEdit);


  const imagemIconDelete = document.createElement("img")
    imagemIconDelete.src = "../front/icon/trash-icon.svg"
    imagemIconDelete.alt ="Icone"
    imagemIconDelete.className = "trash-icon"
    imagemIconDelete.id = `delete${aluno.RA}`;
    imagemIconDelete.addEventListener("click", () => deleteAluno(`${aluno.RA}`))
      quadrado.appendChild(imagemIconDelete);
  alunos.appendChild(quadrado);
};

const mostraAlunos = (alunos) => {
    for (const id in alunos) {
      renderizarAluno(alunos[id]);
    }
}
async function editarAluno(RA) {
  let aluno = alunos_todos[RA];
  const modal = document.createElement("dialog");

  const titulo = document.createElement("h1");
  titulo.textContent = "Editar aluno";
  modal.appendChild(titulo);

  const formulario = document.createElement("form");
  modal.appendChild(formulario);

  const aluno_label = document.createElement("p");
  aluno_label.textContent = "Nome";
  const inputNome = document.createElement("input");
  inputNome.type = "text";
  inputNome.value = aluno.nome;
  formulario.appendChild(aluno_label);
  formulario.appendChild(inputNome);

  const aluno_genero = document.createElement("p");
  aluno_genero.textContent = "Genero";
  const inputGenero = document.createElement("input");
  inputGenero.type = "text";
  inputGenero.value = aluno.genero;
  formulario.appendChild(aluno_genero);
  formulario.appendChild(inputGenero);

  const aluno_nasc = document.createElement("p");
  const inputDataNascimento = document.createElement("input");
  inputDataNascimento.type = "date";
  inputDataNascimento.value = moment(aluno.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
  formulario.appendChild(inputDataNascimento);

  // Adicione um botão de salvar ao formulário
  const buttonSalvar = document.createElement("button");
  buttonSalvar.textContent = "Salvar";
  formulario.appendChild(buttonSalvar);

  // Adicione o modal à página
  document.body.appendChild(modal);

  modal.showModal();

  buttonSalvar.addEventListener("click", async () => {
    // Obter os valores do formulário
    const nome = inputNome.value;
    const genero = inputGenero.value;
    const dataNascimento = moment(inputDataNascimento.value, 'YYYY-MM-DD').format('DD/MM/YYYY');

    const aluno_editado = {
      "RA": RA,
      "nome": nome,
      "genero": genero,
      "data_nascimento": dataNascimento
    }

    const response = await backEditarAluno(aluno_editado)
    modal.close();
    event.preventDefault();
  });
}


async function backEditarAluno(aluno_editado){
    try {
      const response = await fetch (`http://127.0.0.1:8080/api/v1/alunos/editar/${aluno_editado.RA}`,{method: "POST", body:JSON.stringify(aluno_editado)})
      return response.status === 200
      }catch (error) {
          console.error("Erro ao buscar dados da API -> ", error);
          return false
      }
}

const deleteAluno = (RA) => {
  try {
      fetch (`http://127.0.0.1:8080/api/v1/alunos/deletar/${RA}`,{method: "POST"})
      console.log('chamou o deletar')
      } catch (error) {
          console.error("Erro ao buscar dados da API -> ", error);
      }
}
var favDialog = document.getElementById("favDialog");
var botaoNovoAluno = document.getElementById("buttonNovoAluno");
var submitButton = document.getElementById("submit");

botaoNovoAluno.addEventListener("click", function () {
    favDialog.showModal();
  });

submitButton.addEventListener("click", function () {
    criarNovoAluno();
    favDialog.close();
  });

  const criarNovoAluno = () => {
    // Obtenha os valores dos campos do formulário
    const nome = document.getElementById('nomeNovoALuno').value;
    const genero = document.getElementById('generoNovoAluno').value;
    const dataNascNova = document.getElementById('dataNascNovoAluno').value;

    // Formate a data para o formato "DD/MM/YYYY" usando o Moment.js
    const dataFormatada = moment(dataNascNova).format('DD/MM/YYYY');

    // Crie um objeto aluno com os valores obtidos
    const alunoNovo = {
        "nome": nome,
        "genero": genero,
        "data_nascimento": dataFormatada
    }

    try {
        // Faça a chamada para criar o novo aluno, enviando o objeto alunoNovo
        fetch('http://127.0.0.1:8080/api/v1/alunos/criar', { method: "POST", body: JSON.stringify(alunoNovo) })
            .then(response => {
                if (response.status === 200) {
                    console.log('Aluno criado com sucesso.');
                } else {
                    console.error('Erro ao criar o aluno.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API -> ', error);
            });
    } catch (error) {
        console.error('Erro ao buscar dados da API -> ', error);
    }
  }