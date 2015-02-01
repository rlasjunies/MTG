# jwt-server

//TODO
expiration of the token
user management: to delete, activate, reactivate users
please "login ..." while waiting the google, facebook, local server answer

bugs:
 - several users are created when using google account, no profile.id is inserted 
 - reading the jobs values from the database does not work

tests:
- finalize the api tests with authentication
- finalize tests e2e

## Mongodb

* open cmd window 
* copy paste the following command line

"c:\program files\MongoDB 2.6 Standard\bin\mongod" --dbpath C:\Dev\mongodb --repair
"c:\program files\MongoDB 2.6 Standard\bin\mongod" --dbpath C:\Dev\mongodb --rest

MongoDB commands lines:

//Start the mongo console

"c:\program files\MongoDB 2.6 Standard\bin\mongo"  

show dbs   //shows the database avaialable

use psJWT // switch to the good database

db.users.find()  // list documents of the users collection

db.users.remove({}); // remove all the documents in the collection users  

show collections

Format email using zurb.inliner

## Tests

### Mocha

    at the root of the project run the 'mocha' command it will launch the tests

### Karma

    start selenium by: 'webdriver-manager start'
    in another cmd line, move to the folder 'test-app' and start the file 'run.bat' (it's doing 'protractor _config.js')

Issues installing protractor:

webdriver-manager --ie update
install IE 11 webdriver .... 
	http://www.microsoft.com/en-us/download/details.aspx?id=44069
	http://msdn.microsoft.com/en-us/library/ie/dn800898%28v=vs.85%29.aspx

	Required Configuration

    The IEDriverServer exectuable must be downloaded and placed in your PATH.
    On IE 7 or higher on Windows Vista or Windows 7, you must set the Protected Mode settings for each zone to be the same value. The value can be on or off, as long as it is the same for every zone. To set the Protected Mode settings, choose "Internet Options..." from the Tools menu, and click on the Security tab. For each zone, there will be a check box at the bottom of the tab labeled "Enable Protected Mode".
    Additionally, "Enhanced Protected Mode" must be disabled for IE 10 and higher. This option is found in the Advanced tab of the Internet Options dialog.
    The browser zoom level must be set to 100% so that the native mouse events can be set to the correct coordinates.
    For IE 11 only, you will need to set a registry entry on the target computer so that the driver can maintain a connection to the instance of Internet Explorer it creates. For 32-bit Windows installations, the key you must examine in the registry editor is HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet Explorer\Main\FeatureControl\FEATURE_BFCACHE. For 64-bit Windows installations, the key is HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\Internet Explorer\Main\FeatureControl\FEATURE_BFCACHE. Please note that the FEATURE_BFCACHE subkey may or may not be present, and should be created if it is not present. Important: Inside this key, create a DWORD value named iexplore.exe with the value of 0. 

### Continous integration

install heroku toolbelt

we need git install.
> git init

heroku login

heroku create

git init

git remote add github https://github.com/rlasjunies/pluralsight-ci.git

git push heroku master // to push the source code to heroku

git push -u github master

heroku ps:scale web=1

https://afternoon-everglades-8738.herokuapp.com/


HTTP Verb       Path                Module Method       Description
GET             /users              index               Lists users
//GET             /users/new          new                 The form to create a newuser
POST            /users              create              Processes new user form submission
GET             /users/:id          show                Shows user with ID :id
//GET             /users/:id/edit     edit                Form to edit user with ID :id
PUT             /users/:id          update              Processes user edit form submission
DELETE          /users/:id          destroy             Deletes user with ID :id

#Debug Mocha tests

C:\Users\Richard\AppData\Roaming\npm\node_modules\mocha\bin\mocha "C:\Dev\seedTS\seedTSServer\test-api\**\*-specs.js"


#Google App ID
https://developers.google.com/
https://console.developers.google.com/project


#Facebook App ID
https://developers.facebook.com/apps/

#Git command line

## define as not change some files or path
git update-index --assume-unchanged path/to/file


## remove the flag assume-unchanged
git update-index --no-assume-unchanged path/to/file