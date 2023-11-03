import json


def listar_alunos():
    with open("dados/alunos.json", "r", encoding="utf-8") as f:
        alunos = json.load(f)
    return alunos


def editar_aluno_svc(id, alunos_editar):
    alunos = listar_alunos()
    if id in alunos.keys():
        aluno = alunos[id]
        aluno["nome"] = alunos_editar["nome"]
        aluno["data_nascimento"] = alunos_editar["data_nascimento"]
        aluno["genero"] = str.upper(alunos_editar["genero"]) if alunos_editar["genero"] else ""
        _salvar_alunos(alunos)


def apagar_aluno(id):
    alunos = listar_alunos()
    if id in alunos.keys():
        alunos.pop(id)
        _salvar_alunos(alunos)
        return True
    else:
        return False


def criar_aluno(novo_aluno):
    alunos = listar_alunos()
    id_novo_aluno = _novo_id_aluno()
    aluno = {
        "nome": novo_aluno["nome"],
        "data_nascimento": novo_aluno["data_nascimento"],
        "genero": novo_aluno["genero"],
        "RA": int(id_novo_aluno),
    }

    alunos[id_novo_aluno] = aluno
    _salvar_alunos(alunos)


def _salvar_alunos(alunos):
    dados = json.dumps(alunos, indent=4)
    with open("dados/alunos.json", "w", encoding="utf-8") as arquivo:
        arquivo.write(dados)
        return True


def _novo_id_aluno():
    ids_numericos = []
    alunos = listar_alunos()
    for id_str in alunos.keys():
        id_int = int(id_str)
        ids_numericos.append(id_int)
    id_max_int = max(ids_numericos)
    novo_id = str(id_max_int + 1)
    return novo_id
