# mymelonapp 
The project was made for Heroku cloud platform as a service (PaaS) and on Ubuntu 18.04 was used for development. 
## How to Install PostgreSQL on Ubuntu 18.04
Visit the site [Ubuntu documentation for PostgreSQL](https://help.ubuntu.com/lts/serverguide/postgresql.html) or [linuxize.com](https://linuxize.com/post/how-to-install-postgresql-on-ubuntu-18-04/) for more information.
##  Creating PostgreSQL Role and Database
Connect to PostgreSQL:
```
[sudo] password for ubuntuuser: 
psql (10.12 (Ubuntu 10.12-0ubuntu0.18.04.1))
Type "help" for help.

postgres=# 
```
Required commands to create database, users, passwords and grant all privileges to the database.
CREATE DATABASE yourdbname;
CREATE USER youruser WITH ENCRYPTED PASSWORD 'yourpass';
GRANT ALL PRIVILEGES ON DATABASE yourdbname TO youruser;
```
postgres=# CREATE DATABASE melon;
CREATE DATABASE melon
postgres=# CREATE USER melon WITH ENCRYPTED PASSWORD 'melonpassword';
CREATE ROLE
postgres=# GRANT ALL PRIVILEGES ON DATABASE melon TO melon;
GRANT
postgres=# \q
postgres=# GRANT ALL PRIVILEGES ON DATABASE melon TO melon;
GRANT
postgres=# 
$ 
```
## How to install an app
An example was done on Ubuntu

### Cloning a repository
```
$ git clone git@github.com:pingvin65/mymelonapp.git
$ cd mymelonapp
```
### Creating and activation virtual environments
The directory listing should be listed below
```
$ ls -gnG
total 788
-rw-r--r-- 1  71465 Feb 22 18:27 contact.csv
-rw-r--r-- 1 194977 Feb 22 18:27 contact.json
-rw-r--r-- 1 189421 Feb 22 18:27 contact.sql
-rw-r--r-- 1 190962 Feb 22 18:27 db.json
-rw-r--r-- 1 124549 Feb 22 18:27 dump.sql
-rwxr-xr-x 1    625 Feb 22 18:27 manage.py
drwxr-xr-x 5   4096 Feb 22 18:27 melon
drwxr-xr-x 4   4096 Feb 22 18:27 melonfront
-rw-r--r-- 1     37 Feb 22 18:27 Procfile
-rw-r--r-- 1     21 Feb 22 18:27 README.md
-rw-r--r-- 1    267 Feb 22 18:27 requirements.txt
```
**Creating virtual environments**
```
python3 -m venv env
```
re-listing directories should show a new folder **env**
```
$ ls -gnG
total 792
-rw-r--r-- 1  71465 Feb 22 18:27 contact.csv
-rw-r--r-- 1 194977 Feb 22 18:27 contact.json
-rw-r--r-- 1 189421 Feb 22 18:27 contact.sql
-rw-r--r-- 1 190962 Feb 22 18:27 db.json
-rw-r--r-- 1 124549 Feb 22 18:27 dump.sql
drwxr-xr-x 6   4096 Feb 22 19:11 env
-rwxr-xr-x 1    625 Feb 22 18:27 manage.py
drwxr-xr-x 5   4096 Feb 22 18:27 melon
drwxr-xr-x 4   4096 Feb 22 18:27 melonfront
-rw-r--r-- 1     37 Feb 22 18:27 Procfile
-rw-r--r-- 1     21 Feb 22 18:27 README.md
-rw-r--r-- 1    267 Feb 22 18:27 requirements.txt
$ 
```
**activation virtual environment**
```
$ source env/bin/activate
(env) $ 
```
The "**deactivate**" command is used to deactivate the virtual environment.

### Installing a python package for a project
```
 (env) $ pip install -r requirements.txt
 ```
 Print should be similar as this below
 ```
 Collecting asgiref==3.2.3 (from -r requirements.txt (line 1))
  Using cached https://files.pythonhosted.org/packages/a5/cb/5a235b605a9753ebcb2730c75e610fb51c8cab3f01230080a8229fa36adb/asgiref-3.2.3-py2.py3-none-any.whl
Collecting dj-database-url==0.5.0 (from -r requirements.txt (line 2))
  Using cached https://files.pythonhosted.org/packages/d4/a6/4b8578c1848690d0c307c7c0596af2077536c9ef2a04d42b00fabaa7e49d/dj_database_url-0.5.0-py2.py3-none-any.whl
Collecting Django==3.0.3 (from -r requirements.txt (line 3))
  Using cached https://files.pythonhosted.org/packages/c6/b7/63d23df1e311ca0d90f41352a9efe7389ba353df95deea5676652e615420/Django-3.0.3-py3-none-any.whl
Collecting django-cors-headers==3.2.1 (from -r requirements.txt (line 4))
  Using cached https://files.pythonhosted.org/packages/19/4e/dd037bf42cc33d1d61e45b973507303afad14fc18bd36329ec8ab3673373/django_cors_headers-3.2.1-py3-none-any.whl
Collecting django-heroku==0.3.1 (from -r requirements.txt (line 5))
  Using cached https://files.pythonhosted.org/packages/59/af/5475a876c5addd5a3494db47d9f7be93cc14d3a7603542b194572791b6c6/django_heroku-0.3.1-py2.py3-none-any.whl
Collecting django-phone-field==1.8.0 (from -r requirements.txt (line 6))
  Using cached https://files.pythonhosted.org/packages/b3/0f/56374a84bca1cf9f4d089258716bc519f436370e7e661b4012e6cbea7233/django_phone_field-1.8.0-py3-none-any.whl
Collecting djangorestframework==3.11.0 (from -r requirements.txt (line 7))
  Using cached https://files.pythonhosted.org/packages/be/5b/9bbde4395a1074d528d6d9e0cc161d3b99bd9d0b2b558ca919ffaa2e0068/djangorestframework-3.11.0-py3-none-any.whl
Collecting export==0.1.2 (from -r requirements.txt (line 8))
  Using cached https://files.pythonhosted.org/packages/39/ab/83cf435889ab2cfdfaee388205219125de58c2eee083d23d94c65ca84acf/export-0.1.2-py2.py3-none-any.whl
Collecting gunicorn==20.0.4 (from -r requirements.txt (line 9))
  Using cached https://files.pythonhosted.org/packages/69/ca/926f7cd3a2014b16870086b2d0fdc84a9e49473c68a8dff8b57f7c156f43/gunicorn-20.0.4-py2.py3-none-any.whl
Collecting psycopg2==2.8.4 (from -r requirements.txt (line 10))
  Using cached https://files.pythonhosted.org/packages/84/d7/6a93c99b5ba4d4d22daa3928b983cec66df4536ca50b22ce5dcac65e4e71/psycopg2-2.8.4.tar.gz
Collecting pytz==2019.3 (from -r requirements.txt (line 11))
  Using cached https://files.pythonhosted.org/packages/e7/f9/f0b53f88060247251bf481fa6ea62cd0d25bf1b11a87888e53ce5b7c8ad2/pytz-2019.3-py2.py3-none-any.whl
Collecting sqlparse==0.3.0 (from -r requirements.txt (line 12))
  Using cached https://files.pythonhosted.org/packages/ef/53/900f7d2a54557c6a37886585a91336520e5539e3ae2423ff1102daf4f3a7/sqlparse-0.3.0-py2.py3-none-any.whl
Collecting whitenoise==5.0.1 (from -r requirements.txt (line 13))
  Using cached https://files.pythonhosted.org/packages/ae/25/0c8f08c9d3c93192cd286594f1e87b17bab496fb9082c2a69e17051b91fd/whitenoise-5.0.1-py2.py3-none-any.whl
Requirement already satisfied: setuptools>=3.0 in ./env/lib/python3.6/site-packages (from gunicorn==20.0.4->-r requirements.txt (line 9))
Building wheels for collected packages: psycopg2
  Running setup.py bdist_wheel for psycopg2 ... error
  Complete output from command /home/pingvin/Documents/melon-project/mymelonapp/env/bin/python3 -u -c "import setuptools, tokenize;__file__='/tmp/pip-build-o0037l22/psycopg2/setup.py';f=getattr(tokenize, 'open', open)(__file__);code=f.read().replace('\r\n', '\n');f.close();exec(compile(code, __file__, 'exec'))" bdist_wheel -d /tmp/tmpmh17yb_fpip-wheel- --python-tag cp36:
  usage: -c [global_opts] cmd1 [cmd1_opts] [cmd2 [cmd2_opts] ...]
     or: -c --help [cmd1 cmd2 ...]
     or: -c --help-commands
     or: -c cmd --help
  
  error: invalid command 'bdist_wheel'
  
  ----------------------------------------
  Failed building wheel for psycopg2
  Running setup.py clean for psycopg2
Failed to build psycopg2
Installing collected packages: asgiref, dj-database-url, sqlparse, pytz, Django, django-cors-headers, whitenoise, psycopg2, django-heroku, django-phone-field, djangorestframework, export, gunicorn
  Running setup.py install for psycopg2 ... done
Successfully installed Django-3.0.3 asgiref-3.2.3 dj-database-url-0.5.0 django-cors-headers-3.2.1 django-heroku-0.3.1 django-phone-field-1.8.0 djangorestframework-3.11.0 export-0.1.2 gunicorn-20.0.4 psycopg2-2.8.4 pytz-2019.3 sqlparse-0.3.0 whitenoise-5.0.1
(env) $ 
```
But if the printout ends with an error message then you should read the message and find the solution online.
### Edit `.bash_profile` or `settings.py`
I used .profile on Ubuntu (on other linux distributions, Mac OS is .bash_profile)
Use your database name, username, password, secret key, IP or DB server name and port number.

Generate SECRET_KEY
```
(env) $ python3
Python 3.6.9 (default, Nov  7 2019, 10:44:02) 
[GCC 8.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import secrets
>>> secrets.token_hex(24)
'd51bda6251eecf399ef8b4aa0c2421899e9891cd293802cb'
>>> exit()
(env) $
```
SECRET_KEY is 'd51bda6251eecf399ef8b4aa0c2421899e9891cd293802cb'

I added to the bottom of the .profile file or if you use .bash_profile
```
# Added for melon 
export MELON_DEBUG=True
export MELON_DBNAME="melon"
export MELON_DBUSER="melon"
export MELON_DBPASSWORD="melonpassword"
export MELON_DBHOST="localhost"
export MELON_DBPORT=""
export MELON_SECRET_KEY="d51bda6251eecf399ef8b4aa0c2421899e9891cd293802cb"
```
or edit django settings.py with nano, gedit, VS Code or other.
```
(env) $ nano melon/settings.py
```
it is necessary to change the file /path/to/mymelonapp/melon/settings.py

 - SECRET_KEY = os.environ.get('MELON_SECRET_KEY') to **SECRET_KEY = "d51bda6251eecf399ef8b4aa0c2421899e9891cd293802cb"**
 - DEBUG = os.environ.get('MELON_DEBUG') to **DEBUG = True**
 - in section
    DATABASES = {
        'default': {
                'ENGINE': 'django.db.backends.postgresql_psycopg2',
                'NAME': os.environ.get('MELON_DBNAME'),
                'USER': os.environ.get('MELON_DBUSER'),
                'PASSWORD': os.environ.get('MELON_DBPASSWORD'),
                'HOST': os.environ.get('MELON_DBHOST'),
                'PORT': os.environ.get('MELON_DBPORT'),
        }
    }
    to 
        DATABASES = {
        'default': {
                'ENGINE': 'django.db.backends.postgresql_psycopg2',
                **'NAME': 'melon',
                'USER': 'melon',
                'PASSWORD': 'melonpassword',
                'HOST': 'localhost',
                'PORT': '',**
        }
    }
### Creating tables and Super User
**Creating tables**
```
$ ./manage.py migrate
2020-02-23 01:07:01,007:melon.settings: DEBUG is True
Operations to perform:
  Apply all migrations: admin, auth, authtoken, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying admin.0003_logentry_add_action_flag_choices... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying auth.0010_alter_group_name_max_length... OK
  Applying auth.0011_update_proxy_permissions... OK
  Applying authtoken.0001_initial... OK
  Applying authtoken.0002_auto_20160226_1747... OK
  Applying sessions.0001_initial... OK
(env) $ 
```
and **Super User**
```
(env) $ ./manage.py createsuperuser
2020-02-23 01:13:22,670:melon.settings: DEBUG is True
Username (leave blank to use 'pingvin'): admin
Email address: 
Password: 
Password (again): 
Superuser created successfully.
(env) $ 
```
Email can be empty
### Run server
```
(env) $ ./manage.py runserver
2020-02-23 01:21:40,903:melon.settings: DEBUG is True
2020-02-23 06:21:41,200:melon.settings: DEBUG is True
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
February 23, 2020 - 06:21:41
Django version 3.0.3, using settings 'melon.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```
You will get this message in web browser if you open the link http://127.0.0.1:8000/

This URL is only used when you have built the production version of the app. Visit http://localhost:3000/ instead, or run `yarn run build` to test the production version.

The reason is that Front end in React was not initiated and no production version was created in the build folder.
but if you run command
```
curl --header "Content-Type: application/json" --request POST --data '{"username":"admin", "password":"admin24admin"}' http://127.0.0.1:8000/api/v1/api-token-auth/
```
You should get your token
```
{"token":"b8d41dbf163d488899e7ccc57b8ad3ca4947e9c1"}
```
### Creating a contact table in a database
```
(env) $ ./manage.py makemigrations contact
2020-02-23 02:45:10,618:melon.settings: DEBUG is True
Migrations for 'contact':
  melon/contact/migrations/0001_initial.py
    - Create model Contact
(env) $ ./manage.py migrate
2020-02-23 02:45:22,946:melon.settings: DEBUG is True
Operations to perform:
  Apply all migrations: admin, auth, authtoken, contact, contenttypes, sessions
Running migrations:
  Applying contact.0001_initial... OK
(env) $ 
```
### Inset in the table contact data from `contact.json`
```
(env) $ ./manage.py loaddata contact.json 
2020-02-23 02:45:28,613:melon.settings: DEBUG is True
Installed 1000 object(s) from 1 fixture(s)
(env) $ 
```
[Continued from Front end](melonfront/README.md)

##  When you have built react portion of APP 
Run the command in the root directory where the manage.py Python script is located.
```
(env) $  ./manage.py collectstatic
2020-02-23 04:41:57,383:melon.settings: DEBUG is True

178 static files copied to '/home/pingvin/Documents/melon-project/mymelonapp/staticfiles', 552 post-processed.
(env) $
```

# Install React part of project
```
(env) $ cd melonfront
(env) $ npm install

> core-js@2.6.11 postinstall /home/pingvin/Documents/github/mymelonapp/melon/melonfront/node_modules/babel-runtime/node_modules/core-js
> node -e "try{require('./postinstall')}catch(e){}"

Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!

The project needs your help! Please consider supporting of core-js on Open Collective or Patreon: 
> https://opencollective.com/core-js 
> https://www.patreon.com/zloirock 

Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)


> core-js@3.6.4 postinstall /home/pingvin/Documents/github/mymelonapp/melon/melonfront/node_modules/core-js
> node -e "try{require('./postinstall')}catch(e){}"


> core-js-pure@3.6.4 postinstall /home/pingvin/Documents/github/mymelonapp/melon/melonfront/node_modules/core-js-pure
> node -e "try{require('./postinstall')}catch(e){}"

npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.11 (node_modules/webpack-dev-server/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.11: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.11 (node_modules/watchpack/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.11: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.11 (node_modules/jest-haste-map/node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.11: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.1.2 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

added 1622 packages from 801 contributors and audited 909237 packages in 20.151s

44 packages are looking for funding
  run `npm fund` for details

found 2 low severity vulnerabilities
  run `npm audit fix` to fix them, or `npm audit` for details
pingvin@pingvin:~/Documents/github/mymelonapp/melon/melonfront$ 
```
if you have message **found x low severity vulnerabilities** 
run 
```
(env) $ npm audit fix
```
### Runs the app in the development mode.
```
(env) $ npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### Builds the app for production
```
(env) $ npm run build
```

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

### Back to root directory
```
(env) $ cd ../
```
## Build the App into one complete unit
### The staticfiles app
```
(env) $ ./manage.py collectstatic
```
Now we can finally launch the app as one complete unit.
```
(env) $ ./manage.py runserver
```


