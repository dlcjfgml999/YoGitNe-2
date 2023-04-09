# User
## Signup
- http PUT http://127.0.0.1:8000/signup/
405 error

- http DELETE http://127.0.0.1:8000/signup/
405 error

- http GET http://127.0.0.1:8000/signup/
405 error

- http POST http://127.0.0.1:8000/signup/ username='jjonghu@snu.ac.kr'
400 error

- http POST http://127.0.0.1:8000/signup/ username='notexistingmailid@snu.ac.kr' password='test'
If mail sending fails, error

- http POST http://127.0.0.1:8000/signup/ username='jjonghu@snu.ac.kr' password='test'
201 created.
Send mail to SNU. Create user. Not verified.
Return pk num, ID, mysnu_verified(false)
Mail comes. 
http://127.0.0.1:8000/auth/nF1dDuzCwzN116vOihST9Nz4pSNhmtuP/

## Signin
- http PUT http://127.0.0.1:8000/signin/
401 error. credential.

- http GET http://127.0.0.1:8000/signin/ username='jjonghu@snu.ac.kr' password='test'
401 error.

- http -a jjonghu@snu.ac.kr:test http://127.0.0.1:8000/signin/
401 error.

- http http://127.0.0.1:8000/signin/ 'Authorization: Token nottoken'
401 error

- http http://127.0.0.1:8000/signin/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8'
202 accepted

## Authenticate
- http PUT http://127.0.0.1:8000/auth/notatoken
Long error page(debug=true)

- http http://127.0.0.1:8000/auth/notatoken
error 301

- http http://127.0.0.1:8000/auth/notatoken/
error 404

- http http://127.0.0.1:8000/auth/nF1dDuzCwzN116vOihST9Nz4pSNhmtuP
error 301 (trailing slash...)

- http http://127.0.0.1:8000/auth/nF1dDuzCwzN116vOihST9Nz4pSNhmtuP/
202 accepted, id,username, mySNU_verified(true)

- (Again) http http://127.0.0.1:8000/auth/nF1dDuzCwzN116vOihST9Nz4pSNhmtuP/
error 400

## get_auth_token
- http POST http://127.0.0.1:8000/get_auth_token/
error 400

- http POST http://127.0.0.1:8000/get_auth_token/ username='jjonghu@snu.ac.kr' password='te'
error 400

- http POST http://127.0.0.1:8000/get_auth_token/ username='jjonghu@snu.ac.kr' password='test'
token : 324e050fdd96ce63afa6d9dcefc55bfda5398bc8

------------------
- jjonghu@snu.ac.kr : test : 324e050fdd96ce63afa6d9dcefc55bfda5398bc8 : verified
- jjonghu@gmail.com : test : 69835b5bb058901d273973c7833ee8ea27d56dc6 : verified
- notverified@nowherehahahahahohi.com : test : ff9d35af0d917afa88079ac3bdde1d1cec04dcd1
-------------

# Found

## All
### GET

- http http://127.0.0.1:8000/found/
error 401 unauthorized

- http http://127.0.0.1:8000/found/ 'Authorization: Token ff9d35af0d917afa88079ac3bdde1d1cec04dcd1'   (notverified)
error 403 forbidden

- http http://127.0.0.1:8000/found/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (jjonghu@snu)
200 ok

### POST

- http POST http://127.0.0.1:8000/found/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8'
error 400 field required

- http POST http://127.0.0.1:8000/found/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' 'how_to_contact=call me' 'latitude=34' 'longitude=11' 'text=it has lots of money' 'title=i found a wallet' (jjonghu@snu)
201 created

## Old
- http http://127.0.0.1:8000/found/old/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (jjonghu@snu)

## Closed
- http http://127.0.0.1:8000/found/closed/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (jjonghu@snu)

## Detail

### GET
- http http://127.0.0.1:8000/found/1/
error 401 unautho

- http http://127.0.0.1:8000/found/1/ 'Authorization: Token ff9d35af0d917afa88079ac3bdde1d1cec04dcd1' (not verified)
error 403 forbidden

