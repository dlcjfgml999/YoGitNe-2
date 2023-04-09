import requests
from requests import get, post, put, delete
from YoGitNeAPI.models import MyUser, Found, Lost, Comment, Who_checked

Who_checked.objects.all().delete()
Comment.objects.all().delete()
Found.objects.all().delete()
Lost.objects.all().delete()
MyUser.objects.all().delete()


#######################################################################################################
#######################################################################################################
####################################### USER TEST #####################################################
####################################### USER TEST #####################################################
####################################### USER TEST #####################################################
#######################################################################################################
#######################################################################################################

def create_users(N):
	ls = []
	#ls.append(("jjonghu", "testpassword"))
	for i in range(1, N):
		ls.append(("yogitne{0}".format(i), "yogitne{0}passwd".format(i)))
	return ls

print("Initialize users with")
userN = 4
users = create_users(userN)
print(users)
print("")

print("signup test")
for (username, pwd) in users:
	print("uname, pwd : "+username + pwd)
	res = requests.put("http://127.0.0.1:8000/signup/")
	if res.status_code != 405:
		exit(1)
	res = requests.delete("http://127.0.0.1:8000/signup/")
	if res.status_code != 405:
		exit(1)
	res = requests.get("http://127.0.0.1:8000/signup/")
	if res.status_code != 200:
		exit(1)
	res = requests.post("http://127.0.0.1:8000/signup/", data={'username': username})
	if res.status_code != 400:
		exit(1)
	res = requests.post("http://127.0.0.1:8000/signup/", data={'username': username, 'password': pwd})
	if res.status_code != 201:
		exit(1)
	if res.json()['username'] != username:
		exit(1)
	if res.json()['mySNU_verified'] != False:
		exit(1)
	
	print(res.json())
	print("success")
print("")


print("get_auth_token test")
token_list = []
for (username, pwd) in users:
	res = requests.post("http://127.0.0.1:8000/get_auth_token/")
	if res.status_code != 400:
		exit(1)
	res = requests.post("http://127.0.0.1:8000/get_auth_token/", data={'username': username, 'password': 'wrongpwd'})
	if res.status_code != 400:
		exit(1)
	res = requests.post("http://127.0.0.1:8000/get_auth_token/", data={'username': username, 'password': pwd})
	if res.status_code != 200:
		exit(1)    
	
	token_list.append(res.json())    
	print(res.json())
	print("success")
print("")

print("signin test (before SNU verification)")
for token in token_list:
	res = requests.get("http://127.0.0.1:8000/signin/")
	if res.status_code != 401:
		exit(1)
	res = requests.get("http://127.0.0.1:8000/signin/", headers={'Authorization': 'Token '+'notatoken'})
	if res.status_code != 401:
		exit(1) 
	
	res = requests.get("http://127.0.0.1:8000/signin/", headers={'Authorization': 'Token '+token['token']})
	print(res.status_code)
	if res.status_code != 403:
		exit(1)
		
	print("success")
print("")

print("auth test")
for user in requests.get("http://127.0.0.1:8000/signup/").json():
	res = requests.put("http://127.0.0.1:8000/auth/notatoken")
	if res.status_code != 500:
		exit(1)
	res = requests.get("http://127.0.0.1:8000/auth/notatoken/")
	if res.status_code != 404:
		exit(1)
	res = requests.get("http://127.0.0.1:8000/auth/"+user['mySNU_verification_token']+"/")
	if res.status_code != 202:
		exit(1)
	if res.json()['mySNU_verified'] != True:
		exit(1)
		
	res = requests.get("http://127.0.0.1:8000/auth/"+user['mySNU_verification_token']+"/")
	if res.status_code != 400:
		exit(1)
	
	print("success")
print("")



print("signin test (after SNU verification)")
for token in token_list:
	res = requests.get("http://127.0.0.1:8000/signin/", headers={'Authorization': 'Token '+token['token']})
	if res.status_code != 202:
		exit(1)
	print("success")
print("")

print("User creation finished.")
#######################################################################################################
####################################### USER TEST END #################################################
####################################### USER TEST END #################################################
####################################### USER TEST END #################################################
#######################################################################################################
#######################################################################################################
print("Make unverified user...")
unv_name = "unv_name"
unv_pwd = "unv_pwd"
unv_token = {}
res = post("http://127.0.0.1:8000/signup/", data={'username':unv_name, 'password':unv_pwd})
if res.status_code != 201:
	print("Make unverified user fail.")
	exit(1)
