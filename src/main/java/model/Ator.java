package model;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "produtos")
public class Ator implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="nome", length = 250, nullable = true)
    private String nome;

    public Ator() {

    }

    public String getNome() {
        return nome;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Ator(String nome) {
        this.nome= nome;
    }
}