📝 Projeto Lista-tarefas

📌 Sobre
O "Lista-tarefas" é um aplicativo full-stack de lista de tarefas que demonstra minhas habilidades em desenvolvimento web completo. Ele permite:

🔹 Criar, visualizar, atualizar e excluir tarefas com título, descrição e status.
🔹 Interface intuitiva com atualizações dinâmicas e em tempo real da lista de tarefas.

🛠 Tecnologias Utilizadas
🐍 Python -> 	Linguagem principal do backend
🚀 Django REST Framework -> 	Desenvolvimento da API RESTful
🗄 SQLite3 -> Armazenamento de dados
🌐 HTML	-> Estrutura da interface do usuário
🎨 CSS	-> Estilização da interface
💡 JavaScript -> Interatividade dinâmica e consumo da API
🔒 CSRF token	-> Segurança para requisições do Django
🌲 GIT -> Controle de versão com commits organizados


## 📥 Instalação

git clone https://github.com/ErickIgles/lista-tarefas.git
cd lista-tarefas
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
