
var item;
var columns = {
	"ator" : ["nome"],
	"diretor": ["nome"],
	"classe" : ['nome', 'valor', 'prazoDevolucao']
}

var atores = [
	{id: 1, nome: "Thalys"},
	{id: 2, nome: "Priscila"},
]
var diretores = [
	{id: 1, nome: "Diretor 1"},
	{id: 2, nome: "Priscila"},
]
var classes = [
	{id: 1, nome: 'Classe 1', valor: 15, prazoDevolucao: '25/10/2023'},
	{id: 2, nome: 'Classe 2', valor: 15, prazoDevolucao: '25/10/2023'},
	{id: 3, nome: 'Classe 2', valor: 15, prazoDevolucao: '25/10/2023'},
];

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

function createTables(tipoTabela) {
    // Dados de exemplo para diferentes entidades
    let entityData;
    console.log('tipoTabela', tipoTabela)
    if(tipoTabela == "ator"){
		entityData = atores;
	}else if(tipoTabela == "diretor"){
		entityData = diretores;
	} else if(tipoTabela = "classe"){
		entityData = classes;
	}

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
    headerCell3.textContent = 'Ações';

    console.log('entityData', entityData)
    entityData.forEach(entity => {
        const row = table.insertRow();
        row.className = 'data-row'; // Add a class for data row styling

        const columnsToDisplay = columns[tipoTabela];
        console.log('columnsToDisplay', columnsToDisplay)
        columnsToDisplay.forEach((column, index) => {
            console.log(column, index )
            const cell = row.insertCell(index);
            console.log('entity[column]', entity[column] )
            cell.textContent = entity[column]; // Use the entity's attribute dynamically
        });

        const editButton = createButton('Editar', 'edit-button', () => {
            console.log(`Editar ${tipoTabela} com ID ${entity.id}`);
            excluir(entity);
        });

        const deleteButton = createButton('Excluir', 'delete-button', () => {
            console.log(`Excluir ${tipoTabela} com ID ${entity.id}`);
            editar(entity);
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

function getUrl(tipoCadastro, formData) {

    return url;
}

function getAllTipoEntidade(tipoEntidade){
    var formData = {};
    if (tipoEntidade == 'ator') {
        formData.action = 'listarAtores';
        controller = "AtorController"
    } else if (tipoEntidade == 'diretor') {
        formData.action = 'cadastrarDiretor';
        controller = "DiretorController";
    } else if (tipoEntidade == 'classe') {
        formData.action = 'cadastrarClasse';
        controller = "ClasseController";
    }

    let url = "http://localhost:8080/acervo_web2/" + controller;
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
            this.atores = data;
        }

        //this.createTables(tipoEntidade);
    })
    .catch(error => {
        //this.createTables(tipoEntidade);
        console.error('Erro na requisição:', error);
    });
}

function construirTelaDecadastros(tipoCadastro) {
    this.createTables(tipoCadastro);
    this.getAllTipoEntidade(tipoCadastro);

    var container = document.getElementById('cadastroContainer');
    container.innerHTML = ''; // Limpar conteúdo anterior

    var atributos = [];

    if (tipoCadastro == 'ator') {
        atributos = ['Nome'];
    } else if (tipoCadastro == 'diretor') {
        atributos = ['Nome'];
    } else if (tipoCadastro == 'classe') {
        atributos = ['Nome', 'Valor', 'PrazoDevolucao'];
    }

    var form = document.createElement('form');
    form.setAttribute('id', 'cadastroForm');

    for (var i = 0; i < atributos.length; i++) {
        var label = document.createElement('label');
        label.textContent = atributos[i] + ': ';

        var input = document.createElement('input');
        if(atributos[i] == "PrazoDevolucao"){
            input.setAttribute('type', 'date');
        }else{
            input.setAttribute('type', 'text');
        }

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
        event.preventDefault();

        for (var i = 0; i < atributos.length; i++) {
            var inputName = atributos[i].toLowerCase();
            formData[inputName] = document.getElementsByName(inputName)[0].value;
        }
        let url = "http://localhost:8080/WEB-02/";
        let controller;
        // Defina o tipo de ação (neste caso, cadastrarAtor) para distinguir a ação no servlet

        if (tipoCadastro == 'ator') {
            formData.action = 'cadastrarAtor';
            controller = "AtorController"
        } else if (tipoCadastro == 'diretor') {
            formData.action = 'cadastrarDiretor';
            controller = "DiretorController";
        } else if (tipoCadastro == 'classe') {
            controller = "ClasseController"
        }

        console.log('formData', formData )
        fetch(url + controller, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta da requisição:', data);
            if (data.message === 'Cadastrado realizado com sucesso!') {
                alert('Cadastrado realizado com sucesso!');
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });

    });

    form.appendChild(submitButton);

    container.appendChild(form);

}

function excluir(entity){
	console.log(entity);
}

function editar(entity){
	console.log(entity);
}