else :
	res = post("http://127.0.0.1:8000/get_auth_token/", data={'username':unv_name, 'password':unv_pwd})
	unv_token = res.json()
	print("Make unverified user success.")

# Actually, token is {'token': 'real_token'}
def header_maker(token):
	real_token = token['token']
	return {'Authorization': 'Token '+real_token}
#######################################################################################################
####################################### FOUND  TEST ###################################################
####################################### FOUND  TEST ###################################################
####################################### FOUND  TEST ###################################################
#######################################################################################################

print("Found Test Start")

# This num will be updated authomatically.
post_num = 1

writer_name = users[0][0]
writer_pwd = users[0][1]
writer_token = token_list[0]
reader_name = users[1][0]
reader_pwd = users[1][1]
reader_token = token_list[1]
print("writer_name : "+writer_name)
print("reader_pwd : "+writer_pwd)
print("writer_token : "+str(writer_token))
print("reader_name : "+reader_name)
print("reader_pwd : "+reader_pwd)
print("reader_token : "+str(reader_token))
print("")


###########################################################
url = "http://127.0.0.1:8000/found/"

print("/found : GET TEST 1")
res = get(url)
if res.status_code != 401:
	exit(1)
else:
	print(res.json())

print("/found : GET TEST 2")
res = get(url, headers=header_maker(unv_token))
if res.status_code != 403:
	exit(1)
else:
	print(res.json())

print("/found : GET TEST 3")
res = get(url, headers=header_maker(writer_token))
if res.status_code != 200:
	exit(1)
else:
	print(res.json())
##############################################################
url = "http://127.0.0.1:8000/found/"

print("/found : POST TEST 1")
res = post(url, headers= header_maker(writer_token))
if res.status_code != 400:
	exit(1)
else:
	print(res.json())

print("/found : POST TEST 2")
data = {'how_to_contact':'call me', 'latitude':3, 'longitude':12.5, 'text':'body text', 'title':'Found title'}
res = post(url, headers= header_maker(writer_token), data=data)
if res.status_code != 201:
	exit(1)
else:
	print(res.json())

post_num = res.json()['id']
print("post_num : "+str(post_num))
################################################################
url = "http://127.0.0.1:8000/found/"+str(post_num)+"/"

print("/found/post_num/ : GET TEST 1")
res = get(url)
if res.status_code != 401:
	exit(1)
else:
	print(res.json())
print("/found/post_num/ : GET TEST 2")
res = get(url, headers= header_maker(unv_token))
if res.status_code != 403:
	exit(1)
else:
	print(res.json())
print("/found/post_num/ : GET TEST 3")
res = get(url, headers= header_maker(reader_token))
if res.status_code != 200 or 'how_to_contact' in res.json():
	exit(1)
else:
	print(res.json())
print("/found/post_num/ : GET TEST 4")
res = get(url, headers= header_maker(writer_token))
if res.status_code != 200 or not ('how_to_contact' in res.json()):
	exit(1)
else:
	print(res.json())

url = "http://127.0.0.1:8000/found/10000/"
print("/found/10000/ : GET TEST 5 : NOT FOUND")
res = get(url, headers= header_maker(writer_token))
if res.status_code != 404:
	exit(1)
##################################################################
url = "http://127.0.0.1:8000/found/"+str(post_num)+"/"

print("/found/post_num/ : PUT TEST 1")
res = put(url, headers=header_maker(reader_token))
if res.status_code != 403:
	exit(1)
else:
	print(res.json())
print("/found/post_num/ : PUT TEST 2 : UNMODIFIED DATA")
res = put(url, headers= header_maker(writer_token))
if res.status_code != 200:
	exit(1)
else:
	print(res.json())
print("/found/post_num/ : PUT TEST 3 : UNMODIFIED DATA")
res = put(url, headers= header_maker(writer_token), data={'created_date':'today?'})
if res.status_code != 200:
	exit(1)
else:
	print(res.json())
print("/found/post_num/ : PUT TEST 4")
res = put(url, headers= header_maker(writer_token), data={'longitude':10})
if res.status_code != 200  or res.json()['longitude'] != 10:
	exit(1)
else:
	print(res.json())
