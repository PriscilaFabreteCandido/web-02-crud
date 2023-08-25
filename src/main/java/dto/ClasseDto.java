package dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import model.UnixTimestampDeserializer;

import java.util.Date;

public class ClasseDto {
    private int id;
    private String nome;

    private Double valor;
    @JsonDeserialize(using = UnixTimestampDeserializer.class)
    private Date prazodevolucao;

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

    public ClasseDto(int id, String nome, Double valor, Date prazoDevolucao) {
        this.id = id;
        this.nome = nome;
        this.valor = valor;
        this.prazodevolucao = prazoDevolucao;
    }

    public ClasseDto() {

    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Date getPrazoDevolucao() {
        return prazodevolucao;
    }

    public void setPrazoDevolucao(Date prazoDevolucao) {
        this.prazodevolucao = prazoDevolucao;
    }
}