- http http://127.0.0.1:8000/found/1/ 'Authorization: Token 69835b5bb058901d273973c7833ee8ea27d56dc6' (gmail, not author)
200 ok without how_to_contact

- http http://127.0.0.1:8000/found/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (snu, author)
200 ok with how_to_contact

- http http://127.0.0.1:8000/found/1000/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8'
error 404 not found

### PUT
- http PUT http://127.0.0.1:8000/found/1/ 'Authorization: Token 69835b5bb058901d273973c7833ee8ea27d56dc6'   (gmail, non author)
403 forbidden

- http PUT http://127.0.0.1:8000/found/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8'   (snu, author)
200 unmodified data

- http PUT http://127.0.0.1:8000/found/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' created_date='today'
200 unmodified data (ignored since read only)
BUT INCREASES MODIFIED COUNT AND CHANGE MODIFIED DATA
NEED TO RETURN ERROR WHEN TRY TO ACCESS READ ONLY FIELD

- http PUT http://127.0.0.1:8000/found/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' longitude=1000
success. modified count increased

- http PUT http://127.0.0.1:8000/found/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' modified_count=1000
success but modified_count will not be changed as 1000, nothing modified except count increased by 1 after the count saved before.

## check

- http http://127.0.0.1:8000/found/1/check/ 'Authorization: Token 69835b5bb058901d273973c7833ee8ea27d56dc6'   (gmail, non author)
first check, 200 ok, recorded checked
seconde check, 200 ok, not recorded again

- http http://127.0.0.1:8000/found/1/check/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8'   (snu, author)

## case_close

- http PUT http://127.0.0.1:8000/found/1/caseclose/ 'Authorization: Token 69835b5bb058901d273973c7833ee8ea27d56dc6'   (gmail, non author)
first try, recorded closed
second try, error 400

# Lost
## All
### GET

- http http://127.0.0.1:8000/lost/
error 401 unauthorized

- http http://127.0.0.1:8000/lost/ 'Authorization: Token ff9d35af0d917afa88079ac3bdde1d1cec04dcd1'   (notverified)
error 403 forbidden

- http http://127.0.0.1:8000/lost/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (jjonghu@snu)
200 ok

### POST

- http POST http://127.0.0.1:8000/lost/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8'
error 400 field required

- http POST http://127.0.0.1:8000/lost/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' 'how_to_contact=call me' 'latitude=34' 'longitude=11' 'text=it has lots of money' 'title=i found a wallet' (jjonghu@snu)
201 created, how_to_contact ignored.

## Old
- http http://127.0.0.1:8000/lost/old/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (jjonghu@snu)

## Closed
- http http://127.0.0.1:8000/lost/closed/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (jjonghu@snu)

## Detail

### GET
- http http://127.0.0.1:8000/lost/1/
error 401 unautho

- http http://127.0.0.1:8000/lost/1/ 'Authorization: Token ff9d35af0d917afa88079ac3bdde1d1cec04dcd1' (not verified)
error 403 forbidden

- http http://127.0.0.1:8000/lost/1/ 'Authorization: Token 69835b5bb058901d273973c7833ee8ea27d56dc6' (gmail, not author)
200 ok

- http http://127.0.0.1:8000/lost/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (snu, author)
200 ok same as above

- http http://127.0.0.1:8000/lost/1000/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8'
error 404 not found

### PUT
- http PUT http://127.0.0.1:8000/lost/1/ 'Authorization: Token 69835b5bb058901d273973c7833ee8ea27d56dc6'   (gmail, non author)
403 forbidden

- http PUT http://127.0.0.1:8000/lost/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8'   (snu, author)
200 unmodified data, but modified count up

- http PUT http://127.0.0.1:8000/lost/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' created_date='today'
200 unmodified data (ignored since read only)
BUT INCREASES MODIFIED COUNT AND CHANGE MODIFIED DATA
NEED TO RETURN ERROR WHEN TRY TO ACCESS READ ONLY FIELD

- http PUT http://127.0.0.1:8000/lost/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' longitude=1000
success. modified count increased

- http PUT http://127.0.0.1:8000/lost/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' modified_count=1000
success but modified_count will not be changed as 1000, nothing modified except count increased by 1 after the count saved before.

