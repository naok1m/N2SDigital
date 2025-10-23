<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Verificar se é uma requisição POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit;
}

// Função para sanitizar dados
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Função para validar email
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Função para validar telefone brasileiro
function validatePhone($phone) {
    $phone = preg_replace('/[^0-9]/', '', $phone);
    return strlen($phone) >= 10 && strlen($phone) <= 11;
}

try {
    // Verificar se todos os campos obrigatórios estão presentes
    $requiredFields = ['nome', 'email', 'mensagem'];
    foreach ($requiredFields as $field) {
        if (!isset($_POST[$field]) || empty(trim($_POST[$field]))) {
            throw new Exception("Campo obrigatório '{$field}' não foi preenchido.");
        }
    }

    // Coletar e sanitizar dados do formulário
    $nome = sanitizeInput($_POST['nome']);
    $email = sanitizeInput($_POST['email']);
    $empresa = isset($_POST['empresa']) ? sanitizeInput($_POST['empresa']) : '';
    $telefone = isset($_POST['telefone']) ? sanitizeInput($_POST['telefone']) : '';
    $servico = isset($_POST['servico']) ? sanitizeInput($_POST['servico']) : '';
    $mensagem = sanitizeInput($_POST['mensagem']);

    // Validações
    if (!validateEmail($email)) {
        throw new Exception('Email inválido.');
    }

    if (!empty($telefone) && !validatePhone($telefone)) {
        throw new Exception('Telefone inválido.');
    }

    if (strlen($nome) < 2) {
        throw new Exception('Nome deve ter pelo menos 2 caracteres.');
    }

    if (strlen($mensagem) < 10) {
        throw new Exception('Mensagem deve ter pelo menos 10 caracteres.');
    }

    // Configurações do email
    $to = 'contato@n2sgroup.com.br';
    $subject = 'Nova mensagem de contato - N2S Group';
    
    // Corpo do email
    $emailBody = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #9c53e3, #a855f7); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #9c53e3; }
            .value { margin-top: 5px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Nova Mensagem de Contato - N2S Group</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Nome:</div>
                    <div class='value'>{$nome}</div>
                </div>
                
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>{$email}</div>
                </div>
                
                " . (!empty($empresa) ? "
                <div class='field'>
                    <div class='label'>Empresa:</div>
                    <div class='value'>{$empresa}</div>
                </div>
                " : "") . "
                
                " . (!empty($telefone) ? "
                <div class='field'>
                    <div class='label'>Telefone:</div>
                    <div class='value'>{$telefone}</div>
                </div>
                " : "") . "
                
                " . (!empty($servico) ? "
                <div class='field'>
                    <div class='label'>Serviço de interesse:</div>
                    <div class='value'>{$servico}</div>
                </div>
                " : "") . "
                
                <div class='field'>
                    <div class='label'>Mensagem:</div>
                    <div class='value'>" . nl2br($mensagem) . "</div>
                </div>
                
                <div class='footer'>
                    <p>Esta mensagem foi enviada através do formulário de contato do site n2sgroup.com.br</p>
                    <p>Data: " . date('d/m/Y H:i:s') . "</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";

    // Headers do email
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: N2S Group <noreply@n2sgroup.com.br>',
        'Reply-To: ' . $nome . ' <' . $email . '>',
        'X-Mailer: PHP/' . phpversion()
    ];

    // Enviar email
    $mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));

    if ($mailSent) {
        // Log da mensagem (opcional)
        $logEntry = date('Y-m-d H:i:s') . " - Mensagem de {$nome} ({$email}) enviada com sucesso\n";
        file_put_contents('contact_logs.txt', $logEntry, FILE_APPEND | LOCK_EX);
        
        echo json_encode([
            'success' => true,
            'message' => 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
        ]);
    } else {
        throw new Exception('Erro ao enviar email. Tente novamente.');
    }

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
