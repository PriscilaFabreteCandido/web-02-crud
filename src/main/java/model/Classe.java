package model;


import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Date;

@Entity
public class Classe implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nome", length = 250, nullable = true)
    private String nome;

    @Column(name = "valor", length = 250, nullable = true)
    private Double valor;

    @Temporal(TemporalType.DATE)
    private Date prazoDevolucao;

    public Classe() {

    }

    public Classe(String nome, Double valor, Date prazoDevolucao) {
        this.nome = nome;
        this.valor = valor;
        this.prazoDevolucao = prazoDevolucao;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Date getPrazoDevolucao() {
        return prazoDevolucao;
    }

    public void setPrazoDevolucao(Date prazoDevolucao) {
        this.prazoDevolucao = prazoDevolucao;
    }
}


