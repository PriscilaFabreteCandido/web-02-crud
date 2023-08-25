package controller;

import application.ClasseApplication;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import dto.ClasseDto;
import model.Ator;
import model.Classe;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet(urlPatterns = {"/ClasseController/listar", "/ClasseController/cadastrar", "/ClasseController/deletar", "/ClasseController/atualizar"})
public class ClasseController extends HttpServlet {

    private static final long serialVersionUID = 2L;

    ClasseApplication classeApplication;

    public ClasseController() {
        super();
        classeApplication = new ClasseApplication();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Classe> listaClasses = classeApplication.listarClasses();
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);

        response.setContentType("application/json");

        PrintWriter out = response.getWriter();
        objectMapper.writeValue(out, listaClasses);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BufferedReader reader = request.getReader();
        StringBuilder body = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            body.append(line);
        }

        ObjectMapper objectMapper = new ObjectMapper();
        ClasseDto classeRequestBody = objectMapper.readValue(body.toString(), ClasseDto.class);

        this.classeApplication.cadastrarClasse(classeRequestBody.getNome(), classeRequestBody.getValor(), classeRequestBody.getPrazoDevolucao());

        // Configuração do ObjectMapper para a serialização em JSON
        List<Classe> listaClasses = classeApplication.listarClasses();
        objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);

        // Define o tipo de conteúdo da resposta como JSON
        response.setContentType("application/json");

        // Escreve o JSON na resposta
        PrintWriter out = response.getWriter();
        objectMapper.writeValue(out, listaClasses);
    }

    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Implementação semelhante ao método doPost, mas para atualização
        // ...
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Implementação semelhante ao método doPost, mas para exclusão
        // ...
    }

    // Os demais métodos como doHead permanecem vazios ou não implementados
}
