INSERT INTO usuarios (id, nome, sobrenome, email, cpf, senha, nivel_acesso, status_usuario)
VALUES (1, 'Admin', 'Sistema', 'admin@ecosy.com', '99988877700', '123', 'GESTOR', 'ATIVO'),
		(2, 'Tecnico', 'Sistema', 'tecnico@ecosy.com', '56584562025', '123', 'GESTOR', 'ATIVO');

INSERT INTO endereco (id_endereco, rua, cidade, estado, cep)
VALUES (1, 'Sede do IPA', 'Recife', 'PE', '50000-000');

INSERT INTO beneficiarios (id, nome, cpf, telefone, status, associacao, endereco_id, tecnico_reponsavel_id)
VALUES (1, 'Agricultor de Teste', '11122233344', '81999999999', 'ATIVO', 'Assoc. Rural', 1, 1);