## case_close

- http PUT http://127.0.0.1:8000/lost/1/caseclose/ 'Authorization: Token 69835b5bb058901d273973c7833ee8ea27d56dc6'   (gmail, non author)
error 403 no permission

- http PUT http://127.0.0.1:8000/lost/1/caseclose/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (snu, author)
success, recorded closer as self.

# Comment

## Lost All
### POST
- http POST http://127.0.0.1:8000/comment/lost/1/
error 401 unauthorized

- http POST http://127.0.0.1:8000/comment/lost/1/ 'Authorization: Token ff9d35af0d917afa88079ac3bdde1d1cec04dcd1'   (notverified)
error 403 forbidden

- http POST http://127.0.0.1:8000/comment/lost/10000/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (jjonghu@snu)
error 404 not found

- http POST http://127.0.0.1:8000/comment/lost/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (jjonghu@snu)
error field required

- http POST http://127.0.0.1:8000/comment/lost/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' text='first comment on lost 1' (jjonghu@snu)
success, BUT RETURNS 'is_lost_comment'. SHOULD THIS BE MODIFIED?

### GET
- http http://127.0.0.1:8000/comment/lost/1/ 'Authorization: Token ff9d35af0d917afa88079ac3bdde1d1cec04dcd1'   (notverified)
error 403 forbidden

- http http://127.0.0.1:8000/comment/lost/10000/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (jjonghu@snu)
error 404 not found

- http http://127.0.0.1:8000/comment/lost/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (jjonghu@snu)
success. returns all comments.

## Lost Detail
- http PUT http://127.0.0.1:8000/comment/lost/10000/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (author)
error 404 not found

- http PUT http://127.0.0.1:8000/comment/lost/1/100/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (author)
error 404 not found 

- http PUT http://127.0.0.1:8000/comment/lost/1/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (author)
success. modified count up.

- http PUT http://127.0.0.1:8000/comment/lost/1/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' text='changed text' lost_post_id=7 is_lost_comment=False (author)
success. only text changes.

- http PUT http://127.0.0.1:8000/comment/lost/1/1/ 'Authorization: Token 69835b5bb058901d273973c7833ee8ea27d56dc6' (non author)
error 403 no permission.


## Found All
### POST
- http POST http://127.0.0.1:8000/comment/found/1/
error 401 unauthorized

- http POST http://127.0.0.1:8000/comment/found/1/ 'Authorization: Token ff9d35af0d917afa88079ac3bdde1d1cec04dcd1'   (notverified)
error 403 forbidden

- http POST http://127.0.0.1:8000/comment/found/10000/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (jjonghu@snu)
error 404 not found

- http POST http://127.0.0.1:8000/comment/found/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (jjonghu@snu)
error field required

- http POST http://127.0.0.1:8000/comment/found/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' text='first comment on found 1' (jjonghu@snu)
success, BUT RETURNS 'is_lost_comment'. SHOULD THIS BE MODIFIED?

### GET
- http http://127.0.0.1:8000/comment/found/1/ 'Authorization: Token ff9d35af0d917afa88079ac3bdde1d1cec04dcd1'   (notverified)
error 403 forbidden

- http http://127.0.0.1:8000/comment/found/10000/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (jjonghu@snu)
error 404 not found

- http http://127.0.0.1:8000/comment/found/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (jjonghu@snu)
success. returns all comments.


## Found Detail

- http PUT http://127.0.0.1:8000/comment/found/10000/1/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (author)
error 404 not found

- http PUT http://127.0.0.1:8000/comment/found/1/100/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (author)
error 404 not found 

- http PUT http://127.0.0.1:8000/comment/found/1/7/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' (author)
success. modified count up.

- http PUT http://127.0.0.1:8000/comment/found/1/7/ 'Authorization: Token 324e050fdd96ce63afa6d9dcefc55bfda5398bc8' text='changed text' lost_post_id=7 is_lost_comment=true (author)
success. only text changes.

- http PUT http://127.0.0.1:8000/comment/found/1/7/ 'Authorization: Token 69835b5bb058901d273973c7833ee8ea27d56dc6' (non author)
error 403 no permission.
