from rest_framework.test import APITestCase
from YoGitNeAPI.models import MyUser, Comment

class CommentTests(APITestCase):

    def signup(self, username, password, SNUverify):
		# Make User
        url = 'http://localhost:8000/signup/'
        response = self.client.post(url, data={'username':username, 'password':password})
        self.assertEqual(response.status_code, 201)
        # Get token
        url = 'http://localhost:8000/get_auth_token/'
        response = self.client.post(url, data={'username':username, 'password':password})
        token = response.json()['token']
        if SNUverify:
            user = MyUser.objects.get(username=username)
            user.mySNU_verified = True
            user.save()
        return token
        
    def write_found(self, expectedStatus, token, title, text, how_to_contact, latitude, longitude):
        url = 'http://localhost:8000/found/'
        self.client.credentials(HTTP_AUTHORIZATION='Token '+token)
        response = self.client.post(url,\
            data={'title':title, 'text':text, 'how_to_contact':how_to_contact, \
                            'latitude':latitude, 'longitude':longitude})
        self.assertEqual(response.status_code, expectedStatus)
        
    def write_lost(self, expectedStatus, token, title, text, latitude, longitude):
        url = 'http://localhost:8000/lost/'
        self.client.credentials(HTTP_AUTHORIZATION='Token '+token)
        response = self.client.post(url,\
                data={'title':title, 'text':text, \
                            'latitude':latitude, 'longitude':longitude})
        self.assertEqual(response.status_code, expectedStatus)
        
        
    def write_found_comment(self, expectedStatus, token, found_id, data):
        url = 'http://localhost:8000/comment/found/'+str(found_id)+'/'
        self.client.credentials(HTTP_AUTHORIZATION='Token '+token)
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, expectedStatus)
 
    def write_lost_comment(self, expectedStatus, token, lost_id, data):
        url = 'http://localhost:8000/comment/lost/'+str(lost_id)+'/'
        self.client.credentials(HTTP_AUTHORIZATION='Token '+token)
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, expectedStatus)
	
    def update_found_comment(self, expectedStatus, token, found_id, comment_id, data):    
        url = 'http://localhost:8000/comment/found/'+str(found_id)+'/'+str(comment_id)+'/'
        self.client.credentials(HTTP_AUTHORIZATION='Token '+token)
        response = self.client.put(url, data=data)
        self.assertEqual(response.status_code, expectedStatus)
	
    def update_lost_comment(self, expectedStatus, token, lost_id, comment_id, data):    
        url = 'http://localhost:8000/comment/lost/'+str(lost_id)+'/'+str(comment_id)+'/'
        self.client.credentials(HTTP_AUTHORIZATION='Token '+token)
        response = self.client.put(url, data=data)
        self.assertEqual(response.status_code, expectedStatus)
        
    def setUp(self):
        self.writer_token = self.signup('yogitne1', 'yogitne1', True)
        self.reader_token = self.signup('yogitne2', 'yogitne2', True)
        self.unverified_token = self.signup('yogitne3', 'yogitne3', False)    
        self.write_found(201, self.writer_token, 'First Found', 'Body', 'Call me', 10, 20)
        self.write_lost(201, self.writer_token, 'First Lost', 'Body', 10, 20)
        self.write_found_comment(201, self.writer_token, 1, {'text': 'comment1'})
        self.write_found_comment(201, self.writer_token, 1, {'text': 'comment2'})
        self.write_lost_comment(201, self.writer_token, 1, {'text': 'comment1'})
        self.write_lost_comment(201, self.writer_token, 1, {'text': 'comment2'})
    
    def test_get_found_comment(self):
        url = 'http://localhost:8000/comment/found/1/'
        self.client.credentials(HTTP_AUTHORIZATION='Token '+'not token')
        res = self.client.get(url)
        self.assertEqual(res.status_code, 401)
        # 2. Not SNU verified.
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.unverified_token)
        res = self.client.get(url)
        self.assertEqual(res.status_code, 403)
        # 3. Success.
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.writer_token)
        res = self.client.get(url)
        self.assertEqual(res.status_code, 200)
        print(res.json())
        
    def test_get_lost_comment(self):
        url = 'http://localhost:8000/comment/lost/1/'
        self.client.credentials(HTTP_AUTHORIZATION='Token '+'not token')
        res = self.client.get(url)
        self.assertEqual(res.status_code, 401)
        # 2. Not SNU verified.
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.unverified_token)
        res = self.client.get(url)
        self.assertEqual(res.status_code, 403)
        # 3. Success.
        self.client.credentials(HTTP_AUTHORIZATION='Token '+self.writer_token)
        res = self.client.get(url)
        self.assertEqual(res.status_code, 200)
        print(res.json())    
        
    def test_post_found_comment(self):
        url = 'http://localhost:8000/comment/found/1/'
        self.write_found_comment(401, 'not token', 1, {'text': 'comment3'})
        self.write_found_comment(403, self.unverified_token, 1, {'text': 'comment3'})
        self.write_found_comment(400, self.writer_token, 1, {})
        self.write_found_comment(401, 'not token', 1000, {'text': 'comment3'})
        self.write_found_comment(403, self.unverified_token, 1000, {'text': 'comment3'})
        self.write_found_comment(404, self.writer_token, 1000, {})
        
    def test_post_lost_comment(self):
        url = 'http://localhost:8000/comment/lost/1/'
        self.write_lost_comment(401, 'not token', 1, {'text': 'comment3'})
        self.write_lost_comment(403, self.unverified_token, 1, {'text': 'comment3'})
        self.write_lost_comment(400, self.writer_token, 1, {})
        self.write_lost_comment(401, 'not token', 1000, {'text': 'comment3'})
        self.write_lost_comment(403, self.unverified_token, 1000, {'text': 'comment3'})
        self.write_lost_comment(404, self.writer_token, 1000, {})
        
    def test_put_found_comment(self):
        url = 'http://localhost:8000/comment/found/1/'
        self.update_found_comment(401, 'not token', 1, 1, {'text': 'modified comment3'})
        self.update_found_comment(403, self.reader_token, 1, 1, {'text': 'modified comment3'})
        self.update_found_comment(403, self.unverified_token, 1, 1, {'text': 'modified comment3'})
        self.update_found_comment(200, self.writer_token, 1, 1, {})
        self.update_found_comment(200, self.writer_token, 1, 1, {'text': 'modified comment3'})
        self.update_found_comment(401, 'not token', 1000, 1, {'text': 'modified comment3'})
        self.update_found_comment(404, self.reader_token, 1000, 1, {'text': 'modified comment3'})
        self.update_found_comment(403, self.unverified_token, 1000, 1, {'text': 'modified comment3'})
        self.update_found_comment(404, self.writer_token, 1000, 1, {})
        self.update_found_comment(404, self.writer_token, 1000, 1, {'text': 'modified comment3'})
        
    def test_put_lost_comment(self):
        url = 'http://localhost:8000/comment/lost/1/'
        self.update_lost_comment(401, 'not token', 1, 3, {'text': 'modified comment3'})
        self.update_lost_comment(403, self.reader_token, 1, 3, {'text': 'modified comment3'})
        self.update_lost_comment(403, self.unverified_token, 1, 3, {'text': 'modified comment3'})
        self.update_lost_comment(200, self.writer_token, 1, 3, {})
        self.update_lost_comment(200, self.writer_token, 1, 3, {'text': 'modified comment3'})
        self.update_lost_comment(401, 'not token', 1000, 3, {'text': 'modified comment3'})
        self.update_lost_comment(404, self.reader_token, 1000, 3, {'text': 'modified comment3'})
        self.update_lost_comment(403, self.unverified_token, 1000, 3, {'text': 'modified comment3'})
        self.update_lost_comment(404, self.writer_token, 1000, 3, {})
        self.update_lost_comment(404, self.writer_token, 1000, 3, {'text': 'modified comment3'})
          
        