print("/found/post_num/ : PUT TEST 5 : ModiCount inc only 1")
res = put(url, headers= header_maker(writer_token), data={'modified_count':10000})
if res.status_code != 200 or res.json()['modified_count'] > 999:
	exit(1)
else:
	print(res.json())
################################################################
url = "http://127.0.0.1:8000/found/"+str(post_num)+"/check/"
geturl = "http://127.0.0.1:8000/found/"+str(post_num)+"/"

print("/found/post_num/check : GET TEST 1")
res = get(url, headers=header_maker(reader_token))
if res.status_code != 200:
	exit(1)
else:
	print(res.json())
	res = get(geturl, headers=header_maker(reader_token))
	print("Checker added")
	print(res.json())
print("/found/post_num/check : GET TEST 2 : Not recorded again")
res = get(url, headers=header_maker(reader_token))
if res.status_code != 200:
	exit(1)
else:
	print(res.json())
	res = get(geturl, headers=header_maker(reader_token))
	print("Checker NOT added")
	print(res.json())
print("/found/post_num/check : GET TEST 3 : writer don't need to check")
res = get(url, headers=header_maker(writer_token))
if res.status_code != 400:
	exit(1)
else:
	print(res.json())
################################################################
url = "http://127.0.0.1:8000/found/"+str(post_num)+"/caseclose/"
geturl = "http://127.0.0.1:8000/found/"+str(post_num)+"/"

print("/found/post_num/caseclose : PUT TEST 1 : READER Case close")
res = put(url, headers=header_maker(reader_token))
if res.status_code != 200:
	exit(1)
else:
	print(res.json())
	res = get(geturl, headers=header_maker(reader_token))
	if not res.json()['case_closed']:
		exit(1)
print("/found/post_num/caseclose : PUT TEST 2 : Case NOT Closed Again ")
res = put(url, headers=header_maker(reader_token))
if res.status_code != 400:
	exit(1)
else:
	print(res.json())
	res = get(geturl, headers=header_maker(reader_token))
	if not res.json()['case_closed']:
		exit(1)
	print("Case already closed")

###############################################################
url = "http://127.0.0.1:8000/found/old/"
print("/found/old : GET TEST 1")
res = get(url, headers= header_maker(writer_token))
if res.status_code != 200:
	exit(1)
else:
	print(res.json())
################################################################
url = "http://127.0.0.1:8000/found/closed/"
print("/found/closed : GET TEST 1")
res = get(url, headers= header_maker(writer_token))
if res.status_code != 200:
	exit(1)
else:
	print(res.json())
##############################################################

print("Found Test Succesfully Ends")
#######################################################################################################
####################################### FOUND TEST DONE ###############################################
####################################### FOUND TEST DONE ###############################################
####################################### FOUND TEST DONE ###############################################
#######################################################################################################
#######################################################################################################



#######################################################################################################
#######################################################################################################
####################################### LOST  TEST ####################################################
####################################### LOST  TEST ####################################################
####################################### LOST  TEST ####################################################
#######################################################################################################
#######################################################################################################
print("Lost Test Start")

# This num will be updated authomatically.
post_num = 1

writer_name = users[0][0]
writer_pwd = users[0][1]
writer_token = token_list[0]
reader_name = users[1][0]
reader_pwd = users[1][1]
reader_token = token_list[1]
print("writer_name : "+writer_name)
print("reader_pwd : "+writer_pwd)
print("writer_token : "+str(writer_token))
print("reader_name : "+reader_name)
print("reader_pwd : "+reader_pwd)
print("reader_token : "+str(reader_token))
print("")


###########################################################
url = "http://127.0.0.1:8000/lost/"

print("/lost : GET TEST 1")
res = get(url)
if res.status_code != 401:
	exit(1)
else:
	print(res.json())

print("/lost : GET TEST 2")
res = get(url, headers=header_maker(unv_token))
if res.status_code != 403:
	exit(1)
else:
	print(res.json())

print("/lost : GET TEST 3")
res = get(url, headers=header_maker(writer_token))
if res.status_code != 200:
	exit(1)
else:
	print(res.json())
##############################################################
url = "http://127.0.0.1:8000/lost/"

print("/lost : POST TEST 1")
res = post(url, headers= header_maker(writer_token))
if res.status_code != 400:
	exit(1)
