package application;

import model.Ator;

import java.util.List;

public class AtorApplication {
    HibernateGenericApplication<Ator> hibernate;

    public AtorApplication() {
        hibernate = new HibernateGenericApplication<Ator>(Ator.class);
    }

    public void cadastrarAtor(String nome) {
        Ator novoAtor = new Ator(nome);
        hibernate.create(novoAtor);
    }

    public List<Ator> listarAtores() {
        return hibernate.listAll();
    }

    public void excluirAtor(int id) {
        Ator atorParaExcluir = hibernate.read(id);
        if (atorParaExcluir != null) {
            hibernate.delete(id);
        }
    }

    public void editarAtor(int id, String novoNome) {
        Ator atorParaEditar = hibernate.read(id);
        if (atorParaEditar != null) {
            atorParaEditar.setNome(novoNome);
            hibernate.update(atorParaEditar);
        }
    }

    public Ator pesquisarAtor(int id) {
        return hibernate.read(id);
    }
}
