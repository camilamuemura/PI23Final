1.	Pré-requisitos:
Certifique-se de que seus colegas tenham o Python instalado em seus PCs. O Django requer o Python para funcionar corretamente. Eles podem baixar a versão mais recente do Python no site oficial (https://www.python.org) e seguir as instruções de instalação.

2.	Clonar o projeto:
Peça aos seus colegas para fazer o download do código-fonte do projeto Django. Eles podem clonar o repositório Git do projeto usando o comando a seguir no terminal ou prompt de comando:
  git clone https://github.com/camilamuemura/PI23Final

3.	Ambiente virtual:
É altamente recomendável que eles criem um ambiente virtual para isolar as dependências do projeto. Dentro da pasta do projeto, peça a eles para executar o seguinte comando para criar o ambiente virtual:
python -m venv pi_env


Em seguida, eles devem ativar o ambiente virtual. No Windows, o comando é:

pi_env\Scripts\activate


No macOS e Linux, o comando é:

source pi_env/bin/activate

4.	Instalar dependências:
Agora, dentro do ambiente virtual, peça a eles para instalar as dependências do projeto Django. Eles podem fazer isso executando o seguinte comando na pasta raiz do projeto (onde está localizado o arquivo “requirements.txt”):
pip install -r requirements.txt


Configurar o banco de dados:
Se o projeto Django estiver usando um banco de dados, peça a eles para configurar as informações do banco de dados no arquivo de configuração apropriado (geralmente o arquivo "settings.py"). Eles devem fornecer as credenciais corretas (nome do banco de dados, usuário, senha, host, etc.) de acordo com a configuração do banco de dados que eles têm em seus PCs.
**Não estamos usando o BD, então pode até substituir o trecho de DATABASES do código no arquivo settings.py por este se estiver dando problema:

DATABASES = {
    'default': {
        'ENGINE': '',
        'NAME': '',
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
    }
}
•  Aplicar migrações:
•	Em seguida, peça a eles para aplicar as migrações do Django para criar as tabelas necessárias no banco de dados. Eles podem fazer isso executando o seguinte comando na pasta raiz do projeto:
•	•  
•	python manage.py migrate
5.	Executar o servidor:
Agora, eles estão prontos para executar o servidor Django. Peça a eles para executar o seguinte comando:
python manage.py runserver
Isso iniciará o servidor de desenvolvimento do Django, que estará disponível no endereço local http://localhost:8000