else:
	print(res.json())

# 'how_to_contact' ignored.
print("/lost : POST TEST 2")
data = {'how_to_contact':'call me', 'latitude':3, 'longitude':12.5, 'text':'lost body text', 'title':'Lost title'}
res = post(url, headers= header_maker(writer_token), data=data)
if res.status_code != 201:
	exit(1)
else:
	print(res.json())

post_num = res.json()['id']
print("post_num : "+str(post_num))
################################################################
url = "http://127.0.0.1:8000/lost/"+str(post_num)+"/"

print("/lost/post_num/ : GET TEST 1")
res = get(url)
if res.status_code != 401:
	exit(1)
else:
	print(res.json())
print("/lost/post_num/ : GET TEST 2")
res = get(url, headers= header_maker(unv_token))
if res.status_code != 403:
	exit(1)
else:
	print(res.json())
print("/lost/post_num/ : GET TEST 3")
res = get(url, headers= header_maker(reader_token))
if res.status_code != 200:
	exit(1)
else:
	print(res.json())
print("/lost/post_num/ : GET TEST 4")
res = get(url, headers= header_maker(writer_token))
if res.status_code != 200:
	exit(1)
else:
	print(res.json())

url = "http://127.0.0.1:8000/lost/10000/"
print("/lost/10000/ : GET TEST 5 : NOT FOUND")
res = get(url, headers= header_maker(writer_token))
if res.status_code != 404:
	exit(1)
##################################################################
url = "http://127.0.0.1:8000/lost/"+str(post_num)+"/"

print("/lost/post_num/ : PUT TEST 1")
res = put(url, headers=header_maker(reader_token))
if res.status_code != 403:
	exit(1)
else:
	print(res.json())
print("/lost/post_num/ : PUT TEST 2 : UNMODIFIED DATA")
res = put(url, headers= header_maker(writer_token))
if res.status_code != 200:
	exit(1)
else:
	print(res.json())
print("/lost/post_num/ : PUT TEST 3 : UNMODIFIED DATA")
res = put(url, headers= header_maker(writer_token), data={'created_date':'today?'})
if res.status_code != 200:
	exit(1)
else:
	print(res.json())
print("/lost/post_num/ : PUT TEST 4")
res = put(url, headers= header_maker(writer_token), data={'longitude':10})
if res.status_code != 200 or res.json()['longitude'] != 10:
	exit(1)
else:
	print(res.json())
print("/lost/post_num/ : PUT TEST 5 : ModiCount inc only 1")
res = put(url, headers= header_maker(writer_token), data={'modified_count':10000})
if res.status_code != 200 or res.json()['modified_count'] > 999:
	exit(1)
else:
	print(res.json())
################################################################
################################################################
url = "http://127.0.0.1:8000/lost/"+str(post_num)+"/caseclose/"
geturl = "http://127.0.0.1:8000/lost/"+str(post_num)+"/"

print("/lost/post_num/caseclose : PUT TEST 1 : WRITER Case close")
res = put(url, headers=header_maker(writer_token))
if res.status_code != 200:
	exit(1)
else:
	print(res.json())
	res = get(geturl, headers=header_maker(writer_token))
	if not res.json()['case_closed']:
		exit(1)
print("/lost/post_num/caseclose : PUT TEST 2 : Case NOT Closed Again ")
res = put(url, headers=header_maker(writer_token))
if res.status_code != 400:
	exit(1)
else:
	print(res.json())
	res = get(geturl, headers=header_maker(reader_token))
	if not res.json()['case_closed']:
		exit(1)
	print("Case already closed")

###############################################################
url = "http://127.0.0.1:8000/lost/old/"
print("/lost/old : GET TEST 1")
res = get(url, headers= header_maker(writer_token))
if res.status_code != 200:
	exit(1)
else:
	print(res.json())
################################################################
url = "http://127.0.0.1:8000/lost/closed/"
print("/lost/closed : GET TEST 1")
res = get(url, headers= header_maker(writer_token))
if res.status_code != 200:
	exit(1)
else:
	print(res.json())
##############################################################

print("Lost Test Succesfully Ends")


#######################################################################################################
#######################################################################################################
####################################### LOST TEST DONE ################################################
####################################### LOST TEST DONE ################################################
####################################### LOST TEST DONE ################################################
#######################################################################################################
#######################################################################################################