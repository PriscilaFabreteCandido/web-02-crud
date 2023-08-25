
var item;
var columns = {
	"ator" : ["nome"],
	"diretor": ["nome"],
	"classe" : ['nome', 'valor', 'prazodevolucao']
}

var atores = [];
var diretores = [];
var classes = [];

var tipoTabela;

var isUpdate = false;
var idEntidade;

document.addEventListener('DOMContentLoaded', function () {
    const hasSubmenus = document.querySelectorAll('.has-submenu');

    hasSubmenus.forEach(function (item) {
      const submenu = item.querySelector('.submenu');

      item.addEventListener('click', function (event) {
        event.preventDefault();
        submenu.classList.toggle('visible');
      });

      item.addEventListener('blur', function () {
        submenu.classList.remove('visible');
      });
    });

});


function excluir(entity, tipoCadastro) {
    var formData = {};
    formData = entity;
     fetch('http://localhost:8080/WEB-02/AtorController/deletar', {
        method: 'DELETE',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        this.getAllTipoEntidade(tipoCadastro);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function editar(entity, tipoTabela){
    var atributos = this.getAtributos(tipoTabela);
    isUpdate = true;
    idEntidade = entity.id;

    for (var i = 0; i < atributos.length; i++) {
        var inputName = atributos[i].toLowerCase();
        var inputValue = entity[inputName]; // Obtém o valor do atributo da entidade

        var inputElement = document.getElementsByName(inputName)[0]; // Obtém o elemento input correspondente

        if (inputElement) {
            if (inputElement.type === 'date') {
                inputElement.value = inputValue; // Preenche o valor para campos de data
            } else {
                inputElement.value = inputValue || ''; // Preenche o valor ou deixa em branco
            }
        }
    }
}
function limparInputs(tipoTabela) {
    var atributos = this.getAtributos(tipoTabela);

    for (var i = 0; i < atributos.length; i++) {
        var inputName = atributos[i].toLowerCase();

        var inputElement = document.getElementsByName(inputName)[0]; // Obtém o elemento input correspondente

        if (inputElement) {
            if (inputElement.type === 'date') {
                inputElement.value = ''; // Limpa o valor para campos de data
            } else {
                inputElement.value = ''; // Limpa o valor
            }
        }
    }
}

function createTables(tipoTabela) {
    // Dados de exemplo para diferentes entidades
    let entityData;
    
    tipoTabela = tipoTabela;
    if(tipoTabela == "ator"){
		entityData = atores;
	}else if(tipoTabela == "diretor"){
		entityData = diretores;
	} else if(tipoTabela = "classe"){
        console.log('jjj clasesse')
		entityData = classes;
	}
    console.log('jjj create', tipoTabela, entityData)
    if (!entityData) {
        console.error("Tipo de entidade inválido.");
        return;
    }

    const tableContainer = document.getElementById('table-container');
    const table = document.createElement('table');
    table.className = 'styled-table'; // Add a class for styling

    // Cabeçalho da tabela
    const headerRow = table.insertRow();
    headerRow.className = 'header-row'; // Add a class for header row styling

    var i = 0;
	columns[tipoTabela].forEach(x => {
        const headerCell1 = headerRow.insertCell(i);
        const capitalizedX = x.charAt(0).toUpperCase() + x.slice(1);
        headerCell1.textContent = capitalizedX;
        i++;
    });

	const headerCell3 = headerRow.insertCell(i);
    headerCell3.textContent = 'Acoes';
    console.log('entityData', entityData)
    entityData.forEach(entity => {
        const row = table.insertRow();
        row.className = 'data-row'; // Add a class for data row styling

        const columnsToDisplay = columns[tipoTabela];
        columnsToDisplay.forEach((column, index) => {
            const cell = row.insertCell(index);
            var text = entity[column];
            if(column == 'prazodevolucao'){
                text = moment(entity[column]).format('DD/MM/YYYY');
            }

            cell.textContent = text; // Use the entity's attribute dynamically
        });

        const editButton = createButton('Editar', 'edit-button');
        editButton.addEventListener('click', () => {
            this.editar(entity, tipoTabela);
        });

        const deleteButton = createButton('Excluir', 'delete-button');
        deleteButton.addEventListener('click', () => {
            this.excluir(entity, tipoTabela);
        });

        const cellActions = row.insertCell(columnsToDisplay.length);
        cellActions.appendChild(editButton);
        cellActions.appendChild(deleteButton);
    });
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

function createButton(text, className, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = className;
    button.addEventListener('click', clickHandler);
    return button;
}

function getAllTipoEntidade(tipoEntidade){
    var formData = {};
    if (tipoEntidade == 'ator') {
        formData.action = 'listarAtores';
        controller = "AtorController/listar"
    } else if (tipoEntidade == 'diretor') {
        formData.action = 'cadastrarDiretor';
        controller = "DiretorController/listar";
    } else if (tipoEntidade == 'classe') {
        formData.action = 'cadastrarClasse';
        controller = "ClasseController/listar";
    }

    let url = "http://localhost:8080/WEB-02/" + controller;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if(tipoEntidade == 'ator'){
            atores = data;
        }else if(tipoEntidade == 'classe'){
            classes = data;
        }

        this.createTables(tipoEntidade);
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
}

function getAtributos(tipoCadastro){
    var atributos = [];
    if (tipoCadastro == 'ator') {
        atributos = ['Nome'];
    } else if (tipoCadastro == 'diretor') {
        atributos = ['Nome'];
    } else if (tipoCadastro == 'classe') {
        atributos = ['Nome', 'Valor', 'PrazoDevolucao'];
    }

    return atributos;
}

function construirTelaDecadastros(tipoCadastro) {
    isUpdate = false;
    getAllTipoEntidade(tipoCadastro);

    var container = document.getElementById('cadastroContainer');
    container.innerHTML = ''; // Limpar conteúdo anterior

    var atributos = getAtributos(tipoCadastro);

    var form = document.createElement('form');
    form.setAttribute('id', 'cadastroForm');

    for (var i = 0; i < atributos.length; i++) {
        var label = document.createElement('label');
        label.textContent = atributos[i] + ': ';
    
        var input = document.createElement('input');
        if (atributos[i] == "PrazoDevolucao") {
            input.setAttribute('type', 'date');
        } else {
            input.setAttribute('type', 'text');
        }
    
        var inputId = atributos[i] + 'Input'; // Criando um ID baseado no nome do atributo
        input.setAttribute('id', inputId); // Definindo o ID do input
        input.setAttribute('name', atributos[i].toLowerCase());
        input.style.marginBottom = '10px'; // Adicione margem inferior para separar os campos
    
        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(document.createElement('br'));
    }
    

    var submitButton = document.createElement('button');

    submitButton.textContent = 'Cadastrar';
    submitButton.style.backgroundColor = 'blue'; // Mudar a cor de fundo
    submitButton.style.color = 'white'; // Mudar a cor do texto
    submitButton.style.border = 'none'; // Remover a borda
    submitButton.style.padding = '5px 10px'; // Adicionar espaçamento interno

    // Adicionar evento ao botão
    submitButton.addEventListener('click', function(event) {
        var formData = {};

        for (var i = 0; i < atributos.length; i++) {
            var inputName = atributos[i].toLowerCase();
            formData[inputName] = document.getElementsByName(inputName)[0].value;
        }

        console.log('isUpdate', isUpdate)
        if(isUpdate){
            formData.id = idEntidade;
            updateEntidade(tipoCadastro, formData);
        }else{
            createEntidade(tipoCadastro, formData);
        }

        
        event.preventDefault();
    });

    form.appendChild(submitButton);

    container.appendChild(form);

}

function updateEntidade(tipoCadastro, formData){
    let url = "http://localhost:8080/WEB-02/";
    let controller;
    
    if (tipoCadastro == 'ator') {
        controller = "AtorController/atualizar"
    } else if (tipoCadastro == 'diretor') {
        controller = "DiretorController/atualizar";
    } else if (tipoCadastro == 'classe') {
        controller = "ClasseController/atualizar"
    }

    fetch(url + controller, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert('Editado com sucesso!');
        if(tipoCadastro == 'ator'){
            atores = data;
        }
        if(tipoCadastro == 'classe'){
            classes = data;
        }
        
        isUpdate = false;
        idEntidade = null;
        limparInputs(tipoCadastro);
        createTables(tipoCadastro);
    })
    .catch(error => {
        
    });
}

function createEntidade(tipoCadastro, formData){
    let url = "http://localhost:8080/WEB-02/";
    let controller;
    
    if (tipoCadastro == 'ator') {
        controller = "AtorController/cadastrar"
    } else if (tipoCadastro == 'diretor') {
        controller = "DiretorController/cadastrar";
    } else if (tipoCadastro == 'classe') {
        controller = "ClasseController/cadastrar"
    }

    if(tipoCadastro == 'classe'){
        var date = new Date(formData.prazodevolucao);
        var timestamp = date.getTime();
        formData.prazodevolucao = timestamp;
        formData.id = null;
    }

    fetch(url + controller, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        alert('Cadastrado realizado com sucesso!');
        if(tipoCadastro == 'ator'){
            atores = data;
        }
        if(tipoCadastro == 'classe'){
            classes = data;
        }
       
        limparInputs(tipoCadastro);
        createTables(tipoCadastro);
    }).then(resp => {
        
    })
    .catch(error => {
        
    });

}
