package controller;

import application.AtorApplication;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import dto.AtorDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import model.Ator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(urlPatterns = {"/AtorController/listar", "/AtorController/cadastrar", "/AtorController/deletar", "/AtorController/atualizar"})
public class AtorController extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    AtorApplication atorApplication;
    public AtorController() {
        super();
        // TODO Auto-generated constructor stub
        atorApplication = new AtorApplication();
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Configuração do ObjectMapper para a serialização em JSON
        List<Ator> listaAtores = atorApplication.listarAtores();
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);

        // Define o tipo de conteúdo da resposta como JSON
        response.setContentType("application/json");

        // Escreve o JSON na resposta
        PrintWriter out = response.getWriter();
        objectMapper.writeValue(out, listaAtores);
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Lê o corpo da solicitação como JSON
        BufferedReader reader = request.getReader();
        StringBuilder body = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            body.append(line);
        }

        // Converte o JSON para um objeto Java usando o ObjectMapper do Jackson
        ObjectMapper objectMapper = new ObjectMapper();
        AtorDto atorRequestBody = objectMapper.readValue(body.toString(), AtorDto.class);

        // Obtém os dados do objeto
        String nome = atorRequestBody.getNome();
        this.atorApplication.cadastrarAtor(nome);

        // Configuração do ObjectMapper para a serialização em JSON
        List<Ator> listaAtores = atorApplication.listarAtores();
        objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);

        // Define o tipo de conteúdo da resposta como JSON
        response.setContentType("application/json");

        // Escreve o JSON na resposta
        PrintWriter out = response.getWriter();
        objectMapper.writeValue(out, listaAtores);
    }

    /**
     * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
     */
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Lê o corpo da solicitação como JSON
        BufferedReader reader = request.getReader();
        StringBuilder body = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            body.append(line);
        }

        // Converte o JSON para um objeto Java usando o ObjectMapper do Jackson
        ObjectMapper objectMapper = new ObjectMapper();
        AtorDto atorRequestBody = objectMapper.readValue(body.toString(), AtorDto.class);

        // Obtém os dados do objeto
        int id = atorRequestBody.getId();
        String nome = atorRequestBody.getNome();
        this.atorApplication.editarAtor(id, nome);

        // Configuração do ObjectMapper para a serialização em JSON
        List<Ator> listaAtores = atorApplication.listarAtores();
        objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);

        // Define o tipo de conteúdo da resposta como JSON
        response.setContentType("application/json");

        // Escreve o JSON na resposta
        PrintWriter out = response.getWriter();
        objectMapper.writeValue(out, listaAtores);
    }

    /**
     * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
     */
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Lê o corpo da solicitação como JSON
        BufferedReader reader = request.getReader();
        StringBuilder body = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            body.append(line);
        }

        // Converte o JSON para um objeto Java usando o ObjectMapper do Jackson
        ObjectMapper objectMapper = new ObjectMapper();
        AtorDto atorRequestBody = objectMapper.readValue(body.toString(), AtorDto.class);

        // Obtém os dados do objeto
        int id = atorRequestBody.getId();
        String nome = atorRequestBody.getNome();

        this.atorApplication.excluirAtor(id);

        // Configura a resposta
        response.setContentType("application/json");
        response.getWriter().write("{\"message\": \"Excluído com sucesso!\"}");
    }

    /**
     * @see HttpServlet#doHead(HttpServletRequest, HttpServletResponse)
     */
    protected void doHead(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
    }

}

