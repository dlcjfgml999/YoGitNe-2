from rest_framework.test import APITestCase
from YoGitNeAPI.models import MyUser

class UserTests(APITestCase):

    def test_signup(self):
        print("signup")
        url = "http://localhost:8000/signup/"
        response = self.client.put(url)
        self.assertEqual(response.status_code, 405)
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 405)
        response = self.client.post(url, data={'username': 'yogitne'})
        self.assertEqual(response.status_code, 400)
        response = self.client.post(url, data={'username': 'yogitne', 'password': 'yogitne'})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['username'], 'yogitne')
        self.assertEqual(response.json()['mySNU_verified'], False)
        # ID with @ should not pass
        response = self.client.post(url, data={'username': 'yogitne@naver.com', 'password': 'yogitne'})
        self.assertEqual(response.status_code, 400)        

        
    def test_get_authtoken(self):
        print("get_auth_token")
        url = "http://localhost:8000/get_auth_token/"
        # create user
        self.client.post("http://localhost:8000/signup/", data={'username': 'yogitne', 'password': 'yogitne'})
        # test
        response = self.client.post(url)
        self.assertEqual(response.status_code, 400)
        response = self.client.post(url, data={'username': 'yogitne'})
        self.assertEqual(response.status_code, 400)
        response = self.client.post(url, data={'username': 'yogitne', 'password': 'yogitne'})
        self.assertEqual(response.status_code, 200)
    
    def test_auth(self):
        print("verification")
        # create user and store mySNU_verification_token
        response = self.client.post("http://localhost:8000/signup/", data={'username': 'yogitne', 'password': 'yogitne'})
        user = MyUser.objects.get(username='yogitne')        
        verification_token = user.mySNU_verification_token

        # test
        response = self.client.put("http://localhost:8000/auth/notatoken/")
        self.assertEqual(response.status_code, 405)
        response = self.client.get("http://localhost:8000/auth/notatoken/")
        self.assertEqual(response.status_code, 404)
        response = self.client.get("http://localhost:8000/auth/"+verification_token+"/")
        self.assertEqual(response.status_code, 202)
        #self.assertEqual(response.json()['mySNU_verified'], True)
        response = self.client.get("http://localhost:8000/auth/"+verification_token+"/")
        self.assertEqual(response.status_code, 400)
        
    
    def test_signin(self):
        print("signin")
        url = "http://localhost:8000/signin/"
        # create user and store user token
        response = self.client.post("http://localhost:8000/signup/", data={'username': 'yogitne', 'password': 'yogitne'})        
        user = MyUser.objects.get(username='yogitne')        
        verification_token = user.mySNU_verification_token
        
        response = self.client.post("http://localhost:8000/get_auth_token/", data={'username': 'yogitne', 'password': 'yogitne'})
        token = response.json()['token']
        # signin before verification
        response = self.client.get(url)
        self.assertEqual(response.status_code, 401)
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + 'false_token')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 401)
        
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        response = self.client.get(url)
        self.assertEqual(response.status_code, 403)
        
        # mySNU verification
        response = self.client.get("http://localhost:8000/auth/"+verification_token+"/")
        # signin after verification
        response = self.client.get(url)
        self.assertEqual(response.status_code, 202)
        
       
        
#class FoundTest(APITestCase):
