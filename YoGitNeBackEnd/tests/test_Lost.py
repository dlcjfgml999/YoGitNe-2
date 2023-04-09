from rest_framework.test import APITestCase

from YoGitNeAPI.models import MyUser, Lost

class LostTests(APITestCase):

	# Signup user and return login token.
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

	# Write post.
	def write(self, expectedStatus, token, title, text, latitude, longitude):
		url = 'http://localhost:8000/lost/'
		self.client.credentials(HTTP_AUTHORIZATION='Token '+token)
		response = self.client.post(url,\
				data={'title':title, 'text':text, \
							'latitude':latitude, 'longitude':longitude})
		self.assertEqual(response.status_code, expectedStatus)
	# Read post. Return response.
	def read(self, expectedStatus, token, post_num):
		url = 'http://localhost:8000/lost/'+str(post_num)+'/'
		self.client.credentials(HTTP_AUTHORIZATION='Token '+token)
		response = self.client.get(url)
		self.assertEqual(response.status_code, expectedStatus)
		return response

	# Update post.
	def update(self, expectedStatus, token, post_num, data):
		url = 'http://localhost:8000/lost/'+str(post_num)+'/'
		self.client.credentials(HTTP_AUTHORIZATION='Token '+token)
		response = self.client.put(url, data=data)
		self.assertEqual(response.status_code, expectedStatus)
	
	# Close post.
	def close(self, expectedStatus, token, post_num):
		url = 'http://localhost:8000/lost/'+str(post_num)+'/caseclose/'
		self.client.credentials(HTTP_AUTHORIZATION='Token '+token)
		response = self.client.put(url)
		self.assertEqual(response.status_code, expectedStatus)
		#self.assertEqual(response.json()['case_closed'], expectedResult)

	# Will be executed every time before starting of each 'test_*' functions.
	# Scenario.
	# 1. writer write 2 posts.
	# 2. reader1 check post number 1.
	def setUp(self):
		print('Set Up For Test')
		print('Signing up...')
		self.writer_token = self.signup('yogitne1', 'yogitne1', True)
		self.reader_token1 = self.signup('yogitne2', 'yogitne2', True)
		self.reader_token2 = self.signup('yogitne3', 'yogitne3', True)
		self.unv_token = self.signup('yogitne4', 'yogitne4', False)
		print('Making posts...')
		self.write(201, self.writer_token, 'First Lost', 'First Body', 10, 20)
		self.write(201, self.writer_token, 'Second Lost', 'Second Body', 10, 20)
		
	def test_lost_get(self):
		print('Test /lost/ GET')
		url = 'http://localhost:8000/lost/'
		# 1. No Token
		self.client.credentials(HTTP_AUTHORIZATION='Token '+'not token')
		res = self.client.get(url)
		self.assertEqual(res.status_code, 401)
		# 2. Not SNU verified.
		self.client.credentials(HTTP_AUTHORIZATION='Token '+self.unv_token)
		res = self.client.get(url)
		self.assertEqual(res.status_code, 403)
		# 3. Success.
		self.client.credentials(HTTP_AUTHORIZATION='Token '+self.writer_token)
		res = self.client.get(url)
		self.assertEqual(res.status_code, 200)
		print(res.json())

	def test_lost_post(self):
		print('Test /lost/ POST')
		url = 'http://localhost:8000/lost/'
		# 1. No Token User Post
		self.write(201, self.writer_token, 'Third Lost', 'Third Body', 10, 20)
		# 2. Not validated data
		self.write(400, self.writer_token, 'Third Lost', 'Third Body', 'This should be integer', 20)

	def test_lost_num_get(self):
		print('Test /lost/1/ GET')
		url = 'http://localhost:8000/lost/1/'
		# 1. No Token
		self.read(401, 'not token', 1)
		# 2. Not SNU verified.
		self.read(403, self.unv_token, 1)
		# 3. Success. Writer read.
		resjson = self.read(200, self.writer_token, 1).json()
		# 9. No post num 1000000
		self.read(404, self.writer_token, 100000)

	def test_lost_num_put(self):
		print('Test /lost/1/ PUT')
		url = 'http://localhost:8000/lost/1/'
		# 1. Reader 1 try to update.
		self.update(403, self.reader_token1, 1, {'not going':'to pass'})
		# 2. Writer update, but not validated data.
		self.update(400, self.writer_token, 1, {'longitude': 'is not string!'} )
		# 3. Writer update, success.
		self.update(200, self.writer_token, 1, {'longitude' : 4})
		# 4. No such post.
		self.update(404, self.writer_token, 100000, {'nono':'it is'})

	def test_lost_num_caseclose(self):
		print('Test /lost/1/caseclose/')
		url = 'http://localhost:8000/lost/1/caseclose'
		# 1. Reader 2 can't close post 1.
		self.close(403, self.reader_token2, 1)
		# 2. Writer can close.
		self.close(200, self.writer_token, 1)
		# 3. Case cannot be closed twice.
		self.close(400, self.writer_token, 1)
		# 4. No such post.
		self.close(404, self.reader_token1, 100000)

	def test_lost_old(self):
		print('Test /lost/old/ ')
		url = 'http://localhost:8000/lost/old/'
		# There are no old posts.
		self.client.credentials(HTTP_AUTHORIZATION='Token '+self.writer_token)
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)
		self.assertEqual(len(response.data), 0)


	def test_lost_closed(self):
		print('Test /lost/closed/ ')
		url = 'http://localhost:8000/lost/closed/'
		# Close by writer
		self.close(200, self.writer_token, 1)
		# One post is closed
		self.client.credentials(HTTP_AUTHORIZATION='Token '+self.writer_token)
		response = self.client.get(url)
		self.assertEqual(response.status_code, 200)
		self.assertEqual(len(response.data), 1)