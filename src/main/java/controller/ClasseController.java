package controller;

import application.HibernateGenericApplication;
import model.Ator;
import model.Classe;

import java.util.Date;
import java.util.List;

public class ClasseController {
    HibernateGenericApplication<Classe> hibernate;

    public ClasseController() {
        hibernate = new HibernateGenericApplication<Classe>(Classe.class);
    }

    public void cadastrarClasse(String nome, Double valor, Date prazoDevolucao) {
        Classe classe = new Classe(nome, valor, prazoDevolucao);
        hibernate.create(classe);
    }

    public List<Classe> listarClasses() {
        return hibernate.listAll();
    }

    public void excluirClasse(int id) {
        Classe classeParaExcluir = hibernate.read(id);
        if (classeParaExcluir != null) {
            hibernate.delete(id);
        }
    }

    public void editarClasse(int id, String novoNome, Double valor, Date prazoDevolucao) {
        Classe classe = hibernate.read(id);
        if (classe != null) {
            classe.setNome(novoNome);
            classe.setValor(valor);
            classe.setPrazoDevolucao(prazoDevolucao);
            hibernate.update(classe);
        }
    }

    public Classe pesquisarClasse(int id) {
        return hibernate.read(id);
    }
}
