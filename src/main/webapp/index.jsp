
<!DOCTYPE html>

<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="index.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@500;600&family=Poppins:wght@600&display=swap" rel="stylesheet">
  <script src="index.js"></script>
  <title>Locadora</title>
</head>
<body>

  <nav class="navbar">
    <div class="logo">
        <img style="width: 50px;height: 50px;" src="img/locadora-icone.png" alt="Logo">
      </div>
    <ul class="nav-list">
        <li class="nav-item has-submenu">
    	<a href="#">Cadastros</a>
		    <ul class="submenu">
		        <li><a href="#" onclick="construirTelaDecadastros('ator'); return false;">Ator</a></li>
		        <li><a href="#" onclick="construirTelaDecadastros('classe'); return false;">Classe</a></li>
		        <li><a href="#" onclick="construirTelaDecadastros('diretor'); return false;">Diretor</a></li>
		        <li><a href="#" onclick="construirTelaDecadastros('item'); return false;">Item</a></li>
		    </ul>
		</li>


      <li class="nav-item"><a href="#">Consultas</a></li>
      <li class="nav-item"><a href="#">Controle de Acervo</a></li>
      <li class="nav-item"><a href="main">Atendimento ao Cliente</a></li>
    </ul>
  </nav>


  <section class="mlr-3">
  	<div id="cadastroContainer" class="pt-1">
  	</div>

  	<div id="table-container"></div>
  </section>


</body>
</html>