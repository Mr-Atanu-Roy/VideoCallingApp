## DESCRIPTION
    1. Start video call with many people
    2. Created using django and agora sdk
## Features

- Real time video call on browser
- Show/Hide video
- Mute/Un-mute mic
- Create video calling room with more than one person
## Tech Stack

**Client Side:** HTML, SCSS, TailwindCSS

**Server Side:** Django, Agora SDK


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DEBUG = TRUE`

`SECRET_KEY = 'django-insecure-&l1791mq=l$va&&d+2gg0ync(diqqm@*(hows*84!o^@%b2jh='`

### Agora SDK Credentials
Signup and get the Agora Credentials from the agora official website

`APP_ID  = 'YOUR_APP_ID'`

`APP_CERTIFICATE = 'YOUR_APP_CERTIFICATE'`

## Installation

Create a folder and open terminal and install this project by
command 
```bash
git clone https://github.com/Mr-Atanu-Roy/VideoCallingApp

```
or simply download this project from https://github.com/Mr-Atanu-Roy/VideoCallingApp

In project directory Create a virtual environment(say env)

```bash
  virtualenv env

```
Activate the virtual environment

For windows:
```bash
  env\Script\activate

```
Install dependencies
```bash
  pip install -r requirements.txt

```
To migrate the database run migrations commands
```bash
  py manage.py magemigrations
  py manage.py migrate

```

Create a super user
```bash
  py manage.py createsuperuser

```

To run the project in your localserver
```bash
  py manage.py runserver

```
Then go to http://127.0.0.1:8000 in your browser to see the project

## Author

- [@Mr-Atanu-Roy](https://www.github.com/Mr-Atanu-Roy)

